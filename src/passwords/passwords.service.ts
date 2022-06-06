import { EmailsService } from './../emails/emails.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PasswordsService {
  constructor(
    private emailsService: EmailsService,
    private emailValidationService: EmailValidationsService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async updatePassword(email, password) {
    const hash = await this.hashPassword(password);
    const update = await this.prismaService.user.update({
      where: { emailAddress: email },
      data: { password: hash },
    });
    if (update) {
      const passwordChangeEmail = await this.emailsService.passwordChange(
        email,
      );
      return { message: 'password updated successfully', update };
    } else {
      throw new BadRequestException('unable to update password');
    }
  }

  async hashPassword(pass) {
    try {
      console.log('entered password hashing');

      const hash = await argon2.hash(pass, { type: argon2.argon2id });
      if (hash) {
        return hash;
      }
    } catch (err) {
      throw err;
    }
  }

  async comparePassword(password: string, userPassword: string): Promise<any> {
    try {
      const result = await argon2.verify(userPassword, password);
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  generateRandomString(length) {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  createUrl(user: User, hash: string) {
    const url = `${
      this.configService.get('FORGET_PASSWORD_URL') +
      'v1/auth/forget-password-email-link'
    }?hash=${hash}&email=${user.emailAddress}`;
    return url;
  }

  async forgetPassword(user: User) {
    const hash = this.generateRandomString(7);
    const url = this.createUrl(user, hash);
    const emailValidation = {
      type: 'passwordValidation',
      hash: hash,
      active: false,
      userId: user.id,
    };
    const validate = await this.emailValidationService.create(emailValidation);

    if (validate) {
      await this.emailsService.forgetPassword(user, url);
      return { message: 'forgot password email sent' };
    }
  }

}

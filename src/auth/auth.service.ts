import { EmailValidationsService } from './../email-validations/email-validations.service';
import { PasswordsService } from 'src/passwords/passwords.service';
/* eslint-disable prefer-const */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly passwordsService: PasswordsService,
    private readonly  emailValidationService: EmailValidationsService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (user) {
      const newUser = this.loginUser(user);
      return newUser;
    } else {
      throw new UnauthorizedException('Invalid User Name or password');
    }
  }

  async loginUser(user: any) {
    const access_token = await this.generateToken(user);
    return {
      access_token: access_token,
      user,
    };
  }

  async generateToken(user: any) {
    console.log('user account');
    const payload = {
      emailAddress: user.emailAddress,
      id: user.id,
      userName:user.userName,
      roles:user.roles
    };

    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async forgetPassword(email: string) {
    const user = await this.usersService.getByEmail(email);
    return await this.passwordsService.forgetPassword(user);
  }

  async updatePassword(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    const verify = await this.emailValidationService.verify(user.id);
    if (verify) {
      const update = await this.passwordsService.updatePassword(
        email,
        password,
      );
      if (update) {
        await this.emailValidationService.delete(verify.id);
        return update;
      }
    }
  }

  async verifyForgetPasswordEmail(email: string, hash: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const verify = await this.prismaService.emailValidation.findFirst({
        where: { userId: user.id, hash: hash },
      });
      if (verify) {
        const updateValidation = await this.emailValidationService.activate(
          verify.id,
        );
        if (updateValidation) {
          return { message: 'validation successful' };
        }
      } else {
        throw new BadRequestException('Unable to find User with this hash');
      }
    } catch (err) {
      throw err;
    }
  }

}

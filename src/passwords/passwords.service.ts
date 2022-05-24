import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PasswordsService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}
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
}

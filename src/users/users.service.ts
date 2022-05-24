import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { PasswordsService } from 'src/passwords/passwords.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordsService: PasswordsService,
    private configService: ConfigService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    console.log('user', data);

    if (data.password != null || data.password != undefined) {
      data.password = await this.passwordsService.hashPassword(data.password);
    }
    return this.prisma.user.create({ data });
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { emailAddress: email },
    });
    if (user) {
      return user;
    }
  }

  async getById(input: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: input,
    });
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

async delete(id){
  const user = await this.prisma.user.delete({
    where: id,
  });
  return user;
}

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      //include: { applications: true },
    });
  }

  // async getUnverified(filters: UserFilterDto): Promise<User[]> {
  //   let where: any = { emailVerifiedAt: null };
  //   if (!!filters.applicationId) {
  //     where = {
  //       ...where,
  //       userInApplications: { some: { applicationId: filters.applicationId } },
  //     };
  //   }
  //   return this.prisma.user.findMany({
  //     where,
  //   });
  // }

  // async getUnused(filters: UserFilterDto): Promise<User[]> {
  //   let where: any = {};
  //   if (!!filters.lastActivity) {
  //     where = {
  //       lastActivityAt: {
  //         gte: filters.lastActivity,
  //       },
  //     };
  //   }
  //   if (!!filters.applicationId) {
  //     where = {
  //       ...where,
  //       userInApplications: { some: { applicationId: filters.applicationId } },
  //     };
  //   }
  //   return this.prisma.user.findMany({
  //     where,
  //   });
  // }

  // async activate(id: string) {
  //   const user = await this.getById({ id });
  //   if (!user || user.active) {
  //     throw new BadRequestException('Active user not found');
  //   }
  //   const result = await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       active: true,
  //     },
  //   });
  //   if (result) {
  //     return { message: 'Otp is verified & User is activated succesfully' };
  //   } else {
  //     throw new BadRequestException('unable to activate User');
  //   }
  // }

  // async verifyEmail(id: string) {
  //   console.log('userid in user service', id);

  //   const user = await this.getById({ id });
  //   if (!user) {
  //     throw new BadRequestException('Active user not found');
  //   }
  //   const result = await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       emailVerifiedAt: new Date(),
  //     },
  //   });
  //   if (result) {
  //     const email = await this.emailsService.welcome(user);

  //     return {
  //       message: 'validation successfull',
  //     };
  //   }
  // }

  async validateUser(email: string, pass: string) {
    try {
      const user1 = await this.prisma.user.findFirst({
        where: { emailAddress: email },
      });
      if (!user1) {
        throw new UnauthorizedException('Email/password incorrect');
      }
      const isMatch = await this.passwordsService.comparePassword(
        pass,
        user1.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException('Email/password incorrect');
      } else {
        const { password, ...user } = user1;
        return user;
      }
    } catch (ex) {
      throw ex;
    }
  }

  // async inactivate(id: string): Promise<void> {
  //   const user = await this.getById({ id });
  //   if (!user || !user.active) {
  //     throw new BadRequestException('Inactive user not found');
  //   }
  //   await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       active: false,
  //     },
  //   });
  // }
}

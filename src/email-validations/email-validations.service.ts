import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailValidation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailValidationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.EmailValidationCreateInput,
  ): Promise<EmailValidation> {
    return this.prisma.emailValidation.create({ data });
  }

  async verify(userId: string): Promise<EmailValidation> {
    const emailValidation = await this.prisma.emailValidation.findFirst({
      where: { userId: userId, active: true, type: 'passwordValidation' },
    });
    if (emailValidation) {
      return emailValidation;
    } else {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<EmailValidation> {
    const emailValidation = await this.prisma.emailValidation.delete({
      where: { id },
    });
    if (emailValidation) {
      return emailValidation;
    } else {
      throw new NotFoundException();
    }
  }

  async getById(
    input: Prisma.EmailValidationWhereUniqueInput,
  ): Promise<EmailValidation> {
    const emailValidation = await this.prisma.emailValidation.findUnique({
      where: input,
    });
    if (!emailValidation) throw new NotFoundException();
    return emailValidation;
  }

  async getAll(): Promise<EmailValidation[]> {
    return this.prisma.emailValidation.findMany({
      include: { user: true },
    });
  }

  async activate(id: string) {
    const emailValidation = await this.getById({ id });
    if (!emailValidation || emailValidation.active) {
      throw new BadRequestException('Active email validation not found');
    }
    const result = await this.prisma.emailValidation.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
    return result;
  }

  async inactivate(id: string): Promise<void> {
    const emailValidation = await this.getById({ id });
    if (!emailValidation || !emailValidation.active) {
      throw new BadRequestException('Inactive email validation not found');
    }
    await this.prisma.emailValidation.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}

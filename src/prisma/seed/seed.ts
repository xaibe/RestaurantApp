import { PasswordsService } from 'src/passwords/passwords.service';
import { Logger } from '@nestjs/common';
import {  PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
const logger: Logger = new Logger('Seed');

async function main() {
  
  await prisma.user.deleteMany();

  logger.log('Seeding...');
 const pass= 'Admin123!';


  const createdUser: User = await prisma.user.create({
    data: {
      userName: 'Admin',
    emailAddress: 'Admin@gmail.com',
    password: '$argon2id$v=19$m=4096,t=3,p=1$kkxLDbebPGmbP2/PHQKEBw$+NC8btbtJfOxMyorkciBGSYwL4klVplalZQo6DJ0tg0',
    roles:'Admin',
    },
  });
  

}

main()
  .catch(logger.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

import { Contact, RestaurantStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService,
    private restaurantsService: RestaurantsService) { }
  
  async create(contact: CreateContactDto,restaurantId) {
    const check = await this.restaurantsService.findOne(restaurantId);
    if (check.contact.length != 0) {
      throw new UnauthorizedException("Contact for this restaurant already exists");   
    } else {
      const result = await this.prisma.contact.create({
        data: {
          OwnerName: contact.OwnerName,     
          OwnerEmail :contact.OwnerEmail,
          OwnerPhone :contact.OwnerPhone,
          SecondaryContactName :contact.SecondaryContactName,
          SecondaryContactEmail :contact.SecondaryContactEmail,
          SecondaryContactPhone :contact.SecondaryContactPhone,
          RestaurantPhone   :contact.RestaurantPhone,
          restaurantId: restaurantId,
        },
      });
      console.log("result", result);

      return result;
    }
  }

  async findAll(): Promise<Contact[]> {
    return await this.prisma.contact.findMany({
      include: { 
      restaurant : true,},
    });
  }


async findOne(id) {
  console.log("id in get contact by id",id);
  const contact = await this.prisma.contact.findUnique({
    where: {id:id},
    include: { 
      restaurant : true,
               },
  });
  if (!contact) {
    throw new NotFoundException("contact with this id is not found");
  } else {
    return contact;
  }
}


async remove(id){
console.log("id in remove contact",id);

  const contact = await this.prisma.contact.delete({
    where: { id: id },
  });
  return contact;
}


  async update(id, contact: UpdateContactDto) {
    console.log("id in settings update", id);
    console.log("settings in setting update", contact);

    const restaurant = await this.restaurantsService.findOne(id);  
    
    console.log("setting id", restaurant.contact[0].id);
  const result = await this.prisma.contact.update({
      where:{id : restaurant.contact[0].id},
      data: {
        OwnerName: contact.OwnerName,     
        OwnerEmail :contact.OwnerEmail,
        OwnerPhone :contact.OwnerPhone,
        SecondaryContactName :contact.SecondaryContactName,
        SecondaryContactEmail :contact.SecondaryContactEmail,
        SecondaryContactPhone :contact.SecondaryContactPhone,
        RestaurantPhone   :contact.RestaurantPhone,
    },
  });
    console.log("result",result);
    
    return result;
  }
}

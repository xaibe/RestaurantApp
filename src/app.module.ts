import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrderingsModule } from './orderings/orderings.module';
import { OrdersModule } from './orders/orders.module';
import { SettingsModule } from './settings/settings.module';
import { LocationsModule } from './locations/locations.module';
import { ContactsModule } from './contacts/contacts.module';
import { SeoSettingsModule } from './seo-settings/seo-settings.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, RestaurantsModule, OrderingsModule, OrdersModule, SettingsModule, LocationsModule, ContactsModule, SeoSettingsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

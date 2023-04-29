import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';
import { ResponseClass } from './factory/response';
import { ProductModule } from './product/product.module';
import { TechModule } from './tech/tech.module';
import { ImportedSuppliesModule } from './imported-supplies/imported-supplies.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    EmailModule,
    CategoryModule,
    ProductModule,
    TechModule,
    ImportedSuppliesModule,
    OrderModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

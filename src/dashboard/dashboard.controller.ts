import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { DashboardService } from './dashboard.service';

// 1- Number of orders
// 2- Number of orders by month
// 3- Number of orders by user

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashbordServeice: DashboardService) {}

  // 1- Number of orders
  @Get('total-orders')
  getTotalNumOfOrders(@Query() query: any) {
    // console.log(query);
    return this.dashbordServeice.getTotalNumOfOrders(query);
  }

  //   // 2- Number of orders by month
  //   @Get('total-orders-month')
  //   getMonthOrders() {
  //     return this.dashbordServeice.getMonthOrders();
  //   }
  //   // 2- Number of orders by month
  //   @Get('total-orders-client')
  //   getClientOrders() {
  //     return this.dashbordServeice.getClientOrders();
  //   }
}

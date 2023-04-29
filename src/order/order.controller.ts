import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ReturnOrderDto } from './dtos/returnOrder.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles('admin', RolesEnum.Employee)
  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('id') uid: string,
  ) {
    return this.orderService.createOrder(uid, createOrderDto);
  }

  @Roles('admin', RolesEnum.Employee)
  @Post('return')
  returnOrder(@Body() returnOrderDto: ReturnOrderDto) {
    return this.orderService.returnOrder(returnOrderDto);
  }
}

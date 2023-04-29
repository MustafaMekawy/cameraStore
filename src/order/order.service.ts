import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { CRUD } from 'src/factory/crud.factory';
import { ErrorHandler } from 'src/factory/errorHandler';
import { ResponseClass } from 'src/factory/response';
import { Utils } from 'src/factory/utils';
import { ReturnOrderDto } from './dtos/returnOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  crud = new CRUD();
  error = new ErrorHandler();
  response = new ResponseClass();
  utils = new Utils();

  async createOrder(uid: string, createOrderDto: CreateOrderDto) {
    try {
      //   console.log(createOrderDto);
      const { id: clientId } = await this.crud.findOne(
        this.prisma.user,
        createOrderDto.clientId,
      );

      let totalPrice = 0;
      const productExists = (
        await Promise.all(
          createOrderDto.products.map(async (pid) => {
            const product = await this.prisma.product.findFirst({
              where: {
                id: pid,
                inStock: true,
              },
            });

            if (!product)
              this.error.createError(`this product isnot avalible ${pid}`, 404);
            totalPrice += product.price;
            return { id: product.id };
          }),
        )
      ).filter((res) => res != null);

      // console.log(productExists);
      // console.log(totalPrice);

      const returnDate = this.utils.returnDateCalculator(
        new Date(Date.now()),
        createOrderDto.duration,
      );
      console.log(new Date(returnDate.returnDate));

      const newOrder = await this.prisma.order.create({
        data: {
          date: new Date(Date.now()),
          clientId: clientId,
          duration: createOrderDto.duration,
          returnDate: new Date(returnDate.returnDate),
          products: {
            connect: productExists,
          },
          totalPrice: totalPrice,
          empId: uid,
        },
      });

      productExists.forEach(async (p) => {
        await this.crud.update(this.prisma.product, p.id, { inStock: false });
      });

      // console.log(newOrder.id);

      // let totalPrice = 0;
      // console.log(productExists);
      // const prices = productExists.map(async (p) => {
      //   const product = await this.prisma.product.update({
      //     where: { id: p.id },
      //     data: {
      //       orderId: newOrder.id,
      //       inStock: false,
      //     },
      //   });
      //   // console.log(product);

      //   return product.price;

      //   // totalPrice += product.price;
      // });
      // const price = await Promise.all(prices);
      // const totalPrice = price.reduce((partialSum, a) => partialSum + a, 0);
      // // console.log(totoalPrice);

      // const returnDate = this.utils.returnDateCalculator(
      //   new Date(Date.now()),
      //   createOrderDto.duration,
      // );
      // // console.log(totalPrice);
      // console.log(returnDate.returnDate);
      // const finalOrder = await this.prisma.order.update({
      //   where: {
      //     id: newOrder.id,
      //   },
      //   data: {
      //     totalPrice,
      //     returnDate: returnDate.returnDate,
      //   },
      // });
      return newOrder;
    } catch (err) {
      throw err;
    }
  }

  async returnOrder(returnOrderDto: ReturnOrderDto) {
    try {
      const orderExists = await this.prisma.order.findFirst({
        where: { id: returnOrderDto.orderId, status: true },
        include: { products: true },
      });

      if (!orderExists) throw this.error.createError('Wrong Order iD!', 400);
      console.log(orderExists.returnDate, new Date(Date.now()));

      if (new Date(orderExists.returnDate) >= new Date(Date.now())) {
        await this.crud.update(this.prisma.order, returnOrderDto.orderId, {
          status: false,
        });

        await this.resetProductState(orderExists.products);
        return orderExists;
      }

      const [cMonth, cDay, cYear, rMonth, rDay, rYear] = [
        new Date(Date.now()).getMonth(),
        new Date(Date.now()).getDate(),
        new Date(Date.now()).getFullYear(),
        new Date(orderExists.returnDate).getMonth(),
        new Date(orderExists.returnDate).getDate(),
        new Date(orderExists.returnDate).getFullYear(),
      ];

      console.log({ cMonth, cDay, cYear, rMonth, rDay, rYear });

      let delayPenalty = 0;

      if (Math.floor(cYear - rYear) > 0)
        delayPenalty += Math.floor(cYear - rYear) * 2000;
      if (Math.floor(cMonth - rMonth) > 0)
        delayPenalty += Math.floor(cMonth - rMonth) * 500;
      if (Math.floor(cDay - rDay) > 0)
        delayPenalty += Math.floor(cDay - rDay) * orderExists.totalPrice;

      const finalOrder = await this.crud.update(
        this.prisma.order,
        returnOrderDto.orderId,
        { totalPrice: orderExists.totalPrice + delayPenalty, status: false },
      );

      console.log(orderExists);
      await this.resetProductState(orderExists.products);

      return {
        ...finalOrder,
        orderPrice: finalOrder.totalPrice - delayPenalty,
        delayPenalty,
      };
    } catch (err) {
      throw err;
    }
  }

  async resetProductState(products) {
    await products.forEach(async (p) => {
      await this.crud.update(this.prisma.product, p.id, { inStock: true });
    });
  }
}
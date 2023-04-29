import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { ErrorHandler } from 'src/factory/errorHandler';
import { Filter } from 'src/factory/filter';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  response = new ResponseClass();
  crud = new CRUD();
  errorHandler = new ErrorHandler();
  filter = new Filter();

  async getTotalNumOfOrders(queryObj: object) {
    try {
      const queryParam = await this.filter.filter(queryObj);

      if (!queryParam)
        throw this.errorHandler.createError('Wrong filter!', 500);

      const key = Object.keys(queryObj)[0];
      let value: any = Object.values(queryObj)[0];
      let [year, month, day] = ['', '', ''];
      if (key === 'returnDate') {
        // value = new Date(value);
        // value = new Date(value).setHours(0, 0, 0, 0);
        value = new Date(value).setHours(0, 0, 0, 0);
        value = new Date(value);
        [year, month, day] = [
          value.getFullYear(),
          value.getMonth(),
          value.getDate(),
        ];
      }
      console.log(key, year, month, day);
      const totalNumOfOrders = await this.prisma.order.findMany({
        where: {
          [key]: new Date(+year, +month, +day + 1),
        },
      });

      return this.response.sendResponse('', totalNumOfOrders, 200);
    } catch (err) {
      throw err;
    }
  }

  //   async getMonthOrders() {
  //     try {
  //       const totalMonthOrder = await this.prisma.order.groupBy({
  //         by: ['returnDate'],
  //       });
  //       return this.response.sendResponse(
  //         '',
  //         { Total_Month_Orders: totalMonthOrder },
  //         200,
  //       );
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  //   async getClientOrders() {
  //     try {
  //       const totalClientOrder = await this.prisma.order.groupBy({
  //         by: ['clientId'],
  //       });
  //       return this.response.sendResponse(
  //         '',
  //         { Total_Month_Orders: totalClientOrder },
  //         200,
  //       );
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
}

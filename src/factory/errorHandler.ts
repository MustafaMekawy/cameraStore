import { HttpException } from '@nestjs/common';

export class ErrorHandler {
  constructor() {}
  createError(message: string, statusCode: number) {
    throw new HttpException(message, statusCode);
  }
}

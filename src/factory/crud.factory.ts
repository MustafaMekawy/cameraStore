import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorHandler } from './errorHandler';

export class CRUD {
  constructor() {}
  error = new ErrorHandler();

  async findAll(model: any) {
    try {
      const modelResult = await model.findMany();
      if (!modelResult || modelResult.length === 0)
        return { [modelResult.name + 's']: {} };

      if (model.name == 'User')
        modelResult.forEach((user: any) => delete user.password);

      return modelResult;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        throw new ForbiddenException('DB Error');
      throw err;
    }
  }

  async findOne(model: any, id: any) {
    try {
      const modelResult = await model.findUnique({
        where: { id },
      });

      if (!modelResult)
        throw this.error.createError(`Wrong ${model.name} ID: ${id}`, 404);

      delete modelResult.password;

      return modelResult;
    } catch (err) {
      throw err;
    }
  }

  // async create(model: any, createModelDto: any) {}

  async update(model: any, id: any, updateModelDto: any) {
    try {
      const mdoelResult = await model.update({
        where: { id },
        data: {
          ...updateModelDto,
        },
      });

      // console.log(mdoelResult);

      if (!mdoelResult)
        throw new NotFoundException(`Wrong ${model.name} ID: ${id}`);

      return mdoelResult;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw new ForbiddenException('DB Error!');
      throw err;
    }
  }

  async delete(model: any, id: number) {
    try {
      await model.delete({
        where: { id },
      });

      return { message: `${model.name} deleted sucessfully.` };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        throw new ForbiddenException(`DB Error`);
      throw err;
    }
  }
}

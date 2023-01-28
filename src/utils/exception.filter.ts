import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CannotCreateEntityIdMapError } from 'typeorm/error/CannotCreateEntityIdMapError';
import { GlobalResponseError } from './global.response.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = (exception as any).message.message;
    let code = 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).driverError.detail;
        code = (exception as any).code;
        break;
      case NotFoundException:
        status = (exception as NotFoundException).getStatus();
        message = ((exception as NotFoundException).getResponse() as any)
          .message;
        code = 'NotFoundException';
        break;
      case BadRequestException:
        status = (exception as BadRequestException).getStatus();
        message = ((exception as BadRequestException).getResponse() as any)
          .message;
        code = 'BadRequestException';
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).getResponse();
        break;
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}

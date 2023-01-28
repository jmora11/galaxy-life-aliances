import { Request } from 'express';

export const GlobalResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    code,
    statusCode: statusCode,
    message,
    timestamp: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
    }),
    method: request.method,
    path: request.url,
  };
};

export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

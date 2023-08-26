import { NextFunction, Request, Response } from "express";

export class ErrorHandle extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ErrorHandle {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ValidationError extends ErrorHandle {
  constructor(message: string) {
    super(message, 400);
  }
}

export default function errorHandler(err: ErrorHandle, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);

  const status = err.statusCode || 500;

  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
};
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class inForMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    next();
  }
}

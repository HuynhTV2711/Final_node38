import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   // console.log(context)
    const request = context.switchToHttp().getRequest();
    console.log("Request",request)
    if (request.user.role === 'user') {
      throw new HttpException(
        'User not enough Power to do this.',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}

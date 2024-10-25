import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(ctx: ExecutionContext, handler: CallHandler<any>) {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data);
      })
    );
  }
}

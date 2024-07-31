import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/schemas/user.schema';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.authUser;
  },
);

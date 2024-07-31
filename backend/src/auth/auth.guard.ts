import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';
import { WITHOUT_AUTH_KEY } from './decorators/without-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const withoutAuth = this.reflector.getAllAndOverride<boolean>(
      WITHOUT_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (withoutAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      request['authUser'] = await this.userService.findById(payload.userId);
      request['userId'] = payload.userId;
      request['authId'] = payload.authId;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request & { headers: { authorization: string } },
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

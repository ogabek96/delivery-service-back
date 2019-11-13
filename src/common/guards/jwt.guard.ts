import * as jwt from 'jsonwebtoken';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];

    try {
      const payload = request.headers.authorization.slice(7, request.headers.authorization.length);
      jwt.verify(payload, '123456', { ignoreExpiration: false });

      const user = (jwt.decode(payload) as any).user as User;
      if (roles.length !== 0 && !roles.includes(user.roleCode)) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

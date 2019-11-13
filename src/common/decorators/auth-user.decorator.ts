import * as jwt from 'jsonwebtoken';
import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const AuthUser = createParamDecorator((data, req) => {
  try {
    const payload = req.headers.authorization.slice(7, req.headers.authorization.length);
    const user = (jwt.decode(payload) as any).user as User;
    return user;
  } catch (e) {
    return null;
  }
});

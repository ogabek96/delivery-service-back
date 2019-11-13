import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { Bcrypt } from '../common/utils/bycrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  public async signIn(credentials) {
    const user = await this.userService.getByLogin(credentials.login);
    if (user) {
      if (await Bcrypt.compareHash(credentials.password, user.password)) {
        return {token: this.jwtSign(user)};
      } else {
        return {
          signIn: false,
          message: 'Login or password is incorrect',
        };
      }
    } else {
      return {
        signIn: false,
        message: 'Login or password is incorrect',
      };
    }
  }
  private jwtSign(userObj) {
    const newUserObj = Object.assign({}, userObj);
    delete newUserObj.password;
    return jwt.sign({user: newUserObj}, '123456', {expiresIn: '365d'});
  }
}

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService){}
  
  private jwtSign(userObj) {
    const newUserObj = Object.assign({}, userObj);
    delete newUserObj.password;
    return jwt.sign({user: newUserObj}, '123456', {expiresIn: '365d'});
  }
}

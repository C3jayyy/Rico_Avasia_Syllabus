import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  signin(dto: AuthDto) {
    // now you can access dto.email, dto.password
    return { msg: `Signed in user ${dto.email}` };
  }

  signup(dto: AuthDto) {
    return { msg: `Signed up user ${dto.email}` };
  }
}

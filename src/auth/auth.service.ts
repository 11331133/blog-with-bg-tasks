import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import User from 'src/user/domain/user.entity';
import { UserService } from 'src/user/domain/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const { user, hashcode } = await this.usersService.findByUsername(username);

    const credentialsAreCorrect = await bcrypt.compare(hashcode, password);
    return credentialsAreCorrect ? user : null;
  }

  async login(user: any) {
      const payload = { username: user.username, sub: user.id };

      return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: this.jwtService.sign(payload)
      }
  }
}

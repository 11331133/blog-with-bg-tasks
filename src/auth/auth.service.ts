import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { UserService } from 'src/user/domain/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findByEmail(email);

    const credentialsAreCorrect = await bcrypt.compare(password, user?.password || '');
    if (!credentialsAreCorrect)
      throw new GraphQLError('User credentials are incorrect');

    const payload = { username: user.nickname, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }
}

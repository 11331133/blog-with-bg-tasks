import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LoginInput, LoginPayload } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './auth.decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginPayload)
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('input') { email, password }: LoginInput,
  ): Promise<LoginPayload> {
    return await this.authService.login(email);
  }
}

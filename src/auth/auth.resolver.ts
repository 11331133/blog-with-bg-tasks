import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, LoginPayload } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginPayload)
  @Public()
  async login(
    @Args('input') { email, password }: LoginInput,
  ): Promise<LoginPayload> {
    return await this.authService.login(email, password);
  }
}

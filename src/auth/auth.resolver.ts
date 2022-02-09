import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginInput, LoginPayload } from "./auth.dto";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginPayload)
  @Public()
  async login(
    @Args("input") { email, password }: LoginInput,
  ): Promise<LoginPayload> {
    const user = this.authService.validateUser(email, password);

    if (!user) return null;

    return {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
    }
  }
}

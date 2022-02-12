import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorators';
import { UserService } from '../domain/user.service';
import { createUserInput } from './user.dto';
import { User } from './user.graphql-model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'User', nullable: true })
  async getUser(@Args('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') dto: createUserInput,
  ): Promise<User> {
    const profileId = await this.userService.createProfile(dto);

    return {
      id: profileId,
      nickname: dto.nickname,
      email: dto.email,
    };
  }
}

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorators';
import { UserService } from '../domain/user.service';
import { createUserInput } from './user.dto';
import { User } from './user.graphql-model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'User', nullable: true })
  async getUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return (await this.userService.findByIds([id])).shift();
  }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: createUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }
}

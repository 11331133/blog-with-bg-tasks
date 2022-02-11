import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorators';
import { UserService } from '../domain/user.service';
import { createUserInput } from './user.dto';
import { UserGraphQLModel } from './user.graphql-model';

@Resolver(() => UserGraphQLModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserGraphQLModel, { name: 'user', nullable: true })
  async getUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserGraphQLModel> {
    return (await this.userService.findByIds([id])).shift();
  }

  @Public()
  @Mutation(() => UserGraphQLModel)
  async createUser(
    @Args('input') createUserInput: createUserInput,
  ): Promise<UserGraphQLModel> {
    return await this.userService.create(createUserInput);
  }
}

import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from '../domain/user.service';
import { createUserGraphQLDTO } from './user.dto';
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

  @Mutation(() => UserGraphQLModel)
  async createUser(
    @Args('input') createUserDTO: createUserGraphQLDTO,
  ): Promise<UserGraphQLModel> {
    return await this.userService.create(createUserDTO);
  }
}

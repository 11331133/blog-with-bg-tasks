import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createUserInput {
  @Field({ nullable: false })
  nickname: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

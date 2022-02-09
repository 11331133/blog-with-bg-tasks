import { InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  email: string;
  password: string;
}

@ObjectType()
export class LoginPayload {
  accessToken: string;
  refreshToken: string;
}

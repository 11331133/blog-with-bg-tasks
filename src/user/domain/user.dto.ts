export abstract class createUserProfileDTO {
  nickname: string;
  email: string;
  password: string;
}

export abstract class editUserProfileDTO {
  nickname?: string;
  email?: string;
  password?: string;
}

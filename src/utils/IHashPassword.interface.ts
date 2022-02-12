export interface IHashPassword {
  (password: string): Promise<string>;
}

export class CreateUserDto {
  username: string;
  userId: string;
  password: string;
  profilePhoto?: string | null;
  age: number;
  gender: string;
  state: string;
}

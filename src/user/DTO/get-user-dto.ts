export class GetUserDTO {
  id: number;
  username: string;
  profilePhoto?: string | null;
  age: number;
  createAt: Date;
  gender: string;
  state: string;
}

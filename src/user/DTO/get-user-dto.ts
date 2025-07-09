export class GetUserDTO {
  id: string;
  username: string;
  profilePhoto?: string | null;
  age: number;
  createAt: Date;
  gender: string;
  state: string;
}

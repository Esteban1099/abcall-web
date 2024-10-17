export class User {
  email: string;
  password: string;
  role: string;
  token: string;

  public constructor(
    email: string,
    password: string,
    role: string,
    token: string
  ) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }
}

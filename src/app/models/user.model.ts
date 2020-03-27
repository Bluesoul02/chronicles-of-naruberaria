export class User {
  id: number;
  name: string;
  email: string;
  role: string[];
  accessToken: string;
  tokenType: string;
  expiresIn: number;

  constructor(id: number, name: string, email: string, role: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static parse(player: any) {
    return new User(player.user.id, player.user.name, player.user.email, player.user.role);
  }
}

import {User} from './user.model';

export class Player {
  id: number;
  name: string;
  totalPlayTime: string;
  bestScore: number;
  bio: string;
  avatar?: string;
  user: User;

  constructor(id: number, name: string, bestScore: number, totalPlayTime: string, bio: string, avatar: string, user: User) {
    this.id = id;
    this.name = name;
    this.totalPlayTime = totalPlayTime;
    this.bestScore = bestScore;
    this.bio = bio;
    this.avatar = avatar;
    this.user = user;
  }

  static parse(player: any) {
    const user = User.parse(player);
    console.log('User : ', user);
    return new Player(player.id, player.name, player.bestScore, player.totalPlayTime, player.bio, player.avatar, user);
  }
}


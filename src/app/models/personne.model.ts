import {User} from './user.model';

export class Personne {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  actif: boolean;
  cv: string;
  avatar?: string;
  user: User;

  constructor(id: number, nom: string, prenom: string, specialite: string, actif: boolean, cv: string, avatar: string, user: User) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.specialite = specialite;
    this.actif = actif;
    this.cv = cv;
    this.avatar = avatar;
    this.user = user;
  }

  static parse(personne: any) {
    const user = User.parse(personne);
    console.log('User : ', user);
    return new Personne(personne.id, personne.nom,
      personne.prenom, personne.specialite,
      personne.actif, personne.cv,
      personne.avatar, user);
  }
}


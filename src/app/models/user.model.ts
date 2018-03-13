export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?: boolean;
}

export class User {
  email: string;
  photoURL: string;
  roles: Roles;

  constructor(authData) {
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = { reader: true };
  }
}

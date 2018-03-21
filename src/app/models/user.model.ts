export interface Roles {
  admin: boolean;
}

export class User {
  email: string;
  photoURL: string;
  roles?: Roles;
  firstName?: string;
  lastName?: string;

  constructor(authData) {
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = {
      admin: false
    };
  }
}

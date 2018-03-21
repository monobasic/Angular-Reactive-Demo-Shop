export interface Roles {
  admin: boolean;
}

export class User {
  email: string;
  photoURL?: string;
  roles?: Roles;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;

  constructor(authData) {
    this.email = authData.email;
    // this.photoURL = authData.photoURL;
    this.firstName = authData.firstName ? authData.firstName : '';
    this.lastName = authData.lastName ? authData.lastName : '';
    this.roles = {
      admin: false
    };
  }
}

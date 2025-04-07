/**
 * User class
 * Represents a user in the application.
 */
export class User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  profile_picture?: string;

  constructor(
    firstname: string = '',
    lastname: string = '',
    username: string = '',
    email: string = '',
    password: string = '',
    profile_picture: string = 'assets/img/default-person.jpg'
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.profile_picture = profile_picture;
  }
}

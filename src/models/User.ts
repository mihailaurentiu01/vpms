class User {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  password: string;
  type: string = 'user';

  constructor(
    firstName: string,
    lastName: string,
    mobileNumber: number,
    password: string,
    type: string = 'user'
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNumber = mobileNumber;
    this.password = password;
    this.type = type;
  }
}

export default User;

class User {
  id?: string = '';
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

  setId(id: string) {
    this.id = id;
  }
}

export default User;

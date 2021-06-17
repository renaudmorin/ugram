export class UserDTO {
  id: string;
  profilePictureUrl: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;

  constructor(
    id: string,
    profilePictureUrl: string,
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    registrationDate: Date,
  ) {
    this.id = id;
    this.profilePictureUrl = profilePictureUrl;
    this.username = username;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.registrationDate = registrationDate;
  }
}

import { UserDTO } from 'src/DTO/user/UserDTO';
import { User } from './user.model';

export class UserPresenter {
  static toDTO(user: User) {
    return new UserDTO(
      user.id,
      user.profilePictureUrl,
      user.username,
      user.name,
      user.email,
      user.phoneNumber,
      user.registrationDate,
    );
  }
}

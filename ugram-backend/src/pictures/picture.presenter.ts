import { PictureDTO } from 'src/DTO/picture/PictureDTO';
import { Picture } from './picture.model';

export class PicturePresenter {
  static toDTO(picture: Picture) {
    return new PictureDTO(
      picture.id,
      picture.pictureUrl,
      picture.userId,
      picture.description,
      picture.hashtags,
      picture.mentions,
      picture.creationDate,
      picture.likes,
      picture.comments,
    );
  }
}

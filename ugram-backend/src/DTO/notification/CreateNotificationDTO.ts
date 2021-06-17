import {
  IsAlphanumeric,
  IsDateString,
  Length,
  IsBoolean,
} from 'class-validator';
import { IsNotEmptyOrWhitespace } from 'src/validators/CustomClassValidators';


export class CreateNotificationDTO {
  @IsAlphanumeric(undefined, {
    message: 'The pictureId should be a 24 character long alphanumeric value',
  })
  @Length(24, 24, {
    message: 'The pictureId should be a 24 character long alphanumeric value',
  })
  pictureId: string;

  @IsAlphanumeric(undefined, {
    message: 'The pictureOwnerId should be a 24 character long alphanumeric value',
  })
  @Length(24, 24, {
    message: 'The pictureOwnerId should be a 24 character long alphanumeric value',
  })
  pictureOwnerId: string;

  @IsNotEmptyOrWhitespace({
    message: 'The pictureLink should not be empty',
  })
  pictureLink: string;

  @IsNotEmptyOrWhitespace({
    message: 'The notificationUsername should contain at least one character',
  })
  notificationUsername: string;

  @IsDateString(undefined, { message: 'The provided creation date is invalid' })
  notificationDate: Date;

  @IsBoolean({ message: 'The provided notificationRead is invalid' })
  notificationRead: Boolean;

  notificationType: string;
}

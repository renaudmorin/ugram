import { IsNotEmptyOrWhitespace } from 'src/validators/CustomClassValidators';

export class AddCommentDTO {
  @IsNotEmptyOrWhitespace({
    message: 'The username should contain at least one character',
  })
  username: string;

  @IsNotEmptyOrWhitespace({
    message: 'The comment should contain at least one character',
  })
  comment: string;
}

import { IsNotEmptyOrWhitespace } from 'src/validators/CustomClassValidators';

export class RemoveReactionDTO {
  @IsNotEmptyOrWhitespace({
    message: 'The username should contain at least one character',
  })
  username: string;
}

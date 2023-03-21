import { CustomValidator } from './CustomValidator';
export class RequiredValidator extends CustomValidator<string>
{
  constructor() {
    super((value?: string) => value?.trim().length! > 0, "Поле обязательно"); 
  }
}
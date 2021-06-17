import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotEmptyOrWhitespace(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    const defaultErrorMessage =
      validationOptions?.message || validationOptions?.each
        ? `no value in ${propertyName} should be empty or whitespace(s)`
        : `${propertyName} should not be empty or whitespace(s)`;

    registerDecorator({
      name: 'isNotEmptyOrWhitespace',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: validationOptions?.message ?? defaultErrorMessage,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
}

export function IsStringArrayUniqueValues(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const defaultErrorMessage = `Each value of in ${propertyName} should be string and unique.`;

    registerDecorator({
      name: 'IsStringArrayUniqueValues',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: validationOptions?.message ?? defaultErrorMessage,
      },
      validator: {
        validate(value: any) {
          if (Array.isArray(value)) {
            if (!value.every((v) => typeof v === 'string')) {
              return false;
            }
            const distinctValues = new Set<string>(
              value.map((v) => v.toLowerCase()),
            );
            return distinctValues.size === value.length;
          }
          return false;
        },
      },
    });
  };
}

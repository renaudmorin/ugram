export class Filter {
  static toCaseInsensitiveRegExp(
    filter: string,
    matchOptions?: RegexMathOptions,
  ): RegExp {
    const safeFilterString = filter?.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    if (!safeFilterString || safeFilterString.length === 0) {
      return undefined;
    }

    let regexString = safeFilterString;
    if (matchOptions?.exact) {
      regexString = `^${regexString}$`;
    } else if (matchOptions?.startsWith) {
      regexString = `^${regexString}`;
    }

    const regex = new RegExp(regexString, 'i');
    return regex;
  }
}

export interface RegexMathOptions {
  exact?: boolean;
  startsWith?: boolean;
}

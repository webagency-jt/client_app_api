
export class TypeguardUtils {
  static isString(object: unknown): object is string {
    return typeof object === 'string';
  }

  static isUndefined(object: unknown): object is undefined {
    return typeof object === 'undefined';
  }
}

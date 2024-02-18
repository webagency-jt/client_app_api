
export class TypeguardUtils {
  static isString(object: unknown): object is string {
    return typeof object === 'string';
  }
}

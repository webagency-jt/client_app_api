
export class TypeguardUtils {
  static isStringGuard(object: unknown): object is string {
    return typeof object === 'string';
  }
}

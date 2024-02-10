
export type ErrorReturn = {
  message: string,
  httpCode: number,
  detail?: any,
};

export function isErrorReturnGuard(object: any): object is ErrorReturn {
  return typeof object == 'object' && object?.message && object?.httpCode;
}

export class HttpErrors extends Error {
  constructor(msg: string, public httpCode: number) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpErrors.prototype);
  }

  public getError(): ErrorReturn {
    return {
      message: this.message,
      httpCode: this.httpCode,
    };
  }
}

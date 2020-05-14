export interface Constructor {
  new (...args: any[]): any;
}

export interface IErrorSpec {
  ctor?: Constructor;
  message?: string;
}

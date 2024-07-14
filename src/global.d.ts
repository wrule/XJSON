
declare global {
  interface JSON {
    decycle(value: any): any;
    retrocycle(value: any): any;
    _decycle(value: any): any;
    _retrocycle(value: any): any;
  }
}

export { };

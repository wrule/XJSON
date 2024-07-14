
declare global {
  interface JSON {
    decycle(value: any): any;
    retrocycle(value: any): any;
  }
}

export { };

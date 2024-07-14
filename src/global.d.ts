
declare global {
  interface JSON {
    decycle(value: any, replacer?: (value: any) => any): any;
    retrocycle(value: any): any;
  }
}

export { };

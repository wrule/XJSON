
declare global {
  interface JSON {
    decycle(value: any, replacer?: (value: any) => any): any;
    retrocycle(value: any): any;
    xjson(value: any): any;
    xstringify(...args: Parameters<typeof JSON.stringify>);
  }
}

export { };

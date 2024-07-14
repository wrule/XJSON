
declare global {
  interface JSON {
    decycle(value: any, replacer?: (value: any) => any): any;
    retrocycle(value: any): any;
    xjson(object: any, replacer?: (value: any) => any): any;
    xjson_de(object: any, replacer?: (value: any) => any): any;
    xstringify(...args: Parameters<typeof JSON.stringify>): ReturnType<typeof JSON.stringify>;
    xparse(...args: Parameters<typeof JSON.parse>): ReturnType<typeof JSON.parse>;
  }
}

export { };

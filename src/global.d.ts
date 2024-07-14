
declare global {
  interface JSON {
    decycle(value: any, replacer?: (value: any) => any): any;
    retrocycle(value: any): any;
    xjson(value: any): any;
    xjson_de(value: any): any;
    xstringify(...args: Parameters<typeof JSON.stringify>);
    xparse(...args: Parameters<typeof JSON.parse>);
  }
}

export { };

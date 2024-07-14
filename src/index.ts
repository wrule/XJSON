import './JSON-js/cycle_ext';
import { mapping_forward, mapping_reverse, traverse, xjson_decycle } from './mapping';

JSON.xjson = (object: any, replacer?: (value: any) => any) => {
  return JSON.decycle(object, (value) => {
    const result = mapping_forward(value);
    return replacer ? replacer(result) : result;
  });
};

JSON.xjson_de = (object: any, replacer?: (value: any) => any) => {
  const prototype = Object.prototype.toString.call(object);
  if (prototype === '[object Object]' || prototype === '[object Array]') {
    if (!object[xjson_decycle]) return object;
    return JSON.retrocycle(traverse(object, (value) => {
      const result = mapping_reverse(value);
      return replacer ? replacer(result) : result;
    }));
  }
  const result = mapping_reverse(object);
  return replacer ? replacer(result) : result;
};

JSON.xstringify = (...args) => {
  return JSON.stringify(JSON.xjson(args[0]), args[1], args[2] ?? 2);
};

export
function hello() {
  let a: any[] = [1, 2, 3, NaN, new Date(), Symbol('sssd'), Buffer.from('1234', 'utf8')];
  a[10] = a;
  console.log(JSON.xjson_de(JSON.xjson(a)));
}

import './cycle.js';
import { xjson_decycle } from '../mapping';

const _JSON: any = JSON;

_JSON._decycle = JSON.decycle;
JSON.decycle = (value: any, replacer?: (value: any) => any) => {
  const prototype = Object.prototype.toString.call(value);
  if (prototype === '[object Object]' || prototype === '[object Array]') {
    let result = _JSON._decycle(value, replacer);
    if (prototype === '[object Array]') result = { result };
    result[xjson_decycle] = prototype;
    return result;
  }
  return replacer ? replacer(value) : value;
};

_JSON._retrocycle = JSON.retrocycle;
JSON.retrocycle = (value: any) => {
  const prototype = Object.prototype.toString.call(value);
  if (prototype === '[object Object]' || prototype === '[object Array]') {
    if (!value[xjson_decycle]) throw 'not a cycle object';
    const result = _JSON._retrocycle(value);
    delete result[xjson_decycle];
    return result;
  }
  return value;
};

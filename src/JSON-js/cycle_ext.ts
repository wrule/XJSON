import './cycle.js';
import { xjson_decycle } from '../index';

const _JSON: any = JSON;

_JSON._decycle = JSON.decycle;
JSON.decycle = (value: any, replacer?: (value: any) => any) => {
  const protoType = Object.prototype.toString.call(value);
  if (protoType === '[object Object]' || protoType === '[object Array]') {
    const result = _JSON._decycle(value, replacer);
    result[xjson_decycle] = true;
    return result;
  }
  return value;
};

_JSON._retrocycle = JSON.retrocycle;
JSON.retrocycle = (value: any) => {
  const protoType = Object.prototype.toString.call(value);
  if (protoType === '[object Object]' || protoType === '[object Array]') {
    if (!value[xjson_decycle]) return value;
    const result = _JSON._retrocycle(value);
    delete result[xjson_decycle];
    return result;
  }
  return value;
};

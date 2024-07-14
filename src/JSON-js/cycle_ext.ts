import './cycle.js';
import { xjson_decycle } from '../index';

JSON._decycle = JSON.decycle;
JSON.decycle = (value: any) => {
  const protoType = Object.prototype.toString.call(value);
  if (protoType === '[object Object]' || protoType === '[object Array]') {
    const result = JSON._decycle(value);
    result[xjson_decycle] = true;
    return result;
  }
  return value;
};

JSON._retrocycle = JSON.retrocycle;
JSON.retrocycle = (value: any) => {
  const protoType = Object.prototype.toString.call(value);
  if (protoType === '[object Object]' || protoType === '[object Array]') {
    if (!value[xjson_decycle]) return value;
    const result = JSON._retrocycle(value);
    delete result[xjson_decycle];
    return result;
  }
  return value;
};

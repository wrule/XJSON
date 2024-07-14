import dayjs from 'dayjs';

export const magicNum = 'xjson-28df8c4d-';
export const xjson_decycle = `${magicNum}decycle`;
export const xjson_undefined = `${magicNum}undefined`;
export const xjson_Infinity = `${magicNum}Infinity`;
export const xjson_NInfinity = `${magicNum}NInfinity`;
export const xjson_NaN = `${magicNum}NaN`;
export const xjson_Date = `${magicNum}Date-`;
export const xjson_Symbol = `${magicNum}Symbol`;
export const xjson_BigInt = `${magicNum}BigInt-`;
export const xjson_Buffer = `${magicNum}Buffer-@data:application/octet-stream;base64,`;

export
function mapping_forward(value: any) {
  const protoType = Object.prototype.toString.call(value);
  if (value === undefined) return xjson_undefined;
  if (value === Infinity) return xjson_Infinity;
  if (value === -Infinity) return xjson_NInfinity;
  if (Number.isNaN(value)) return xjson_NaN;
  if (protoType === '[object Date]')
    return `${xjson_Date}${dayjs(value).format('YYYY-MM-DD HH:mm:ss.SSS')}`;
  if (protoType === '[object Symbol]')
    return `${xjson_Symbol}${value.description === undefined ? '' : `-${value.description}`}`;
  if (protoType === '[object BigInt]')
    return `${xjson_BigInt}${value.toString()}`;
  if (Buffer.isBuffer(value))
    return `${xjson_Buffer}${value.toString('base64')}`;
  if (protoType === '[object Function]')
    return value.toString();
  return value;
}

export
function mapping_reverse(value: any) {
  if (typeof value === 'string' && value.startsWith(magicNum)) {
    if (value === xjson_undefined) return undefined;
    if (value === xjson_Infinity) return Infinity;
    if (value === xjson_NInfinity) return -Infinity;
    if (value === xjson_NaN) return NaN;
    if (value.startsWith(xjson_Date))
      return dayjs(value.slice(xjson_Date.length)).toDate();
    if (value.startsWith(xjson_Symbol)) {
      const description = value.slice(xjson_Symbol.length);
      if (description.startsWith('-')) return Symbol(description.slice(1));
      else return Symbol();
    }
    if (value.startsWith(xjson_BigInt))
      return BigInt(value.slice(xjson_BigInt.length));
    if (value.startsWith(xjson_Buffer))
      return Buffer.from(value.slice(xjson_Buffer.length), 'base64');
  }
  return value;
}

export
function traverse(object: any, mapping: (value: any) => any) {
  const prototype = Object.prototype.toString.call(object);
  if (prototype === '[object Object]')
    Object.keys(object).forEach((key) => object[key] = traverse(object[key], mapping));
  if (prototype === '[object Array]')
    (object as any[]).forEach((item, index) => object[index] = traverse(item, mapping));
  return mapping(object);
}

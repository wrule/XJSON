import dayjs from 'dayjs';

export const magicNum = 'xjson-28df8c4d-';
export const xjson_undefined = `${magicNum}undefined`;
export const xjson_Infinity = `${magicNum}Infinity`;
export const xjson_NInfinity = `${magicNum}NInfinity`;
export const xjson_NaN = `${magicNum}NaN`;
export const xjson_Date = `${magicNum}Date-`;
export const xjson_Buffer = `${magicNum}Buffer-`;

export
function stringify(value: any) {
  return JSON.stringify(value, function (key) {
    value = this[key];
    if (value === undefined) return xjson_undefined;
    if (value === Infinity) return xjson_Infinity;
    if (value === -Infinity) return xjson_NInfinity;
    if (Number.isNaN(value)) return xjson_NaN;
    if (Object.prototype.toString.call(value) === '[object Date]')
      return `${xjson_Date}${dayjs(value).format('YYYY-MM-DD HH:mm:ss.SSS')}`;
    if (Buffer.isBuffer(value))
      return `${xjson_Buffer}${value.toString('base64url')}`;
    return value;
  }, 2);
}

export
function parse(text: string) {
  return JSON.parse(text, function (_, value) {
    if (typeof value === 'string' && value.startsWith(magicNum)) {
      if (value === xjson_undefined) return xjson_undefined;
      if (value === xjson_Infinity) return Infinity;
      if (value === xjson_NInfinity) return -Infinity;
      if (value === xjson_NaN) return NaN;
      if (value.startsWith(xjson_Date))
        return dayjs(value.slice(xjson_Date.length)).toDate();
      if (value.startsWith(xjson_Buffer))
        return Buffer.from(value.slice(xjson_Buffer.length), 'base64url');
    }
    return value;
  });
}

export
class XJSON {
  public stringify(value: any) {
    return stringify(value);
  }

  public parse(text: string) {
    return parse(text);
  }
}

const _XJSON = new XJSON();
export default _XJSON;

export
function hello() {
  const a = {
    a: 1,
    oo: Infinity,
    op: -Infinity,
    nan: NaN,
    k: undefined,
    c: Buffer.from('1234', 'utf8'),
    d: {
      p: Buffer.from('0000', 'utf8'),
    },
    i: new Date(),
  };
  console.log(a);
  const b = _XJSON.stringify(a);
  console.log(b);
  const c = _XJSON.parse(b);
  console.log(c);
}

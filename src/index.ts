import dayjs from 'dayjs';

export const magicNum = 'xjson-28df8c4d-';
export const xjson_undefined = `${magicNum}undefined`;
export const xjson_Infinity = `${magicNum}Infinity`;
export const xjson_NInfinity = `${magicNum}NInfinity`;
export const xjson_NaN = `${magicNum}NaN`;
export const xjson_Date = `${magicNum}Date-`;
export const xjson_Symbol = `${magicNum}Symbol`;
export const xjson_BigInt = `${magicNum}BigInt-`;
export const xjson_Buffer = `${magicNum}Buffer-@data:application/octet-stream;base64,`;
export const xjson_Circular = `${magicNum}Circular`;

export
function stringify(
  value: any,
  replacer?: (key: string, value: any) => any,
) {
  const cache = new WeakSet<any>();
  return JSON.stringify(value, function (key) {
    value = this[key];
    let result = value;
    const protoType = Object.prototype.toString.call(value);
    if (protoType === '[object Object]' || protoType === '[object Array]') {
      if (cache.has(value)) result = xjson_Circular;
      else cache.add(value);
    }
    if (value === undefined) result = xjson_undefined;
    if (value === Infinity) result = xjson_Infinity;
    if (value === -Infinity) result = xjson_NInfinity;
    if (Number.isNaN(value)) result = xjson_NaN;
    if (protoType === '[object Date]')
      result = `${xjson_Date}${dayjs(value).format('YYYY-MM-DD HH:mm:ss.SSS')}`;
    if (protoType === '[object Symbol]')
      result = `${xjson_Symbol}${value.description === undefined ? '' : `-${value.description}`}`;
    if (protoType === '[object BigInt]')
      result = `${xjson_BigInt}${value.toString()}`;
    if (Buffer.isBuffer(value))
      result = `${xjson_Buffer}${value.toString('base64')}`;
    if (protoType === '[object Function]')
      result = value.toString();
    return replacer ? replacer(key, result) : result;
  }, 2);
}

export
function traverse(value: any, map: (item: any) => any) {
  const protoType = Object.prototype.toString.call(value);
  if (protoType === '[object Object]')
    Object.keys(value).forEach((key) => value[key] = traverse(value[key], map));
  if (protoType === '[object Array]')
    (value as any[]).forEach((item, index) => value[index] = traverse(item, map));
  return map(value);
}

export
function xjsonization(
  object: any,
  replacer?: (value: any) => any,
) {
  const cache = new WeakSet<any>();
  return traverse(object, (value) => {
    let result = value;
    const protoType = Object.prototype.toString.call(value);
    if (protoType === '[object Object]' || protoType === '[object Array]') {
      if (cache.has(value)) result = xjson_Circular;
      else cache.add(value);
    }
    if (value === undefined) result = xjson_undefined;
    if (value === Infinity) result = xjson_Infinity;
    if (value === -Infinity) result = xjson_NInfinity;
    if (Number.isNaN(value)) result = xjson_NaN;
    if (protoType === '[object Date]')
      result = `${xjson_Date}${dayjs(value).format('YYYY-MM-DD HH:mm:ss.SSS')}`;
    if (protoType === '[object Symbol]')
      result = `${xjson_Symbol}${value.description === undefined ? '' : `-${value.description}`}`;
    if (protoType === '[object BigInt]')
      result = `${xjson_BigInt}${value.toString()}`;
    if (Buffer.isBuffer(value))
      result = `${xjson_Buffer}${value.toString('base64')}`;
    if (protoType === '[object Function]')
      result = value.toString();
    return replacer ? replacer(result) : result;
  });
}

export
function replace(value: any) {
  return traverse(value, (item) => {
    if (item === xjson_undefined) return undefined;
    return item;
  });
}

export
function parse(text: string) {
  return replace(JSON.parse(text, function (_, value) {
    if (typeof value === 'string' && value.startsWith(magicNum)) {
      if (value === xjson_undefined) return xjson_undefined;
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
  }));
}

export
class _XJSON {
  public stringify(
    value: any,
    replacer?: (key: string, value: any) => any,
  ) {
    return stringify(value, replacer);
  }

  public parse(text: string) {
    return parse(text);
  }
}

const XJSON = new _XJSON();
export default XJSON;

export
function hello() {
  const sub: any = {
    text: '1234',
  };
  const bint2: bigint = 1213423423425997282836534328291837374394412345n;
  const a: any = {
    bint2,
    a: 1,
    oo: Infinity,
    op: -Infinity,
    nan: NaN,
    k: undefined,
    c: Buffer.from('1234', 'utf8'),
    d: {
      p: Buffer.from('0000你好，世界我的宝宝！！！😄', 'utf8'),
    },
    i: new Date(),
    pp: Symbol(''),
  };
  a.loop = a;
  sub.a = a.d;
  const kka = () => {
    const a = 1+2;
    return 'sdf' + a;
  };
  a.func = kka;
  sub.kk = a;
  a.sub = sub;
  console.log(a);
  const b = XJSON.stringify(a, (_, value) => {
    if (typeof value === 'string') {
      if (value.length > 100) {
        console.log(value);
        return 'xxxxxx';
      }
    }
    return value;
  });
  console.log(b);
  const c = XJSON.parse(b);
  console.log(c);

  // console.log(kka.toString());
  // console.log(bint.toString());
}

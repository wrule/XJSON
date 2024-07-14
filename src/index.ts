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
    if (!object[xjson_decycle]) throw 'not a xjson object';
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

JSON.xparse = (...args) => {
  const result = JSON.parse(...args);
  return JSON.xjson_de(result);
};

export
function hello() {
  let a: any[] = [
    1, 2, 3,
    undefined, null, NaN, Symbol(),
    {
      n1: Infinity,
      n2: -Infinity,
      text: 'nihao',
      emoji: '😄这是一个表情',
      array: [1, null, ''],
      now: new Date(),
      bint: BigInt('2828172555111129938002282711233883141526'),
      json: '{"a": ""}',
      func: () => { console.log(Symbol('sm')); },
    },
    Buffer.from('1234', 'utf8'),
  ];
  a[10] = { a };
  a[7].array[3] = a[7];
  console.log(1, a);
  console.log(2, JSON.xjson(a));
  const text = JSON.xstringify(a);
  console.log(3, text);
  const data = JSON.xparse(text);
  console.log(4, data);
}

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
  console.log(JSON.xjson(a));
  console.log(JSON.xjson(undefined));
  // // const a: any = { a: 1, b: 123 };
  // // a.c = a;
  // // a.d.e.y = a.d;
  // // console.log(a);
  // // const b = JSON.decycle(a);
  // // console.log(b);
  // // console.log(b.d.e.y);
  // console.log(a);
  // const c = JSON.decycle(JSON.decycle(a), (value) => {
  //   console.log(1111, value);
  //   return value;
  // });
  // const d = JSON.retrocycle(JSON.retrocycle(c));
  // // const c = JSON.retrocycle(JSON.retrocycle(JSON.retrocycle(a)));
  // console.log(d);
  // console.log(Object.prototype.toString.call(Buffer.from('234', 'utf8')));
  // console.log(JSON.decycle(2));
  // console.log(JSON.retrocycle(3));

  // const sub: any = {
  //   text: '1234',
  // };
  // const bint2: bigint = 1213423423425997282836534328291837374394412345n;
  // const a: any = {
  //   bint2,
  //   a: 1,
  //   oo: Infinity,
  //   op: -Infinity,
  //   nan: NaN,
  //   k: undefined,
  //   c: Buffer.from('1234', 'utf8'),
  //   d: {
  //     p: Buffer.from('0000你好，世界我的宝宝！！！😄', 'utf8'),
  //   },
  //   i: new Date(),
  //   pp: Symbol(''),
  // };
  // a.loop = a;
  // sub.a = a.d;
  // const kka = () => {
  //   const a = 1+2;
  //   return 'sdf' + a;
  // };
  // a.func = kka;
  // sub.kk = a;
  // a.sub = sub;
  // console.log(a);
  // const b = XJSON.stringify(a, (_, value) => {
  //   // if (typeof value === 'string') {
  //   //   if (value.length > 100) {
  //   //     console.log(value);
  //   //     return 'xxxxxx';
  //   //   }
  //   // }
  //   return value;
  // });
  // console.log(b);
  // const c = XJSON.parse(b);
  // console.log(c);
  // const ui: any = {
  //   a: 1,
  // };
  // ui.ui = ui;
  // console.log(xjsonization(ui));

  // console.log(kka.toString());
  // console.log(bint.toString());
}

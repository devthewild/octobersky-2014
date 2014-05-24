/**
 * The sample usage of ECMA 5 Mozilla Features Implemented in V8
 * https://github.com/joyent/node/wiki/ECMA-5-Mozilla-Features-Implemented-in-V8
 * You can use thease new feature of ECMA5 on Node.js as you like.
 * because there is no IE :)
 * Order is deferent form original wiki.
 * Sources are Checked on Node.js v0.5.0(unstable), v0.4.9(stable)
 *
 * you can execute this file.
 * $ node ecma5_on_v8.js
 *
 * @author Jxck
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License).
 */

// console.log is tooooooo long :(
var log = console.log;


log('---- Object -----');

var obj = {
  _str: 'default',
  get str() { // getter
    return this._str + '!';
  },
  set str(val) { // setter
    this._str = val.trim();
  }
};
log(obj.str); // "default!"
obj.str = ' asdf ';
log(obj.str); // "asdf!"


log('---- Object.defineProperty(obj, prop, desc) ----');

var obj = {};
Object.defineProperty(obj, 'num', {
  value: 10,
  writable: false,
  enumerable: false,
  configurable: false
});
log(obj.num); // 10
for (var i in obj) {
  log(i); // not display
}
obj.num = 20;
log(obj.num); // still 10


log('---- Object.defineProperties(obj, props) ----');

var obj = {};
Object.defineProperties(obj, {
  num: {
    value: 4,
    writable: false,
    enumerable: false,
    configurable: false
  },
  root: {
    get: function() {
      return Math.pow(this.num, 0.5);
    }
  }
});
log(obj.num); // 4
log(obj.root); // 2


log('---- Object.create(proto, props) ----');

// extends x, y
var obj = Object.create({x: 10, y: 20});
log(obj.x); // 10
log(obj.y); // 20

var obj = Object.create(null);
log(obj); // not extend anything

var obj = Object.create(Object.prototype);
log(obj); // same as {} , new Object()

var obj = Object.create({x: 10, y: 20}, {
  z: {
    value: 30,
    writable: true
  },
  sum: {
    get: function() {
      return this.x + this.y + this.z;
    }
  }
});
log(obj.x); // 10
log(obj.y); // 20
log(obj.z); // 30
log(obj.sum); // 60


log('---- Object.keys(obj) ----');

function o() {
  this.a = 1;
}
log(Object.keys(new o())); // [ 'a' ]
function p() {
  this.b = 2;
}
p.prototype = new o();
log(Object.keys(new p())); // [ 'b' ]


var obj = Object.create({a: 10, b: 20}, {
  x: {
    value: 30,
    enumerable: true
  },
  y: {
    value: 40,
    enumerable: false
  }
});
log(Object.keys(obj)); // [ 'x' ]


log('---- Object.getOwnPropertyNames(obj) ----');

var obj = Object.create({a: 10, b: 20}, {
  x: {
    value: 30,
    enumerable: true
  },
  y: {
    value: 40,
    enumerable: false
  }
});
log(Object.getOwnPropertyNames(obj)); // [ 'y', 'x' ]


log('---- Object.getPrototypeOf(obj) ----');

var obj = Object.create({a: 10, b: 20}, {
  x: {
    value: 30,
    enumerable: true
  },
  y: {
    value: 40,
    enumerable: false
  }
});
log(Object.getPrototypeOf(obj)); // { a: 10, b: 20 }


log('---- Object.getOwnPropertyDescriptor(obj, property) ----');

var obj = Object.create({a: 10, b: 20}, {
  x: {
    value: 30,
    enumerable: true
  },
  y: {
    value: 40,
    enumerable: false
  }
});
log(Object.getOwnPropertyDescriptor(obj, 'x'));
// { value: 30,
//   writable: false,
//   enumerable: true,
//   configurable: false }


log('---- Object.preventExtensions(obj) ----');

var obj = {a: 10, b: 20};
Object.preventExtensions(obj);
// obj.x = 30; // TypeError: Can't add property x, object is not extensible


log('---- Object.isExtensible(obj) ----');

var obj = {a: 10, b: 20};
log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
log(Object.isExtensible(obj)); // false


log('---- Object.seal(obj) ----');

var obj = {a: 10, b: 20};
Object.seal(obj);
obj.a = 30;
log(obj.a); // 30
// obj.x = 30; // TypeError: Can't add property x, object is not extensible


log('---- Object.isSealed(obj) ----');

var obj = {a: 10, b: 20};
Object.seal(obj);
log(Object.isSealed(obj)); // true


log('---- Object.freeze(obj) ----');

var obj = {a: 10, b: 20};
Object.freeze(obj);
obj.a = 30;
log(obj.a); // 10


log('---- Object.isFrozen(obj) ----');

var obj = {a: 10, b: 20};
Object.freeze(obj);
log(Object.isFrozen(obj)); // true


log('---- isPrototypeOf(obj) ----');

var proto = {a: 10, b: 20};
var obj = Object.create(proto);
log(proto.isPrototypeOf(obj)); // true


log('---- bind(thisArg[, arg1[, argN]]) ----');

var f = function() {
  return this.a + this.b;
};
log(f()); // NaN
var g = f.bind({ a: 10, b: 20 });
log(g()); // 30


var f = function(c) {
  return this.a + this.b + c;
};
log(f()); // NaN
var g = f.bind({ a: 10, b: 20 }, 30);
log(g()); // 60


var f = function(c, d) {
  return this.a + this.b + c + d;
};
log(f()); // NaN
var g = f.bind({ a: 10, b: 20 }, 30);
log(g(40)); // 100


log('---- JSON.stringify(obj [, replacer [, space]]) ----');

log(JSON.stringify({ a: 1 }));

log(JSON.stringify([1, 2, 3], function replacer(key, value) {
  if (!Array.isArray(value)) {
    return value;
  }
  var len = value.length;
  var result = { length: len };
  for (var i = 0; i < len; ++i) {
    result[i] = value[i];
  }
  return result;
}));

log(JSON.stringify({ a: 1, b: 2}, null, 2));
log(JSON.stringify({ a: 1, b: 2}, null, 4));
log(JSON.stringify({ a: 1, b: 2}, null, '\t'));

log('---- JSON.parse(string) ----');

var s = JSON.stringify({ a: 1, b: 0 });
log(JSON.parse(s));

log(
JSON.parse(s, function(key, value) {
  if (value === 0)
    value = false;
  else if (value === 1) {
    value = true;
  }
  return value;
})
);

log('---- trim(), trimRight(), trimLeft() ----');

log(' abc '.trim());
log(' abc '.trimRight());
log(' abc '.trimLeft());


log('---- Array.isArray(array) ----');

log(Array.isArray([]));


log('---- indexOf(value) ----');

log(([1, 2, 2, 3]).indexOf(2));


log('---- lastIndexOf(value) ----');

log(([1, 2, 2, 3]).lastIndexOf(2));


log('---- filter(callback) ----');

log(
([1, 2, 3, 4]).filter(function(x) {
  return x > 2;
})
);


log('---- forEach(callback) ----');

([1, 2, 3]).forEach(function(x) {
  log(x * 2);
});


log('---- every(callback) ----');

log(
([1, 2, 3]).every(function(x) {
  return x > 0;
})
);

log(
([1, 2, 3]).every(function(x) {
  return x > 1;
})
);


log('---- some(callback) ----');

log(
([1, 2, 3]).some(function(x) {
  return x > 2;
})
);

log(
([1, 2, 3]).some(function(x) {
  return x > 3;
})
);


log('---- map(callback) ----');

log(
([1, 2, 3]).map(function(x) {
  return x * 2;
})
);


log('---- reduce(callback[, initialValue]) ----');

log(
(['a', 'b', 'c']).reduce(function(x, y) {
  return x + y;
})
);

log(
(['a', 'b', 'c']).reduce(function(x, y) {
  return x + y;
}, '*')
);


log('---- reduceRight(callback[, initialValue]) ----');

log(
(['a', 'b', 'c']).reduceRight(function(x, y) {
  return x + y;
})
);

log(
(['a', 'b', 'c']).reduceRight(function(x, y) {
  return x + y;
}, '*')
);


log('---- Date.now() ----');

log(Date.now());


log('---- toISOString() ----');

log((new Date()).toISOString());

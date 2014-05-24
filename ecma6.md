# ES6
    $ node -v
    v0.10.28
    $ node --v8-options | grep harm
    --harmony_typeof (enable harmony semantics for typeof)
    --harmony_scoping (enable harmony block scoping)
    --harmony_modules (enable harmony modules (implies block scoping))
    --harmony_proxies (enable harmony proxies)
    --harmony_collections (enable harmony collections (sets, maps, and weak maps))
    --harmony (enable all harmony features (except typeof))

---

    $ node -v
    v0.11.13
    $ node --v8-options | grep harm
    --harmony_typeof (enable harmony semantics for typeof)
    --harmony_scoping (enable harmony block scoping)
    --harmony_modules (enable harmony modules (implies block scoping))
    --harmony_symbols (enable harmony symbols (a.k.a. private names))
    --harmony_proxies (enable harmony proxies)
    --harmony_collections (enable harmony collections (sets, maps))
    --harmony_generators (enable harmony generators)
    --harmony_iteration (enable harmony iteration (for-of))
    --harmony_numeric_literals (enable harmony numeric literals (0o77, 0b11))
    --harmony_strings (enable harmony string)
    --harmony_arrays (enable harmony arrays)
    --harmony_maths (enable harmony math functions)
    --harmony (enable all harmony features (except typeof))

diff > 
    Symbol, Generator, Iteration, Numeric Literal, String, Arrray, Math

# TypeOf (--harmony_typeof)

``` JavaScript```
// ES5
var ret = getObject();
var success = ret && typeof ret === "object";
```

``` JavaScript
// ES6
var ret = getObject();
var success = typeof ret === "object";
```

---

``` bash
$ node -e "console.log(typeof null)"
object
$ node --harmony_typeof -e "console.log(typeof null)"
null
```
[harmony:typeof_null](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null) state: **rejected**

# Scoping (--harmony_scoping)

> 'use strict'를 통해 `var`가 없을 때 전역변수로 설정되는 설계 미스를 해결했다면, scoping은 한단계 더 나아간 블럭 단위의 변수 선언 `let`을 사용할 수 있게 해준다.
>
> [ES6 for Node](http://dailyjs.com/2012/10/15/preparing-for-esnext/#example_block_scoping)

``` JavaScript
// ES5
'use strcit';
for (var i = 0; i < 3; i++) {
  console.log('i:', i);
}
console.log(i);
```

``` JavaScript
// ES6
'use strict;'
for (let i = 0; i < 3; i++) {
  console.log('i:', i);
}
console.log(i); // ReferenceError: a is not defined
```

``` bash
$ node --harmony_scoping -e 'const a=1; a=2; console.log(a);'
1
```

[harmony:block_scoped_bindings](http://wiki.ecmascript.org/doku.php?id=harmony:block_scoped_bindings)

# Module (--harmony_modules)

``` JavaScript
// math.js
module 'math' {
    export function sum(x, y) {
        return x + y;
    }
    export var pi = 3.141593;
}
```

``` JavaScript
// client.js // import Module
module Math from 'math'

console.log(Math.sum(Math.pi, Math.pi));
```
``` JavaScript
// client2.js // import certain properties
import {sum, pi} from 'math';
 
console.log("2π = " + sum(pi, pi));
```
``` JavaScript
// client3.js // import certain properties with renaming
import { sum, pi as PI } from 'math'

console.log(sum(PI, PI));
```

---
``` JavaScript
// counter.js
// not file but repl
module Counter{
    var n = 0;
    export function inc() { return ++n; }
    export function dec() { return --n;}
    export function cur() { return n;}
}

Counter.n // undefined.
Counter.inc() // 1
Counter.dec() // 0
Counter.cur() // 0
```

현재 모든 브라우져에서 제대로 [지원](http://kangax.github.io/compat-table/es6/)되지 않는다. 또한 traceur에서도 아직 [개발중](https://code.google.com/p/traceur-compiler/wiki/LanguageFeatures#Modules)이다. (module declaration is not supported)

[harmony:modules_examples](http://wiki.ecmascript.org/doku.php?id=harmony:modules_examples)

[harmony:modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) state: **draft**

# Symbols (--harmony_symbols)

- 새로운 Primitive Type
- key값으로 사용할 수 있다

``` JavaScript
function Clazz(data) {
    var key = Symbol('private');
    this[key] = data;
}

var clazz = new Clazz('private date is unprotected');
Object.getOwnPropertySymbols(clazz).forEach(function(sym){
    console.log(clazz[sym]); // 'private date is unprotected'
});

console.log('Unique', Symbol('key') !== Symbol('key')); // true
```

V8의 Symbol은 `Object.getOwnPropertySymbols`을 통해 Symbol을 키값으로 사용한 값들을 가져올 수 있으므로 완벽한 private data가 아니며, ES6에서는 private name object가 있는데 아직 가져올 방법이 없다.
[harmony:private_name_objects](http://wiki.ecmascript.org/doku.php?id=harmony:private_name_objects)

# Proxy (--harmony_proxies)

new primitive type. for

- Interception
- Object Virtualization
- Logging/Profiling

### in spec 

``` JavaScript
// 보통 객체에 대한 프록시
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
console.log(p.world); // 'Hello, world!'
```

``` JavaScript
// 함수 객체에 대한 프록시
var target = function () { return 'I am the target'; };
var handler = {
  apply: function (receiver, ...args) {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);
p() === 'I am the proxy';
```

---

``` JavaScript
// --harmony_proxies
typeof Proxy.prototype // 'undefined'
Proxy.constructor.toString() // 'function Object() { [native code] }'
Object.prototype.toString.call(Proxy) // '[object Object]'
```

``` JavaScript
var target = { a:1, b:2 };
var handler = {
  get: function (receiver, name) {
    return target[name] || 
        name + ' is not defined.';
  }
};

var p = Proxy.create(handler, target);
console.log(p.a); // 1 
console.log(p.world); // console.log(p.world);
```

``` JavaScript
var handler = {
  get: function(proxy, name) {
    if (name === 'prototype') return Object.prototype;
    return 'Hello, '+ name;
  }
};
var fproxy = Proxy.createFunction(
  handler,
  function() { return arguments[0]; }, // call trap
  function() { return arguments[1]; }  // construct trap
 );

console.log(fproxy(1,2)); // 1
console.log(new fproxy(1,2)); // 2
console.log(fproxy.prototype === Object.prototype); // Object.prototype
console.log(fproxy.foo); // 'Hello, foo'
```

``` JavaScript
var callTrap = {
  get:...,
  set:...,
  has:...,
  deleteProperty:...,
  apply:...,
  construct:...,
  getOwnPropertyDescriptor:...,
  defineProperty:...,
  getPrototypeOf:...,
  setPrototypeOf:...,
  enumerate:...,
  ownKeys:...,
  preventExtensions:...,
  isExtensible:...
}
```

[harmony:direct_proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies) state: **draft**

[strawman:uniform_proxies](http://wiki.ecmascript.org/doku.php?id=strawman:uniform_proxies) **unapproved or preliminary proposals**

# Collection (--harmony_collections)

> [왜 WeakMap인가?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#Why_WeakMap.3F)

> 
> 자바스크립트 경력 개발자라면 2개의 배열(key/value)과 4개의 메소드를 통해 이 API들을 구현할 수 있다.
> 하지만 두가지 귀찮은 것이 있다. 하나는 O(n) 탐색이고(key값 검색) 또 하나는 메모리 누수다. 
> 직접 맵을 만든다면 가비지 콜렉션을 당하지 않도록 key 배열은 key 객체들에 대한 레퍼런스를 유지해야한다.
> 네이티브 WeakMap에서는 키 객체들에 대한 참조가 "약하게" 되어있어서 해당 객체들에 대한 다른 레퍼런스가 없다면 가비지 콜렉션을 당할 수 있다는 것이다.
> 
> 약한 참조기 때문에 키들은 enumerable하지 못한다. 어느 시점에 가비지 콜렉션이 될지 모르기 때문에(non-determinism) 콜렉터의 상태에 달라질 수 있다. 키값들을 유지해야한다면 직접 관리해야한다.

``` JavaScript
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
```

# Generator (--harmony_generators)

``` TypeScript
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

`function*`로 선언하고 `yield`를 리턴한다. return으로 값을 반환하면 generator가 완료된다.

# Iteration (--harmony_iteration)


``` TypeScript
inteface Iterator {
    next(value?: any): IteratorResult;
    done: Boolean
}
interface Iterable {
  iterator: Iterator
}
```

- for-in과는 다르게 확장 가능한 스펙
- node에서는 Generator의 for-of만 지원
- Firefox에서는 for-of와 StopIteration 지원

``` JavaScript
function MyCollection() {
    this.elements = [];
}
 
MyCollection.prototype = {
    add: function(x) { this.elements.push(x) },
    iterator: function() {
        return {
            elements: this.elements,
            index: 0,
            next: function() {
                if (this.index >= this.elements.length)
                    throw StopIteration;
                return this.elements[this.index++]
            }
        }
    }
};
```

``` JavaScript
function MyCollection() {
    this.elements = [];
}
 
MyCollection.prototype = {
    add: function(x) { this.elements.push(x) },
    iterator: function*() {
        for (var i = 0; i < this.elements.length; i++)
            yield this.elements[i];
    }
};
```

``` JavaScript
// in spec
for (word of ["one", "two", "three"]) {
    alert(word);
}
 
var s = Set([1, 3, 4, 2, 3, 2, 17, 17, 1, 17]);
for (var v of s) {
    alert(v);
}
```
```
function* fib() {
  var prev = 0
    , curr = 1;
  while(curr < 100) {
    var temp = curr;
    curr += prev;
    prev = temp;

    yield curr;
  }

  return -1;
}

for(let gen of fib()) console.log(gen);
```

[harmony:iterators](http://wiki.ecmascript.org/doku.php?id=harmony:iterators) state: **progress**

# Numeric Literal (--harmony_numeric_literals)

- 2진수, 8진수 추가

``` JavaScript
0b111110111 === 503 // true
0o767 === 503 // true
```

[ES6 Draft 11.8.3 Numeric Literals](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-numeric-literals)

# String (--harmony_strings)

``` JavaScript
"abcde".contains("cd") // true
"abc".repeat(3) // "abcabcabc"
"abc".startsWith('a') &&  "abc".endsWith('c') // true
"".normalize(/** "NFC" | "NFD" | "NFKD" | "NFKC" */);
```

[유니코드 정규화](http://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C_%EC%A0%95%EA%B7%9C%ED%99%94)

# Array (--harmony_arrays)

``` JavaScript
Array.from(document.querySelectorAll('*')) // 진짜 Array로 리턴
Array.of(1, 2, 3) // [1, 2, 3]
[1,2,3].findIndex(function(i){ return i === 2; }); // 1

// NOT WORK
[0, 0, 0].fill(7, 1) // [0,7,7]
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"
```

# Math (--harmony_maths)

``` JavaScript
Number.isInteger(Number.EPSILON) // false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1) // false // value < 2^53

```

Math.clz32
Math.imul
Math.sign
Math.log10
Math.log2
Math.log1p
Math.expm1
Math.cosh
Math.sinh
Math.tanh
Math.acosh
Math.asinh
Math.atanh
Math.hypot
Math.trunc
Math.fround
Math.cbrt

# Promise

- [Spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-operations-on-promise-objects)
- [HTML5Rocks: JavaScript Promises](http://www.html5rocks.com/ko/tutorials/es6/promises/)
- [Promises/A+ Spec](http://andrwj.com/blog/?p=778)

0.11부터 지원

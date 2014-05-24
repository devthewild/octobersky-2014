### 문법 확장

- getter/setter

``` JavaScript
var obj = {
    value: [],
    get a() { return this.value.join(', ') },
    set a(value) { this.value.push(value); return this; } 
}
```
getter/setter

Chrome |IE |Firefox(Gecko)|Opera|Safari
-------|---|--------------|-----|------
1      |9  | 2.0 (1.8.1)  |9.5  |3


### Array

- Array.isArray
``` JavaScript
if(!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

Chrome|IE |Firefox(Gecko)|Opera|Safari
------|---|--------------|-----|------
5     |9  |4.0 (2.0)     |10.5 |5

- lastIndexOf

|IE |
|---|
|9  |

- indexOf, filter, forEach, every, 
some, map

Firefox(Gecko)|IE
--------------|---
1.5 (1.8)     | 9

- reduce, reduceRight

Firefox(Gecko)|IE |Opera|Safari
--------------|---|-----|------
3.0 (1.9)     | 9 |10.5 |4.0

- Lo-Dash (tested in)

Firefox|Chrome|IE |Opera|Safari
-------|------|---|-----|------
3      |19    |6  |10   |5


### Date

``` JavaScript
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
```
Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
5     |3             |9  |10.5 |4

- toISOString

|IE |
|---|
|9  |


### Object

- create, defineProperty*, defineProperties, 

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
5     |4.0 (2)       |9  |11.6 |5

defineProperty
+ IE8에서는 작동하지만 비표준 동작
+ Safari5에서는 DOM 객체는 불가능, 5.1에서부터는 가능

- keys, getOwnPropertyNames, getOwnPropertyDescriptor

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
5     |4.0 (2)       |9  |12   |5

- getPrototypeOf

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
5     |3.5           |9  |12   |5

- preventExtensions, isExtensible, freeze

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
6     |4.0 (2)       |9  |12.1 |5.1

- seal, isSeal, isFrozen

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
6     |4.0 (2)       |9  |NOT  |5.1

### Object.prototype

- __defineGetter__, __defineSetter__, __looupGetter__, __lookupSetter__ *비표준*


|IE |
|---|
|11 |

- isPrototypeOf

|ALL|
|---|
| * |



###  Function.prototype

- bind

Chrome|Firefox(Gecko)|IE |Opera|Safari
------|--------------|---|-----|------
6     |4.0 (2)       |9  |11.6 |5.1

### JSON

- stringify, parse

Firefox(Gecko)|IE |Opera|Safari
--------------|---|-----|------
3.5 (1.9)     |8  |10.5 |4

###  String.prototype

- trim

Firefox(Gecko)|IE |Opera|Safari
--------------|---|-----|------
3.5 (1.9)     |9  |10.5 |4

- trimLeft, trimRight *비표준*

### Property Descriptor 기본값

- value - undefined
- get – undefined
- set – undefined
- writable – false
- enumerable – false
- configurable – false

@see [Voyeur](http://adriancooney.github.io/voyeur.js/)
@see [Voyeur:Explain](http://www.explainjs.com/explain?src=https%3A%2F%2Fraw.githubusercontent.com%2Fadriancooney%2Fvoyeur.js%2Fmaster%2FVoyeur.js)

---


### V8 Version

> Upgrade V8 to 3.1.2 [2011.02.10 Version 0.4.0 (stable)](http://nodejs.org/changelog.html)

Feb 7th, 2011: V8 3.1.2 [V8 Changelog](https://code.google.com/p/v8/source/browse/trunk/ChangeLog#5000)

Feb 3rd, 2011: Chrome 9 Stable - Chrome Web Store, WebGL, Chrome Instant(순간검색) [Chrome Blog](http://chrome.blogspot.kr/2011/02/dash-of-speed-3d-and-apps.html)
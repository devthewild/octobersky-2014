module Counter {
    var n = 0;
    export function inc() { return ++n; }
    export function dec() { return --n;}
    export function cur() { return n;}
}

Counter.n // undefined.
Counter.inc() // 1
Counter.dec() // 0
Counter.cur() // 0

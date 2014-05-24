// http://soft.vub.ac.be/~tvcutsem/proxies/
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

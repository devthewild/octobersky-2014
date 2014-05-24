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
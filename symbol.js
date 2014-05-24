function Clazz(data) {
	var key = Symbol('private');
	this[key] = data;
}

var clazz = new Clazz('private date is unprotected');
Object.getOwnPropertySymbols(clazz).forEach(function(sym){
	console.log(sym, clazz[sym]);
});

console.log('Unique', Symbol('key') !== Symbol('key'));

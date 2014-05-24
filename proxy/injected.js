var proxy = function(target, handler) {
	handler.ref = target;
	return Proxy.create(handler, target);
};
var p = proxy( new Date(), {
	get: function(proxy, name) {
		var self = this;
		if( name === 'toString' )
			return function() {
				var time = self.ref.getTime();
				return "Injected: " + time;
			};
		return self.ref[name].bind(self.ref);
	}
});
console.log(p.toString());
function* fib(){
	var pre = 0, cur = 1;

	while( cur < 100 ) {
		var temp = pre;
		pre = cur;
		cur += temp;
		yield cur;
	}
	return cur;
}

// var gen = fib()
	// , result = null;

for( var r of fib() )
	console.log(r);
// while( !(result = gen.next()).done ){
// 	console.log(result);
// }

console.log(result);

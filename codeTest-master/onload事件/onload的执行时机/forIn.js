function fun(){
	console.log("js里的函数执行了")
}

console.time('hi');
for(var j=0;j<100000;j++){
	for(var i=0;i<10000;i++){
		if(i===9999&&j===99999){
			fun();
			console.timeEnd('hi');
		};
	}
}

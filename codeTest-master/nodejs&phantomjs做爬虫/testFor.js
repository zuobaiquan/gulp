
var name = ['dean','cindy','green'];
var arr = [1,2,3];
(function test(num){
	
	for(var j=0;j<name.length;j++){
		console.log(num+"——"+name[j]);
	}
	
	for(var i=0;i<arr.length;i++){
		test(arr[i]);
	}
	
})(0)


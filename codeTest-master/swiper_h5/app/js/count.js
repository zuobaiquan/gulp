(function(jq) { //自写数字跳动插件
	jq.prototype.count = function() {
		var r =    /^[0-9]*[1-9][0-9]*$/;//正整数判断
		for(i = 0; i < this.length; i++) {
			let obj = this.eq(i);
			//let oldValue = obj.html()*1;
			let thisValue = obj.html()*1;
			let addNum = r.test(thisValue)?(parseInt(thisValue/100)||1):thisValue/100;//如果原值是整数则增量也为整数（取整为零则为1），浮点数则是原值
			//console.log(addNum)
			obj.html(0);
			let thisDelay = parseInt(obj.attr('data-counter-delay'));
			let thisTime = parseInt(obj.attr('data-counter-time'));
			setTimeout(function() {
				//obj.html(0);
				let numAni = setInterval(function() {
					if(obj.html()*1 < thisValue) {
						obj.html(r.test(((obj.html()*1 + addNum)>thisValue?thisValue:(obj.html()*1 + addNum)))?
						((obj.html()*1 + addNum)>thisValue?thisValue:(obj.html()*1 + addNum))
						:((obj.html()*1 + addNum)>thisValue?thisValue:(obj.html()*1 + addNum)).toFixed(2));
						//console.log(obj.html())
					} else {
						clearInterval(numAni);
//						if(parseInt(obj.html())!=oldValue){
//							obj.html(oldValue);
//						}
						return;
					}
				}, thisTime/100)
			}, thisDelay)
		}
	}
})(jQuery)
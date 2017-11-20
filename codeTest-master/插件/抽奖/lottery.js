
(function(ev){
	
	var defaultOptions = {
		selectClass: '',//选中dom添加的类
		algorithm: '',//算法
		during: 1000,//总时长(毫秒)
		loop: 1,//几圈，
		target: 0,//最终定位元素index，0开始
	};
	
	function Lottery(domArr,options){//飞碟构造函数
		
		this.domArr = domArr;
		this.options = (function(){//合并设置
			var obj = (function(){
				var o = {};
				for(var key in defaultOptions){
					o[key] = defaultOptions[key];
				}
				return o;
			})();
			for(var key in options){
				obj[key] = options[key];
			}
			return obj;
		})();
		
		var op = this.options;
		var domA = this.domArr;
		this.start = function(callback){
			var cutTime = op.during/((op.target+1)+domA.length*op.loop);//间隔时间
			var index = 0,loop = op.loop,arg=arguments[0],cutNum = (op.target+1)+domA.length*op.loop,cutIndex = 0;
			var ratio = (function(){
				var ratio = 1;//系数，保证所有时间间隔加起来之和是during值
				var cutTimeAll = 0;
				while(cutIndex<=cutNum){
					cutTimeAll = cutTimeAll+(Math.sin((360*cutIndex/cutNum-270)*Math.PI/180)+2);
					//通过修改360和270和2，决定由哪段曲线来决定速度
					cutIndex++;
				}
				cutIndex = 0;
				return op.during/cutTimeAll;
			})();
			
			var xl = setTimeout(function fun(){
				
				if(op.algorithm==='sine'){
					cutTime = (Math.sin((360*cutIndex/cutNum-270)*Math.PI/180)+2)*ratio;
					cutIndex++;
				}
				
				for(var i=0;i<domA.length;i++){//剔除已有的selectClass
					var oldClass = domA[i].getAttribute('class')?domA[i].getAttribute('class').split(" "):[];
					for(var j=0;j<oldClass.length;j++){
						if(oldClass[j]===op.selectClass){
							oldClass.splice(j,1);
						}
					}
					domA[i].setAttribute('class',oldClass.join(" "));
				}
				domA[index].setAttribute('class',domA[index].getAttribute('class')+" "+op.selectClass);
				if(loop>0){
					index++;
					if(index===domA.length){
						index=0;
						loop--;
					}
				}else{
					index++;
					if(index===op.target+1){
						//clearInterval(xl);
						clearTimeout(xl)
						if(arg&&(arg instanceof Function))arg();
						return;
					}
				}
				
				xl = setTimeout(fun,cutTime)
				
			},cutTime)
		}
		
		
	}
	
	ev.Lottery = Lottery;
	
})(window)

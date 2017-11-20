
(function(ev){
	
	var defaultOptions = {
		bgImg: '',//转盘背景图
		pointerImg: '',//指针背景图
		pointerW: 0,
		pointerH: 0,
		angle:[],//指向区间数值，总值360
	};
	
	function FD(dom,options){//飞碟构造函数
		
		this.dom = dom;
		this.options = (function(){//合并设置
			var obj = (function(){
				var o = {};
				for(key in defaultOptions){
					o[key] = defaultOptions[key];
				}
				return o;
			})();
			for(key in options){
				obj[key] = options[key];
			}
			return obj;
		})()
		
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = this.dom.offsetWidth;
		canvas.height = this.dom.offsetHeight;
		
		//设置背景图&箭头图片
		var $bgImg = new Image();//每新建一个img标签就会创建一个Image对象，直接new，不会在dom中生成
		var $pointerImg = new Image();
		var _this = this;
		$pointerImg.width = this.options.pointerW;
		$pointerImg.height = this.options.pointerH;
		$bgImg.src = this.options.bgImg;//缓存一张图片
		$bgImg.onload = function(){
			console.log("背景图片加载完成")
			context.drawImage($bgImg,0,0,canvas.width,canvas.height);
			$pointerImg.src = _this.options.pointerImg;//缓存一张图片
			$pointerImg.onload = function(){
				console.log("箭头图片加载完成")
				//context.drawImage($pointerImg,(canvas.width-_this.options.pointerW)/2,(canvas.height/2-_this.options.pointerH),_this.options.pointerW,_this.options.pointerH);
			}
		}
		
		this.start = function(angle){
			context.save();
			var _this = this;
			context.clearRect(0,0, canvas.width, canvas.height);//先清掉画布上的内容
			//context.drawImage($bgImg,0,0,canvas.width,canvas.height);
			context.translate(canvas.width/2,canvas.height/2);//将画布坐标系原点移至中心
			context.rotate(angle*Math.PI/180);
			context.translate(-canvas.width/2,-canvas.height/2);//修正画布坐标系
			context.drawImage($pointerImg,(canvas.width-_this.options.pointerW)/2,(canvas.height/2-_this.options.pointerH),_this.options.pointerW,_this.options.pointerH);
			//context.restore();
			//console.log(angle*Math.PI/180)
			requestAnimationFrame(_this.start.bind(this,1))
		};
		
		this.stop = function(){
			
		};
		
		
		dom.appendChild(canvas);
		
	}
	
	ev.FD = FD;
	
})(window)

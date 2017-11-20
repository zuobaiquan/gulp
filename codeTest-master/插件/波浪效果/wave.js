(function(ev){
	
	var optionsDefault = {
		canW: '100',//canvas宽度
		canH: '100',//canvas高度
	}
	
	function createCanvas(dom,options){//创建canvas
		var canvas = dom;
		canvas.width = options.canW;
		canvas.height = options.canH;
		var context = canvas.getContext('2d');
		
	}
	
	function createWave(context){
		context.beginPath();
		context.moveTo(200,300);//起点
		context.bezierCurveTo(250,460,300,300,350,260);
		//context.quadraticCurveTo(350,420,450,360);
		context.stroke();
		context.closePath();
	}
	
	function Wave(dom,options){
		
		this.dom = dom;
		this.options = (function(){
			var oldOptions = optionsDefault;
			for(opt in options){
				oldOptions[opt] = options[opt];
			}
			return oldOptions;
		})();
		
		createCanvas(this.dom,this.options)
		
	}
	
	ev.Wave = Wave;
	
})(window)

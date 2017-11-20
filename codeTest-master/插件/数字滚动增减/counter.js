
(function(ev){
	
	function Counter(dom,options){
		var $dom = dom;
		var obj = {};
		var optionsDefault = {
			fromN:$dom.innerHTML*1,//初始值
			//toN:0,//最终值
			lazy:10,//延时
			during:'1s',//历时
		};
		
		var fontSize = getCurrentStyle($dom).fontSize;
		var letterWidth = parseFloat((getCurrentStyle($dom).width))*1/($dom.innerHTML.length*1);
		$dom.style.lineHeight = fontSize;//取消内敛元素的边距
		
		function getCurrentStyle(node) {
		    var style = null;
		    if(window.getComputedStyle) {
		        style = window.getComputedStyle(node, null);
		    }else{
		        style = node.currentStyle;
		    }
		    return style;
		}
		
		var $numPosArr = [];
		
		function resetNum(length){//把数字分割成一个个单独的数字组
			var _num = ['0','1','2','3','4','5','6','7','8','9','.'],length=length;
			if($dom.getElementsByTagName('span').length>0){//如果已经分割过，后续的变化只是添加新的数字组而不是全部重新生成
				length = $dom.children.length - length;
				if(length<0){
					length=length*-1;
					for(var i=0;i<length;i++){
						var $numBox = document.createElement('span');
						var $numPos = document.createElement('span');//每个数字的滚动数字组
						$numBox.style.float = "left";
						$numBox.style.height = fontSize;
						$numBox.style.width = letterWidth+'px';
						//$numBox.style.background = 'red';
						$numBox.style.overflow = 'hidden';
						$numBox.style.position = 'relative';
						$numBox.style.display = 'inline-block';
						$numPos.style.position = 'absolute';
						$numPos.style.top = 0;
						$numPos.style.transition = 'all '+optionsDefault.during;
						$numPosArr.push($numPos);
						for(var j=0;j<11;j++){
							var $num = document.createElement('div');
							$num.style.height = fontSize;
							$num.style.width = letterWidth+'px';
							$num.style.lineHeight = fontSize;
							$num.style.textAlign = 'center';
							$num.innerHTML = _num[j];
							$numPos.appendChild($num);
							//console.log($numPos);
						}
						$numBox.appendChild($numPos);
						$dom.appendChild($numBox)
					};
				}else{
					length=length;
					for(var i=0;i<length;i++){
						//$numPosArr.pop();//删除最后一个对象数组的dom对象
						new Promise(function(resolve){
							$numPosArr.pop().style.opacity = 0;
							setTimeout(function(){
								resolve()
							},200);
						}).then(function(value){
							$dom.removeChild($dom.children[$numPosArr.length]);
						})
					}
				}
			}else{
				$dom.innerHTML = '';
				for(var i=0;i<length;i++){
					var $numBox = document.createElement('span');
					var $numPos = document.createElement('span');//每个数字的滚动数字组
					$numBox.style.float = "left";
					$numBox.style.height = fontSize;
					$numBox.style.width = letterWidth+'px';
					//$numBox.style.background = 'red';
					$numBox.style.overflow = 'hidden';
					$numBox.style.position = 'relative';
					$numBox.style.display = 'inline-block';
					$numPos.style.position = 'absolute';
					$numPos.style.top = 0;
					$numPos.style.transition = 'all '+optionsDefault.during;
					$numPosArr.push($numPos);
					for(var j=0;j<11;j++){
						var $num = document.createElement('div');
						$num.style.height = fontSize;
						$num.style.width = letterWidth+'px';
						$num.style.lineHeight = fontSize;
						$num.style.textAlign = 'center';
						$num.innerHTML = _num[j];
						$numPos.appendChild($num);
						//console.log($numPos);
					}
					$numBox.appendChild($numPos);
					$dom.appendChild($numBox)
				};
			}
		}
		
		function numAni(domArr,toN){//根据数值指定每个相应数字组的位置
			var $numPosArr_b = (function(){//倒序
				var arr = [];
				for(var i=0;i<domArr.length;i++){
					arr.splice(0,0,domArr[i]);
				};
				return arr;
			})();
			var toNarr_b =(function(){//倒序
				var nArr = (toN+'').split('');
				var arr = [];
				for(var i=0;i<nArr.length;i++){
					arr.splice(0,0,nArr[i]);
				};
				return arr;
			})();
			
			for(var j=0;j<$numPosArr_b.length;j++){
				if(toNarr_b[j]){
					$numPosArr_b[j].style.top = (function(){
						if(toNarr_b[j]==='.'){
							return 10*fontSize.split('px')[0]*-1+'px';
						}else{
							return parseInt(toNarr_b[j])*fontSize.split('px')[0]*-1+'px';
						}
					})();
				}else{
					$numPosArr_b[j].style.top = 0;
				}
				
			}
		}
		
		this.dom = dom;
		this.options = (function(){
			var oldOptions = optionsDefault;
			for(opt in options){
				oldOptions[opt] = options[opt];
			}
			return oldOptions;
		})();
		
		//以options为设置初始化
		var _this = this;
		resetNum((this.options.fromN+'').length);
		setTimeout(function(){
			numAni($numPosArr,_this.options.fromN);
		},_this.options.lazy);
		
		//定义访问器属性，绑定变动事件
		Object.defineProperty(this.options,'setToN',{
			get: function(){
				return "this operation is not allowed!";
			},
			set: function(val){
				var _this = this;
				//_this.toN = val;
				resetNum((val+'').length);
				setTimeout(function(){
					numAni($numPosArr,val);
				},_this.lazy);
			}
		})
		
	}
	
	ev.Counter = Counter;
	
})(window)

function ZZH(obj) {//虚拟dom构造函数
	this.defineRactive = function(obj,key,val){
		Object.defineProperty(obj,key,{
			get: function(){
				return val;
			},
			set: function(newVal){
				if(newVal===val) return;
				this.render();
				val = newVal;
			}
		});
	};
	this.observe = function(obj,vm){
		var _this = this;
		Object.keys(obj).forEach(function(key){
			_this.defineRactive(vm,key,obj[key]);
		});
	};
	this.setProps = function($dom, props) {
		if(props === {}) return;
		for(var item in props) {
			if(props.hasOwnProperty(item)) {
				if(props[item] instanceof Object) {
					if(props[item] instanceof Array) {
						$dom.setAttribute(item, props[item].join(" "));
					} else {
						var classes = "";
						for(var cla in props[item]) {
							if(props[item].hasOwnProperty(cla)) {
								classes += cla + ":" + props[item][cla] + ";";
							}
						}
						$dom.setAttribute(item, classes);
					}
				} else {
					console.log(props);
					$dom.setAttribute(item, props[item]);
				}
			}
		}
	};
	this.setMethods = function($dom, methods) {
		if(methods === {}) return;
		for(var item in methods) {
			if(methods.hasOwnProperty(item)) {
				$dom.addEventListener(item, methods[item]) //添加事件侦听
			}
		}
	};
	this.render = function() { //基本节点的创建dom
		var vm = this.vm;
		var setProps = this.setProps;
		var setMethods = this.setMethods;
		var $dom = document.getElementById(this.el);
		var _this = this;
		//$dom.innerHTML = '';
		(function fun(obj, dom) { //表示当前操作的虚拟dom对象和父级真实dom
			var props = obj.props;
			var methods = obj.methods;
			var this_dom; //当前真实dom
			if(typeof obj === 'string') {
				this_dom = document.createTextNode(obj);
				dom.appendChild(this_dom);
			} else {
				this_dom = document.createElement(obj.tag);
				//setProps(this_dom, props);
				setProps.apply(_this,[this_dom, props]);
				setMethods(this_dom, methods);
				dom.appendChild(this_dom);
				if(obj.children) {
					if(typeof obj.children === 'string') {
						fun(obj.children, this_dom);
					} else {
						for(var i = 0; i < obj.children.length; i++) {
							fun(obj.children[i], this_dom);
						}
					}
				}
			}
		})(vm, $dom);
		//return $dom.childNodes[0];
	};
	this.el = obj.el;
	this.methods = obj.methods;
	this.data = obj.data;
	this.observe(this.data,this);//变量监测
	this.vm = obj.vm;
	console.log(this.vm)
	//this.render();
}


//构建虚拟DOM对象
function Element(tagName,props,children){
	this.tagName = tagName;
	this.props = props;
	this.children = children;
	var state = 0;
}

//为虚拟DOM添加构建真实DOM树的方法
Element.prototype.render = function(){
	var el = document.createElement(this.tagName);//创建元素
	var props = this.props;
	
	for(var propsName in props){//添加属性
		var propsValue = props[propsName];
		el.setAttribute(propsName,propsValue)
	}
	
	var children = this.children||[];
//	for(i=0;i<children.length;i++){
//		if(children[i] instanceof Element){
//			el.appendChild(children[i].render());
//		}else{
//			el.appendChild(document.createTextNode(children[i]));
//		}
//		//var child =(children[i] instanceof Element)
//		//?children[i].render()//如果虚拟DOM中子节点是对象则递归构建
//		//:document.createTextNode(children[i]);//如果虚拟DOM中子节点是字符串则添加字符串节点
//		//el.appendChild(children[i]);
//	}
	//采用上诉注释掉的方式，当递归children中的第一对象时会运行到下方的renturn el,导致无法完整render所有的children中
	//的对象，而采用下述方式却可以，值得学习推敲
	function each (array, fn) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    fn(array[i], i)
	  }
	}
	each(children,function (child) {
	    var childEl = (child instanceof Element)
	    	? child.render()
	    	: document.createTextNode(child)
	    el.appendChild(childEl)
	})
	console.log(el)
	return el;
}



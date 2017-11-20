
(function(ev){
	
	
	function CssModule(domId){
		this.dom = document.getElementById(domId);
		var operateDom = {
			tag: 'div',
			props: {
				class: 'box',
			},
			style: {
				background: 'red',
			},
			methods: {
				click: function(){
					alert("hello world");
				}
			},
			children: [
				{
					tag: 'span',
					props: {
						
					},
					style: {
						background: 'green',
					},
					methods: {
						click: function(){
							alert("this is span");
						}
					},
				}
			]
		};
		
		(function createDom(vdom){
			var $dom = document.createElement(vdom.tag);
			for(var item in vdom){
				if(vdom.item==="props"){
					for(var prop in vdom.item){
						$dom.setAttribute(prop,vdom.item[prop])
					}
				}
				if(vdom.item==="style"){
					var styles = "";
					for(var styName in vdom.item){
						styles+styName+
					}
				}
			}
			
		})(operateDom)
		
	}
	
	ev.CssModule = CssModule;
	
})(window)

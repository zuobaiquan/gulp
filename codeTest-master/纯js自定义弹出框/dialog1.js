
var dialog_mask = document.createElement('div');
var dialog_content = document.createElement('div');
var dialog_contentInfo = document.createElement('div');
var dialog_btn = document.createElement('div');
var dialog_btnClose = document.createElement('div');
var dialog_title = document.createElement('div');
dialog_btnClose.appendChild(document.createTextNode('X'))
dialog_mask.style.cssText = "position: fixed;width: 100%;height: 100%;left:0;top:0;z-index:100;background: #000;opacity:0;filter:alpha(opacity=0);   "
dialog_contentInfo.style.cssText = "height: 100%;overflow: hidden;"
dialog_btn.style.cssText = "position: absolute;left:0;top: -32px; background: #eaeaea;width: 100%;height: 32px;"
dialog_btnClose.style.cssText = "float: right;padding: 0 20px;height: 32px;background: #F05E41;font:bold 16px/32px 微软雅黑;color: #fff;cursor: pointer;"
dialog_title.style.cssText = "float: left;padding: 0 10px;line-height: 32px;font:bold 16px/32px 微软雅黑;color: #333;"
//var $window_H = document.documentElement.clientHeight;
//var opacity = opacity || filter:alpha(opacity=100);  

function set_opacity(obj){
	if(obj.filters){
		return obj.filters.alpha.opacity/100;
	}else{
		return obj.style.opacity;
	}
}
function get_opacity(obj,a,b){
	//var opacity_value
	if(obj.filters){
		return parseFloat(obj.filters.alpha.opacity) + a;
	}else{
		return parseFloat(obj.style.opacity) + b;
	}
}

function load_info(content){
	dialog_contentInfo.innerHTML =content;// dialog_contentInfo.innerHTML + 
}

//var seto = (dialog_mask.filters.alpha.opacity) || (dialog_mask.style.opacity);
function showdialog(info,ifTopbar,title,content_width,content_height){
	dialog_content.style.cssText = "position: fixed;width: "+content_width+"%;height: "+content_height+"%;left:"+(100-content_width)*0.5+"%;bottom:-100%;z-index:101;background: #fff;"
	var $body = document.getElementsByTagName('body')[0];
//	$body.style.overflow = 'hidden';
	dialog_title.innerHTML= '';//防止每次打开，标题都会新增
	dialog_title.appendChild(document.createTextNode(title));
	$body.appendChild(dialog_mask);
	$body.appendChild(dialog_content);
	if(ifTopbar=='true'){
		dialog_btn.appendChild(dialog_btnClose);
		dialog_btn.appendChild(dialog_title);
		dialog_content.appendChild(dialog_btn);
	}
	dialog_content.appendChild(dialog_contentInfo);
	
	var cm_instance = (parseFloat(dialog_mask.style.height)-parseFloat(dialog_content.style.height))*0.5;
	//alert(cm_instance);
	var dm_animateIn;
	var dc_animateIn;
	dm_animateIn = setInterval(function(){
		if(parseFloat(set_opacity(dialog_mask)) < 0.6){
			if(dialog_mask.filters){
				dialog_mask.style.filter = "alpha(opacity:"+get_opacity(dialog_mask,2,0.02)+")";
			}else{
				dialog_mask.style.opacity = get_opacity(dialog_mask,2,0.02);
			}
			
		}else{
			clearInterval(dm_animateIn);
		}
	},4)
	dc_animateIn = setInterval(function(){
		if(parseFloat(dialog_content.style.bottom)/parseFloat(dialog_mask.style.height) < cm_instance/100){
			dialog_content.style.bottom = parseFloat(dialog_content.style.bottom) + 2+'%';
		}else{
			//dialog_content.style.bottom = cm_instance+'%';
			clearInterval(dc_animateIn);
			load_info(info);
		}
	},2)
	
}

var dialog_hide = function(){
	var dm_animateOut;
	var dc_animateOut;
	dm_animateOut = setInterval(function(){
		if(parseFloat(set_opacity(dialog_mask)) > 0){
			if(dialog_mask.filters){
					dialog_mask.style.filter = "alpha(opacity:"+get_opacity(dialog_mask,-2,-0.02)+")";
			}else{
				dialog_mask.style.opacity = get_opacity(dialog_mask,-2,-0.02);
			}
		}else{
			clearInterval(dm_animateOut);
			dialog_mask.parentNode.removeChild(dialog_mask);
		}
	},4)
	dc_animateOut = setInterval(function(){
		if(parseFloat(dialog_content.style.bottom)/parseFloat(dialog_mask.style.height) > -1){
			dialog_content.style.bottom = parseFloat(dialog_content.style.bottom) - 2+'%';
		}else{
			clearInterval(dc_animateOut);
			dialog_content.parentNode.removeChild(dialog_content);
		}
	},1)
}
dialog_btnClose.onclick = dialog_hide;
dialog_mask.onclick = dialog_hide;


var $body;
var dialog_mask;
var dialog_content;
var dialog_contentInf;
var dialog_btn = document.createElement('div');
var dialog_btnClose = document.createElement('div');
var dialog_title = document.createElement('div');
dialog_btn.appendChild(dialog_btnClose);
dialog_btn.appendChild(dialog_title);
dialog_btnClose.appendChild(document.createTextNode('X'))
dialog_btn.style.cssText = "position: absolute;left:0;top: -32px; background: #eaeaea;width: 100%;height: 32px;"
dialog_btnClose.style.cssText = "float: right;padding: 0 20px;height: 32px;background: #F05E41;font:bold 16px/32px 微软雅黑;color: #fff;cursor: pointer;"
dialog_title.style.cssText = "float: left;padding: 0 10px;line-height: 32px;font:bold 16px/32px 微软雅黑;color: #333;"

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

function load_info(obj,content){
	obj.innerHTML =content;// dialog_contentInfo.innerHTML + 
	console.timeEnd("本次弹出共计：")
}

//var seto = (dialog_mask.filters.alpha.opacity) || (dialog_mask.style.opacity);
function showdialog(info,title,content_width,content_height){
	content_width = content_width*document.documentElement.clientWidth/100;
	content_height = content_height*document.documentElement.clientHeight/100;
	$body = document.getElementsByTagName('body')[0];
	
	dialog_mask = document.createElement('div');
	dialog_content = document.createElement('div');
	dialog_contentInfo = document.createElement('div');
	dialog_mask.style.cssText = "position: fixed;width: 100%;height: 100%;left:0;top:0;z-index:100;background: #000;opacity:0;filter:alpha(opacity=0);   "
	dialog_content.style.cssText = "position: fixed;width: "+content_width+"px;height: "+content_height+"px;left:"+(document.documentElement.clientWidth-content_width)*0.5+"px;top:"+(document.documentElement.clientHeight-content_height)*0.5+"px;z-index:101;padding: 10px;background: #fff;opacity:0;filter:alpha(opacity=0);"
	dialog_contentInfo.style.cssText = "height: 100%;overflow: hidden;"
	dialog_title.innerHTML= '';//防止每次打开，标题都会新增
	dialog_title.appendChild(document.createTextNode(title));
	$body.appendChild(dialog_mask);
	$body.appendChild(dialog_content);
	dialog_content.appendChild(dialog_btn);
	dialog_content.appendChild(dialog_contentInfo);
	var cm_instance = (parseFloat(dialog_mask.offsetHeight)-parseFloat(dialog_content.offsetHeight))*0.5;
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
	},2)
	dc_animateIn = setInterval(function(){
		console.time("本次弹出共计：");
//		if(parseFloat(dialog_content.offsetTop)> cm_instance){
//			dialog_content.style.top = parseFloat(dialog_content.offsetTop) - 15+'px';
//		}else{
//			console.log(dc_animateIn)
//			clearInterval(dc_animateIn);
//			load_info(dialog_contentInfo,info);
//		}
		if(parseFloat(set_opacity(dialog_content)) < 1){
			if(dialog_content.filters){
				dialog_content.style.filter = "alpha(opacity:"+get_opacity(dialog_content,2,0.03)+")";
			}else{
				dialog_content.style.opacity = get_opacity(dialog_content,2,0.03);
			}
			
		}else{
			clearInterval(dc_animateIn);
			load_info(dialog_contentInfo,info);
		}
			
	},1)
}

function clearCon(animate,obj){
	clearInterval(animate);
	obj.innerHTML = '';
	obj.parentNode.removeChild(obj);
	obj = null;
}
var dialog_hide = function(){
	var dm_animateOut;
	var dc_animateOut;
	dm_animateOut = setInterval(function(){
		if(parseFloat(set_opacity(dialog_mask)) > 0){
			if(dialog_mask.filters){
					dialog_mask.style.filter = "alpha(opacity:"+get_opacity(dialog_mask,-2,-0.03)+")";
			}else{
				dialog_mask.style.opacity = get_opacity(dialog_mask,-2,-0.03);
			}
		}else{
			clearCon(dm_animateOut,dialog_mask);
		}
	},4)
//	dc_animateOut = setInterval(function(){
//		if(parseFloat(dialog_content.offsetTop) < document.documentElement.clientHeight){
//			dialog_content.style.top = parseFloat(dialog_content.offsetTop) + 20+'px';
//		}else{
//			clearCon(dc_animateOut,dialog_content);
//		}
//	},1)
	dc_animateOut = setInterval(function(){
		if(parseFloat(set_opacity(dialog_content)) > 0){
			if(dialog_content.filters){
					dialog_content.style.filter = "alpha(opacity:"+get_opacity(dialog_content,-2,-0.02)+")";
			}else{
				dialog_content.style.opacity = get_opacity(dialog_content,-2,-0.02);
			}
		}else{
			clearCon(dc_animateOut,dialog_content);
		}
	},4)
}
dialog_btnClose.onclick = dialog_hide;
//dialog_mask.onclick = dialog_hide;

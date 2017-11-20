function creatTree(zhangId,jieId,jieinfoId) {//从课件详情点击过来需要默认打开前诉点击的内容，三个参数表示章的id，节的id，和内容的id
	var $zhang = $(".zhang");
	var $zhangCon = $(".zhangCon");
	var $jie = $(".jie");
	var $jieCon = $(".jieCon");
	var $jieCon_info = $(".jieCon_info");
	$zhangCon.hide();
	$jieCon.hide();

	function changeBg(obj, bgColor, fontColor, border) {
		var this_class = obj.attr('class');
		$("." + this_class).attr('style', '');
		//obj.css({'background-color':bgColor,'color':fontColor});
		obj.css('cssText', 'background-color:' + bgColor + ';color:' + fontColor + ';border:' + border + ";'")
	}

	function objClick(obj) {
		var this_class = obj.attr('class');
		$("." + this_class).siblings().hide();
		obj.siblings().show();

	}
	$zhang.on('click', function() {
		//zhangClick($(this))
		objClick($(this));

	})
	$jie.on('click', function() {
		//jieClick($(this))
		objClick($(this));
		changeBg($(this), "#1c90d3", "#fff", 'none');
	})
	$jieCon_info.on('click', function() {
		changeBg($(this), "#252b33", "#bbb", '1px solid #464b51');
	})
	
	//**********默认点击打开章节和内容***************
	function defaultClick(){
		objClick($("#"+zhangId));
		objClick($("#"+jieId));
		changeBg($("#"+jieId), "#1c90d3", "#fff", 'none');
		changeBg($("#"+jieinfoId), "#252b33", "#bbb", '1px solid #464b51');
		$("#lc").attr('src',$("#"+jieinfoId).attr('href'));//在iframe中打开相应页面
	}
	return defaultClick();
}


function setWidth(w){
	$(".ll_left").css({'width':w});
	$(".jieCon_info").find('span').css('width',w-$(".jieCon_info").find('img').css("width")-80+"px")
	$(".zhang,.jie").css('width',w-44+"px")
}



window.onload = function(){
	var left_width = '300px';
	//setWidth(left_width);
	function zoomLayout(){//拉伸布局框
		var $moveBar = document.getElementById('moveBar');
		var $ll_left = document.getElementById('ll_left');
		var state=0;
		$moveBar.onmousedown = function(e){
			state =1;
		}
		document.documentElement.onmouseup = function(e){
			state =0;
		}
		document.documentElement.onmousemove = function(e){
			var e = e||window.event;
			if(state==1){
				left_width = 100*(e.screenX)/document.documentElement.clientWidth+'%';
				$ll_left.style.width = left_width;
				//$ll_left.style.maxWidth = width;
				//setWidth(left_width);
			}else{return;}
		}
	}
	zoomLayout();
	
	//***********点击左侧title中的箭头和hamburger按钮显隐左侧栏**************
	function leftSH(id){
		switch (id){
			case "look_arrow":
				$(".list").hide();
				$("#look_arrow").hide();
				$(".ll_left").css({'width':'35px'})
				break;
			case "mulu_btn":
				$(".list").show();
				$("#look_arrow").show();
				setWidth(left_width);
				break;
		}
	}
	document.getElementById('look_arrow').onclick = function(e){
		var e = e||window.event;
		var $target = e.srcElement?e.srcElement:e.target;
		leftSH($target.getAttribute('id'));
	}
	document.getElementById('mulu_btn').onclick = function(e){
		var e = e||window.event;
		var $target = e.srcElement?e.srcElement:e.target;
		leftSH($target.getAttribute('id'));
	}
}

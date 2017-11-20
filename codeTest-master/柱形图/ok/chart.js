
$(function(){
	
	var $zhu_body_td = $(".zhu_body td")
	var $zhu_kedu = $(".zhu_kedu");
	var y_num = $zhu_kedu.length;
	var y_maxvalue = $zhu_kedu.eq(0).text();
	var $zhu_mubiao = $(".zhu_mubiao");
	var $zhu_shiji = $(".zhu_shiji");
	
	$zhu_body_td.css('height',$zhu_kedu.height()*(y_num)+'px');//设置柱形图柱形所在table的td的高度，否则ie10以下对td的height: 100%;会溢出
	
	var value = {'data':[//数据写在json对象里，前面是目标数据，后者是实际数据
		{'mubiao':10,'shiji':5},
		{'mubiao':16,'shiji':11},
		{'mubiao':6,'shiji':5},
		{'mubiao':18,'shiji':15},
		{'mubiao':12,'shiji':11},
		{'mubiao':8,'shiji':4},
		{'mubiao':11,'shiji':14},
	]}
	
	for (key in value.data) {
		var mubiao_ratio = (value.data[key].mubiao/y_maxvalue)*((y_num-1)/y_num)*100+'%';
		var shiji_ratio = (value.data[key].shiji/y_maxvalue)*((y_num-1)/y_num)*100+'%';
		$zhu_mubiao.eq(key).animate({height : mubiao_ratio},600,function(){showdot()});//初始化柱形图生产动画并弹出数据块
		$zhu_shiji.eq(key).animate({height : shiji_ratio},600,function(){showdot()});
//		console.log(mubiao_ratio);
	}
	
	
	
	function show(obj){//显示数据块
		var info_sq = $("<div class='info_sq'></div>")
		var this_name = obj.attr('class');
		var this_bg ;
		switch (this_name){
			case "zhu_mubiao":
				//this_bg = "#3a4752";
				var this_index = $zhu_mubiao.index(obj);
				var this_value = value.data[this_index].mubiao;
				break;
			case "zhu_shiji":
				//this_bg = "#2b8bd7";
				var this_index = $zhu_shiji.index(obj);
				var this_value = value.data[this_index].shiji;
				break;
		}
		
		info_sq.html(this_value);
		//info_sq.css('background',this_bg);
		info_sq.appendTo(obj).animate({top:'-36px'},200);
	}
	function del(obj){//删除数据块
		obj.find(".info_sq").animate({top:'-26px'},200,function(){
			obj.find(".info_sq").remove();
		});
	}
	
	var $zhu = $(".zhu_mubiao,.zhu_shiji");
	
	function showdot(){//初始化跳出柱形图的数据块
		$zhu_length = $zhu.length;
		var loadshow;
		var i = 0;
		loadshow = setInterval(function(){
			if(i<$zhu_length){
				show($zhu.eq(i));
				del($zhu.eq(i));
				i++
			}else{
				clearInterval(loadshow);
			}
		},35)
	}
	
	$zhu.mouseenter(function(){
		show($(this));		
	})
	$zhu.mouseleave(function(){
		del($(this));
	})
})


$(function(){
	
	var $zhu_body_td = $(".zhu_body td")
	var $zhu_kedu = $(".zhu_kedu");
	var y_num = $zhu_kedu.length;
	var y_maxvalue = parseInt($zhu_kedu.eq(0).text());//以防纵轴数值带单位
	var $zhu_info = $(".zhu_info");
	var $zhu_width;//定义柱形图的柱子宽度
	var maxvalue_length;//定义value中最大数值的位数
	var $zhu;
	var $zi_sq;
	
	function creatZhu(it_H,it_C){
		var $zhu_mubiao = $('<div class="zhu_mubiao"></div>');//
		var $zhu_con = $('<div class="zhu_con"></div>');//
		var $td = $('<td></td>');
		$zhu_con.css('height',$zhu_kedu.height()*(y_num));
		$zhu_mubiao.css({'height':it_H,'background':it_C});
		
		$zhu_con.append($zhu_mubiao)
		$td.append($zhu_con);
		$(".zhu_body").append($td);
		$zhu_width = $zhu_mubiao.width();//获取柱形图的柱子宽度用于弹出数值块的定位
		
		$zhu = $(".zhu_mubiao");//在这里获取jquery对象才能获取，因为这里才开始页面生成
		$zi_sq = $(".zi_sq");//同上
	}
	
	function creatInfosq(it_Name,it_C){
		var $zi_sq = $('<div class="zi_sq"></div>');
		$zi_sq.css('border-left-color',it_C);
		$zi_sq.html(it_Name);
		$zhu_info.append($zi_sq);
	}
	
	$zhu_body_td.css('height',$zhu_kedu.height()*(y_num));//设置柱形图柱形所在table的td的高度，否则ie10以下对td的height: 100%;会溢出
	
	var value = {'data':[//数据写在json对象里,柱形图会自动生成
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		{'shuzhi':8,'name':'四公司'},
		{'shuzhi':21,'name':'抛售的积分'},
		{'shuzhi':30,'name':'千瓦时加'},
		{'shuzhi':16,'name':'深V只需'},
		{'shuzhi':6,'name':'平时看大佛'},
		{'shuzhi':36,'name':'水电费'},
		{'shuzhi':12,'name':'图二儿子'},
		{'shuzhi':34,'name':'格式'},
		{'shuzhi':26,'name':'的富商大贾'},
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		{'shuzhi':8,'name':'四公司'},
		{'shuzhi':21,'name':'抛售的积分'},
		{'shuzhi':30,'name':'千瓦时加'},
		{'shuzhi':16,'name':'深V只需'},
		{'shuzhi':6,'name':'平时看大佛'},
		{'shuzhi':36,'name':'水电费'},
		{'shuzhi':12,'name':'图二儿子'},
		{'shuzhi':34,'name':'格式'},
		{'shuzhi':26,'name':'的富商大贾'},
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		{'shuzhi':8,'name':'四公司'},
		{'shuzhi':21,'name':'抛售的积分'},
		{'shuzhi':30,'name':'千瓦时加'},
		{'shuzhi':16,'name':'深V只需'},
		{'shuzhi':6,'name':'平时看大佛'},
		{'shuzhi':36,'name':'水电费'},
		{'shuzhi':12,'name':'图二儿子'},
		{'shuzhi':34,'name':'格式'},
		{'shuzhi':26,'name':'的富商大贾'},
		{'shuzhi':10,'name':'这是名字'},
		{'shuzhi':16,'name':'是打飞机上'},
		{'shuzhi':6,'name':'是的'},
		{'shuzhi':18,'name':'我热心肠'},
		{'shuzhi':22,'name':'微型车'},
		
	]}
	
	
	var color_poor = ['#F05E41','#F09541','#F0B841','#F0DB41','#DBE93F','#7CD73A','#37CD7F','#3793CD','#3751CD','#6E37CD','#CD37CD','#DD3B64','#F37E67','#F3AA67','#F3C667','#F3E267','#E2ED65','#96DF61','#5FD799','#5FA9D7','#5F74D7','#8B5FD7','#E46283','#D06A56','#DA9A60','#E0B966','#E6D86C','#D8E26B','#8AC95C','#4C8DB5','#4153A9','#6741AA','#B249B2','#EB89A2','#BB7364','#CB9E74','#D6BA7F','#E0D589','#D6DD89','#93C072','#67B28B','#5B88A5','#475492','#634892','#A056A0','#9C7F79','#B6A393','#C6BBA3','#D6D2B3','#D4D7B5']
	var cp_length;
	function choose_color(){
		cp_length = color_poor.length;
		var whichOne = Math.floor(Math.random()*cp_length);
		var thisColor = color_poor[whichOne];
		//color_poor.splice(whichOne,1);//删除数组中该颜色以防重复，若想重复使用删除这句
		//console.log(thisColor,color_poor.length,value.data.length)
		return thisColor;
	}
	
	function go(){
		var value_shuzhi = new Array();
		for (key in value.data) {
			var shuzhi_ratio = (value.data[key].shuzhi/y_maxvalue)*((y_num-1)/y_num)*100+'%';
			var obj_name = value.data[key].name;
			var obj_color = choose_color();
			creatZhu(shuzhi_ratio,obj_color);
			creatInfosq(obj_name,obj_color);
			//console.log($(".zhu_body").html())
			value_shuzhi.push(value.data[key].shuzhi)//数值组成新数组
		}
		maxvalue_length = (Math.max.apply(null, value_shuzhi)).toString().length;//获取数值最大值的位数
		showdot();
	}
	go();
	
	
	function show(obj){//显示数据块
		var info_sq = $("<div class='info_sq'></div>")
		var info_sq_width = (15*maxvalue_length<$zhu_width)?$zhu_width:15*maxvalue_length;//如果数值块宽度小于柱子宽，选用柱子块宽度使之撑满，否则就选用树脂块宽度
		info_sq.css({'width':info_sq_width+'px','left':(info_sq_width-$zhu_width)*-0.5});//用value最大数值的位数*15作为块的宽度，并设置left使之居中对齐
		var this_name = obj.attr('class');
		var this_bg ;
		var this_index = $zhu.index(obj);
		var this_value = value.data[this_index].shuzhi;
		
		info_sq.html(this_value);
		info_sq.appendTo(obj).animate({top:'-36px'},200);
		zhuInfo_hover(obj,"up")
	}
	function del(obj){//删除数据块
		obj.find(".info_sq").animate({top:'-26px'},200,function(){
			obj.find(".info_sq").remove();
			zhuInfo_hover(obj,"leave")
		});
	}
	
	
	
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
	
	function zhuInfo_hover(obj,state){
		var this_num = $zhu.index(obj);
		switch (state){
			case 'up':
				$zi_sq.eq(this_num).addClass('zi_sq_hover');
				break;
			case 'leave':
				$zi_sq.eq(this_num).removeClass('zi_sq_hover');
				break;
		}
	}
	//********对柱子hover的表现******
	$zhu.on('mouseenter',function(){
		show($(this));		
		
	})
	$zhu.on('mouseleave',function(){
		del($(this));
	})
	//********对信息块hover的表现******
	$zi_sq.on('mouseenter',function(){
		show($zhu.eq($(this).index()));		
	})
	$zi_sq.on('mouseleave',function(){
		del($zhu.eq($(this).index()));
	})
})

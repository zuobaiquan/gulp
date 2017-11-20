
//jquery中live绑定toggle的方法，实现动态加载数据支持toggle事件

$(function() {
	$(".zoomPhoto").live("click",function(){
		$(this).toggle(
			function() {
				$(this).parents("body").append("<div class='zoomBlock'></div>")
				$(".zoomBlock").animate({
					opacity: '0.9'
				}, 50);
				var WChuH =  $(this).width()/$(this).height();
				var photoW = ($(window).height()-115)* WChuH * 0.8;
				var picleft = $(this).parents("body").width() * 0.5 - photoW* 0.5 + "px";
				var picTop = ($(window).height()-115)*0.1+115 + "px";
				$(this).css({
					'position': 'fixed',
					'z-index': '100'
				});
				$(this).addClass("imgplus");
				$(this).animate({
						width: photoW,
						left: picleft,
						top: picTop,
					}, 50)
			}
			,
			function() {
				$(this).css({
					'position': 'inherit',
					'width': '150px'
				})
				$(this).removeClass("imgplus");
				$(".zoomBlock").remove();
			}
		)
		 $(this).trigger('click');
	})
})
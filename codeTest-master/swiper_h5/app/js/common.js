

//读取localStorage中的用户信息初始化
function init(){
	let $loginCon1 = $("#loginCon1");//登录页的登录块和查询块
	let $loginCon2 = $("#loginCon2");
	//localStorage.clear();
	let userName,cardInfo,userlevel,userId;
	userId = localStorage.getItem('userId')||null;
	if(!userId){
		$loginCon2.hide();
		$loginCon1.show();
		clearDom();//初始化的时候清除dom中表单和卡信息
	}else{
		let phoneNum = localStorage.getItem('phoneNum');
		userName = getUserInfo(phoneNum).userName;
		userlevel = getUserInfo(phoneNum).userlevel;
		cardInfo = getUserInfo(phoneNum).cardInfo;
		initSearchPage(userName,userlevel,cardInfo);//如果本地有数据初始化查询页面
		$loginCon2.show();
		$loginCon1.hide();
	}
}
init();

//清空页面表单
function clearDom(){
	$formIn = $(".formIn");
	$cardBox = $(".cardBox");
	$formIn.val('');
	$cardBox.html('');
}
//初始化查询页
function initSearchPage(userName,userlevel,cardInfo){
	//let userName,userlevel,cardInfo;
	let $loginName = $("#loginName");
	if(userlevel===0){
		$loginName.html('未实名');
		$loginName.click(function(){
			alert('当前用户未实名，请至【杭州市民卡】APP完成实名操作！')
		})
	}else{
		$loginName.html(userName);
		if(cardInfo.length>0){
			for(let i=0;i<cardInfo.length;i++){
				addCard(cardInfo[i]);
			}
		}
	}
}

//验证码倒计时
function getYzm(obj,time){
	let objVal = (!isNaN($(obj).html()))
		?(function(){return;})()
		:(function(){
			$(obj).html(time);
			let yzmAni = setInterval(function(){
				$(obj).html()>0
				?$(obj).html($(obj).html()-1)
				:(function(){
					clearInterval(yzmAni);
					$(obj).html("获取验证码");
				})();
			},1000)
		})()
	
}

let $active={},$activeVal = '';//寄存当前激活对象
//表单置顶显示
function showForm(obj){
	$active = obj;
	let $thisCopy = obj.clone();
	$thisCopy.val('');
	$thisCopy.attr('onchange','synForm(this.value)');
	let $newIn = $("<div style='padding:4rem 1rem;background:#fff;margin-top:0;' class='formList'></div>");
	let $btn = $('<div class="yzmBtn borderLeft inBtn" style="top:4rem;" onclick="closeForm(this,'+$thisCopy.data("check")+')">确定</div>')
	$thisCopy.removeClass('borderBottom');
	$thisCopy.css({background:'#fff',margin:0});
	$newIn.append($thisCopy).append($btn);
	let $mask = $("<div class='mask formMask'></div>");
	$mask.appendTo($('body')).html($newIn);
	$thisCopy.focus();
}
function closeForm(obj,callback){//关闭置顶表单
	var backInfo = callback($(obj).parent().find('.formIn').val());
	if(backInfo===true){
		$(obj).parents('.formMask').remove();
		$active.val($activeVal)
		$active={};
		$activeVal='';
	}else{
		alert(backInfo);
	}
	
}
function synForm(value){//同步信息
	$activeVal = value;
}
//检查是否手机号是否合规
function checkPhone(value){
	var value = value;
	var r = /^1[358][0-9]{9}$/;
	if(r.test(value)){
		return true;
	}else{
		return '这不是手机号,请重新输入';
	}
	
}
//检查是否验证码是否正确
function checkCode(value){
	var value = value;
	var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
	if(r.test(value)){
		return true;
	}else{
		return '验证码不正确，请确认输入！';
	}
	
}
//检查是否杭州通卡有效
function checkCard(value){
	var value = value;
	var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
	if(r.test(value)){
		return true;
	}else{
		return '卡号不正确，请确认后添加！';
	}
	
}

//添加杭州通卡
function addCard(value){
	if(value){
		let $cardBox = $(".cardBox");
		let $cardNum = $(".cardBox").find(".cardNum").length>0?$(".cardBox").find(".cardNum"):{};
		for(i=0;i<$cardNum.length;i++){
			if($cardNum.eq(i).html()===value){
				alert('该卡号已经添加，不能重复添加！');
				return;
			}
		}
		let $card = $('<div class="formList borderBottom">'+
					'<img src="img/clearInfo.png" class="clearInfo" onclick="delCard(this,'+value+')"/>'+
					'<div class="cardNum">'+value+'</div>'+
				'</div>');
		$cardBox.append($card);
		addCardToData(value);
	}else{
		alert('卡号不能为空')
	}
}
//添加杭州通卡到数据库
function addCardToData(value){
	//alert(value);
}
//删除杭州通卡
function delCard(obj,value){
	var $thisCard = $(obj).parent();
	$thisCard.remove();
	delCardInData(value);
}
//删除数据库中的该杭州通卡
function delCardInData(value){
	//alert(value);
}

//通过手机号获取用户id,用户名,等级和卡信息
function getUserInfo(phoneNum){
	let userName='',userId='',userlevel='',cardInfo=[];
	//下述数据通过手机号ajax获取
	userName = 'zhangSan';
	userId = 'zh008';
	userlevel = 1;
	cardInfo = [1231231,39811123,12938912];
	
	return {
		userName: userName,
		userId: userId,
		userlevel: userlevel,
		cardInfo: cardInfo
	}
}
//登录系统
function loginIn(){
	let phoneNum = $("#phoneNum").val();
	let codeNum = $("#codeNum").val();
	if(!phoneNum||!codeNum){
		alert("手机号或验证码不能为空，请确认！")
	}else{
		let userId = getUserInfo(phoneNum).userId;
		let userName = getUserInfo(phoneNum).userName;
		let userlevel = getUserInfo(phoneNum).userlevel;
		let cardInfo = getUserInfo(phoneNum).cardInfo;
		storeId(userId);
		storePhone(phoneNum);
		$("#loginCon1").hide();
		$("#loginCon2").show();
		initSearchPage(userName,userlevel,cardInfo);//初始化查询页面
	}
}
//推出系统
function loginOut(){
	localStorage.clear()//如果点击退出则清空本地数据
	init();
}
//查询数据
function search(callback){
//	let $cardBox = $(".cardBox");
//	let $cardList = $(".cardBox").find('.cardNum');
//	let cardInfo = [];
//	for(let i=0;i<$cardList.length;i++){
//		cardInfo.push($cardList.eq(i).html())
//	}

//	new Promise(function(resolve,reject){
//		getData(url,'post','6月份',resolve)
//	}).then(function(){
//		//将数据赋予图表
//		callback();
//	})
	callback();
}
//存储用户id到本地
function storeId(data){
	localStorage.setItem('userId',data);
}
//存储用户手机号到本地
function storePhone(data){
	localStorage.setItem('phoneNum',data);
}
//清除数据
//function clearData(name){
//	localStorage.removeItem(name);
//}
//**********jquery*************

$(function(){
	$(".formIn").focus(function(){
		showForm($(this))
	})
})
	


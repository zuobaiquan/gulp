/**
 * 方法：超长字符串显示处理
 * 
 * 功能：本方法用于处理字符串长度超过单元格显示长度问题
 *       title显示【原字符串】
 *       单元格显示【截取字符串】  
 *       
 * 参数: varObject   目标单元格对象
 *       varLength   页面单元格显示长度
 */
function longStrShow(varObject,varLength){
	var str = varObject.text().replace(/^\s*/,"").replace(/\s*$/,"");
	varObject.attr("title",str);
	if(getLength(str) > varLength){
		if(str.length>50){
			str=str.substring(0,49);
		}
		varObject.text(strLeft(str,varLength));
	}
}

/**
 * 方法：超长字符串显示处理
 * 
 * 功能：本方法用于处理字符串长度超过单元格显示长度问题
 *       title显示【原字符串】
 *       单元格显示【截取字符串...】  
 *       
 * 参数: varObject   目标单元格对象
 *       varLength   页面单元格显示长度
 */
function longStrView(varObject,varLength){
	var str = varObject.text().replace(/^\s*/,"").replace(/\s*$/,"");
	//varObject.attr("title",str);
	if(getLength(str) > varLength){
		if(str.length>50){
//			str=str.substring(0,49);
		}
		varObject.text(strLeft(str,varLength-3) + "...");
		varObject.attr("title",str);
	}
}

/**
 * 长度取得
 * 汉字算2位
 */
function getLength(varStr){
	var length = varStr.length;
  	var regC = /^[\u4E00-\u9FA5]/;
	for(var i=0;i<varStr.length;i++){
		if(regC.test(varStr.charAt(i))){
			length+=1;
		}
	}
	return length;
}

/**
 * 截字符串
 * 最后一位是汉字，不截取该汉字
 */
function strLeft(varStr,varLength){
	var length = 0;
  	var regC = /^[\u4E00-\u9FA5]/;
	for(var i=0;i<varStr.length;i++){
		if(regC.test(varStr.charAt(i))){
			varLength -=2;
			length+=1;
		}else{
			varLength -=1;
			length+=1;
		}
		if(varLength<0){
			length-=1;
			break;
		}
		if(varLength==0){
			break;
		}
	}
	return varStr.substring(0,length);
}
$(function(){
	//截取字符串
	cutStr();
});
function cutStr(){
	$("*[data-len]").each(function(){
		var len=$(this).attr("data-len");
		longStrView($(this),len);
	});
}
function anyCutStr(){
	$("*[data-len2]").each(function(){
		var len=$(this).attr("data-len2");
		longStrView($(this),len);
	});
}

//接口地址
var url_appNum = config_url+'/ReportPlatform/applicationcount';//应用总数
var url_appDetail = config_url+'/ReportPlatform/applications';//所有应用名目
var url_appIdDetail = config_url+'/ReportPlatform/application';//某ID下应用名目

function isEmpty(obj){//判断对象是否为空
	for(var key in obj){return false;}
	return true;
}

//vue应用
var app = new Vue({
	el: '#applyApp',
	data: {
		show:'true',//控制显隐
		index:0,//页面索引（第几页）
		jumpIndex:0,//跳转到第几页
		perpage:5,//每页数量，默认为5
		//thisDeviceType:'',//当前选中设备类型
		thisAppId:'',//当前输入应用ID
		selType:[
			{type:'所有应用'},
			{type:'应用ID'}
		],
		appNum: 0,//某类型下的应用数量
		dAppDetail: {},//所有应用名目
		appIdDetail: {}//某id下查询的设备名目
	},
	methods: {
		changeShow: function(){//切换不同查询条件时控制模块显隐藏并初始化分页数据
			this.show = !this.show;
			this.index = 0;
			this.jumpIndex = 0;
			this.perpage = 5;
			this.appNum = 0;
			this.dAppDetail = {};
			this.appIdDetail = {};
		},
		data_appNum: function(){//获取应用数量
			var appNum = this.appNum;
			getData(url_appNum,'get',{type: this.thisDeviceType},function(data){
				appNum = data.count;
			})
			this.appNum = appNum;
		},
		changeIndex: function(event,data,callback){//分页按钮操作
			var this_className = event.target.id;
			switch(this_className){
				case 'firstP':
					this.index = 0;
					break;
				case 'preP':
					this.index = this.index==0?0:this.index-1;
					break;
				case 'nextP':
					//this.index = (this.index+1==(Math.ceil(this.appNum/this.perpage)==0?1:Math.ceil(this.appNum/this.perpage)))?(Math.ceil(this.appNum/this.perpage)==0?1:Math.ceil(this.appNum/this.perpage)-1):this.index+1;
					var pageNum = Math.ceil(this.appNum/this.perpage)==0?1:Math.ceil(this.appNum/this.perpage);
					if(this.index+1 == pageNum){
						return;
					}else{
						this.index += 1;
					}
					break;
				case 'lastP':
					this.index = this.index<=0?0:Math.ceil(this.appNum/this.perpage)-1;
					break;
				case 'jumpP':
					this.index = (this.jumpIndex>Math.ceil(this.appNum/this.perpage))?this.index:(this.jumpIndex<=0?this.index:this.jumpIndex-1);
					break;
			}
			if(isEmpty(data)){//如果当前没有数据则不请求数据（即不去请求并更新页面）
				return;
			}else{
				callback();
			}
		},
		changePerpage: function(event,data,callback){
			this.perpage = event.target.getElementsByTagName('option')[event.target.selectedIndex].innerText;
			this.index = 0;
			if(isEmpty(data)){//如果当前没有数据则不请求数据（即不去请求并更新页面）
				return;
			}else{
				callback();
			}
		},
		data_dAppDetail: function(){//获取应用名目数据
			var dAppDetail;
			getData(url_appDetail,'get',{index: this.index,perpage:this.perpage},function(data){
				dAppDetail = data.list;
			})
			this.dAppDetail = dAppDetail;
			this.data_appNum();
		},
		data_appIdDetail: function(){//获取应用名目数据
			var appIdDetail;
			if(this.thisAppId == ''){
				alert('请输入查询ID再查询！');
				return;
			}
			getData(url_appIdDetail,'get',{id: this.thisAppId},function(data){
				appIdDetail = data.app;
			})
			this.appIdDetail = appIdDetail;
			if(isEmpty(appIdDetail)){
				alert('当前输入ID查不到数据，可能您的输入有误，请确认！');
				return;
			}
			this.appNum = appIdDetail.length||0;
		}
	}
})


window.onload = function(){
	//加载完成后显示内容主体，避免vue的解析闪烁
	document.getElementById('loading').style.display = 'none'
	document.getElementById('applyApp').style.display = 'block'
}

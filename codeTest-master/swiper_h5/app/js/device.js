
//接口地址
var url_deviceType = config_url+'/ReportPlatform/devicetype';//设备类型
var url_deviceNum = config_url+'/ReportPlatform/devicecount';//设备总数
var url_dTypeDetail = config_url+'/ReportPlatform/devices';//某类型下设备名目
var url_dIdDetail = config_url+'/ReportPlatform/device';//某ID下设备名目
//接口地址(本地)
//var url_deviceType = 'http://localhost:3000/devicetype';//设备类型
//var url_deviceNum = config_url+'/ReportPlatform/devicecount';//设备总数
//var url_dTypeDetail = 'http://localhost:3000/devices';//某类型下设备名目
//var url_dIdDetail = 'http://localhost:3000/iDdevices';//某ID下设备名目

function isEmpty(obj){//判断对象是否为空
	for(var key in obj){return false;}
	return true;
}

//vue应用
var app = new Vue({
	el: '#deviceApp',
	data: {
		show:'true',//控制显隐
		index:0,//页面索引（第几页）
		jumpIndex:0,//跳转到第几页
		perpage:5,//每页数量，默认为5
		thisDeviceType:'',//当前选中设备类型
		thisDeviceId:'',//当前输入设备ID
		selType:[
			{type:'设备类型'},
			{type:'设备ID'}
		],
		//deviceType: data_deviceType,
		deviceNum: 0,//某类型下的设备数量
		dTypeDetail: {},//某类型下查询的设备名目
		dIdDetail: {}//某id下查询的设备名目
	},
	computed: {
		deviceType: function(){//设备类型
			var data_deviceType;
			getData(url_deviceType,'get',{},function(data){
				data_deviceType = data.type;
			})//设备类型
			this.thisDeviceType  = data_deviceType[0].type;//将第一条数据设为默认的当前选中设备类型
			return data_deviceType;
		}
	},
	methods: {
		changeShow: function(){//切换不同查询条件时控制模块显隐藏并初始化分页数据
			this.show = !this.show;
			this.index = 0;
			this.jumpIndex = 0;
			this.perpage = 5;
			this.deviceNum = 0;
			this.dTypeDetail = {};
			this.dIdDetail = {};
		},
		data_deviceNum: function(){//获取设备数量
			var deviceNum = this.deviceNum;
			getData(url_deviceNum,'get',{type: this.thisDeviceType},function(data){
				deviceNum = data.count;
			})
			this.deviceNum = deviceNum;
		},
		data_thisDeviceType: function(event){//设置当前设备类型数据
			var thisDes = event.target.getElementsByTagName('option')[event.target.selectedIndex];
			this.thisDeviceType = thisDes.id;
		},
		changeIndex: function(event,data,callback){//改变页面索引
			var this_className = event.target.id;
			switch(this_className){
				case 'firstP':
					this.index = 0;
					break;
				case 'preP':
					this.index = this.index==0?0:this.index-1;
					break;
				case 'nextP':
					//this.index = (this.index==0)?this.index:((this.index==Math.ceil(this.deviceNum/this.perpage)-1)?(Math.ceil(this.deviceNum/this.perpage)-1):(this.index+1))
					var pageNum = Math.ceil(this.deviceNum/this.perpage)==0?1:Math.ceil(this.deviceNum/this.perpage);
					if(this.index+1 == pageNum){
						return;
					}else{
						this.index += 1;
					}
					break;
				case 'lastP':
					this.index = this.index<=0?0:Math.ceil(this.deviceNum/this.perpage)-1;
					break;
				case 'jumpP':
					this.index = (this.jumpIndex>Math.ceil(this.deviceNum/this.perpage))?this.index:(this.jumpIndex<=0?this.index:this.jumpIndex-1);
					break;
			}
			if(isEmpty(data)){//如果当前没有数据则不请求数据（即不去请求并更新页面）
				return;
			}else{
				callback();
			}
		},
		changePerpage: function(event){
			this.perpage = event.target.getElementsByTagName('option')[event.target.selectedIndex].innerText;
			this.index = 0;
		},
		data_dTypeDetail: function(){//获取设备名目数据
			var dTypeDetail;
			getData(url_dTypeDetail,'get',{type: this.thisDeviceType,index:this.index,perpage:this.perpage},function(data){
				dTypeDetail = data.list;
			})
			this.dTypeDetail = dTypeDetail;
			this.data_deviceNum();
		},
		data_dIdDetail: function(){//获取设备名目数据
			var dIdDetail;
			if(this.thisDeviceId == ''){
				alert('请输入查询ID再查询！');
				return;
			}
			getData(url_dIdDetail,'get',{id: this.thisDeviceId},function(data){
				dIdDetail = data.device;
			})
			this.dIdDetail = dIdDetail;
			if(isEmpty(dIdDetail)){
				alert('当前输入ID查不到数据，可能您的输入有误，请确认！');
				return;
			}
			this.deviceNum = dIdDetail.length||0;
		}
	}
})


window.onload = function(){
	//加载完成后显示内容主体，避免vue的解析闪烁
	document.getElementById('loading').style.display = 'none'
	document.getElementById('deviceApp').style.display = 'block'
}

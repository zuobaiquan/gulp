
// 使用刚指定的配置项和数据显示图表。
//myChart.setOption(option);

//异步执行同步化函数
function promise(callback){
	return new Promise(function(resolve,reject){
		callback;
		resolve();
	})
}

window.onload = function(){
	addVal = 100;//终止index页面中的动画
	new Promise(function(resolve,reject){
		let addVal=0;
		let $processW = parseInt($process.style.width);
		let $valNum = parseInt($val.innerHTML);
		(function loadingMove(){
			if(addVal<=100-$processW){
				$process.style.width = $processW+addVal+'%';
				$val.innerHTML = $valNum+addVal+'%';
				addVal++;
				requestAnimationFrame(loadingMove)
			}else{
				resolve();
			}
		})();
	}).then(function(value){
		$mask.parentNode.removeChild($mask);
	})
	//$mask.parentNode.removeChild($mask); //加载完成移除"加载中"的显示
	//$(".p3Ele1_blue_box").css('height','10rem');为柱形图设置高度
	
}
var app = new Vue({
	el:'#app',
	data:{
		contentShow: false,
		actionMaskShow:false,//信息提示框显隐
		dataLoadingShow:false,//数据加载菊花显隐
		swiperAppShow:false,
		actionInfo:'',
		slideShow: {//控制需要显隐藏的silde及内容的显隐
			page3Con1Show: false,
			page3Con2Show: false,
			page3Con3Show: false,
			page3Con4Show: false,
			page4Con1Show: false,
			page4Con2Show: false,
			page6Con1Show: false,
			page6Con2Show: false,
			page6Con3Show: false,
			page7Con1Show: false,
			page7Con2Show: false,
			page7Con3Show: false
		},
		swiper:{},
		monthNum: 6,
		loginConShow:true, 
		phoneNumInShow:false,
		checkCodeInShow:false,
		cardInShow: false,
		phoneNum:'',
		codeNum:'',
		thisCardNum:'',
		userName: '',//用户名
		userId: '',//用户id
		userlevel: 0,//用户等级
		cardInfo:[],//用户的卡
		bill:{//账单信息
			bus_count: 0,	//公交乘坐次数
			subway_count:0,	//地铁乘坐次数
			park_count:0,	//P+R停车次数
			ride_time:0,	//乘车时间（h）
			ride_km:0,		//乘车里程（km）
			westlake_round:0,	//绕西湖圈数
			fitness_count:0,	//校园健身次数
			fitness_time:0,	//校园健身时间
			save_electricity:0,	//节省电量
			online_recharge_count:0,	//线上充值次数
			online_recharge_money:0,	//线上充值金额（元，2位小数）
			medical_count:0,	//医疗预约次数
			inter_room_settlement:0,	//诊间结算次数
			save_wait_time:0,	//节省排队时间
			cost_money:0,	//本月总消费金额（元，2位小数）
			save_money:0,	//本月节省金额（元，2位小数）
			bus_cost:0,		//公交花费（元，2位小数）
			subway_cost:0,	//地铁花费（元，2位小数）
			park_cost:0,	//P+R花费
			save_co2:0,		//节省CO2排放量
			save_rank:0	//碳节省打败人数百分比
		}
	},
	mounted: function(){
		this.init();
		var $counter = $('.counter');
		document.querySelector('#swiperApp').style.display = 'block';
		this.mySwiper();
	},
	methods: {
		mySwiper: function(){
			let _this = this;
			this.swiper = new Swiper('.swiper-container', {
				height:window.innerHeight,//需要在样式中设定100%，见style.css
				noSwiping : true,//允许设置slide禁止切换
				loop: false,
				speed: 400,
				direction: 'vertical',
				autoplayStopOnLast: true,
				//hashnav: true,
				roundLengths: true,
				passiveListeners : false,//提升swiper在移动设备的中的scroll表现
				onInit: function(swiper) { //初始化
					swiperAnimateCache(swiper); //隐藏动画元素
					swiperAnimate(swiper); //初始化完成开始动画
					$(swiper.slides[swiper.activeIndex]).find('.counter').count();
				},
				onSlideChangeEnd: function(swiper) { //页面切换完成触发
					//swiperAnimateCache(swiper);
					var index = swiper.activeIndex;
					swiperAnimate(swiper); //执行动画（不加将没有效果）
					$(swiper.slides[swiper.activeIndex]).find('.counter').count();
					//$counter.eq(11).count();//数字滚动动画
					if($(swiper.slides[swiper.activeIndex]).attr('id')==='slide4'){
						if($("#main").length>0){
							$("#main").remove();
						}
						var myChartBox = $('.cxEchart');
						var myChartMain = $("<div id='main'></div>");
						myChartBox.append(myChartMain);
						var myChart = echarts.init(myChartMain[0]);
						// 指定图表的配置项和数据
						var option = {
						    series: [{
						        name: '访问来源',
						        type: 'pie',
						        radius : '70%',
						        center: ['50%', '50%'],
						        //roseType : 'radius',控制扇形的类型
					           // width: '40%',       // for funnel
					           // max: 40,            // for funnel
						        data:[
						            {value:_this.bill.bus_cost, name:'公交'},
						            {value:_this.bill.subway_cost, name:'地铁'},
						            {value:_this.bill.park_cost, name:'P+R'}
						        ],
						        itemStyle: {
						            emphasis: {
						                shadowBlur: 10,
						                shadowOffsetX: 0,
						                shadowColor: 'rgba(0, 0, 0, 0.5)',
						            },
						            normal: {
						            	borderColor: "#ffffff",
	      								borderWidth: "3",
	      								labelLine: {
	      									show:true,
	      									smooth: true
	      								}
						            }
						        },
						        label: {//标签
									normal: {
										show:true,
						                formatter: function(val){
						                	return val.name+"\n"+"(￥"+val.value+")";
						                	 //return val.name.split("").join("\n");//标签文字换行
						                }
//						                ,
//						                textStyle: {  
//			                          		fontWeight: 'bold' 
//				                      	} 
						            }
								}
						    }],
						    color:["#4ec0f2","#5bc5ba","#d196fa"],
						};
						myChart.setOption(option);
					}
				}
			})
		},
		removeSlideCon: function(){//根据数据判断页面显隐
			//this.swiper.removeSlide(1);//移除第二个页面，具体看数据
			//page3Con的判断
			if(Math.min(this.bill.bus_count,this.bill.subway_count)>this.bill.park_count){
				this.slideShow.page3Con1Show=true;
			}else{
				this.slideShow.page3Con1Show=false;
				this.slideShow.page3Con2Show = Math.max(this.bill.park_count,this.bill.subway_count)<this.bill.bus_count?true:false;
				this.slideShow.page3Con3Show = Math.max(this.bill.bus_count,this.bill.subway_count)<this.bill.park_count?true:false;
				this.slideShow.page3Con4Show = Math.max(this.bill.bus_count,this.bill.park_count)<this.bill.subway_count?true:false;
			}
			//page4Con的判断
			let p4radomNum = Math.ceil(Math.random()*2);
			if(p4radomNum===1){
				this.slideShow.page4Con1Show=true;
				this.slideShow.page4Con2Show=false;
			}else{
				this.slideShow.page4Con1Show=false;
				this.slideShow.page4Con2Show=true;
			}
			//page6Con的判断
			let p6radomNum = Math.ceil(Math.random()*2);
			if(this.bill.fitness_count===0){
				this.slideShow.page6Con3Show=true;
				this.slideShow.page6Con1Show=false;
				this.slideShow.page6Con2Show=false;
			}else{
				if(p6radomNum===1){
					this.slideShow.page6Con1Show=true;
					this.slideShow.page6Con2Show=false;
					this.slideShow.page6Con3Show=false;
				}else{
					this.slideShow.page6Con1Show=false;
					this.slideShow.page6Con2Show=true;
					this.slideShow.page6Con3Show=false;
				}
			}
			//page7Con的判断
			let p7radomNum = Math.ceil(Math.random()*2);
			if(this.bill.online_recharge_count===0&&this.bill.medical_count===0&&this.bill.inter_room_settlement===0){
				this.slideShow.page7Con1Show=true;
				this.slideShow.page7Con2Show=false;
				this.slideShow.page7Con3Show=false;
			}else{
				if(p7radomNum===1){
					this.slideShow.page7Con3Show=true;
					this.slideShow.page7Con2Show=false;
					this.slideShow.page7Con1Show=false;
				}else{
					this.slideShow.page7Con3Show=false;
					this.slideShow.page7Con2Show=true;
					this.slideShow.page7Con1Show=false;
				}
			}
		},
		isWeiXin: function(){//判断是不是微信页面
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
			}else{
				return false;
			}
		},
		alertInfo: function(info){
			this.actionMaskShow = true;
			this.actionInfo = info;
			this.$refs.action.setAttribute('class',"action actionAni")
		},
		//读取localStorage中的用户信息初始化
		init: function(){
			//localStorage.clear();
			let _this = this;
			let userId = localStorage.getItem('userId')||null;
			if(!userId){
				this.loginConShow = true;
				this.phoneNum = '';
				this.codeNum = '';
				this.thisCardNum = '';
			}else{
				this.phoneNum = localStorage.getItem('phoneNum');
				this.getUserInfo(this.phoneNum).then(function(){
					_this.initSearchPage();//如果本地有数据初始化查询页面
					_this.loginConShow = false;
				})
				
			}
		},
		//初始化查询页
		initSearchPage: function(){
			//let $loginName = $("#loginName");
			if(this.userlevel===0){
				this.loginName = '未实名';
			}
		},
		goReal: function(){
			this.alertInfo('当前用户未实名，请至【杭州市民卡】APP完成实名操作！')
		},
		//验证码倒计时
		getYzm: function($event,time){
			let obj = $event.target;
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
			
		},
		cPNShow: function(){//手机号弹出框的显隐
			this.phoneNumInShow = !this.phoneNumInShow;
			if(this.phoneNumInShow){//如弹出则激活弹出框输入框
				$(this.$refs.phoneNum).blur();
				$(this.$refs.phoneNumT).focus();
			}
		},
		cCCShow: function(){//验证码弹出框的显隐
			this.checkCodeInShow = !this.checkCodeInShow;
			if(this.checkCodeInShow){//如弹出则激活弹出框输入框
				$(this.$refs.codeNum).blur();
				$(this.$refs.codeNumT).focus();
			}
		},
		cIshow: function(){//添加卡弹出框的显隐
			this.cardInShow = !this.cardInShow;
			if(this.cardInShow){//如弹出则激活弹出框输入框
				$(this.$refs.cardNum).blur();
				$(this.$refs.cardNumT).focus();
			}
		},
		//检查是否手机号是否合规
		checkPhone: function(value){
			var value = this.phoneNum;
			var r = /^1[358][0-9]{9}$/;
			if(r.test(value)){
				this.cPNShow();//如果合规就关闭弹出的输入框
			}else{
				this.alertInfo('这不是手机号,请重新输入'); 
			}
			
		},
		//检查是否验证码是否正确
		checkCode: function(value){
			var value = this.codeNum;
			var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
			if(r.test(value)){
				this.cCCShow();//如果合规就关闭弹出的输入框
			}else{
				this.alertInfo('验证码不正确，请确认输入！')
			}
			
		},
		//检查是否杭州通卡有效
		checkCard: function(value){
			var value = this.thisCardNum;
			var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
			if(r.test(value)){
				this.cIshow();//如果合规就关闭弹出的输入框
			}else{
				this.alertInfo('卡号不正确，请确认后添加！');
			}
		},
		//添加杭州通卡
		addCard: function(){
			let value = this.thisCardNum;
			if(value){
				if(this.cardInfo.length>=3){
					this.alertInfo('限定查询卡数为3张，您不能再添加了哦！')
					return;
				}
				this.cardInfo.push(value);
				this.thisCardNum='';
				this.addCardToData(value);
			}else{
				this.alertInfo('卡号不能为空')
			}
		},
		//添加杭州通卡到数据库
		addCardToData: function(value){
			//alert(value);
		},
		//删除杭州通卡
		delCard: function(key){
			this.cardInfo.splice(key,1);
			this.delCardInData(value);
		},
		//删除数据库中的该杭州通卡
		delCardInData: function(value){
			//alert(value);
		},
		setValue: function(name,value){//设置实例属性值
			this[name] = value;
		},
		getValue: function(name){//设置实例属性值
			return this[name];
		},
		//通过手机号获取用户id,用户名,等级和卡信息
		getUserInfo: function(phoneNum){
			let _this = this;
			//下述数据通过手机号ajax获取
			return new Promise(function(resolve,reject){
				_this.dataLoadingShow = true;
				getData("http://localhost:3000/userInfo",'get',phoneNum,resolve);
			}).then(function(value){
				_this.dataLoadingShow = false;
				_this.userName = value.userName;
				_this.userId = value.userId;
				_this.userlevel = value.userlevel;
				_this.cardInfo = value.cardInfo;
			})
				
		},
		getCardInfo: function(){
			let _this = this;
			//下述数据通过手机号ajax获取
			sessionStorage.clear()
			return new Promise(function(resolve,reject){
				_this.dataLoadingShow = true;
				if(!sessionStorage.getItem('cardInfo')){
					getData("http://localhost:3000/cardInfo",'get',{},resolve);
				}else{
					resolve(JSON.parse(sessionStorage.getItem('cardInfo')))
				}
			}).then(function(value){
				//sessionStorage.setItem('cardInfo',JSON.stringify(value));//暂存数据，刷新可用避免重新请求
				_this.dataLoadingShow = false;
				_this.bill.bus_count= value.bus_count;	//公交乘坐次数
				_this.bill.subway_count= value.subway_count;	//地铁乘坐次数
				_this.bill.park_count= value.park_count;	//P+R停车次数
				_this.bill.ride_time= value.ride_time;	//乘车时间（h）
				_this.bill.ride_km= value.ride_km;		//乘车里程（km）
				_this.bill.westlake_round= value.westlake_round;	//绕西湖圈数
				_this.bill.fitness_count= value.fitness_count;	//校园健身次数
				_this.bill.fitness_time= value.fitness_time;	//校园健身时间
				_this.bill.save_electricity= value.save_electricity;	//节省电量
				_this.bill.online_recharge_count= value.online_recharge_count;	//线上充值次数
				_this.bill.online_recharge_money= value.online_recharge_money;	//线上充值金额（元，2位小数）
				_this.bill.medical_count= value.medical_count;	//医疗预约次数
				_this.bill.inter_room_settlement= value.inter_room_settlement;	//诊间结算次数
				_this.bill.save_wait_time= value.save_wait_time;	//节省排队时间
				_this.bill.cost_money= value.cost_money;	//本月总消费金额（元，2位小数）
				_this.bill.save_money= value.save_money;	//本月节省金额（元，2位小数）
				_this.bill.bus_cost= value.bus_cost;		//公交花费（元，2位小数）
				_this.bill.subway_cost= value.subway_cost;	//地铁花费（元，2位小数）
				_this.bill.park_cost= value.park_cost;	//P+R花费
				_this.bill.save_co2= value.save_co2;		//节省CO2排放量
				_this.bill.save_rank= value.save_rank;	//碳节省打败人数百分比
			})
		},
		//登录系统
		loginIn: function(){
			let _this = this;//存储this对象，不然then中的this指向的非vue实例
			let phoneNum = this.phoneNum;
			let codeNum = this.codeNum;
			if(!phoneNum||!codeNum){
				this.alertInfo("手机号或验证码不能为空，请确认！")
			}else{
				this.getUserInfo(phoneNum).then(function(){
					let userId = _this.userId;
					_this.storeId(userId);
					_this.storePhone(phoneNum);
					_this.loginConShow = false;
					_this.initSearchPage();//初始化查询页面
				})
			}
		},
		//推出系统
		loginOut: function(){
			localStorage.clear()//如果点击退出则清空本地数据
			this.init();
		},
		//查询数据
		search: function(){
		//	let $cardBox = $(".cardBox");
		//	let $cardList = $(".cardBox").find('.cardNum');
		//	let cardInfo = [];
		//	for(let i=0;i<$cardList.length;i++){
		//		cardInfo.push($cardList.eq(i).html())
		//	}
			let _this=this;
			this.getCardInfo().then(function(){
				_this.removeSlideCon();//控制内容显隐
				_this.swiper.slideNext();
			})
		},
		//存储用户id到本地
		storeId: function(data){
			localStorage.setItem('userId',data);
		},
		//存储用户手机号到本地
		storePhone: function(data){
			localStorage.setItem('phoneNum',data);
		},
	}
	
})
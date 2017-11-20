$(document).ready(function() {
	BaseInfo.init();
	BaseInfo.smartShow();
	Right.init();
	Edu.init();
	Exp.init();
	Photos.init();
	Highlights.init();
	bindMouseEvent();
	getFullPartInfo();
	$("#ptRresume").click(function() {
		try {
			clickLog("from=jianli_post_partime_show2_edittocreate")
		} catch (err) {}
	});
	$("#ptRresumeChk").addClass("checked");
	try {
		var showed = $("#containerexperience").is(":visible");
		if (!showed) {
			var wfrom = Utility.getQueryString("wfrom");
			if (null != wfrom && wfrom == "resumeeduedit") {
				pgoToExp()
			}
		}
	} catch (err) {}
});
var isChange = false;
var isCreatePart = false;
var partRid = 0;
var sensitivePicUrl = "http://jianli.58.com/post/sensitive/rs";
var sensitiveMobileUrl = "http://jianli.58.com/post/sensitive/rbs";
var BaseInfo = function() {
	var authTips = "è¯¥å·ç è¿˜æœªéªŒè¯ï¼ŒéªŒè¯å·ç å¯ä»¥æœ‰æ•ˆå¢žåŠ æµè§ˆé‡å“¦";
	var isSendCode = false;
	var maxSecond = 180;
	var intervalPointer;
	var xmlHttp;
	var postJsonObj;
	var isAuthed = false;
	var isShowPicAuth = 0;
	var expArrayMap = [{
		d: "containerscholarship",
		m: 0,
		t: "sc",
		v: "SchoolInfoV2"
	}, {
		d: "containerexperience",
		m: 1,
		t: "ex",
		v: "Exp"
	}, {
		d: "containerexperience",
		m: 1,
		t: "ex",
		v: "Exp"
	}, {
		d: "containerexperience",
		m: 1,
		t: "ex",
		v: "Exp"
	}, {
		d: "containerexperience",
		m: 1,
		t: "ex",
		v: "Exp"
	}, {
		d: "containerscholarship",
		m: 0,
		t: "sc",
		v: "SchoolInfoV2"
	}, {
		d: "containerexperience",
		m: 1,
		t: "ex",
		v: "Exp"
	}];
	var eduArrayMap = [null, null, null, [{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}],
		[{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}],
		[{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}, {
			d: "languagelist",
			m: 1,
			t: "la",
			v: "LanguageV2"
		}, {
			d: "containercert",
			m: 0,
			t: "ce",
			v: "CertV2"
		}],
		[{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}, {
			d: "languagelist",
			m: 1,
			t: "la",
			v: "LanguageV2"
		}, {
			d: "containercert",
			m: 0,
			t: "ce",
			v: "CertV2"
		}],
		[{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}, {
			d: "languagelist",
			m: 1,
			t: "la",
			v: "LanguageV2"
		}, {
			d: "containercert",
			m: 0,
			t: "ce",
			v: "CertV2"
		}],
		[{
			d: "containereducation",
			m: 1,
			t: "ed",
			v: "Edu"
		}, {
			d: "containerSkill",
			m: 0,
			t: "sk",
			v: "SkillV2"
		}, {
			d: "languagelist",
			m: 1,
			t: "la",
			v: "LanguageV2"
		}, {
			d: "containercert",
			m: 0,
			t: "ce",
			v: "CertV2"
		}]
	];
	var eduConverter = ["é«˜ä¸­ä»¥ä¸‹", "é«˜ä¸­ä»¥ä¸‹", "é«˜ä¸­", "ä¸­ä¸“/æŠ€æ ¡", "å¤§ä¸“", "æœ¬ç§‘", "ç¡•å£«", "åšå£«", "MBA/EMBA"];
	var expConverter = ["æ— ç»éªŒ", "1-3å¹´", "3-5å¹´", "5-10å¹´", "10å¹´ä»¥ä¸Š", "åº”å±Šç”Ÿ", "1å¹´ä»¥ä¸‹"];
	var workyears = -1;
	var usereducation = -1;
	return {
		isLowResume: function() {
			return $("#lowerResumeFlag").val()
		},
		getExpVal: function() {
			var intVal = parseInt($("#selWorked").attr("k"));
			if (intVal == -1) {
				intVal == 0
			}
			return intVal
		},
		getEduVal: function() {
			var intVal = parseInt($("#selEducation").attr("k"));
			if (intVal == -1) {
				intVal == 0
			}
			return intVal
		},
		smartShow: function() {
			$("#selectMode li").each(function(index, obj) {
				var tmpobj = $(this).attr("c");
				if (tmpobj != "containerhighlights" && tmpobj != "containerphoto") {
					var len = $("#" + tmpobj).find(".showList:visible").length;
					if (tmpobj == "containerscholarship") {
						var len = $("#" + tmpobj).find(".showList:visible").length + $("#" + tmpobj).find(".apConShow:visible").length
					}
					if (len == 0) {
						$("#" + tmpobj).hide();
						$(this).show()
					} else {
						$(this).hide();
						var orginName = $(this).attr("jsname");
						var modelName = $(this).attr("jsname") + "V2";
						if (typeof orginName != "undefined") {
							LoaderRegiter.load(modelName)
						}
					}
				} else {
					$(this).hide();
					var orginName = $(this).attr("jsname");
					var modelName = $(this).attr("jsname") + "V2";
					if (typeof orginName != "undefined") {
						LoaderRegiter.load(modelName)
					}
				}
			});
			var expShowObj = expArrayMap[this.getExpVal()];
			if (typeof expShowObj != "undefined" && expShowObj != null) {
				if (expShowObj instanceof Array) {
					for (var i = 0; i < expShowObj.length; i++) {
						var innerObj = expShowObj[i];
						if (typeof innerObj.d != "undefined") {
							$("#" + innerObj.d).show();
							if (typeof innerObj.v != "undefined") {
								LoaderRegiter.load(innerObj.v)
							}
							$("#selectMode li[c=" + innerObj.d + "]").hide()
						}
					}
				} else {
					if (typeof expShowObj.d != "undefined") {
						$("#" + expShowObj.d).show();
						if (typeof expShowObj.v != "undefined") {
							LoaderRegiter.load(expShowObj.v)
						}
						$("#selectMode li[c=" + expShowObj.d + "]").hide()
					}
				}
			}
			var eduShowObj = eduArrayMap[this.getEduVal()];
			if (typeof eduShowObj != "undefined" && eduShowObj != null) {
				if (eduShowObj instanceof Array) {
					for (var i = 0; i < eduShowObj.length; i++) {
						var innerObj = eduShowObj[i];
						if (typeof innerObj.d != "undefined") {
							$("#" + innerObj.d).show();
							if (typeof innerObj.v != "undefined") {
								LoaderRegiter.load(innerObj.v)
							}
							$("#selectMode li[c=" + innerObj.d + "]").hide()
						}
					}
				} else {
					if (typeof eduShowObj.d != "undefined") {
						if (typeof eduShowObj.v != "undefined") {
							LoaderRegiter.load(eduShowObj.v)
						}
						$("#" + eduShowObj.d).show();
						$("#selectMode li[c=" + eduShowObj.d + "]").hide()
					}
				}
			}
			if (this.getExpVal() == 0 && (this.getEduVal() <= 3 || this.getEduVal() >= 7) && $("#containerscholarship .infoContent").length == 0) {
				$("#containerscholarship").hide();
				$("#selectMode li[c=containerscholarship]").hide()
			}
		},
		hidLive: function(id) {
			$("#" + id).hide()
		},
		getWorkYear: function() {
			return workyears
		},
		getEduY: function() {
			return usereducation
		},
		getMobileAuth: function() {
			if (isSendCode == false) {
				var v1 = $.fmValidator.textvalidate("txtMobileModify", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "ä¼ä¸šä¼šé€šè¿‡æ­¤å·ç è”ç³»æ‚¨ï¼Œè®¤è¯èƒ½æé«˜å¯ä¿¡åº¦å“¦ï¼", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦");
				if (v1) {
					var mobile = $("#txtMobileModify").val();
					var postJs = {
						m: mobile
					};
					var operate = "getAuthKey";
					isValid = "0";
					xmlHttp = SimpleXhrFactory.createXhrObject();
					$.xmlPost(postJs, BaseInfo.authKeyBack, xmlHttp, operate, "getAuthKey")
				}
			}
		},
		authKeyBack: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						popupWin(xmlHttp.responseText.split(":")[1], "æ¸©é¦¨æç¤º", 4e3, 350, 150, "çŸ¥é“äº†")
					} else {
						BaseInfo.switchAuthViewInvalid()
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		posCateIndexInit: function() {
			$("#inpJobCate").bind("keyup.textchange", function() {
				var jobcatein = $("#divJobCatein");
				var jobcate = $("#divJobCate");
				var inpJobCate = $("#inpJobCate");
				var value = inpJobCate.val();
				if ("" == value) {
					jobcatein.hide();
					jobcate.show()
				} else {
					var catid = 9225;
					var url = "http://suggest.58.com.cn/searchsuggest_cate.do?inputbox=" + encodeURI(value) + "&cityid=1&catid=" + catid + "&num=8&callback=?";
					$.getJSON(url, function(data) {
						if (data) {
							var selectedJob = $("#selectedJob");
							var w = data.w;
							var danhang = $("#divJobCatein").find(".hotJobList");
							var html = "";
							for (var i = 0, len = w.length; i < len; ++i) {
								var word = w[i];
								var k = word.k;
								var n = word.n;
								var v = word.h[0].v;
								var dsid = word.cs[1].id;
								var cateid = word.cs[2].id;
								var checked = selectedJob.find("li[catename='" + word.k + "']").length > 0 ? " checked" : "";
								k = k.replace(v, '<span class="f-red">' + v + "</span>");
								html += '<li k="1" dsid="' + dsid + '" cateid="' + cateid + '"><i class="check"></i><span class="fl"><span k=\'' + word.k + "'>" + k + '</span></span><span class="fr"> </span></li>'
							}
							if (w.length > 0) {
								danhang.html(html).next().show();
								jobcatein.show()
							} else {
								html = '<a style="color:red;" onmouseover="this.style.background=\'none\';">æ‚¨å¥½ï¼Œæ²¡æœ‰è¯¥ç±»åˆ«</div>';
								danhang.html(html).next().hide();
								jobcatein.show()
							}
						}
					});
					jobcate.hide()
				}
			})
		},
		switchAuthViewInvalid: function() {
			isSendCode = true;
			$("#txtMobile").val($("#txtMobileModify").val());
			$("#txtMobile").attr("readonly", "readonly");
			$("#txtMobileModifyDiv").hide();
			$("#authmobileTd").show();
			if (!isChange) {
				$("#ahthInputEmptyTr").show().children("dt").removeClass("noNec").append("<b>*</b>")
			}
			$("#authmobileTd .codeInfo").show();
			intervalPointer = setInterval(BaseInfo.resendBtnShow, 1e3)
		},
		switchAuthViewValid: function() {
			maxSecond = 180;
			isSendCode = false;
			$("#mobileAuthBtn").show();
			$("#txtMobile").removeAttr("readonly", "readonly");
			$("#authmobileTd .codeInfo").hide()
		},
		resendBtnShow: function() {
			if (maxSecond > 0) {
				maxSecond--;
				$("#resendMsg").attr("href", "javascript:void(0);");
				$("#resendMsg").html("(" + maxSecond + "ç§’åŽ)é‡æ–°èŽ·å–çŸ­ä¿¡")
			} else {
				maxSecond = 180;
				clearInterval(intervalPointer);
				BaseInfo.resendBtnHide();
				var info = $("#txtMobileCodeInfo");
				clearInfoMsg(info)
			}
		},
		resendBtnHide: function() {
			isSendCode = false;
			$("#resendMsg").html("é‡å‘æ‰‹æœºéªŒè¯ç ");
			$("#resendMsg").attr("href", "javascript:BaseInfo.getMobileAuth();");
			$("#resendMsg").show();
			$("#txtMobile").removeAttr("readonly")
		},
		updateLowResume: function() {
			if (this.isLowResume() == 1) {
				$("#containerexperience .tips").show();
				$("#containerexperience .tipx").show();
				$("#containereducation .tips").show();
				$("#containereducation .tipx").show()
			} else {
				$("#containerexperience .tips").hide();
				$("#containerexperience .tipx").hide();
				$("#containereducation .tips").hide();
				$("#containereducation .tipx").hide()
			}
		},
		setLowInput: function(islow) {
			$("#lowerResumeFlag").val(islow)
		},
		init: function() {
			this.updateLowResume();
			this.posCateIndexInit();
			if (typeof $("#isAuthed") != undefined && $("#isAuthed").val() == "1") {
				isAuthed = true
			}
			if ($("#isAuthed").val() == "1") {
				$.fmValidator.addtextvalidate("txtMobile", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šåŠæ—¶ä¸Žæ‚¨è”ç³»ï¼è¯·æ”¾å¿ƒï¼Œæ‚¨ çš„å·ç ä¸ä¼šè¢«å…¬å¼€", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦")
			} else {
				$.fmValidator.addtextvalidate("txtMobile", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šåŠæ—¶ä¸Žæ‚¨è”ç³»ï¼è¯·æ”¾å¿ƒï¼Œæ‚¨ çš„å·ç ä¸ä¼šè¢«å…¬å¼€", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦", null, null, "è¯¥å·ç è¿˜æœªéªŒè¯ï¼ŒéªŒè¯å·ç å¯ä»¥æœ‰æ•ˆå¢žåŠ ç®€åŽ†æµè§ˆé‡å“¦")
			}
			$.fmValidator.addtextvalidate("InpUserJob", "^(?![0-9]{3,})[a-zA-Z0-9 ä¸€-é¾¥/,ï¼Œ]{2,12}$", "", "2-12ä¸ªå­—å“¦", "äº²ï¼Œ2-12ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å“¦", "å¿˜è®°å¡«å†™ç®€åŽ†æ ‡é¢˜å•¦ï¼Œå¦‚ï¼šæ±‚èŒé”€å”®ç»ç†ï¼Œ2å¹´ç»éªŒ", "", true);
			$.fmValidator.addtextvalidate("txtUserName", "^[ä¸€-é¾¥]{2,4}$", "", "è¯·å†™çœŸå®žå§“åå“¦ï¼Œ2-4ä¸ªæ±‰å­—", "äº²ï¼Œ2-4ä¸ªæ±‰å­—å“¦", "å¿˜è®°å¡«å†™å§“åå•¦");
			$.fmValidator.addtextvalidate("txtEmail", "(^[a-zA-Z0-9_-]|.)+@([a-zA-Z0-9_-]{1,12}.){1,2}([a-zA-Z0-9_-]|.cn|.org|.hk){2,4}$", "(.){40}", "è¯·å¡«å†™çœŸå®žé‚®ç®±ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "é‚®ç®±æ ¼å¼ä¸å¯¹å•¦ï¼Œæ­£ç¡®ä¾‹å¦‚name@sohu.com", "");
			$.fmValidator.addtextvalidate("txtHeight", "^[12][0-9]{2}$", "", "å•ä½ä¸ºåŽ˜ç±³ï¼Œéœ€å¡«å†™ä¸‰ä½æ•°ï¼Œå¦‚175cm", "è¾“å…¥æœ‰è¯¯ï¼Œå¦‚175cm", "å¿˜è®°å¡«å†™èº«é«˜å•¦");
			$.fmValidator.addtextBoxvalidate("txtOtherBright", 10, 500, "æœ€å¤šå¯å†™500å­—ï¼Œè¯·ä¸è¦è¾“å…¥ç”µè¯å’ŒQQå·å“¦ï¼", "æœ€å¤šå¯å†™500å­—ï¼Œè¯·ä¸è¦è¾“å…¥ç”µè¯å’ŒQQå·å“¦ï¼", null, "ç®€å•è¯´è¯´æ‚¨çš„ä¼˜åŠ¿ï¼Œå¯æé«˜15%çš„ä¸‹è½½å‡ çŽ‡ï¼ä¾‹å¦‚ï¼šèŒä¸šç‰¹é•¿ã€æ€§æ ¼ç‰¹ç‚¹ã€å²—ä½è¯ä¹¦....");
			$("#txtMobileCode").blur(function() {
				BaseInfo.checkIsRightAuth()
			}).keyup(function() {
				var info = $("#txtMobileCodeInfo");
				clearInfoMsg(info);
				info.removeClass($.fmValidator.errorclass);
				BaseInfo.checkIsRightAuth()
			});
			try {
				workyears = parseInt($("#selWorked").attr("k"));
				usereducation = parseInt($("#selEducation").attr("k"));
				if (usereducation == 6 || usereducation == 7) {
					Highlights.pushad(1)
				}
			} catch (err) {}
		},
		checkIsRightAuth: function() {
			if (isSendCode) {
				var v1 = $.fmValidator.textvalidate("txtMobile", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šåŠæ—¶ä¸Žæ‚¨è”ç³»ï¼è¯·æ”¾å¿ƒï¼Œæ‚¨ çš„å·ç ä¸ä¼šè¢«å…¬å¼€", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦");
				var v2 = false;
				if (v1) {
					if ($("#txtMobileCode").val().length == 6) {
						v2 = true
					}
				}
				if (v2) {
					var code = $("#txtMobileCode").val();
					var mobile = $("#txtMobile").val();
					var postObjCode = {
						code: code,
						mobile: mobile
					};
					var operate = "chkAuthKey";
					xmlHttp = SimpleXhrFactory.createXhrObject();
					$.xmlPost(postObjCode, BaseInfo.chkKeyBack, xmlHttp, operate, "chkAuthKey")
				}
			}
		},
		chkKeyBack: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					var info = $("#txtMobileCodeInfo");
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						isAuthed = false;
						info.removeClass("promptpop wrong2");
						info.addClass("promptpop wrong2");
						info.html('<span class="promptpos"><i></i><span class="prompttxt">æ‚¨è¾“å…¥çš„éªŒè¯ç æœ‰è¯¯ï¼Œè¯·é‡æ–°è¾“å…¥</span><span class="arrbg"></span></span>');
						info.show()
					} else {
						isAuthed = true;
						$("#txtMobileInfo").hide();
						$("#txtMobile").unbind();
						clearInfoMsg(info);
						$("#txtMobileCode").attr("readonly", "readonly");
						$("#mobileAuthBtn").hide();
						info.removeClass($.fmValidator.errorclass);
						info.html("<span class=\"codeSuccess fl\"><i class='sucIcon'></i>æ­å–œæ‚¨çš„æ‰‹æœºè®¤è¯æˆåŠŸï¼</span>");
						info.show();
						isValid = "1";
						$("#authmobileTd .codeInfo").hide();
						clearInterval(intervalPointer);
						maxSecond = 180;
						$("#resendMsg").html("(" + maxSecond + "ç§’åŽ)é‡æ–°èŽ·å–çŸ­ä¿¡")
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		subSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					$("#btninfo").removeAttr("disabled");
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "è¾“å…¥å†…å®¹å­˜åœ¨éžæ³•è¯!") {
							location.href = "http://jianli.58.com/resume/delmsg";
							return
						}
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText.indexOf("sensitive:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "code") {
							var sensitiveUrltmp = sensitivePicUrl + "?rid=" + postJsonObj.resumeid + "&oper=BaseInfo.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						} else {
							var sensitiveUrltmp = sensitiveMobileUrl + "?rid=" + postJsonObj.resumeid + "&oper=BaseInfo.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						}
					} else {
						location.href = "http://jianli.58.com/resumebase/?rid=" + postJsonObj.resumeid
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		switchvalCode: function(type) {
			if (type == true) {
				$("#txtValidateInfo").addClass($.fmValidator.errorclass);
				$("#txtValidateInfo").html($.fmValidator.tiphtml.replace("{0}", "éªŒè¯ç è¾“å…¥ä¸æ­£ç¡®å“¦!"));
				$("#txtValidateInfo").show()
			} else {
				$("#txtValidateInfo").hide()
			}
		},
		chgAuthMobile: function() {
			isChange = true;
			isAuthed = false;
			$.fmValidator.addtextvalidate("txtMobileModify", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šåŠæ—¶ä¸Žæ‚¨è”ç³»ï¼è¯·æ”¾å¿ƒï¼Œæ‚¨ çš„å·ç ä¸ä¼šè¢«å…¬å¼€", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦", null, null, "è¯¥å·ç è¿˜æœªéªŒè¯ï¼ŒéªŒè¯å·ç å¯ä»¥æœ‰æ•ˆå¢žåŠ ç®€åŽ†æµè§ˆé‡å“¦");
			$("#txtMobileAuthDiv").hide();
			$("#txtMobileModify").val("");
			$("#txtMobileModifyDiv").show();
			$("#ahthInputEmptyTr").show().children("dt").removeClass("noNec").append("<b>*</b>")
		},
		getSelectObj: function() {
			var selectObjs = new Array;
			$("#selectedJob").find("li").each(function() {
				selectObjs.push({
					dispCategoryID: $(this).attr("discateid"),
					cateName: $(this).text()
				})
			});
			return selectObjs
		},
		errorLog: function() {
			var errorStr = "from=PostFail";
			$("#aspnetform .promptpos").each(function(index, val) {
				var $parent = $(this).parent();
				if ($parent.attr("id") == "txtValidateInfo") {
					if ($parent.css("display") != "none") {
						errorStr += "&" + $parent.attr("id") + "=" + escape($(this).find(".prompttxt").html())
					}
				} else {
					errorStr += "&" + $parent.attr("id") + "=" + escape($(this).find(".prompttxt").html())
				}
			});
			if (window.clickLog) {
				window.clickLog(errorStr)
			} else {
				window.parent.clickLog && window.parent.clickLog(errorStr)
			}
		},
		subForm: function() {
			if (!BaseInfo.validate() || !Highlights.validate()) {
				var wrongNode = $(".wrong2"),
					wrongLen = wrongNode.length,
					i = 0;
				if (wrongNode.length) {
					(function(i) {
						if (wrongNode[i].innerHTML == "") {
							i++;
							arguments.callee(i)
						} else {
							wrongNode = $(wrongNode[i]);
							var idStr = wrongNode.attr("id") || "";
							if (idStr) {
								scroller(idStr, 700)
							}
						}
					})(i)
				}
				return
			}
			var otherBright = $("#txtOtherBright").val();
			if (otherBright == "ç®€å•è¯´è¯´æ‚¨çš„ä¼˜åŠ¿ï¼Œå¯æé«˜15%çš„ä¸‹è½½å‡ çŽ‡ï¼ä¾‹å¦‚ï¼šèŒä¸šç‰¹é•¿ã€æ€§æ ¼ç‰¹ç‚¹ã€å²—ä½è¯ä¹¦....") {
				otherBright = ""
			}
			var isAuth = $("#txtMobileAuthDiv").is(":visible");
			var usermobile = "";
			if (isAuth) {
				usermobile = $("#legalMobile").text();
				isValid = "1"
			} else {
				if ($("#txtMobileModifyDiv").is(":visible")) {
					usermobile = Utility.repLaceData($("#txtMobileModify").val().trimStr());
					isValid = "0"
				} else if ($("#authmobileTd").is(":visible")) {
					usermobile = Utility.repLaceData($("#txtMobile").val().trimStr())
				}
			}
			var trueName = Utility.repLaceData($("#txtUserName").val());
			var sex = $("i.radioIconSel").attr("value");
			if (typeof sex == "undefined") {
				sex = 0
			}
			var code = $("#txtMobileCode").val();
			var workyears = $("#selWorked").attr("k");
			var usereducation = $("#selEducation").attr("k");
			var useremail = Utility.repLaceData($("#txtEmail").val().trimStr());
			if (useremail == "ä¼ä¸šä¼šé€šè¿‡é‚®ç®±å‘é€é¢è¯•é‚€è¯·") {
				useremail = ""
			}
			var year = $("#inpBirthYear").attr("k");
			var month = $("#inpBirthMonth").attr("k");
			var birthdayShow = year + "å¹´" + month + "æœˆ";
			var birthday = year + "-" + month + "-00" + " 00:00:00";
			var nowLiveAddr = $("#txtlivecity").val() + $("#txtlivearea").val() + $("#txtlivename").val();
			var nativeId = $("#txtnativecity").attr("k");
			var provinceName = $("#txtnativeprovince").val() == "è¯·é€‰æ‹©çœ" ? "" : $("#txtnativeprovince").val();
			var nativecityName = $("#txtnativecity").val() == "è¯·é€‰æ‹©å¸‚" ? "" : $("#txtnativecity").val();
			var nativeName = "";
			if (provinceName == "åŒ—äº¬" || provinceName == "ä¸Šæµ·" || provinceName == "é‡åº†" || provinceName == "å¤©æ´¥" || provinceName == "é¦™æ¸¯" || provinceName == "å°æ¹¾" || provinceName == "æ¾³é—¨") {
				nativeName = provinceName
			} else {
				nativeName = provinceName + nativecityName
			}
			var cityName = $("#txtlivecity").val();
			var areaName = $("#txtlivearea").html();
			var liveName = $("#txtlivename").html();
			var userCity = $("#ddnowcity").attr("k");
			var jobuserCity = $("#ddtargetcity").attr("k");
			$(".recommendAdd dd").each(function() {
				if ($(this).attr("k")) {
					jobuserCity += "," + $(this).attr("k")
				}
			});
			if (jobuserCity.indexOf(",") == 0) jobuserCity = jobuserCity.substring(1, jobuserCity.length);
			var cateDisIdSb = new StringBuffer;
			var cateDisName = new StringBuffer;
			var selectObj = BaseInfo.getSelectObj();
			if (selectObj != null && selectObj.length > 0) {
				for (var i = 0; i < selectObj.length; i++) {
					cateDisIdSb.append(selectObj[i].dispCategoryID);
					cateDisName.append(selectObj[i].cateName);
					if (i != selectObj.length - 1) {
						cateDisIdSb.append(",");
						cateDisName.append("ã€")
					}
				}
			}
			var targetsalary = $("#selUserPosSala").attr("k");
			var resumeName = $("#InpUserJob").val();
			if (resumeName == "" || resumeName == "ä¾‹ï¼šæ±‚èŒé”€å”® 2å¹´ç»éªŒ") {
				resumeName = ""
			}
			var piccode = "";
			var trValidateObj = $("#trValidate");
			if (trValidateObj.is(":visible")) {
				piccode = $("#validatecode").val()
			}
			var userheight = "";
			if ($("#dlHeight").is(":visible")) {
				userheight = $("#txtHeight").val()
			} else {
				userheight = "-1"
			}
			var userlic = "";
			if ($("#dlLic").is(":visible")) {
				$("div.drLicCon input").each(function() {
					if ($(this).val() != "") {
						userlic += $(this).val() + ","
					}
				})
			} else {
				userlic = "-1"
			}
			var usercer = "";
			if ($("#dlCer").is(":visible")) {
				$("div.cerLicCon input").each(function() {
					if ($(this).val() != "") {
						usercer += $(this).val() + ","
					}
				})
			} else {
				usercer = "-1"
			}
			var userlang = "";
			if ($("#dlLang").is(":visible")) {
				if ($("#dlLang i").hasClass("checked")) {
					userlang += "æ™®é€šè¯,"
				}
				if ($("#txtGxLangP").val() != "" && $("#txtGxLangP").val() != "çœ/ç›´è¾–å¸‚") {
					userlang += $("#txtGxLangP").val();
					if ($("#txtGxLang").val() != "" && $("#txtGxLang").val() != "åŸŽå¸‚") {
						userlang += "|" + $("#txtGxLang").val();
						userlang = userlang.replace("|åŒ—äº¬", "").replace("|ä¸Šæµ·", "").replace("|å¤©æ´¥", "").replace("|é‡åº†", "").replace("|æ¾³é—¨", "").replace("|é¦™æ¸¯", "").replace("|å°æ¹¾", "")
					}
				}
			} else {
				userlang = "-1"
			}
			var opws = $("input[name='__post_gsxw']").val();
			postJsonObj = {
				resumeid: $("#hidresume").val(),
				resumename: resumeName,
				birthday: birthday,
				truename: trueName,
				sex: sex,
				workyears: workyears,
				usereducation: usereducation,
				code: code,
				usermobile: usermobile,
				useremail: useremail,
				usercity: userCity,
				targetAreaid: jobuserCity,
				targetdisCateIds: cateDisIdSb.toString(),
				targetsalary: targetsalary,
				userheight: userheight,
				userlic: userlic,
				usercer: usercer,
				userlang: userlang,
				"native": nativeId,
				isValid: isValid,
				vjsons: $("#jscode").val(),
				post_gsxw: opws,
				piccode: piccode,
				letter: Utility.repLaceData(otherBright)
			};
			var operate = "resumeinfo";
			$("#btninfo").attr("disabled", "disabled");
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(postJsonObj, BaseInfo.subSuccess, xmlHttp, operate, "addnewresumeV2")
		},
		validate: function() {
			var v1 = $.fmValidator.textvalidate("txtUserName", "^[ä¸€-é¾¥]{2,4}$", "è¯·å†™çœŸå®žå§“åå“¦ï¼Œ2-4ä¸ªæ±‰å­—", "è¯·å†™çœŸå®žå§“åå“¦ï¼Œ2-4ä¸ªæ±‰å­—", "äº²ï¼Œ2-4ä¸ªæ±‰å­—å“¦", "å¿˜è®°å¡«å†™å§“åå•¦");
			var v2 = true;
			var v3 = $.fmValidator.dateValidate("inpBirth", "å¿˜è®°é€‰æ‹©å‡ºç”Ÿå¹´æœˆå•¦!", "å¿˜è®°é€‰æ‹©å‡ºç”Ÿå¹´æœˆå•¦!");
			var v4 = $.fmValidator.spanVarvalidate("nowAreaCon", 0, 0, "çŽ°å±…ä½åœ°éœ€å¡«å†™åˆ°åŒºåŸŸå“¦", "çŽ°å±…ä½åœ°éœ€å¡«å†™åˆ°åŒºåŸŸå“¦", "ka");
			var v5 = true;
			var v6 = true;
			var v7 = true;
			if ($("#dlEdu").is(":visible")) {
				v6 = $.fmValidator.spanVarvalidate("selEducation", -1, 9, "å¿˜è®°é€‰æ‹©å­¦åŽ†å•¦", "å¿˜è®°é€‰æ‹©å­¦åŽ†å•¦") && $.fmValidator.spanHtmlVarvalidate("selEducation", "å¿˜è®°é€‰æ‹©å­¦åŽ†å•¦", "è¯·é€‰æ‹©");
				v7 = $.fmValidator.spanVarvalidate("selWorked", -1, -1, "å¿˜è®°é€‰æ‹©ç»éªŒå•¦", "å¿˜è®°é€‰æ‹©ç»éªŒå•¦") && $.fmValidator.spanHtmlVarvalidate("selWorked", "å¿˜è®°é€‰æ‹©ç»éªŒå•¦", "è¯·é€‰æ‹©")
			}
			var v8 = true;
			var authDiv = $("#txtMobileAuthDiv").is(":visible");
			if (!authDiv) {
				if ($("#txtMobileModifyDiv").is(":visible")) {
					v8 = $.fmValidator.textvalidate("txtMobileModify", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "ä¼ä¸šä¼šé€šè¿‡æ­¤å·ç è”ç³»æ‚¨ï¼Œè®¤è¯èƒ½æé«˜å¯ä¿¡åº¦å“¦ï¼", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦")
				} else {
					v8 = $.fmValidator.textvalidate("txtMobile", "^1([3,5,7,8][0-9]{9})|(47[0-9]{8})$", "ä¼ä¸šä¼šé€šè¿‡æ­¤å·ç è”ç³»æ‚¨ï¼Œè®¤è¯èƒ½æé«˜å¯ä¿¡åº¦å“¦ï¼", "è¯·å¡«å†™çœŸå®žæ‰‹æœºå·ç ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "æ‰‹æœºå·ç ä¸å¯¹å•¦ã€‚å‚è€ƒæ ¼å¼ï¼š138********", "å¿˜è®°å¡«å†™æ‰‹æœºå•¦")
				}
			}
			var v9 = true;
			if ($("#txtEmail").is(":visible") && $("#txtEmail").val() != "ä¼ä¸šä¼šé€šè¿‡é‚®ç®±å‘é€é¢è¯•é‚€è¯·") {
				var v9 = $.fmValidator.textvalidate("txtEmail", "(^[a-zA-Z0-9_-]|.)+@([a-zA-Z0-9_-]{1,12}.){1,2}([a-zA-Z0-9_-]|.cn|.org|.hk){2,4}$", "(.){40}", "è¯·å¡«å†™çœŸå®žé‚®ç®±ï¼Œä»¥ä¾¿ä¼ä¸šä¸Žæ‚¨è”ç³»å“¦", "é‚®ç®±æ ¼å¼ä¸å¯¹å•¦ï¼Œæ­£ç¡®ä¾‹å¦‚name@sohu.com", "")
			}
			selectObj = BaseInfo.getSelectObj();
			var v10 = true;
			if ($("#txtMobileCode").is(":visible")) {
				var val = $.trim($("#txtMobileCode").val());
				var $info = $("#txtMobileCode").next();
				if (!val) {
					v10 = false;
					$info.html('<span class="promptpos"><i></i><span class="prompttxt">æ‚¨å¿˜è®°å¡«éªŒè¯ç å•¦ï¼</span><span class="arrbg"></span></span>').addClass("promptpop wrong2")
				} else if (!/^\d{6}$/.test(val)) {
					$info.html('<span class="promptpos"><i></i><span class="prompttxt">æ‚¨å¡«å†™çš„éªŒè¯ç ä¸å¯¹å“¦ï¼</span><span class="arrbg"></span></span>').addClass("promptpop wrong2");
					v10 = false
				}
			}
			var v11 = isValidateTargJobCate(selectObj);
			if ($.trim($("#InpUserJob").val()) == "ä¾‹ï¼šæ±‚èŒé”€å”®ç»ç† 2å¹´ç»éªŒ") {
				$("#InpUserJob").val("")
			}
			var v12 = $.fmValidator.textvalidate("InpUserJob", "^(?![0-9]{3,})[a-zA-Z0-9 ä¸€-é¾¥/,ï¼Œ]{2,12}$", "", "2-12ä¸ªå­—å“¦", "äº²ï¼Œ2-12ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å“¦", "å¿˜è®°å¡«å†™ç®€åŽ†æ ‡é¢˜å•¦ï¼Œå¦‚ï¼šæ±‚èŒé”€å”®ç»ç†ï¼Œ2å¹´ç»éªŒ");
			var v13 = $.fmValidator.spanVarvalidate("selUserPosSala", -1, -1, "å¿˜è®°é€‰æ‹©æœˆè–ªå•¦", "å¿˜è®°é€‰æ‹©æœˆè–ªå•¦");
			var v14 = $.fmValidator.spanVarvalidate("ddtargetcity", 0, 0, "å¿˜è®°é€‰æ‹©åœ°åŒºå•¦", "å¿˜è®°é€‰æ‹©åœ°åŒºå•¦");
			var v15 = true;
			var v16 = true;
			if ($("#dlHeight").is(":visible")) {
				v16 = $.fmValidator.textvalidate("txtHeight", "^[12][0-9]{2}$", "", "å•ä½ä¸ºåŽ˜ç±³ï¼Œéœ€å¡«å†™ä¸‰ä½æ•°ï¼Œå¦‚175cm", "å¿˜è®°å¡«å†™èº«é«˜å•¦", "è¾“å…¥æœ‰è¯¯ï¼Œå¦‚175cm")
			}
			var v17 = true;
			if ($("#dlLic").is(":visible")) {
				v17 = $.fmValidator.spanVarvalidate("dlLic", 0, 0, "å¿˜è®°é€‰æ‹©é©¾ç…§å•¦", "å¿˜è®°é€‰æ‹©é©¾ç…§å•¦")
			}
			var v18 = true;
			if ($("#dlLang").is(":visible")) {
				v17 = $.fmValidator.spanVarvalidate("dlLang", 0, 0, "å¿˜è®°é€‰æ‹©ç†Ÿæ‚‰è¯­è¨€å•¦", "å¿˜è®°é€‰æ‹©ç†Ÿæ‚‰è¯­è¨€å•¦")
			}
			var trValidateObj = $("#trValidate");
			if (trValidateObj.is(":visible")) {
				var codeVal = $("#validatecode").val();
				if (codeVal.length != 5) {
					v15 = false;
					$("#txtValidateInfoTxt").html("éªŒè¯ç è¾“å…¥ä¸æ­£ç¡®ï¼");
					$("#txtValidateInfo").show()
				}
			}
			return v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11 && v12 && v13 && v14 && v15 && v16 && v17 && v18
		},
		modyinfo: function() {
			$("#baseshow").hide();
			$("#basemodify").show();
			Fixed_Box("#srfixed", 126)
		}
	}
}();
var Exp = function() {
	var xmlHttp;
	var subMitJsonObj;
	var expSalaryConverter = ["é¢è®®", "1000ä»¥ä¸‹", "1000-2000", "2000-3000", "3000-5000", "5000-8000", "8000-12000", "12000-20000", "20000-25000", "25000ä»¥ä¸Š"];
	var isAdd;
	return {
		switchExample: function(curIndex, maxInex) {
			for (var i = 1; i <= maxInex; i++) {
				if (curIndex == i) {
					$("#examp" + curIndex).toggle()
				} else {
					$("#examp" + i).hide()
				}
			}
		},
		init: function() {
			$.fmValidator.addtextvalidate("txtCompName", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[/]){2,30}$", "(&amp)|(&nbsp)", "2-30ä¸ªå­—å“¦ï¼Œå¯ä»¥è¾“å…¥æ±‰å­—ã€å­—æ¯å’Œæ•°å­—", "2-30ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œ( ).&", "å¿˜è®°å¡«å…¬å¸åç§°å•¦", "", true);
			$.fmValidator.addtextvalidate("txtPositionName", "^[u4e00-é¾¥a-zA-Z/]{2,12}$", "(&amp)|(&nbsp)", "2-12ä¸ªå­—å“¦", "äº²ï¼Œ2-12ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å“¦", "å¿˜è®°å¡«å†™èŒä½åç§°å•¦");
			$.fmValidator.addtextBoxvalidate("txtPerformance", 10, 800, "10-800ä¸ªå­—ï¼Œä¸å¯è¾“å…¥ç”µè¯ã€QQå’Œé‚®ç®±å“¦  ", "10-800ä¸ªå­—ï¼Œä¸å¯è¾“å…¥ç”µè¯ã€QQå’Œé‚®ç®±å“¦  ", "å¿˜è®°å¡«å·¥ä½œèŒè´£å•¦", "ç®€è¿°ä¸€ä¸‹å²—ä½èŒè´£å’Œå·¥ä½œä¸šç»©ï¼Œå¯ä½¿ç”¨äººå•ä½å¯¹ä½ äº†è§£æ›´å¤šï¼");
			if (!Exp.hasExpVal()) {
				Exp.showAddWin()
			} else {
				$("#tabModyExpe").hide();
				$("#tabModyExpe .cancelBtn").show()
			}
		},
		hasExpVal: function() {
			if ($("#expDiv div.experDetail").length == 0) {
				return false
			} else {
				return true
			}
		},
		showAddWin: function() {
			Exp.emptyInput();
			if (!Exp.hasExpVal()) {
				$("#tabModyExpe .cancelBtn").hide()
			} else {
				$("#tabModyExpe .cancelBtn").show()
			}
			$("#tabModyExpe").show();
			scroller("ex", 700)
		},
		validate: function() {
			var v1 = $.fmValidator.textvalidate("txtCompName", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[/]){2,30}$", "(&amp)|(&nbsp)", "2-30ä¸ªå­—å“¦ï¼Œå¯ä»¥è¾“å…¥æ±‰å­—ã€å­—æ¯å’Œæ•°å­—", "2-30ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œ( ).&", "å¿˜è®°å¡«å…¬å¸åç§°å•¦");
			var v2 = $.fmValidator.spanVarvalidate("expSelectCate", -1, -1, "å¿˜è®°é€‰æ‹©ç±»åˆ«å•¦", "å¿˜è®°é€‰æ‹©ç±»åˆ«å•¦");
			var v3 = false;
			if ($.fmValidator.textvalidate("txtPositionName", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[/]){2,12}$", "", "äº²ï¼Œ2-12ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å“¦", "äº²ï¼Œ2-12ä¸ªå­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å“¦", "å¿˜è®°å¡«å†™èŒä½åç§°å•¦")) {
				if ($.fmValidator.spanVarvalidate("selPosSala", -1, -1, "å¿˜è®°é€‰æ‹©èŒä½è–ªèµ„å•¦", "å¿˜è®°é€‰æ‹©èŒä½è–ªèµ„å•¦")) v3 = true
			}
			var v4 = $.fmValidator.dateValidate("inpPos", "å¿˜è®°é€‰æ‹©æ—¶é—´å•¦!", "å¼€å§‹æ—¥æœŸéœ€å°äºŽç»“æŸæ—¥æœŸ!");
			var v5 = $.fmValidator.textBoxvalidate("txtPerformance", 10, 800, "10-800ä¸ªå­—ï¼Œä¸å¯è¾“å…¥ç”µè¯ã€QQå’Œé‚®ç®±å“¦  ", "10-800ä¸ªå­—ï¼Œä¸å¯è¾“å…¥ç”µè¯ã€QQå’Œé‚®ç®±å“¦  ", "å¿˜è®°å¡«å·¥ä½œèŒè´£å•¦", "ç®€è¿°ä¸€ä¸‹å²—ä½èŒè´£å’Œå·¥ä½œä¸šç»©ï¼Œå¯ä½¿ç”¨äººå•ä½å¯¹ä½ äº†è§£æ›´å¤šï¼");
			return v1 && v3 && v4 && v5
		},
		submitForm: function(type) {
			if (!Exp.validate()) {
				return
			}
			if ($("#tabModyExpe .postBtn").attr("u") == "true") {
				return
			} else {
				$("#tabModyExpe .postBtn").attr("u", "true")
			}
			isAdd = type;
			var updateid = $("#hidUpExpeId").val();
			var ecompname = $("#txtCompName").val();
			var epositionname = $("#txtPositionName").val();
			var esalary = $("#selPosSala").attr("k");
			var showDate = "";
			if ($("#inpPosEndYear").val() == "è‡³ä»Š") {
				showDate = $("#inpPosStartYear").val() + "å¹´" + $("#inpPosStartMonth").val() + "æœˆ-" + $("#inpPosEndYear").val()
			} else {
				showDate = $("#inpPosStartYear").val() + "å¹´" + $("#inpPosStartMonth").val() + "æœˆ-" + $("#inpPosEndYear").val() + "å¹´" + $("#inpPosEndMonth").val() + "æœˆ"
			}
			var epsdate = $("#inpPosStartYear").val() + "-" + $("#inpPosStartMonth").val() + "-" + "01";
			var epedate = $("#inpPosEndYear").val() + "-" + $("#inpPosEndMonth").val() + "-" + "01";
			if ($("#inpPosEndYear").val() == "è‡³ä»Š") {
				epedate = "3000-01-01"
			}
			var eperformance = $("#txtPerformance").val();
			subMitJsonObj = {
				resumeid: $("#hidresume").val(),
				ecompname: Utility.repLaceData(ecompname),
				ecompname: ecompname,
				epositionname: Utility.repLaceData(epositionname),
				updateid: updateid,
				esalary: esalary,
				epsdate: epsdate,
				epedate: epedate,
				eperformance: eperformance,
				_eperformance: Utility.encodeTxtBox(eperformance),
				_showDate: showDate
			};
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(subMitJsonObj, Exp.submitFormSuccess, xmlHttp, "resumeexpe", "addnewresumeV2")
		},
		submitFormSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						$("#tabModyExpe .postBtn").removeAttr("u");
						if (xmlHttp.responseText.split(":")[1] == "è¾“å…¥å†…å®¹å­˜åœ¨éžæ³•è¯!") {
							location.href = "http://jianli.58.com/resume/delmsg";
							return
						}
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText.indexOf("sensitive:") != -1) {
						$("#tabModyExpe .postBtn").removeAttr("u");
						if (xmlHttp.responseText.split(":")[1] == "code") {
							var sensitiveUrltmp = sensitivePicUrl + "?rid=" + subMitJsonObj.resumeid + "&oper=Exp.submitForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						} else {
							var sensitiveUrltmp = sensitiveMobileUrl + "?rid=" + subMitJsonObj.resumeid + "&oper=Exp.submitForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						}
					} else if (xmlHttp.responseText != "0") {
						$("#tabModyExpe .postBtn").removeAttr("u");
						var id = xmlHttp.responseText.split(",")[0];
						var lowerResult = xmlHttp.responseText.split(",")[1];
						BaseInfo.setLowInput(lowerResult);
						Exp.adjustView(id);
						bindMouseEvent();
						subMitJsonObj = null;
						Highlights.pushad(2);
						Right.init()
					}
				}
				if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		adjustView: function(id) {
			if (typeof id != "undefined" && id != null && id > 0) {
				Exp.emptyInput();
				if (isAdd == true) {
					$("#tabModyExpe .cancelBtn").show()
				}
				if ($("#expDiv div.experDetail").length == 0) {
					Right.changePaNum(5, 0)
				}
				if (typeof subMitJsonObj != "undefined" && subMitJsonObj != null) {
					var sb = new StringBuffer;
					var epositionname = subMitJsonObj.epositionname;
					var startYear = "";
					var endYear = "";
					var startMonth = "";
					var endMonth = "";
					var eperformance = subMitJsonObj._eperformance;
					var salaryNameDisplay = "é¢è®®";
					if (subMitJsonObj.esalary != "0") {
						if (subMitJsonObj.esalary == "1") {
							salaryNameDisplay = "1000å…ƒä»¥ä¸‹/æœˆ"
						} else if (subMitJsonObj.esalary == "9") {
							salaryNameDisplay = "25000å…ƒä»¥ä¸Š/æœˆ"
						} else {
							salaryNameDisplay = expSalaryConverter[subMitJsonObj.esalary] + "å…ƒ/æœˆ"
						}
					}
					var salaryName = expSalaryConverter[subMitJsonObj.esalary] == "é¢è®®" ? "é¢è®®" : expSalaryConverter[subMitJsonObj.esalary] + " å…ƒ/æœˆ";
					sb.append('<div class="experDetail showList" id=expU' + id + ">");
					sb.append('<p class="detailList">');
					sb.append('<span id="expUSd' + id + '">' + subMitJsonObj._showDate + "</span>");
					sb.append('<span class="divide">|</span>');
					sb.append('<span id="expUCo' + id + '">' + subMitJsonObj.ecompname + "</span>");
					sb.append('<span class="divide">|</span>');
					sb.append('<span id="expUPi' + id + '">' + subMitJsonObj.epositionname + "</span>");
					sb.append('<span class="divide">|</span>');
					sb.append('<span k="' + subMitJsonObj.esalary + '" id="expUSa' + id + '">' + salaryNameDisplay + "</span>");
					sb.append('</p><p class="detailCon">');
					sb.append('<span class="title">å·¥ä½œå†…å®¹ï¼š</span>');
					sb.append("<span id=expUDes" + id + ">" + Utility.repLaceLine2Br(eperformance) + "</span>");
					sb.append('</p><p class="operBtn">');
					sb.append("<a href=\"javascript:Exp.modifyById('" + id + '\')" class="" style="display:">ä¿®æ”¹</a>');
					sb.append('<a href="javascript:void(0)" targetCall="Exp.delById(\'' + id + '\')" targetName="å·¥ä½œç»åŽ†" onclick="$(this).delConfirm()">åˆ é™¤</a>');
					sb.append("</p></div>");
					if (subMitJsonObj.updateid > 0) {
						$("#expU" + subMitJsonObj.updateid).remove()
					}
					$("#expDiv").prepend(sb.toString());
					if (!isAdd) {
						$("#tabModyExpe").hide()
					}
				}
			}
		},
		emptyInput: function() {
			$("#hidUpExpeId").val(0);
			$("#txtCompName").val("");
			$("#txtCompNameInfo").html("").removeClass($.fmValidator.errorclass);
			$("#txtPositionName").val("");
			$("#txtPositionNameInfo").html("").removeClass($.fmValidator.errorclass);
			$("#selPosSala").val("è¯·é€‰æ‹©è–ªèµ„");
			$("#selPosSala").attr("k", -1);
			$("#inpPosStartYear").val("");
			$("#inpPosStartMonth").val("");
			$("#inpPosEndYear").val("");
			$("#inpPosEndMonth").val("");
			$("#txtPerformance").val("ç®€è¿°ä¸€ä¸‹å²—ä½èŒè´£å’Œå·¥ä½œä¸šç»©ï¼Œå¯ä½¿ç”¨äººå•ä½å¯¹ä½ äº†è§£æ›´å¤šï¼").addClass("f-c7")
		},
		delById: function(id) {
			var delPost = {
				resumeid: $("#hidresume").val(),
				delid: id
			};
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(delPost, Exp.delExpSuccess, xmlHttp, "resumeexpedel")
		},
		delExpSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText != "0") {
						var resultArray = xmlHttp.responseText.split(",");
						var id = resultArray[0];
						$("#expU" + id).remove();
						if (id == $("#hidUpExpeId").val()) {
							Exp.emptyInput()
						}
						if ($("#expDiv div.experDetail").length == 0) {
							Right.changePaNum(5, 1)
						}
						Highlights.pushad(2);
						BaseInfo.setLowInput(resultArray[1]);
						Right.init();
						if (!Exp.hasExpVal()) {
							Exp.showAddWin()
						}
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		modifyById: function(id) {
			Exp.showAddWin();
			$("#txtCompName").focus();
			$("#hidUpExpeId").val(id);
			var expDate = $("#expUSd" + id).html();
			var startYear = "";
			var endYear = "";
			var startMonth = "";
			var endMonth = "";
			if (typeof expDate != "undefined" && expDate != null && $.trim(expDate).length > 0) {
				var dateArray = Utility.getDateArray(expDate);
				startYear = dateArray[0];
				startMonth = dateArray[1];
				endYear = dateArray[2];
				if (endYear == "è‡³ä»Š") {
					$("#spPosEnd").hide();
					$("#to_to").hide();
					$("#inpPosEndYear").attr("ntime", "true")
				} else {
					$("#spPosEnd").show();
					$("#to_to").show()
				}
				endMonth = dateArray[3]
			}
			var salaryType = parseInt($("#expUSa" + id).attr("k"));
			var salaryName = expSalaryConverter[salaryType];
			$("#txtCompName").val($("#expUCo" + id).text());
			$("#txtPositionName").val($("#expUPi" + id).html());
			$("#selPosSala").val(salaryName).removeClass("f-c7");
			$("#selPosSala").attr("k", $("#expUSa" + id).attr("k"));
			$("#inpPosStartYear").val(startYear);
			$("#inpPosStartMonth").val(startMonth);
			$("#inpPosEndYear").val(endYear);
			$("#inpPosEndMonth").val(endMonth);
			$("#txtPerformance").val(Utility.repLaceBr2Line($("#expUDes" + id).html())).removeClass("f-c7");
			scroller("ex", 700)
		},
		subCancel: function() {
			$("#tabModyExpe").hide();
			Exp.emptyInput()
		}
	}
}();
var Edu = function() {
	var xmlHttp;
	var postObj;
	var isAdd;
	return {
		init: function() {
			$.fmValidator.addtextvalidate("txtSchoolName", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[()ï¼ˆï¼‰]){4,20}$", "", "4-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "4-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "å¿˜è®°å¡«å†™å­¦æ ¡åç§°å•¦", "", true);
			$.fmValidator.addtextvalidate("txtProfession", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[()ï¼ˆï¼‰]){2,20}$", "", "2-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "2-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "å¿˜è®°å¡«å†™ä¸“ä¸šå•¦", "", true);
			if ($("#eduDiv div.eduDetail").length == 0) {
				$("#tabModyEduc").show();
				$("#eduCancel").hide()
			} else {
				$("#tabModyEduc").hide();
				$("#eduCancel").show()
			}
		},
		hasEduVal: function() {
			if ($("#eduDiv div.eduDetail").length == 0) {
				return false
			} else {
				return true
			}
		},
		showEduInput: function() {
			Edu.emptyInput();
			$("#tabModyEduc").show();
			if ($("#eduDiv div.showList").length > 0) {
				$("#eduCancel").show()
			} else {
				$("#eduCancel").hide()
			}
			scroller("ed", 700)
		},
		validate: function() {
			var v1 = $.fmValidator.textvalidate("txtSchoolName", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[()ï¼ˆï¼‰]){4,20}$", "", "4-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "4-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "å¿˜è®°å¡«å†™å­¦æ ¡åç§°å•¦");
			var v2 = $.fmValidator.textvalidate("txtProfession", "^((.*[ä¸€-é¾¥]+.*)|[a-z]|[A-Z]|[()ï¼ˆï¼‰]){2,20}$", "", "4-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "2-20å­—ï¼Œåªå¯è¾“å…¥æ±‰å­—ã€å­—æ¯ã€æ•°å­—å’Œï¼ˆï¼‰å“¦", "å¿˜è®°å¡«å†™ä¸“ä¸šå•¦");
			var v3 = $.fmValidator.dateValidate("inpEdu", "å¿˜è®°é€‰æ‹©æ—¶é—´å•¦!", "å¼€å§‹æ—¥æœŸéœ€å°äºŽç»“æŸæ—¥æœŸ!");
			return v1 && v2 && v3
		},
		subForm: function(type) {
			if (!Edu.validate()) {
				return
			}
			isAdd = type;
			var updateid = $("#hidUpEducId").val();
			var eshool = $("#txtSchoolName").val();
			var eprofessional = $("#txtProfession").val();
			var esdate = $("#inpEduStartYear").val() + "-" + $("#inpEduStartMonth").val() + "-" + "01";
			var eedate = $("#inpEduEndYear").val() + "-" + $("#inpEduEndMonth").val() + "-" + "01";
			var eedateView = $("#inpEduStartYear").val() + "å¹´" + $("#inpEduStartMonth").val() + "æœˆ-" + $("#inpEduEndYear").val() + "å¹´" + $("#inpEduEndMonth").val() + "æœˆ";
			if ($("#inpEduEndMonth").val() == "") {
				eedateView = $("#inpEduStartYear").val() + "å¹´" + $("#inpEduStartMonth").val() + "æœˆ-" + $("#inpEduEndYear").val()
			}
			if ($("#inpEduEndYear").val() == "è‡³ä»Š") {
				eedate = "3000-01-01"
			}
			postObj = {
				resumeid: $("#hidresume").val(),
				updateid: updateid,
				eshool: Utility.repLaceData(eshool),
				eprofessional: Utility.repLaceData(eprofessional),
				esdate: esdate,
				eedate: eedate,
				_eedateView: eedateView
			};
			$("#tabModyEduc .saveBtn").attr("disabled", "disabled");
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(postObj, Edu.subFormSuccess, xmlHttp, "resumeeduc", "addnewresumeV2")
		},
		subFormSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						this.emptyInput();
						if (xmlHttp.responseText.split(":")[1] == "è¾“å…¥å†…å®¹å­˜åœ¨éžæ³•è¯!") {
							location.href = "http://jianli.58.com/resume/delmsg";
							return
						}
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText.indexOf("sensitive:") != -1) {
						$("#tabModyEduc .saveBtn").removeAttr("disabled");
						if (xmlHttp.responseText.split(":")[1] == "code") {
							var sensitiveUrltmp = sensitivePicUrl + "?rid=" + postObj.resumeid + "&oper=Edu.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						} else {
							var sensitiveUrltmp = sensitiveMobileUrl + "?rid=" + postObj.resumeid + "&oper=Edu.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						}
					} else if (xmlHttp.responseText != "0") {
						$("#tabModyEduc .saveBtn").removeAttr("disabled");
						var resultArray = xmlHttp.responseText.split(",");
						var id = resultArray[0];
						var len = $("#eduDiv div.eduDetail").length;
						if (len == 0) {
							Right.changePaNum(5, 0)
						}
						if (!isAdd) {
							$("#tabModyEduc").hide()
						} else {
							$("#containereducation .btn-v7").show()
						}
						Edu.adjustView(id);
						postObj = null;
						Edu.emptyInput();
						Highlights.pushad(3);
						bindMouseEvent();
						BaseInfo.setLowInput(resultArray[1]);
						Right.init();
						getFullPartInfo()
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		edtEdu: function(id) {
			$("#txtSchoolName").focus();
			$("#tabModyEduc").show();
			$("#hidUpEducId").val(id);
			$("#txtSchoolName").val($("#eduSc" + id).html());
			$("#txtProfession").val($("#eduSp" + id).html());
			var date = $("#eduSd" + id).html();
			if (typeof date != "undefined" && date != null && $.trim(date).length > 0) {
				var dateArray = Utility.getDateArray(date);
				$("#inpEduStartYear").val(dateArray[0]);
				$("#inpEduStartMonth").val(dateArray[1]);
				if (dateArray[2] == "è‡³ä»Š") {
					$("#inpEduEndYear").val(dateArray[2]);
					$("#spEduEnd").hide();
					$("#eduto_to").hide();
					$("#inpEduEndYear").attr("ntime", "true")
				} else {
					$("#inpEduEndYear").val(dateArray[2]);
					$("#inpEduEndMonth").val(dateArray[3]);
					$("#spEduEnd").show();
					$("#eduto_to").show()
				}
			}
			scroller("ed", 700)
		},
		delEdu: function(delId) {
			var delPost = {
				resumeid: $("#hidresume").val(),
				delid: delId
			};
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(delPost, Edu.delSuccess, xmlHttp, "resumeeducdel")
		},
		delSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50);
						Edu.emptyInput()
					} else if (xmlHttp.responseText != "0") {
						var resultArray = xmlHttp.responseText.split(",");
						var id = resultArray[0];
						$("#edu" + id).remove();
						if (id == $("#hidUpEducId").val()) {
							Edu.emptyInput()
						}
						var len = $("#eduDiv div.eduDetail").length;
						if (len == 0) {
							Right.changePaNum(5, 1)
						}
						Highlights.pushad(3);
						BaseInfo.setLowInput(resultArray[1]);
						Right.init();
						if (!Edu.hasEduVal()) {
							Edu.showEduInput()
						}
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		adjustView: function(id) {
			if (typeof id != "undefined" && id != null && id > 0) {
				Edu.emptyInput();
				if (postObj != null) {
					var sb = new StringBuffer;
					sb.append('<div id="edu' + id + '" class="eduDetail showList">');
					sb.append('<p class="detailList">');
					sb.append('<span id="eduSd' + id + '">' + postObj._eedateView + "</span>");
					sb.append('<span class="divide">|</span>');
					sb.append('<span id="eduSc' + id + '">' + postObj.eshool + "</span>");
					sb.append('<span class="divide">|</span>');
					sb.append('<span id="eduSp' + id + '">' + postObj.eprofessional + "</span>");
					sb.append("</p>");
					sb.append('<p class="operBtn">');
					sb.append('<a class="" onclick="Edu.edtEdu(\'' + id + '\')" href="javascript:void(0)">ä¿®æ”¹</a>');
					sb.append("<a onclick=\"$(this).delConfirm('" + id + "')\" targetcall=\"Edu.delEdu('" + id + '\')" href="javascript:void(0)">åˆ é™¤</a>');
					sb.append("</p></div>");
					if (postObj.updateid > 0) {
						$("#edu" + id).remove()
					}
					$("#eduDiv").prepend(sb.toString());
					postObj = null
				}
			}
		},
		emptyInput: function() {
			$("#hidUpEducId").val(0);
			$("#txtSchoolName").val("");
			$("#txtSchoolNameInfo").html("").removeClass($.fmValidator.errorclass);
			$("#txtProfession").val("");
			$("#txtProfessionInfo").html("").removeClass($.fmValidator.errorclass);
			$("#inpEduStartYear").val("");
			$("#inpEduStartMonth").val("");
			$("#inpEduEndYear").val("");
			$("#inpEduEndMonth").val("");
			$("#spEduEnd").show()
		},
		subCancel: function() {
			$("#tabModyEduc").hide();
			Edu.emptyInput()
		}
	}
}();
var Photos = function() {
	var xmlHttp;
	var phoCount = 0;
	var maxCount = 8;
	return {
		init: function() {
			if ($("#photoDivView li").length == 0) {
				$("#tabShowMe").show()
			} else {
				$("#photoDivView").show();
				$("#tabShowMe").hide()
			}
			$("#photoModBtn").click(function() {
				$("#photoDivView").hide();
				$("#tabShowMe").show();
				scroller("ph", 700)
			});
			phoCount = $("#phoCount").val() == "" ? 0 : parseInt($("#phoCount").val());
			if (phoCount > 0) {}
		},
		hasPhotos: function() {
			if ($("#photoDivView").html() == "") {
				return false
			} else {
				return true
			}
		},
		subForm: function() {
			if (phoCount > maxCount) {
				popupWin("æœ€å¤šåªå¯å¡«å†™" + maxCount + "é¡¹å“¦!", "å‡ºé”™äº†", 4e3, 100, 50);
				return
			}
			getPicValueForPost();
			var postObj = {
				resumeid: $("#hidresume").val(),
				pics: $("#pic").val()
			};
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(postObj, Photos.subSuccess, xmlHttp, "resumephoto")
		},
		subSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "è¾“å…¥å†…å®¹å­˜åœ¨éžæ³•è¯!") {
							location.href = "http://jianli.58.com/resume/delmsg";
							return
						}
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText.indexOf("sensitive:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "code") {
							var sensitiveUrltmp = sensitivePicUrl + "?rid=" + $("#hidresume").val() + "&oper=Photos.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						} else {
							var sensitiveUrltmp = sensitiveMobileUrl + "?rid=" + $("#hidresume").val() + "&oper=Photos.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						}
					} else if (xmlHttp.responseText != "0") {
						var id = xmlHttp.responseText;
						var strs = "";
						$("#tabShowMe").hide();
						$("#photoDivView").show();
						if ($("#pic").val() != "") {
							if ($("#photoDivView li").length == 0) {
								Right.changePaNum(5, 0)
							}
							strs = '<ul class="myphoto" id="ulpics">';
							var n = 1;
							var arry = $("#pic").val().split("|");
							for (var i = 0; i < arry.length; i++) {
								if (n % 2 == 0) {
									strs += '<li class=""><img src=\'http://pic1.58cdn.com.cn' + arry[i].replace("big", "tiny") + "' /></li>"
								} else {
									strs += "<li><img src='http://pic1.58cdn.com.cn" + arry[i].replace("big", "tiny") + "' /></li>"
								}
								n++
							}
							phoCount = n
						} else {
							if ($("#photoDivView li").length != 0) {
								Right.changePaNum(5, 1)
							}
							phoCount = 0
						}
						$("#photoDivView").html(strs);
						Right.init()
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		}
	}
}();
var Right = {
	init: function() {
		var compete = parseInt($("#completeVal").val());
		var isMidHigh = $("#isMidHigh").val();
		var isLow = $("#isLow").val();
		var TipsTitle = "æ‚¨å·²å®ŒæˆåŸºæœ¬èµ„æ–™ï¼";
		var Tips = ["å·¥ä½œç»åŽ†æœ€èƒ½ä½“çŽ°æ‚¨çš„èƒ½åŠ›ï¼Œç»§ç»­å®Œå–„å¯å¢žåŠ å®Œæ•´åº¦åˆ†æ•°å“¦ï¼", "å¡«å†™æ•™è‚²ç»åŽ†ï¼Œå¯è®©ä¼ä¸šäº†è§£æ‚¨çš„æ•™è‚²èƒŒæ™¯ï¼", "å»ºè®®ä¸Šä¼ æ¸…æ™°ç”Ÿæ´»ç…§ï¼Œè®©ä¼ä¸šçœ‹åˆ°æ‚¨çš„é£Žé‡‡ï¼", "æ‚¨è¿˜å¯ä»¥é€‰æ‹©å®Œå–„å‰©ä½™é¡¹ï¼Œå†…å®¹å®Œæ•´ä¼šæé«˜æ‚¨çš„ç«žäº‰åŠ›ã€è®©ä¼ä¸šåˆ®ç›®ç›¸çœ‹ï¼", "æ‚¨çš„ç®€åŽ†çœŸç»™åŠ›ï¼ç­‰ç€å¥½å·¥ä½œæ¥æ‰¾æ‚¨å§ï¼"];
		var completeObjBase = $("#completeTips .perBasicTips");
		var completeObjDetail = $("#completeTips .perDetailTips");
		if (isMidHigh == 1) {
			if (!Exp.hasExpVal()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[0])
			} else if (!Edu.hasEduVal()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[1])
			} else if (!Photos.hasPhotos()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[2])
			} else if (compete < 90) {
				$(completeObjBase).hide();
				$(completeObjDetail).html(Tips[3])
			} else if (compete >= 90) {
				$(completeObjBase).hide();
				$(completeObjDetail).html(Tips[4])
			}
		} else if (isLow == 1 && isMidHigh == 0) {
			if (!Photos.hasPhotos()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[2])
			} else if (!Exp.hasExpVal()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[0])
			} else if (!Edu.hasEduVal()) {
				$(completeObjBase).html(TipsTitle);
				$(completeObjDetail).html(Tips[1])
			} else if (compete < 90) {
				$(completeObjBase).hide();
				$(completeObjDetail).html(Tips[3])
			} else if (compete >= 90) {
				$(completeObjBase).hide();
				$(completeObjDetail).html(Tips[4])
			}
		}
	},
	changePaNum: function(point, type) {
		var initPoint = $("#completeVal").val();
		var orginPoint = initPoint;
		if (type == 0) {
			initPoint = parseInt(initPoint) + point;
			initPoint = initPoint >= 100 ? 100 : initPoint;
			$("#completeIcon").removeClass("perIcon" + orginPoint).addClass("perIcon" + initPoint);
			$("#completeVal").val(initPoint)
		} else {
			initPoint = parseInt(initPoint) - point;
			initPoint = initPoint < 0 ? 0 : initPoint;
			$("#completeIcon").removeClass("perIcon" + orginPoint).addClass("perIcon" + initPoint);
			$("#completeVal").val(initPoint)
		}
	}
};
var Highlights = function() {
	var xmlHttp;
	var postObj;
	var light;
	var maxSize = 5;
	return {
		init: function() {
			if ($("#divShowBrig li").length == 0) {
				$("#tabModyBrig").show();
				$("#addNewLight").show()
			} else {
				$("#tabModyBrig").hide()
			}
			$("#publicSelected .othsele input").click(function(e) {
				var inputObj = $(this);
				if (inputObj.attr("checked") == true) {
					var len = $("#publicSelected .othsele").find("input[checked=true]").length;
					if (len > maxSize) {
						$.popWin($(this), "æœ€å¤šé€‰æ‹©äº”ä¸ª", "æ‚¨å·²è¾¾åˆ°ä¸Šé™å•¦ï¼");
						inputObj.attr("checked", false)
					}
				}
			});
			$("#jobHighlightSelf").delegate("li", "click", function() {
				$(this).remove();
				var newLen = $("#jobHighlightSelf li").size();
				if (newLen < 3) {
					$("#addNewLight").show()
				}
			});
			$("#jobHighlightInput .txtsale").click(function() {
				$(this).removeClass($.fmValidator.cerrorclass);
				$("#hltWarn").hide()
			})
		},
		validate: function() {
			var otherBright = $("#txtOtherBright").val();
			if (otherBright == "ç®€å•è¯´è¯´æ‚¨çš„ä¼˜åŠ¿ï¼Œå¯æé«˜15%çš„ä¸‹è½½å‡ çŽ‡ï¼ä¾‹å¦‚ï¼šèŒä¸šç‰¹é•¿ã€æ€§æ ¼ç‰¹ç‚¹ã€å²—ä½è¯ä¹¦...." || $.trim(otherBright).length == 0) {
				return true
			}
			var v1 = $.fmValidator.textBoxvalidate("txtOtherBright", 0, 500, "æœ€å¤šå¯å†™500å­—ï¼Œè¯·ä¸è¦è¾“å…¥ç”µè¯å’ŒQQå·å“¦ï¼", "æœ€å¤šå¯å†™500å­—ï¼Œè¯·ä¸è¦è¾“å…¥ç”µè¯å’ŒQQå·å“¦ï¼", null, "ç®€å•è¯´è¯´æ‚¨çš„ä¼˜åŠ¿ï¼Œå¯æé«˜15%çš„ä¸‹è½½å‡ çŽ‡ï¼ä¾‹å¦‚ï¼šèŒä¸šç‰¹é•¿ã€æ€§æ ¼ç‰¹ç‚¹ã€å²—ä½è¯ä¹¦....");
			return v1
		},
		switchView: function(isNeedScroller) {
			$("#tabModyBrig").show();
			$("#addNewLight :input").val("è¯·è¾“å…¥ä¸è¶…è¿‡8ä¸ªå­—");
			$("#addNewLight :input").addClass("f-c7");
			$("#divShowBrig .bgb").each(function(index, obj) {
				if (obj != null) {
					var type = $(obj).attr("ktype");
					if (type == "1") {
						$("#jobHighlightInput li").each(function(index, innerObj) {
							if (innerObj != null) {
								if ($(obj).attr("kv") == $(innerObj).find("span").attr("key")) {
									$(innerObj).find("input").val($(obj).attr("kva"))
								}
							}
						})
					} else if (type == "0") {
						$("#jobHighlightSelect li").each(function(index, innerObj) {
							if (innerObj != null) {
								if ($(obj).attr("kv") == $(innerObj).text()) {
									$(innerObj).addClass("sel");
									$(innerObj).find("i").removeClass("addSelIcon").addClass("addSelIcon")
								}
							}
						})
					}
				}
			});
			if (isNeedScroller) {
				scroller("hi", 700)
			}
		},
		pushjobTargetLight: function() {
			var rand = Math.random();
			$.ajax({
				type: "get",
				dataType: "json",
				data: {
					time: rand
				},
				url: "http://jianli.58.com/ajax/jbHit/" + $("#hidresume").val(),
				success: function(msg) {
					if (msg != null) {
						if (msg.returnMessage == "success") {
							var highlightcate = msg.entity;
							if (highlightcate != "undefined" && highlightcate != null) {
								$("#jobHighlightInput").html("");
								$("#jobHighlightSelect").html("");
								$("#hideHihtId").val(highlightcate.id);
								var sbSelect = new StringBuffer;
								var sbInput = new StringBuffer;
								var valueArray = highlightcate.valueArray;
								if (highlightcate.type == 1) {
									$(valueArray).each(function(index, obj) {
										if (obj != null) {
											if (obj.type == 1) {
												sbInput.append('<span key="' + obj.pname + '" reg="' + obj.reg + '">' + obj.pname.replace("â–¡", '<input type="text" class="txtsale">') + "</span>")
											}
										}
									});
									$(valueArray).each(function(index, obj) {
										if (obj != null) {
											if (obj.type == 0) {
												sbSelect.append('<li><input type="checkbox" key="' + obj.pname + '" value="' + obj.pname + '" onfocus="">' + obj.pname + "</li>")
											}
										}
									});
									$("#jobHighlightInput").html(sbInput.toString()).show();
									$("#jobHighlightSelect").html(sbSelect.toString()).show()
								} else {
									$(valueArray).each(function(index, obj) {
										if (obj != null) {
											if (obj.type == 0) {
												sbSelect.append('<li><input type="checkbox" key="' + obj.pname + '" value="' + obj.pname + '" onfocus="">' + obj.pname + "</li>")
											}
										}
									});
									$("#jobHighlightSelect").html(sbSelect.toString()).show()
								}
								$("#jobHighlightTr").show();
								$("#jobHighlightInput .txtsale").click(function() {
									$(this).removeClass($.fmValidator.cerrorclass);
									$("#hltWarn").hide()
								});
								$("#tabModyBrig").show();
								$("#divShowBrig").hide();
								$("#tabModyBrig .cbbg2").parent().remove();
								$("#divShowBrig .cbbg2").parent().remove()
							}
						} else if (msg.returnMessage == "empty") {
							$("#tabModyBrig .cbbg2").remove();
							$("#divShowBrig .cbbg2").remove();
							$("#jobHighlightTr").hide();
							$("#jobHighlightSelect").hide();
							$("#jobHighlightSelect").html("");
							$("#jobHighlightInput").html("")
						}
					}
				}
			})
		},
		pushad: function(t) {
			var rand = Math.random();
			$.get("http://jianli.58.com/ajax/gethighlights/", {
				rid: $("#hidresume").val(),
				t: t,
				time: rand
			}, function(data) {
				var strs = data.split(",");
				var a1 = "";
				if ($("#divShowBrig li").length == 0 && data != "") {
					Right.changePaNum(5, 0)
				} else if ($("#divShowBrig li").length > 0 && data == "") {
					Right.changePaNum(5, 1)
				}
				$(strs).each(function(i, n) {
					if (n != "") {
						a1 += '<li class="bgr">' + n + '<i class="rightGIcon"></i></li>'
					}
				});
				$("#divShowBrig .bgr").remove();
				$("#divShowBrig").prepend(a1);
				if ($.trim(data).length != 0) {
					Highlights.switchView(false);
					$("#tabModyBrig").show()
				}
			})
		},
		selfAddNew: function() {
			var newLight = $("#addNewLight :input").val();
			newLight = newLight == "è¯·è¾“å…¥ä¸è¶…è¿‡8ä¸ªå­—" ? "" : newLight;
			if (newLight.length > 8) {
				alert("è¯·è¾“å…¥ä¸è¶…è¿‡8ä¸ªå­—");
				return
			} else if (newLight.length == 0) {
				alert("æ‚¨å¿˜è®°å¡«å†™äº®ç‚¹å•¦ï¼Œä¸è¶…è¿‡8ä¸ªå­—å“¦ï¼");
				return
			} else {
				var n = '<li class="diyLi">' + newLight + '<i class="closeBIcon"></i></li>';
				$("#jobHighlightSelf").append(n);
				$("#addNewLight :input").val("è¯·è¾“å…¥ä¸è¶…è¿‡8ä¸ªå­—");
				$("#addNewLight :input").addClass("f-c7")
			}
			var newLen = $("#jobHighlightSelf li").size();
			if (newLen >= 3) {
				$("#addNewLight").hide()
			}
		},
		geta3: function() {
			var checkA3 = "";
			$("#publicSelected li>input").each(function(index, obj) {
				if ($(obj).attr("checked") == true) {
					checkA3 += $(obj).attr("value") + ","
				}
			});
			if (checkA3.length > 0) {
				checkA3 = checkA3.substring(0, checkA3.length - 1)
			}
			return checkA3
		},
		getselfInput: function() {
			var selectHight = "";
			var allHight = "";
			var objself = $("#jobHighlightSelf li.diyLi");
			$(objself).each(function(index, obj) {
				if ($(this).text() != "") {
					selectHight += $(this).text() + ";"
				}
			});
			allHight = selectHight.substring(0, selectHight.length - 1);
			return allHight
		},
		geta2: function() {
			var objInput = $("#jobHighlightInput :input");
			var objSelect = $("#jobHighlightSelect li.sel");
			var inputHight = "";
			var selectHight = "";
			var allHight = "";
			var flag = 0;
			$(objInput).each(function(index, obj) {
				var value = $(obj).val();
				if (value.length > 0 && value.length < 5) {
					var reg = $(obj).parent().prev().attr("reg");
					if (reg != null && reg.length > 0) {
						if (reg == "s4") {
							var regNumber = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
							var isRight = regNumber.test(value);
							if (!isRight || value == "0") {
								$(obj).addClass($.fmValidator.cerrorclass);
								flag = 1
							}
						} else if (reg == "d4") {
							var regFloat = /^([1-9]{1})([0-9]{0,3})$/;
							var isRight = regFloat.test(value);
							if (!isRight) {
								$(obj).addClass($.fmValidator.cerrorclass);
								flag = 2
							}
						}
					}
					inputHight += $(obj).parent().prev().attr("key") + "," + value + "|"
				} else if (value.length >= 5) {
					$(obj).addClass($.fmValidator.cerrorclass);
					flag = 1
				}
			});
			$(objSelect).each(function(index, obj) {
				if ($(this).text() != "") {
					selectHight += $(this).text() + ",1" + "|"
				}
			});
			var id = parseInt($("#hideHihtId").val());
			if (inputHight.length > 0 || selectHight.length > 0) {
				if (id > 0) {
					allHight = id + "~" + inputHight.substring(0, inputHight.length - 1) + "~" + selectHight.substring(0, selectHight.length - 1)
				} else {
					allHight = ""
				}
			} else {
				if (id > 0) {
					allHight = id + ""
				} else {
					allHight = ""
				}
			} if (flag == 1) {
				var info = $("#hltWarn");
				clearInfoMsg(info);
				info.addClass($.fmValidator.errorclass);
				info.html($.fmValidator.tiphtml.replace("{0}", "åªèƒ½è¾“å…¥å››ä½æ•°å­—å“¦!"));
				info.show();
				return "error"
			} else if (flag == 2) {
				var info = $("#hltWarn");
				clearInfoMsg(info);
				info.addClass($.fmValidator.errorclass);
				info.html($.fmValidator.tiphtml.replace("{0}", "åªèƒ½è¾“å…¥å››ä½æ­£æ•´æ•°å“¦!"));
				info.show();
				return "error"
			}
			return allHight
		},
		subForm: function(type) {
			var strA2 = Highlights.geta2();
			if (strA2 == "error") {
				return
			}
			postObj = {
				resumeid: $("#hidresume").val(),
				a2: strA2,
				selfInput: Highlights.getselfInput()
			};
			xmlHttp = SimpleXhrFactory.createXhrObject();
			$.xmlPost(postObj, Highlights.subFormSuccess, xmlHttp, "resumelight")
		},
		subFormSuccess: function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if (xmlHttp.responseText.indexOf("error:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "è¾“å…¥å†…å®¹å­˜åœ¨éžæ³•è¯!") {
							location.href = "http://jianli.58.com/resume/delmsg";
							return
						}
						popupWin(xmlHttp.responseText.split(":")[1], "å‡ºé”™äº†", 4e3, 100, 50)
					} else if (xmlHttp.responseText.indexOf("sensitive:") != -1) {
						if (xmlHttp.responseText.split(":")[1] == "code") {
							var sensitiveUrltmp = sensitivePicUrl + "?rid=" + postObj.resumeid + "&oper=Highlights.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						} else {
							var sensitiveUrltmp = sensitiveMobileUrl + "?rid=" + postObj.resumeid + "&oper=Highlights.subForm";
							setbg("å®‰å…¨éªŒè¯", 500, 200, sensitiveUrltmp, "true");
							return
						}
					} else if (xmlHttp.responseText != "0") {
						if ($("#divShowBrig li").length == 0) {
							Right.changePaNum(5, 0)
						}
						var id = xmlHttp.responseText;
						Highlights.adjustAdv2(postObj.a2);
						if (postObj != null) {
							$("#divShowBrig .new").remove();
							var sb = new StringBuffer;
							var strs = postObj.selfInput.split(";");
							$(strs).each(function(i, n) {
								if (n != "") {
									sb.append("<li class='new'>" + n + '<i class="rightGIcon"></i></li>')
								}
							});
							$("#divShowBrig").append(sb.toString())
						}
						if ($("#divShowBrig li").length == 0) {
							Right.changePaNum(5, 1)
						}
						$("#tabModyBrig").hide();
						postObj = null;
						Right.init()
					}
				} else if (xmlHttp.status == 0) {
					gotoLoginUrl()
				}
			}
		},
		adjustAdv2: function(adv2String) {
			if ($.trim(adv2String).length > 0) {
				$("#divShowBrig li.bgb").each(function(index, obj) {
					$(obj).remove()
				});
				var sb = new StringBuffer;
				var array = adv2String.split("~");
				if (array.length == 3) {
					var inputHltArr = array[1].split("|");
					if (inputHltArr.length > 0) {
						for (var i = 0; i < inputHltArr.length; i++) {
							var valArray = inputHltArr[i].split(",");
							if (valArray.length > 1) {
								var param = valArray[0];
								var paramVal = valArray[1];
								sb.append('<li kv="' + param + '" kva="' + paramVal + '" ktype="1" class="bgb">' + param.replace("â–¡", paramVal) + '<i class="rightGIcon"></i></li>')
							}
						}
					}
					var selectHltArr = array[2].split("|");
					if (selectHltArr.length > 0) {
						for (var i = 0; i < selectHltArr.length; i++) {
							var valArray = selectHltArr[i].split(",");
							if (valArray.length > 1) {
								var param = valArray[0];
								var paramVal = valArray[1];
								sb.append('<li kv="' + param + '" kva="' + paramVal + '" ktype="0" class="bgb">' + param.replace("â–¡", paramVal) + '<i class="rightGIcon"></i></li>')
							}
						}
					}
				} else if (array.length == 2) {
					var selectHltArr = array[1].split("|");
					if (selectHltArr.length > 0) {
						for (var i = 0; i < selectHltArr.length; i++) {
							var valArray = selectHltArr[i].split(",");
							if (valArray.length > 1) {
								var param = valArray[0];
								var paramVal = valArray[1];
								sb.append('<li kv="' + param + '" kva="' + paramVal + '" ktype="0" class="bgb">' + param.replace("â–¡", paramVal) + '<i class="rightGIcon"></i></li>')
							}
						}
					}
				}
				$("#divShowBrig").append(sb.toString())
			}
		}
	}
}();

function gotoAccess(rid, m) {
	var isLowerResume = $("#lowerResumeFlag").val();
	var workYear = BaseInfo.getWorkYear();
	var edu = BaseInfo.getEduY();
	var expLen = $("#expDiv").find(".showList:visible").length;
	var eduLen = $("#eduDiv").find(".showList:visible").length;
	if (isLowerResume == 1) {
		var param = 0;
		if (workYear > 0 && workYear < 5 || workYear > 0 && workYear == 6 || edu > 2) {
			if (workYear > 0 && workYear < 5 && expLen == 0 || workYear > 0 && workYear == 6 && expLen == 0) {
				param = 2
			}
			if (edu > 2 && eduLen == 0) {
				if (param == 0) {
					param = 3
				} else {
					param = 1
				}
			}
			if (param != 0) {
				setbg("ç®€åŽ†å¡«å†™", 400, 200, "http://jianli.58.com/sltip/1?p=" + param + "&s=0", "true");
				window.clearTimeout(timeOut_id);
				timeOut_id = setTimeout("window.parent.closeopendiv()", 4e4);
				return
			}
		}
	} else {
		var param = 0;
		if (workYear > 0 && workYear < 5 && expLen <= 0 || workYear > 0 && workYear == 6 && expLen <= 0) {
			param = 2
		}
		if (edu > 2 && eduLen <= 0) {
			param = 3
		}
		if ((workYear > 0 && workYear < 5 && expLen <= 0 || workYear > 0 && workYear == 6 && expLen <= 0) && (edu > 2 && eduLen <= 0)) {
			param = 1
		}
		if (param == 1 || param == 2 || param == 3) {
			setbg("ç®€åŽ†å¡«å†™", 400, 200, "http://jianli.58.com/sltip/1?p=" + param + "&s=1", "true");
			window.clearTimeout(timeOut_id);
			timeOut_id = setTimeout("window.parent.closeopendiv()", 4e4);
			return
		}
	} if ($("#ptRresumeChk").is(":visible") && $("#ptRresumeChk").hasClass("checked")) {
		try {
			createPartResume()
		} catch (err) {}
	}
	if (partRid <= 0) {
		partRid = Utility.getQueryString("pid");
		var isCp = Utility.getQueryString("isCp");
		if (partRid != null && isCp != null && isCp == 1 && partRid > 0) {
			isCreatePart = true
		}
	}
	closeopendiv();
	if (isCreatePart) {
		location.href = "http://jianli.58.com/resumecomplete/?rid=" + rid + "&isCp=1&pid=" + partRid + "&modify=" + m
	} else {
		location.href = "http://jianli.58.com/resumecomplete/?rid=" + rid + "&modify=" + m
	}
}

function gotoMan() {
	if ($("#ptRresume").is(":visible") && $("#ptRresumeChk").hasClass("checked")) {
		try {
			createPartResume()
		} catch (err) {}
	}
	location.href = "http://my.58.com/myseekjob/1"
}

function createPartResume() {
	try {
		clickLog("from=jianli_post_partime_editcreatePartResume")
	} catch (err) {}
	var isShowed = GetCookieValue("risShowed");
	if (!isShowed || isShowed == 1 || isShowed == 2) {
		var sign = $("#hideRSign").val();
		var fullDisId = $("#hideRpid").val();
		var hideRUid = $("#hidresume").val();
		var hideRpWkTp = $("#hideRpWkTp").val();
		if ($.trim(sign).length > 0 && fullDisId > 0 && hideRUid > 0) {
			$.ajax({
				url: "http://jianli.58.com/ajax/cpPart/" + fullDisId + "/" + hideRUid,
				data: {
					s: sign,
					p: hideRpWkTp,
					from: "post"
				},
				type: "post",
				cache: false,
				async: false,
				dataType: "json",
				success: function(data) {
					if (data.returnMessage == "success") {
						isCreatePart = true;
						partRid = data.entity;
						SetCookie("risShowed", 0, "/");
						return
					} else if (data.returnMessage == "failed") {
						return
					} else if (data.returnMessage == "notSelf") {
						return
					}
				}
			})
		}
	}
}

function pgoToEdu() {
	$("#containereducation").show();
	$("#tabModyEduc").show();
	scroller("ed", 700);
	return
}

function pgoToExp() {
	$("#containerexperience").show();
	$("#tabModyExpe").show();
	scroller("ex", 700);
	return
}

function pcontinueWrite() {
	closeopendiv();
	var workYear = BaseInfo.getWorkYear();
	var edu = BaseInfo.getEduY();
	if (workYear > 0 && workYear < 5 && $("#expDiv").find(".showList:visible").length <= 0) {
		pgoToExp();
		try {
			clickSend(1)
		} catch (err) {}
		return
	}
	if (edu > 2 && $("#eduDiv").find(".showList:visible").length <= 0) {
		pgoToEdu();
		try {
			clickSend(1)
		} catch (err) {}
		return
	}
}

function clickSend(type) {
	var cateName = new StringBuffer;
	var cateIds = new StringBuffer;
	var selectObj = BaseInfo.getSelectObj();
	if (selectObj != null && selectObj.length > 0) {
		for (var i = 0; i < selectObj.length; i++) {
			cateIds.append(selectObj[i].dispCategoryID);
			cateName.append(selectObj[i].cateName);
			if (i != selectObj.length - 1) {
				cateIds.append(",");
				cateName.append("ã€")
			}
		}
	}
	var userid = GetCookieValue("UserID");
	cateName = encodeURI(cateName);
	var date = new Date;
	var now = "";
	now = date.getFullYear() + "-";
	now = now + (date.getMonth() + 1) + "-";
	now = now + date.getDate() + " ";
	now = now + date.getHours() + ":";
	now = now + date.getMinutes() + ":";
	now = now + date.getSeconds() + "";
	var r_id = $("#hidresume");
	if (type == 1) {
		clickLog("from=zhaopin_jianli_my58_input_jxtx&resume_id=" + r_id + "&qzcateid=" + cateIds + "&qzcate=" + cateName + "&datetime=" + now + "&userid=" + userid + "&rand=" + Math.random())
	} else {
		clickLog("from=zhaopin_jianli_my58_input_yhtx&resume_id=" + r_id + "&qzcateid=" + cateIds + "&qzcate=" + cateName + "&datetime=" + now + "&userid=" + userid + "&rand=" + Math.random())
	}
}

function getFullPartInfo() {
	if (typeof isSkilled != "undefined" && isSkilled == true) {
		var isShowed = GetCookieValue("risShowed");
		if (!isShowed) {
			$.ajax({
				url: "http://jianli.58.com/ajax/getPartSCt",
				data: {},
				type: "post",
				cache: false,
				dataType: "json",
				success: function(data) {
					if (data.returnMessage == "success") {
						var entity = data.entity;
						if (entity != null && entity == 0) {
							$("#ptRresume").show();
							SetCookie("risShowed", 2, "/")
						} else if (entity == 1) {
							SetCookie("risShowed", 0, "/")
						}
					}
				}
			})
		} else if (isShowed == 1) {
			$("#ptRresume").show();
			$("#ptRresumeChk").removeClass("checked");
			SetCookie("risShowed", 2, "/")
		}
	}
	if ($("#ptRresumeChk").is(":visible")) {
		$("#ptRresumeChk").click(function() {
			try {
				if ($this.attr("checked") == true) {
					_gaq.push(["pageTracker._trackEvent", "jianli_post", "click", "zhaopin_jineng_createPartResume_createFromFullResume"])
				} else {
					_gaq.push(["pageTracker._trackEvent", "jianli_post", "click", "zhaopin_jineng_createPartResume_cancelFromFullResume"])
				}
			} catch (err) {}
		})
	}
}

function pgotoAccess() {
	var rid = $("#hidresume").val();
	if ($("#ptRresumeChk").is(":visible") && $("#ptRresumeChk").hasClass("checked")) {
		try {
			createPartResume()
		} catch (err) {}
	}
	closeopendiv();
	try {
		clickSend(2)
	} catch (err) {}
	if (isCreatePart) {
		location.href = "http://jianli.58.com/resumecomplete/?rid=" + rid + "&isCp=1&pid=" + partRid
	} else {
		location.href = "http://jianli.58.com/resumecomplete/?rid=" + rid
	}
}

function bindMouseEvent() {
	var targetBox = ".experDetail .eduDetail";
	$(targetBox).unbind("mouseover");
	$(targetBox).unbind("mouseout");
	$(targetBox).mouseover(function() {
		$(this).addClass("hover").find(".operBtn").show()
	});
	$(targetBox).mouseout(function() {
		$(this).removeClass("hover").find(".operBtn").hide()
	});
	var scloolBox = ".addatsch .infoview tr";
	$(scloolBox).unbind("mouseover");
	$(scloolBox).unbind("mouseout");
	$(scloolBox).mouseover(function() {
		$(this).addClass("hover")
	});
	$(scloolBox).mouseout(function() {
		$(this).removeClass("hover")
	});
	$("#schoarDesView,#positionDesView,#awardDesView").mouseover(function() {
		$(this).find(".modify").show()
	});
	$("#schoarDesView,#positionDesView,#awardDesView").mouseout(function() {
		$(this).find(".modify").hide()
	});
	$("#containerscholarship").find(".modify").hide();
	var targetInput = ":text,textarea";
	$(targetInput).focus(function() {
		var obj = $(this).next();
		if (typeof obj != "undefined" && obj.length > 0 && obj.is("i")) {
			var needFocus = $(this).attr("notactive");
			if (typeof needFocus != "undefined" && needFocus == "true") {
				return
			}
			$(this).parent().addClass("editonfocus")
		} else {
			var needFocus = $(this).attr("notactive");
			if (typeof needFocus != "undefined" && needFocus == "true") {
				return
			}
			$(this).addClass("editonfocus")
		}
	});
	$(targetInput).blur(function() {
		var obj = $(this).next();
		if (typeof obj != "undefined" && obj.length > 0 && obj.is("i")) {
			$(this).parent().removeClass("editonfocus")
		} else {
			$(this).removeClass("editonfocus")
		}
	});
	var inputPouObj = "#inpCertName,#inpAbiName";
	$(inputPouObj).keyup(function() {
		$(this).parent().next().hide()
	});
	$(document).click(function(e) {
		var obj = $(e.target);
		if (obj.is("body") || obj.is("table") || obj.is("form") || obj.is("td") || obj.is("textarea") || obj.is("div") && (obj.attr("class") == "modtab" || obj.attr("class") == "baseinfoview" || obj.attr("class") == "win1000")) {
			if ($("#divJobCatein").is(":visible") || $("#divJobCate").is(":visible")) {
				$("#inpJobCate").val("æ‚¨å¯ä»¥é€‰æ‹©æˆ–è¾“å…¥");
				$("#inpJobCate").css("color", "#95969E")
			}
			hidePopUpWin()
		}
	})
}
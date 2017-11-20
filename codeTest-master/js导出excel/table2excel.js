/*
 *  jQuery table2excel - v1.1.1
 *  jQuery plugin to export an .xls file in browser from an HTML table
 *  https://github.com/rainabba/jquery-table2excel
 *
 *  Made by rainabba
 *  Under MIT License
 */
//table2excel.js
;(function ( $, window, document, undefined ) {
    var pluginName = "table2excel",

    defaults = {
        exclude: ".noExl",
        name: "Table2Excel",
        filename: "table2excel",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            //
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
    }
	
	function getStyle(){//获取页面中现有style标签下的样式
		var styleSheet = document.styleSheets;
		var str = ''
		for(var j=0;j<styleSheet.length;j++){
			var rules = styleSheet[j].cssRules;
			for(var i=0;i<rules.length;i++){
				str += rules[i].cssText;
			}
		}
		return "<style>"+str+"</style>";
	}
	function setStyle(){//为excel添加样式
		if(document.all){ // document.createStyleSheet(url)
	        window.style=getStyle(); 
	        document.createStyleSheet("javascript:style"); 
	    }else{ //document.createElement(style)
	        var style = document.createElement('style'); 
	        style.type = 'text/css'; 
	        style.innerHTML=getStyle(); 
	        document.getElementsByTagName('HEAD').item(0).appendChild(style); 
	    } 
	}
	
	function IEVersion() {//判断ie版本
	 	var browser=navigator.appName
		if(browser!="Microsoft Internet Explorer"){
			return false;//不是ie浏览器
		}else{
			var b_version=navigator.appVersion
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
				return 6;
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){
				return 7;
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
				return 8;
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"){
				return 9;
			}
		}
	 } 
	
    Plugin.prototype = {
        init: function () {
            var e = this;
			//console.dir(this.element.innerHTML)
            var utf8Heading = "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">";
            e.template = {
                head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\">" + utf8Heading + "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
                sheet: {
                    head: "<x:ExcelWorksheet><x:Name>",
                    tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
                },
                mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
                table: {
                    head: "<table>"+getStyle(),//放在head中类不会被标签中的class引到，放在table之间就行
                    tail: "</table>"
                },
                foot: "</body></html>"
            };
            
            e.tableRows = [this.element.innerHTML];
            
            // get contents of table except for exclude
//          $(e.element).each( function(i,o) {
//              var tempRows = "";
//              $(o).find("tr").not(e.settings.exclude).each(function (i,p) {
//                  
//                  tempRows += "<tr class='"+(function(){$(this).attr('class')||""})()+"'>";
//                  $(p).find("td,th").not(e.settings.exclude).each(function (i,q) { // p did not exist, I corrected
//                      
//                      var rc = {
//                          rows: $(this).attr("rowspan"),
//                          cols: $(this).attr("colspan"),
//                          flag: $(q).find(e.settings.exclude)
//                      };
//                      
//                      if( rc.flag.length > 0 ) {
//                          tempRows += "<td class='"+$(this).attr('class')+"'></td>"; // exclude it!!
//                      } else {
//                          if( rc.rows  & rc.cols ) {
//                              tempRows += "<td class='"+$(this).attr('class')+"'>" + $(q).html() + "</td>";
//                          } else {
//                              tempRows += "<td";
//                              if( rc.rows > 0) {
//                                  tempRows += " rowspan=\'" + rc.rows + "\' ";
//                              }
//                              if( rc.cols > 0) {
//                                  tempRows += " colspan=\'" + rc.cols + "\' ";
//                              }
//                              tempRows += "/>" + $(q).html() + "</td>";
//                          }
//                      }
//                  });
//
//                  tempRows += "</tr>";
//                  console.log(tempRows);
//                  
//              });
//              // exclude img tags
//              if(e.settings.exclude_img) {
//                  tempRows = exclude_img(tempRows);
//              }
//
//              // exclude link tags
//              if(e.settings.exclude_links) {
//                  tempRows = exclude_links(tempRows);
//              }
//
//              // exclude input tags
//              if(e.settings.exclude_inputs) {
//                  tempRows = exclude_inputs(tempRows);
//              }
//              e.tableRows.push(tempRows);
//          });

            e.tableToExcel(e.tableRows, e.settings.name, e.settings.sheetName);
        },

        tableToExcel: function (table, name, sheetName) {
            var e = this, fullTemplate="", i, link, a;

            e.format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };

            sheetName = typeof sheetName === "undefined" ? "Sheet" : sheetName;

            e.ctx = {
                worksheet: name || "Worksheet",
                table: table,
                sheetName: sheetName
            };

            fullTemplate= e.template.head;

            if ( $.isArray(table) ) {
                for (i in table) {
                      //fullTemplate += e.template.sheet.head + "{worksheet" + i + "}" + e.template.sheet.tail;
                      fullTemplate += e.template.sheet.head + sheetName + i + e.template.sheet.tail;
                }
            }

            fullTemplate += e.template.mid;

            if ( $.isArray(table) ) {
                for (i in table) {
                    fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
                }
            }

            fullTemplate += e.template.foot;

            for (i in table) {
                e.ctx["table" + i] = table[i];
            }
            delete e.ctx.table;

            var isIE = /*@cc_on!@*/false || !!document.documentMode; // this works with IE10 and IE11 both :)            
            //if (typeof msie !== "undefined" && msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // this works ONLY with IE 11!!!
            if (isIE) {
                if (typeof Blob !== "undefined") {
                    //use blobs if we can
                    fullTemplate = e.format(fullTemplate, e.ctx); // with this, works with IE
                    fullTemplate = [fullTemplate];
                    //convert to array
                    var blob1 = new Blob(fullTemplate, { type: "text/html" });
                    window.navigator.msSaveBlob(blob1, getFileName(e.settings) );
                } else {
                    //otherwise use the iframe and save
                    //requires a blank iframe on page called txtArea1
                    txtArea1.document.open("text/html", "replace");
                    txtArea1.document.write(e.format(fullTemplate, e.ctx));
                    txtArea1.document.close();
                    txtArea1.focus();
                    sa = txtArea1.document.execCommand("SaveAs", true, getFileName(e.settings) );
                }

            } else {
                var blob = new Blob([e.format(fullTemplate, e.ctx)], {type: "application/vnd.ms-excel"});
                window.URL = window.URL || window.webkitURL;
                link = window.URL.createObjectURL(blob);
                a = document.createElement("a");
                a.download = getFileName(e.settings);
                a.href = link;

                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);
            }

            return true;
        }
    };

    function getFileName(settings) {
        return ( settings.filename ? settings.filename : "table2excel" );
    }

    // Removes all img tags
    function exclude_img(string) {
        var _patt = /(\s+alt\s*=\s*"([^"]*)"|\s+alt\s*=\s*'([^']*)')/i;
        return string.replace(/<img[^>]*>/gi, function myFunction(x){
            var res = _patt.exec(x);
            if (res !== null && res.length >=2) {
                return res[2];
            } else {
                return "";
            }
        });
    }

    // Removes all link tags
    function exclude_links(string) {
        return string.replace(/<a[^>]*>|<\/a>/gi, "");
    }

    // Removes input params
    function exclude_inputs(string) {
        var _patt = /(\s+value\s*=\s*"([^"]*)"|\s+value\s*=\s*'([^']*)')/i;
        return string.replace(/<input[^>]*>|<\/input>/gi, function myFunction(x){
            var res = _patt.exec(x);
            if (res !== null && res.length >=2) {
                return res[2];
            } else {
                return "";
            }
        });
    }

    $.fn[ pluginName ] = function ( options ) {
        var e = this;
        if(IEVersion()&&IEVersion()<10){//如果是IE浏览器且版本在10以下
			alert("导出功能仅限ie9以上及其他高级浏览器，如chrome,firefox，不支持ie8,9及以下浏览器！");
        	return;
		}
        e.each(function() {
            if ( !$.data( e, "plugin_" + pluginName ) ) {
                $.data( e, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return e;
    };

})( jQuery, window, document );

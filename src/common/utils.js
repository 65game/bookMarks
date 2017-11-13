/*
 * 基础正则表达式封装
 * 基础工具类封装
 * Creation time :2017-3-8
 * */

export default{
    install(Vue){
        Vue.prototype.$regExp={//正则表达式
            kong: /\S/, //非空
            phone:/^1[34578]\d{9}$/,// 手机号
            number:/^[0-9]*$/,//只能是数字x
            numberd:/^\d+(\.\d+)?$/,//只能是数字和小数点
            //numberdS:/^(\-|\+)?\d+(\.\d+)?$/,//正数、负数和小数
            numberdS:/^(\-)?\d+(\.\d+)?$/,//正数、负数和小数
            numberdOrAmount:/^\d+(\.\d{2})?$/,//限制输入数字，且小数点保留两位
            amount : /^([+-]?)((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/, // 金额 开头只可为正号或者负号,也可以没有符号,小数点前可以输入任意位数的数字,小数点后只能输入两位数字.
            amountPlus:/^((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/,  //只为正数的金额 ,其他跟amountReg一样
            date : /(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/, // 日期
            area : /^[A-Za-z0-9\u4e00-\u9fa5]+$/, //文本域：10-200个汉字或字母
            isZh:/^[\u4E00-\u9FA5]{2,4}$/, //姓名
            contactReg : /^[A-Za-z\u4e00-\u9fa5]+$|[a-z]]/, // 联系人：姓名至少一个汉字或字母
            contractNoReg : /\S/, // 合同编号 匹配由数字和26个英文字母组成的字符串
            nameReg : /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 名称 至少一个汉字或字母
            busReg:/^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 商家/公司名称 姓名至少一个汉字或字母
            email:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,//邮箱号码
            rate:/^((\d+\.?\d*)|(\d*\.\d+))\%$/,  //百分比
            password:/^[\x21-\x7E]{6,20}$/,  //密码
            phoneEmail:/^[1]{1}[0-9]{10}$|(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,  //匹配手机邮箱
            idCard:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/, //简单身份证校验
            banknum:/^(\d{16}|\d{18}|\d{19}|\d{20}|\d{21})$/  //银行卡
        };

        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        Date.prototype.format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            return fmt;
        };

        Vue.prototype.$Utils={//工具类
            /*
            *说明：设置cookie方法
            *key：对象  val：对象的值   time：过去时间（天）
            * */
            setCookie: function(key,val,time){
                if(time){
                    var date=new Date(); //获取当前时间
                    var expiresDays=time;  //将date设置为n天以后的时间
                    date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
                    document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
                }else{
                    document.cookie=key+"="+val;
                }
            },
            /*
            *说明：获取cookie方法
             *key：对象
             * */
            getCookie:function(key){
                var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
                var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
                var tips;  //声明变量tips
                for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
                    var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                    if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                        tips=arr[1];   //将cookie的值赋给变量tips
                        break;   //终止for循环遍历
                    }
                }
                return tips;
            },
            /*
             *说明：删除cookie方法
             *key：对象
             * */
            deleteCookie:function(key){ //删除cookie方法
                var date = new Date(); //获取当前时间
                date.setTime(date.getTime()-10000); //将date设置为过去的时间
                document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
            },
            /*
             *说明：对象复制
             *key：参数传递
             * */
            dataClone:function(data){
                var _data = new Object();
                if(typeof data =='object'){
                    for( var k in data){
                        _data[k] = data[k];
                    }
                }
                return _data;
            },
            /*
            * 说明：判断是否是数字
            * key:string
            * */
            isNumber:function(val){
                var patrn = /^[0-9]*$/;
                if (patrn.exec(val) == null || val == "") {
                    return false
                } else {
                    return true
                }
            },
            /** 金额千分位格式化
             * @param num {Number} 金额
             * @param digits {Number} 保留小数点后几位数
             **/
            addThousandSign(num, digits) {
                var num = parseFloat(num);
                num = '' + num.toFixed(digits);
                return num.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
            },
            /** 删除金额千分位格式化
             * @param num {String} 金额
             **/
            delThousandSign(num){
                var x = num.split(',');
                return parseFloat(x.join(""));
            },
            /** 获取字符串指定前几位
             * @param str {String} 原字符串
             * @param num {Number} 需求的位数
             **/
            getStrFirstPart(str, num){
                str = '' + str;
                num = Number(num);
                if(num > str.length){
                    num = str.length;
                }
                return str.slice(0, num);
            },

            /** 获取字符串指定最后几位
             * @param str {String} 原字符串
             * @param num {Number} 需求的位数
             **/
            getStrLastPart(str, num) {
                str = '' + str;
                num = Number(num);
                return str.slice(-num);
            },
            /** 获取url对象key的值
             **/
            getUrlParam(name){
                var reg = new RegExp("(^|[&\?])" + name + "=([^&]*)(&|$)");
                var searchString = (location.hash) ? location.hash : window.location.search.substring(1);
                var r = searchString.match(reg);
                if (r != null)
                    return decodeURIComponent(r[2]);
            },
            /**获取url对象
             * **/
            getUrlParams(){
                var searchString = "";

                if (location.hash.indexOf("?") > 0) {

                    searchString = location.hash.slice(location.hash.indexOf("?") + 1);
                } else {

                    searchString = window.location.search.substring(1);
                }

                var params = searchString.split("&"), hash = {};

                if (searchString === "")
                    return {};
                for (var i = 0; i < params.length; i++) {
                    var val = params[i].split("=");
                    /* if(navigator.userAgent.indexOf("Safari") > -1){ //谷歌出现兼容问题
                     hash[val[0]] = unescape(val[1]);
                     }else{
                     hash[unescape(val[0])] = decodeURIComponent(val[1]);
                     }*/
                    hash[unescape(val[0])] = decodeURIComponent(val[1]);

                }

                return hash;
            },
            //数组去重
            removeRepeatItem(arr){
                var newArr = [];
                for(var i=0;i<arr.length;i++){
                    if(newArr.indexOf(arr[i])===-1){
                        newArr.push(arr[i])
                    }
                }
                return newArr;
            },
            //根据id找到所有的父节点集合包含自己
            getAllFartherId(id,json){
                var AllCheckId = [id]; //当前所有父集合包含自己
                var jsonOrg = json;  //备份原始树数据
                getFartherId(id,json)
                function getFartherId(id,json){
                    for (var i=0;i<json.length;i++){
                        if(json[i].id==id){
                            AllCheckId.push(json[i].superId);
                            if(json[i].superId>0){
                                getFartherId(json[i].superId,jsonOrg)
                            }
                        }else if(json[i].children.length>0){
                            getFartherId(id,json[i].children)
                        }
                    }

                }
                return AllCheckId;
            },
            //找出所有checked等于true的节点ID
            getAllCheckJsonId(json){
                var AllCheckId = [];
                function findCheckId(json){
                    for(var i = 0; i < json.length; i++){
                        if(json[i].checked){
                            AllCheckId.push(json[i].id);
                        }
                        if(json[i].children.length>0){
                            findCheckId(json[i].children);
                        }
                    }
                }
                findCheckId(json);
                return AllCheckId;
            }

        }
    }
}






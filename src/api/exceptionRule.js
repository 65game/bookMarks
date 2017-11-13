/*
 * http://dev.deelon.net/wiki/doku.php?id=products:paas:apis:hlwxd_apis_statistics#规则分析-异常规则命中列表
 * */
import ajax from './ajax';
const riskAdminApi ='/dlbiz/risk'; //定义风控系统API前缀
import echarts from 'echarts'
export default {
    getList:function(params){ //规则分析-异常规则命中列表
        return ajax.get(riskAdminApi+'/statistics/ruleAnalysis/abnormal/list',params)
    },
    ruleHitTrend:function(params){ //规则分析-命中规则趋势
        return ajax.get(riskAdminApi+'/statistics/ruleHitTrend',params)
    },
    //渲染图表 xAxisData ：x轴名称数组(倾斜) , seriesData：x轴数据数组
    barOnlyX2(id,xAxisData,seriesData,params){
        // 指定图表的配置项和数据
        var max = Math.max.apply(null, seriesData);
        if(max ==0){
            max = 5;
        }
        if(params && params.saveAsImageName !=''){
            var _saveAsImage = {show: true,name:params.saveAsImageName};
        }else{
            var _saveAsImage = {show: true};
        }
        var option = {
            color: ['#199ed8'] ,
            title: {
                text: params && params.title? params.title:'',
                textStyle:{
                    color:'#1c8de0',
                    fontSize:16
                },
                top:10
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:[]
            },
            toolbox: {
                show : params && params.toolbox? params.toolbox:false,
                feature : {
                    saveAsImage : _saveAsImage
                },
                top:params && params.toolboxTop? params.toolboxTop:'auto',
                right:params && params.toolboxRight? params.toolboxRight:'auto'
            },
            grid: {
                left: '0%',
                right: '2%',
                bottom: '60',
                containLabel: true
            },
            xAxis: {
                data: xAxisData,
                axisLabel:{
                    //interval:0,
                    rotate:45,//倾斜度 -90 至 90 默认为0
                    //margin:2,
                    textStyle:{
                        //fontWeight:"bolder",
                        //color:"#000000"
                    }
                },
            },
            yAxis: {
                type: 'value',
                minInterval: 1,
                max:Math.ceil(max/5)*5
            },
            series: [/*{
                name: params && params.name? params.name:'',
                type: 'bar',
                barWidth: '30px',
                data: seriesData
            },*/
                {
                    name: params && params.name? params.name:'',
                    type: 'line',
                    data: seriesData
                }
            ]
        };

        var chartColumn = echarts.init(document.getElementById(id));
        chartColumn.setOption(option,true);
    },
    export:function(params){ //规则分析-异常规则命中列表导出
        var ruleType =params && params.ruleType ? params && params.ruleType : '';
        var smallRuleType =params && params.smallRuleType ? params && params.smallRuleType : '';
        var beginDate =params && params.beginDate ? params && params.beginDate : '';
        var endDate =params && params.endDate ? params && params.endDate : '';
        window.location.href = riskAdminApi+'/statistics/ruleAnalysis/abnormal/list/export?beginDate='+beginDate+'&endDate='+endDate+'&ruleType='+ruleType+'&smallRuleType='+smallRuleType;
        return false;
    }
};

import echarts from 'echarts'
export default{
    //  柱状图--Y yAxisData ：y轴名称数组 , seriesData：y轴数据数组,params{title:'标题'}
    barOnlyY(id,yAxisData,seriesData,params){
        var max = Math.max.apply(null, seriesData);
        if(max ==0){
            max = 5;
        }
        var option = {
            color:['#707173'],
           // color:["#199ed8","#65cea7","#fc8675","#ebc85e","#ba3b28","#2e4652","#619faa","#bea296","#707173","#98c3b0"],
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
            grid: {
                left: '0%',
                right: '2%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                max:Math.ceil(max/5)*5
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                axisLabel:{
                    show:true,
                    formatter: function (value, index) {
                        if(value.length > 4){
                            return value.slice(0,4)+'...';
                        }else{
                            return value;
                        }
                    }
                }
            },
            series: [{
                name: params && params.name? params.name:'',
                type: 'bar',
                barWidth: '30px',
                data: seriesData
            }]
        };
        var chartColumn = echarts.init(document.getElementById(id));
        chartColumn.setOption(option,true);
    },

    //渲染图表 xAxisData ：x轴名称数组 , seriesData：x轴数据数组
    barOnlyX(id,xAxisData,seriesData,params){
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
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
                //min:'dataMin',
                minInterval: 1,
                max:Math.ceil(max/5)*5
            },
            series: [{
                name: params && params.name? params.name:'',
                type: 'bar',
                barWidth: '30px',
                data: seriesData
            }]
        };

        var chartColumn = echarts.init(document.getElementById(id));
        chartColumn.setOption(option,true);
    }
}
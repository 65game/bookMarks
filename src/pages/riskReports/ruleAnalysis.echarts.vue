<!--规则分析-命中规则趋势-->
<template>
    <div>
        <!--查询条件-->
        <div id="mainChartFilters2">
            <div  id="mainChartTime">
                <el-radio-group v-model="filters.countWay" size="mini" @change="getCountWay">
                    <el-radio-button label="1">近7天</el-radio-button>
                    <el-radio-button label="2">近30天</el-radio-button>
                    <el-radio-button label="3">近一年</el-radio-button>
                    <el-radio-button label="4">全部</el-radio-button>
                </el-radio-group>
            </div>
            <!--<div class="data">
                <el-date-picker
                        v-model="filters.dataRange"
                        type="daterange"
                        :picker-options="pickerOptions"
                        placeholder="选择日期范围"
                        :editable = false
                        @change="getData"
                        size="mini"
                        align="right">
                </el-date-picker>
            </div>-->
        </div>
        <!--图表-->
        <div id="mainChart" style="width:100%; height:350px; margin-top: -35px;"></div>
        <div id="chartTips" style="color: #999; display: none; position: absolute; top: 120px; left: 40%;">
            <img src="../../../static/images/noData.png" alt="">
            <div style="padding-left: 32px;padding-top: 0px; font-size: 14px;">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import ruleAnalysisApi from  '../../api/ruleAnalysis'
    //import echartsFn from '../../api/echartsFn'
    import echarts from 'echarts'
    export default {
        props: ['myData'],
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                //过滤条件
                filters:{
                    countWay:'3',       //统计方式(1:近7天,2:近30天,3:近1年,4:全部)
                    dataRange:''
                },
            };
        },
        created(){
            this.$bus.$off('ruleAnalysis_echarts');
            this.$bus.$on('ruleAnalysis_echarts',(params) =>{
                this.ruleHitTrend(params);
            });
        },
        methods: {
            ruleHitTrend(params){
                var _this = this;
                if(params.countWay){
                    _this.filters.countWay = params.countWay;
                }else{
                    _this.filters.countWay = '3';
                }
                ruleAnalysisApi.ruleHitTrend(params).then(res =>{
                    if(res.xAxisTitle && res.xAxisData){
                        /*if(params.smallRuleTypeId == 12){
                            res.xAxisTitle = ["2017-06-20","2017-06-18","2017-06-19","2017-06-20","2017-06-18","2017-06-19"];
                            res.xAxisData = [1,2,3,1,2,3];
                        }*/
                        ruleAnalysisApi.barOnlyX2('mainChart',res.xAxisTitle,res.xAxisData,{name:'命中数量'});
                        if(res.xAxisData.length == 0){
                            document.querySelector('#mainChart canvas').style.display = 'none';
                            document.querySelector('#chartTips').style.display = 'block';
                        }else{
                            document.querySelector('#mainChart canvas').style.display = 'block';
                            document.querySelector('#chartTips').style.display = 'none';
                        }
                    }
                }).catch(error =>{
                    _this.$Error(_this,error);
                });
            },

            //返回格式化后的值
            getData(val){
                this.formatterData = val;
                if(val){
                    this.filters.countWay = '5';
                }else{
                    this.filters.countWay = '4'; //设为全部
                }
                //this.getChart();
            },
            getCountWay(){
                //alert(JSON.stringify(this.myData))
                if(this.myData){
                    var params = {
                        countWay:this.filters.countWay,
                        smallRuleTypeId:this.myData.smallRuleTypeId,
                        date:this.myData.date
                    };
                    this.ruleHitTrend(params);
                }
            },

            demo2(){
                this.chartColumn.hideLoading();
                var title = ["2017-06-20","2017-06-18","2017-06-19"];
                var _val = [1,2,3];
                echartsFn.barOnlyX('mainChart',title,_val,{name:'用户数量'});
            }
        },
        mounted() {
            this.chartColumn = echarts.init(document.getElementById('mainChart'));
            if(this.myData){
                this.ruleHitTrend(this.myData);
            }
        }
    };
</script>

<style scoped>
    .line{ text-align: center; font-size: 14px;}
    #mainChartFilters2{position: absolute; z-index: 999; top: 50px; left: 20px;}
</style>

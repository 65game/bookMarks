<!--新增编辑界面-->
<template>
    <el-dialog :title="editFormTtile" size="small" v-model="editFormVisible">
        <div>
            <ruleEchart v-bind:my-data="result"></ruleEchart>
        </div>
        <div slot="footer" class="dialog-footer">
            <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
            <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>-->
            <!--<el-button type="primary" @click.native="editFormVisible = false">确定</el-button>-->
        </div>
    </el-dialog>
</template>

<script>
    import ruleEchart from './ruleAnalysis.echarts.vue'
    export default {
        components: {
            ruleEchart
        },
        data() {
            return {
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '规则命中趋势图',//编辑界面标题
                result:{
                    "smallRuleTypeId": '',
                    "countWay": '',
                    "date": ''
                },
            };
        },
        created(){
           this.$bus.$off('ruleAnalysisDialogShow');
            this.$bus.$on('ruleAnalysisDialogShow', (title,data) => {
                this.tshowDialog(title,data);
            })
        },
        methods: {
            //显示dialog模态框
            tshowDialog(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data){
                    this.result.smallRuleTypeId = data.smallRuleTypeId;
                    this.result.countWay = data.countWay;
                    this.result.date = data.date;
                    this.$bus.$emit('ruleAnalysis_echarts',data);
                }
                //alert(JSON.stringify(data));
            },
            hideDialog(){
              this.editFormVisible = false;
            }
        },
        mounted() {

        }
    };
</script>

<style scoped>
    .line{ text-align: center; font-size: 14px;}
</style>

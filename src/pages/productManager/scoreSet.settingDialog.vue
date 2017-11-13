<!--评分模型配置--模态框-->
<!--wiki 接口对接 2017/3/20 lhw-->
<template>
	<el-dialog :title="editFormTtile" size="small"   v-model="editFormVisible" :close-on-click-modal="false" @close="hideDialog()">
        <section>
            <el-row class="rule_box">
                <el-col :span="15">
                    <strong>{{hObj.type}}</strong>
                </el-col>
                <el-col :span="9" style="text-align: right;">
                    <el-input
                            placeholder="请输入名称搜索" icon="search" v-model="params.name" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>

            <el-table :data="Data"  border  @selection-change="handleSelectionChange"  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code" width="120" label="指标分类编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="指标分类名称" min-width="150"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="enabled" label="指标状态" width="100" show-overflow-tooltip :formatter="format_enabled"></el-table-column>
            </el-table>

        </section>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import productList from '../../api/productList'
    export default {
        data() {
            return {
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                params: {
                    type:'',    //指标分类类别
                    name:'',           //指标分类名称
                    choosedCodes:''   //已选择的指标编号集，以“,”分隔
                },
                hObj:{}, //接收传递过来参数
                title:'title',
                num:'10',
                listLoading:false,
                multipleSelection: [],
                Data:[
                    {
                        "id": 85,
                        "code": "1001222",
                        "name": "年龄",
                        "enabled": true
                    },
                    {
                        "id": 82,
                        "code": "12001",
                        "name": "lhw",
                        "enabled": false
                    }
                ],
                editLoading: false,
                btnEditText: '确定'
            };
        },
        created(){
            this.$bus.$off('scoreSet_settingDialog_open');
            this.$bus.$on('scoreSet_settingDialog_open', (title,data,name) => {
                //执行处理需要处理事件
                this.scoreSet_settingDialog_open(title,data,name);
            })
        },
        methods: {
            format_enabled(row){
                return row.enabled ? '启用':'停用';
            },
            hideDialog(){
                this.params.name = '';
            },
            //显示dialog模态框
            scoreSet_settingDialog_open:function(title,data,name){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.title = name;
                this.hObj = data;
                this.search();
            },
            reload:function(data){
                this.editForm = data;
            },
            search(){
                var _this = this;
                _this.listLoading = true;
                var params = {
                    type:_this.hObj.type,
                    name:_this.params.name,
                    choosedCodes:_this.hObj.choosedCodes
                }
                productList.factChoose_get(params).then(res =>{
                    _this.Data = res;
                _this.listLoading = false
            }).catch( error =>{
                    _this.$Error(_this,error);
                _this.listLoading = false
            })
            },
            //勾选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //搜索
            handleIconClick(ev) {
                this.search();

            },
            //确定 --回填
            editSubmit: function () {
                var _this = this;
                if(_this.multipleSelection.length){
                    //console.log(_this.multipleSelection);
                    var arr = [];
                    for(var i= 0, l = _this.multipleSelection.length; i< l; i++){
                        var obj = {
                            id:_this.multipleSelection[i].id,
                            code:_this.multipleSelection[i].code, //指标分类编号
                            name:_this.multipleSelection[i].name, //指标分类名称
                            score:_this.multipleSelection[i].score, //分值
                            enabled:true, //指标状态,
                            unSubmit:true //未保存标识
                        }
                        arr.push(obj)
                    }
                    //console.log(arr)
                    //debugger;
                    _this.$bus.$emit('H_scoreSetList_push',_this.hObj.index,arr);
                    _this.editFormVisible = false;
                }else{
                    _this.$message({
                        message: "请至少选择一条数据！",
                        type: 'warning'
                    });
                }

            }
        },
        mounted() {
            var _this = this;
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

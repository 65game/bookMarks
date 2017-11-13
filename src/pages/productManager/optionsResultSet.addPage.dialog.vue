<!--决策建议结果设置--模态框之一评分模型 wiki 接口对接 2017/3/21 lhw-->
<!--http://localhost:8080/#/optionsResultSet-add?id=2 -->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false">
        <section>
            <!--<el-row class="rule_box">
                <el-col :span="18">
                    <strong>{{title}}</strong>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                    <el-input
                            placeholder="请输入名称搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>-->

            <el-table :data="Data"  border highlight-current-row  @current-change="handleCurrentChange"  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column prop="name" width="150" :label="labelName" show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="notes" label="评分说明" min-width="150"  show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="notes" :label="labelNotes" min-width="150"  show-overflow-tooltip></el-table-column>
            </el-table>

        </section>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="submit">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import productList from '../../api/productList' //引入API
    export default {
        data() {
            return {
                productId:'', //产品id
                type:'',  // value:gradeResult为评分决策结果，result为决策结果
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                searchinput: '',
                num:'10',
                listLoading:false,
                currentRow: null,
                labelName:'评分决策',
                labelNotes:'评分说明',
                Data:[
                   /* {
                        "id": 69867,
                        "name": "SRA",
                        "notes": "评分建议批准lhw"
                    },
                    {
                        "id": 69868,
                        "name": "SR",
                        "notes": "评分人工审核"
                    },
                    {
                        "id": 69869,
                        "name": "SRD",
                        "notes": "评分审慎审核"
                    },
                    {
                        "id": 69870,
                        "name": "SD",
                        "notes": "评分快速拒绝"
                    }*/
                ],
                editLoading: false,
                btnEditText: '确定'
            };
        },
        created(){
            this.$bus.$off('optionsResultSet_addPage_open');
            this.$bus.$on('optionsResultSet_addPage_open', (title,data,nameObj) => {
                this.optionsResultSet_addPage_open(title,data,nameObj);
            })
        },
        methods: {
            //显示dialog模态框
            optionsResultSet_addPage_open:function(title,data,nameObj){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.type = data.type;
                this.productId = data.productId;

                if(nameObj && nameObj.labelName && nameObj.labelNotes){
                    this.labelName = nameObj.labelName,
                    this.labelNotes = nameObj.labelNotes
                }else{
                    this.labelName = '评分决策';
                    this.labelNotes ='评分说明';
                }

                if(data.type =='gradeResult'){
                    this.Data = [];
                    this.gradelist_get(data.ruleResult);
                }else if(data.type =='result'){
                    this.getOptions();
                }
            },
            reload:function(data){
                this.editForm = data;
            },
            //单选
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            //搜索
            handleIconClick(ev) {

            },

            //确定回填
            submit: function () {
                var _this = this;

                if(_this.currentRow){
                    //debugger;
                    _this.$bus.$emit('H_optionsResultSet_bindData',_this.type,_this.currentRow.name);
                    _this.editFormVisible = false;
                }else{
                    _this.$message({
                        type:'warning',
                        message:'请单击选择一条数据！'
                    })
                }

            },
            //过滤评分决策接口 --传参数 规则决策结果
            gradelist_get(ruleResult){
                var _this = this;
                var params = {
                    ruleResult:ruleResult ?  ruleResult:'',
                    productId:_this.$route.query.productId
                };
                _this.listLoading = true;
                productList.gradelist_get(params).then(res =>{
                    _this.Data = res;
                 _this.listLoading = false;
                }).catch(error =>{
                    _this.$Error(_this,error);
                _this.listLoading = false;
                });
            },
            search(){
                var _this = this;
                var params = {productId:_this.productId};
                _this.listLoading = true;
                productList.gradelist_get(params).then(res =>{
                    _this.Data = res;
                _this.listLoading = false;
                }).catch(error =>{
                        _this.$Error(_this,error);
                _this.listLoading = false;
                });
            },
            //从数字字典获取 综合决策结果
            getOptions(){
                var _this = this;
                _this.listLoading = true;
                productList.gradeResultOptions_get('/系统目录/数据字典/风控系统/综合决策结果/').then(res =>{
                    // debugger;
                    _this.listLoading = false;
                    _this.options  = res.content;
                    var resultArr = [];
                    if(_this.options && _this.options.length){
                        for(var i= 0,l=_this.options.length; i<l; i++){
                            var obj = {
                                id:_this.options[i].id,
                                name:_this.options[i].itemValue,
                                notes:_this.options[i].descp
                            }
                            resultArr.push(obj);
                        }
                    }
                _this.Data = resultArr;

            }).catch(error =>{
                    _this.$Error(_this,error);
                _this.listLoading = false;
            });
            },

        },
        mounted() {
            //this.search();
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

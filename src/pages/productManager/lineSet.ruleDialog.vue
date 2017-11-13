<!--额度策略调整-- 系数设置弹窗-->
<!--2017/3/21 lhw-->
<!--http://dev.deelon.net/wiki/doku.php?id=products:paas:apis:hlwxd_apis_gradelevel#额度系数设置列表接口 -->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false">
        <section>

            <el-table :data="Data"  border highlight-current-row  @current-change="handleCurrentChange"  style="width: 100%; margin-top: 10px;" v-loading="listLoading">

                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="评分等级">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="收入调整系数" prop="incomeCoefficient">
                                <el-input v-model="props.row.incomeCoefficient" name="incomeCoefficient"  size="small" placeholder="请输入收入系数" style="width: 120px;"></el-input>
                            </el-form-item>
                            <el-form-item label="评分调整系数">
                                <el-input v-model="props.row.gradeCoefficient" size="small" placeholder="请输入评分系数" style="width: 120px;"></el-input>
                            </el-form-item>
                            <el-form-item label="操作">
                                <el-button type="info"size="small" icon="circle-check" @click="save(props.row)" :loading="saveLoading">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="name" width="150" label="评分等级" show-overflow-tooltip></el-table-column>
                <el-table-column prop="incomeCoefficient" label="收入调整系数（%）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="gradeCoefficient" label="评分调整系数（%）"  show-overflow-tooltip></el-table-column>
            </el-table>

        </section>
		<div slot="footer" class="dialog-footer">
			<el-button @click="resetForm">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import productList from '../../api/productList'
    export default {
        data() {
            var incomeCoefficient = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入上限金额'));
                } else if(!this.$regExp.amountPlus.test(value)){
                    callback(new Error('请输入正确的金额格式'));
                } else {
                    callback();
                }
            };
            return {
                productId:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                searchinput: '',
                num:'10',
                listLoading:false,
                saveLoading:false,
                currentRow: null,
                Data:[
                    /*{
                        "id": 1,
                        "productId": 1,
                        "name": "A",
                        "incomeCoefficient": "70",
                        "gradeCoefficient": "70"
                    }*/
                ],
                editLoading: false,
                btnEditText: '提交',
                rules: {
                    incomeCoefficient: [
                        {required: true, validator: incomeCoefficient}
                    ]
                }
            };
        },
        created(){
            this.$bus.$on('lineSetRuleDialog_open', (title,data) => {
                //执行处理需要处理事件
                this.lineSetRuleDialog_open(title,data);
            })
        },
        methods: {
            save(row){
                var _this = this;
                //alert(JSON.stringify(row));
                var params ={
                    id:row.id,
                    gradeCoefficient:row.gradeCoefficient,
                    incomeCoefficient:row.incomeCoefficient
                };
                if(!this.$regExp.numberd.test(row.gradeCoefficient) || !this.$regExp.numberd.test(row.incomeCoefficient)){
                    this.$message.warning('请输入数字！');
                    return;
                }
                var paramsArr = [];
                paramsArr.push(params)
                _this.saveLoading = true;
                productList.coeupdate_put(paramsArr).then(res =>{
                    if(res.code =='0'){
                    _this.$message({
                        message:'修改额度系数成功！',
                        type:'success'
                    })
                    _this.search();
                    }else{
                        _this.$message({
                            message:res.msg || '操作失败！',
                            type:'warning'
                        })
                    }
                  _this.saveLoading = false;
                }).catch(error =>{
                    _this.$Error(_this,error)
                _this.saveLoading = false;
                })
            },
            //显示dialog模态框
            lineSetRuleDialog_open:function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.productId = data.productId; //产品id
                this.search();
            },
            search(){
                var _this = this;
                _this.listLoading = true;
                productList.coefficientList_get({productId:_this.productId}).then(res =>{
                    _this.Data = res;
                   _this.listLoading = false;
                }).catch(error =>{
                    _this.$Error(_this,error);
                    _this.listLoading = false;
                })
            },
            reload:function(data){
                this.editForm = data;
            },
            resetForm(){
                this.Data= [
                    {
                        ruleNum:'70',
                        ruleGrade:"A",
                        ruleType:"80",
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        id:"4"
                    },
                    {
                        ruleNum:'60',
                        ruleGrade:"B",
                        ruleType:"60",
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        id:"3"
                    },
                    {
                        ruleNum:'70',
                        ruleGrade:"C",
                        ruleType:"80",
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        id:"5"
                    },
                    {
                        ruleNum:'70',
                        ruleGrade:"D",
                        ruleType:"80",
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        id:"5"
                    }
                ];

                this.editFormVisible = false
            },
            //单选
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            //搜索
            handleIconClick(ev) {

            },

            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.editFormVisible = false;
                _this.$bus.$emit('lineSetRuleFn',{ruleGrade:_this.currentRow.ruleGrade,id:_this.currentRow.id,ruleNum:_this.currentRow.ruleNum,ruleType:_this.currentRow.ruleType});
            }
        },
        mounted() {
           // this.search();
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

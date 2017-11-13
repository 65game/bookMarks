<!--决策建议结果设置 --决策规则--模态框 2017/3/21 pm lhw-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false">
        <section>


            <el-table :data="Data"  border highlight-current-row  @current-change="handleCurrentChange"  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column prop="name" width="150" label="规则决策" show-overflow-tooltip></el-table-column>
                <el-table-column prop="notes" label="决策结果内容" min-width="150"  show-overflow-tooltip></el-table-column>
            </el-table>

        </section>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import productList from '../../api/productList' //引入API
    export default {
        data() {
            return {
                productId:'', //产品id
                type:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                searchinput: '',
                num:'10',
                listLoading:false,
                currentRow: null,
                Data:[
                   /* {
                        "id": 69863,
                        "name": "R",
                        "notes": "人工审核aaaddd贷款贷款卡？"
                    },
                    {
                        "id": 69864,
                        "name": "RD",
                        "notes": "审慎审核"
                    },
                    {
                        "id": 69865,
                        "name": "D",
                        "notes": "快速拒绝"
                    }*/
                ],
                editLoading: false,
                btnEditText: '提交'
            };
        },
        created(){

            this.$bus.$off('optionsResultSet_addPage_rule');
            this.$bus.$on('optionsResultSet_addPage_rule', (title,data) => {
                this.optionsResultSet_addPage_rule(title,data);
            });

            //过滤规则决策
            this.$bus.$off('optionsResultSet_getRuleList');
            this.$bus.$on('optionsResultSet_getRuleList', (params) => {
                this.search(params);
        })

        },
        methods: {
            //显示dialog模态框
            optionsResultSet_addPage_rule:function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.type = data.type;
                this.productId = data.productId;
                this.search({gradeResult:data.gradeResult});
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
            editSubmit: function () {
                var _this = this;
               // console.log(_this.currentRow);
                if(_this.currentRow){
                    _this.$bus.$emit('H_optionsResultSet_bindData',_this.type,_this.currentRow.name);
                    _this.editFormVisible = false;
                }else{
                    _this.$message({
                        type:'warning',
                        message:'请单击选择一条数据！'
                    })
                }

            },
            search(obj){
                var obj = typeof obj =='object'? obj : {gradeResult:''};
                var _this = this;
                var params = {
                    productId:_this.$route.query.productId,
                    gradeResult:obj.gradeResult || '' //评分决策结果
                };
                _this.listLoading = true;
                productList.rulelist_get(params).then(res =>{
                    _this.Data = res;
                _this.listLoading = false;
                }).catch(error =>{
                        _this.$Error(_this,error);
                _this.listLoading = false;
                });
            },
        },
        mounted() {

        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

<!--规则模型配置--模态框-->
<!--2017/3/18 lhw-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false" @close="hideDialog()">
        <section>
            <el-row class="rule_box">
                <el-col :span="15">
                    <strong>{{hObj.ruleType}}</strong>
                </el-col>
                <el-col :span="9" style="text-align: right;">
                    <el-input
                            placeholder="请输入规则名称搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>

            <el-table :data="Data"  border  @selection-change="handleSelectionChange"  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code" width="120" label="规则编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="规则名称" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="smallTypes" label="规则分类" min-width="150"  show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="state" label="规则状态" width="100" show-overflow-tooltip></el-table-column>-->
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
                searchinput: '',
                num:'10',
                listLoading:false,
                title:'title',
                multipleSelection: [],
                hObj:{}, //接收传递过来参数
                Data:[
                    /*{
                        "id": 1,
                        "code": "16001",
                        "name": "工龄检测-lhw1",
                        "smallTypes": "工龄检测--lhw1"
                    },
                    {
                        "id": 2,
                        "code": "16002",
                        "name": "在职时长-lhw123",
                        "smallTypes": "在职时长等等等等"
                    },
                    {
                        "id": 11,
                        "code": "16003",
                        "name": "test",
                        "smallTypes": "3"
                    }*/
                ],
                editLoading: false,
                btnEditText: '确定'
            };
        },
        created(){
            this.$bus.$off('ruleSet_settingDialog_open');
            this.$bus.$on('ruleSet_settingDialog_open', (title,data,name) => {
                //执行处理需要处理事件
                this.ruleSet_settingDialog_open(title,data,name);
            })
        },
        methods: {
            //显示dialog模态框
            ruleSet_settingDialog_open:function(title,data,name){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.title=name;
                this.hObj = data;
                this.search(data);
            },
            hideDialog(){
                this.searchinput = '';
            },
            reload:function(data){
                this.editForm = data;
            },
            search(data){
                var _this = this;
                var parasm = {
                    ruleType:data.ruleType,
                    ruleName:_this.searchinput || '',
                    choosedCodes:data.choosedCodes
                }
                _this.listLoading = true;
                productList.ruleChoose_get(parasm).then(res =>{
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
                this.search(this.hObj);
            },

            //确定 --回填  规则模型配置 --http://localhost:8080/#/ruleSet?id=1
            editSubmit: function () {
                var _this = this;
                if(_this.multipleSelection.length){
                    //console.log(_this.multipleSelection);
                    var arr = [];
                    for(var i= 0, l = _this.multipleSelection.length; i< l; i++){
                        var obj = {
                            id:_this.multipleSelection[i].id,
                            code:_this.multipleSelection[i].code, //规则编号
                            name:_this.multipleSelection[i].name, //规则名称
                            smallTypes:_this.multipleSelection[i].smallTypes, //规则分类
                            enabled:true, //规则状态,
                            unSubmit:true //未保存标识
                        }
                        arr.push(obj)
                    }
                    //console.log(arr)
                    //debugger;
                    _this.$bus.$emit('H_ruleSetList_push',_this.hObj.index,arr);
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
            //var _this = this;
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

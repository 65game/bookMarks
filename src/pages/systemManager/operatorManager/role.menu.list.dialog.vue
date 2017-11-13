<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible" @close="hideDialog">
		<el-form :model="editForm" label-width="90px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="菜单名称" prop="resName" >
						<el-input v-model="editForm.resName" name="resName" auto-complete="off" placeholder="请输入菜单名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="资源地址" prop="resUrl">
						<el-input  v-model="editForm.resUrl" name="resUrl" auto-complete="off" placeholder="请输入资源地址"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="排序" prop="orderId">
						<el-input v-model="editForm.orderId" name="orderId" auto-complete="off" placeholder="请输入排序"></el-input>
					</el-form-item>
				</el-col>

			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="描述">
						<el-input type="textarea" v-model="editForm.alias" placeholder="请输入描述" resize="none"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="hideDialog">取消</el-button>
			<el-button type="primary" @click.native="Submit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import role from '../../../api/role'
    export default {
        data() {
            var number = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入排序'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('排序必须为数字值'));
                } else {
                    callback();
                }
            };
            return {
                currentID:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: 0,
                    resName:'',
                    resUrl: '',
                    orderId:'',
                    alias:''
                },
                editLoading: false,
                btnEditText: '提交',
				SubmitType:'',
                editFormRules: { //校验规则
                    resName: [
                        { required: true, message: '请输入菜单名称'}
                    ],
                    resUrl: [
                        { required: true, message: '请输入资源地址'}
                    ],
                    orderId: [
                        {required: true, validator: number}
                    ]
                }
            };
        },
        created(){
            this.$bus.$off('getDialogId');
            this.$bus.$on('getDialogId', (id) => {
                this.currentID=id;
            })
            this.$bus.$off('menuDialogShow');
            this.$bus.$on('menuDialogShow', (title,data) => {
                this.menuDialogShow(title,data);
            })
        },
        methods: {
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
                },100)
            },
            //显示dialog模态框
            menuDialogShow:function(title,data){
                var _this = this;
                _this.editFormTtile = title;
                if(data.id&&data.type=="lowerTree"){//新增下级树菜单
                    _this.SubmitType = "lowerTree";
                    this.editForm= {
                        id: data.id,
                        resName:'',
                        resUrl: '',
                        orderId:'',
                        alias:''
                    }
                }else if(data.id){//编辑
                    _this.SubmitType = "edit";
                    _this.reload(data);
				}
                else{//新增
                    _this.SubmitType = "add";
                    this.editForm= {
                        id: 0,
                        resName:'',
                        resUrl: '',
                        orderId:'',
                        alias:''
                    }
                }
                _this.editFormVisible = true;
            },
            reload:function(data){
                this.editForm = data;
            },
            //编辑 or 新增
            Submit: function () {
                var _this = this;
                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.SubmitType == "add") {
                            //新增
                            var params = {
                                resName:_this.editForm.resName,
                                resUrl: _this.editForm.resUrl,
                                orderId:_this.editForm.orderId,
                                alias:_this.editForm.alias
                            };
                            role.addTreeMenu(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('getMenuList', _this.currentID);
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else if(_this.SubmitType == "lowerTree") {
                            //新增下级树菜单
                            var params = {
                                id: '',
                                resName:_this.editForm.resName,
                                resUrl: _this.editForm.resUrl,
                                orderId:_this.editForm.orderId,
                                alias:_this.editForm.alias,
                                access:'1',
                                superId:_this.editForm.id
                            };
                            role.addTreeMenu(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('getMenuList', _this.currentID);
                        }).catch(function (error) {
                                _this.editFormVisible = false;
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }else if(_this.SubmitType == "edit") {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                resName:_this.editForm.resName,
                                resUrl: _this.editForm.resUrl,
                                orderId:_this.editForm.orderId,
                                alias:_this.editForm.alias
                            };
                            role.editTreeMenu(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('getMenuList', _this.currentID);
                        }).catch(function (error) {
                                _this.editFormVisible = false;
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }
                       /* _this.$confirm('确认提交吗？', '提示', {}).then(() => {

                        }).catch(() => {});*/
                    }
                });
            }
        },
        mounted() {
            var _this = this;
        }
    };
</script>


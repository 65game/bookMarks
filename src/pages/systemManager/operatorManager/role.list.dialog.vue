<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible" @close="hideDialog">
		<el-form :model="editForm" label-width="60px" :rules="editFormRules" ref="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="编号" prop="code" >
						<el-input v-model="editForm.code" name="code" auto-complete="off" placeholder="请输入编号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="名称" prop="name">
						<el-input  v-model="editForm.name" name="name" auto-complete="off" placeholder="请输入名称"></el-input>
					</el-form-item>
				</el-col>

			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" v-model="editForm.remark" placeholder="请输入备注" resize="none"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="hideDialog">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import role from '../../../api/role'
    export default {
        data() {
            return {
                type:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: 0,
                    code:'',
                    name: '',
                    remark:''
                },
                editLoading: false,
                btnEditText: '提交',
                editFormRules: { //校验规则
                    code: [
                        { required: true, message: '请输入编号'}
                    ],
                    name: [
                        { required: true, message: '请输入名称'},
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符'}
                    ]
                }
            };
        },
        created(){
            this.$bus.$on('DialogShow', (title,data,type) => {
                this.type = type;
                this.roleDialogShow(title,data);
            })
        },
        methods: {
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs.editForm.resetFields();
                },100)
            },
            //显示dialog模态框
            roleDialogShow:function(title,data){
                var _this = this;
                _this.editFormTtile = title;
                if(data.id){//编辑
                    _this.reload(data);
                    //_this.resetForm();//新增重置表单
                }
                else{//新增
                    this.editForm= {
                        id: 0,
                        code:'',
                        name: '',
                        remark:''
                    }

                }
                _this.editFormVisible = true;
            },
            resetForm(formName) {
                this.$refs['editForm'].resetFields();
            },
            reload:function(data){
                this.editForm = data;
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.type== 'add') {
                            //新增
                            var params = {
                                code: _this.editForm.code,
                                name: _this.editForm.name,
                                remark: _this.editForm.remark
                            };
                            role.addrole(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updatagrole');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                code: _this.editForm.code,
                                name: _this.editForm.name,
                                remark: _this.editForm.remark
                            };
                            role.addrole(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updatagrole');
                        }).catch(function (error) {
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


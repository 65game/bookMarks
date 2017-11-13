<!--编辑界面-->
<template>
	<el-dialog :title="editFormTtile" v-model="editFormVisible" @close="hideDialog" size="tiny">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="类别名称" prop="name">
						<el-input v-model="editForm.name" auto-complete="off" placeholder="请输入类别名称"></el-input>
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
    import ruleClass from '../../api/ruleClass'
    export default {
        data() {
            return {
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile:'',//编辑界面标题
                currentTypeId:'',
                //编辑界面数据
                editForm: {
                    'id':'',
                    'name':''
                },
                getData:{}, //接收数据
                editLoading: false,
                btnEditText: '提交',
                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入类别名称'},
                        {max:20,message:'长度不能超过20个字符'}
                    ]
                }
            };
        },
        created(){
            this.$bus.$off('H_treeDialogShow');
            this.$bus.$on('H_treeDialogShow', (title,data,type) => {
					this.H_treeDialogShow(title,data,type);
			});
            this.$bus.$off('SentcurrentRowID');
            this.$bus.$on('SentcurrentRowID', (data) => {
					this.getcurrentTypeId(data);
			})
        },
        methods: {
            getcurrentTypeId(data){
                this.currentTypeId=data;
            },
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
                },100)
            },
            //显示dialog模态框
            H_treeDialogShow:function(title,data,type){
                this.getData = data;
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.type = type;
                if(type ==="editType"||type ==="editTree"){//编辑
                    this.reload(data);
                }else if(type =='addSub'){//新增子分类
                    this.editForm = {
                        'id':data.id,
                        'name':''
                    }
                }else{
                    this.editForm = {//新增顶级分类
                        'id':'',
                        'name':'',
                    }
                }
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
                        if(_this.type=='editType'|| _this.type=='editTree'){  //编辑
                            var para = {
                                id: _this.editForm.id,
                                name: _this.editForm.name
                            };
                            ruleClass.edit(para).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.$message({
                                message:'编辑成功！' ,
                                type: 'success'
                            });
                            _this.editFormVisible = false;
                            if(_this.type=='editType'){
                                _this.$bus.$emit('ruleClassTreeReaload');
                            }
                            if(_this.type=='editTree'){
                                _this.$bus.$emit('getTreeList',_this.currentTypeId);
                            }
                        }).catch (function(error){
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }
                        else if(_this.type=='addSub'){  //新增子分类
                            var para = {
                                parentId:_this.editForm.id,
                                name: _this.editForm.name,
                                type:'RULE',
                            };
                            ruleClass.add(para)
								.then((res) => {
									if(res.code=="0"){
										_this.editFormVisible = false;
										_this.$message({
											message: '新增成功！',
											type: 'success'
										});
										_this.$bus.$emit('getTreeList',_this.currentTypeId);
									}else{
										_this.$notify({
											title: '提示',
											message: res.msg,
											type: 'error'
										});
									}
									_this.editLoading = false;
									_this.btnEditText = '提交';

								}).catch (function(error){
										_this.editLoading = false;
									_this.btnEditText = '提交';
									_this.$Error(_this,error);
								});
                        }
                    }
                });
            }
        },
        mounted() {
            var _this = this;
        }
    };
</script>

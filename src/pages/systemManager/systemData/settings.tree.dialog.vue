<!--编辑界面-->
<template>
	<el-dialog :title="editFormTtile" v-model="editFormVisible" @close="hideDialog" size="tiny">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="字典名称" prop="name">
						<el-input v-model="editForm.name" auto-complete="off" placeholder="请输入字典名称"></el-input>
					</el-form-item>
				</el-col>

			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="字典描述" prop="descp">
						<el-input v-model="editForm.descp" auto-complete="off" placeholder="请输入字典描述"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row>
				<el-col :span="24">
					<el-form-item label="项值" prop="data">
						<el-input v-model="editForm.data" auto-complete="off" placeholder="请输入项值"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="hideDialog">取 消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import dictionary from '../../../api/dictionary'
	import TreeVue  from './dictionary.tree'
	export default {
		data() {
			return {
				editFormVisible: false,//编辑界面显是否显示
				editFormTtile: '编辑数字字典',//编辑界面标题
				type:'',//标志CD
				//编辑界面数据
				editForm: {
					'id':'',
					'name':'',
					'descp':'',
					'access':'',
					'parentPath':''
				},
				getData:{}, //接收数据
				editLoading: false,
				btnEditText: '提 交',
				editFormRules: { //校验规则
					name: [
						{ required: true, message: '请输入字典名称'},
						{ max:15, message: '长度不能超过15个字符'}
					],
					descp: [
						{ required: true, message: '请输入字典描述'},
						{ max:20, message: '长度不能超过20个字符'}
					],
					data: [
						{ required: true, message: '请输入项值'},
						{ max:20, message: '长度不能超过20个字符'}
					]
				}
			};
		},
		created(){
            this.$bus.$off('treeDialogShow');
			this.$bus.$on('treeDialogShow', (title,data,type) => {
				//执行处理需要处理事件
				this.treeDialogShow(title,data,type);
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
			treeDialogShow:function(title,data,type){
				this.getData = data;
				//debugger;
				this.editFormVisible = true;
				this.editFormTtile = title;
				this.type = type;
				if(type ==="edit"){
					this.reload(data);
				}else if(type =='addSub'){
					this.editForm = {
						'id':data.id,
						'name':'',
						'descp':'',
						'access':'',
						'parentPath':''
					}
					//debugger;
				}else{
					this.editForm = {
						'id':'',
						'name':'',
						'descp':'',
						'access':'',
						'parentPath':'/系统目录/配置设置/'
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
						//debugger;
						_this.editLoading = true;
						_this.btnEditText = '提交中';
						if (_this.editForm.id) {
							if(_this.type=='addSub'){
								//新增子分类
								var  para = {
									name: _this.editForm.name,
									descp: _this.editForm.descp,
									data: _this.editForm.data,
									parentPath:_this.getData.fullPath,
								};
								var msg ='新增成功！'
							}else if(_this.type=='edit'){
								//编辑
								var para = {
									id: _this.editForm.id,
									name: _this.editForm.name,
									descp: _this.editForm.descp,
									data: _this.editForm.data
								};
								var msg ='编辑成功！'
							}
							//debugger;
							dictionary.subTree(para).then((res) => {
								_this.editLoading = false;
							_this.btnEditText = '提交';
							_this.$message({
								message:msg ,
								type: 'success'
							});
							_this.editFormVisible = false;
							_this.$bus.$emit('dictionaryTreeReaload');
						}).catch (function(error){
								_this.editLoading = false;
								_this.btnEditText = '提交';
								_this.$Error(_this,error);
							});


						} else {
							//新增 根节点

							let para = {
								name: _this.editForm.name,
								descp: _this.editForm.descp,
								parentPath:_this.editForm.parentPath,
								data:_this.editForm.data
							};
							dictionary.subTree(para).then((res) => {
								_this.editLoading = false;
							_this.btnEditText = '提交';
							_this.$message({
								message: '新增成功！',
								type: 'success'
							});
							_this.editFormVisible = false;
							_this.$bus.$emit('dictionaryTreeReaload');
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


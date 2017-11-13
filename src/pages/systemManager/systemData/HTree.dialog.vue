<!--编辑界面-->
<template>
	<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
		<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
			<el-row>
				<el-col :span="22">
					<el-form-item label="字典名称" prop="name">
						<el-input v-model="editForm.name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>

			</el-row>

			<el-row>
				<el-col :span="22">
					<el-form-item label="字典描述" prop="descp">
						<el-input v-model="editForm.descp" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row>
				<el-col :span="22">
					<el-form-item label="项值" prop="data">
						<el-input v-model="editForm.data" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取 消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import dictionary from '../../../api/dictionary'
	export default {
		data() {
			return {
				editFormVisible: false,//编辑界面显是否显示
				editFormTtile: '编辑数字字典',//编辑界面标题
				//编辑界面数据
				editForm: {
					'id':'',
					'name':'',
					'descp':'',
					'access':'',
					'parentPath':''
				},
				editLoading: false,
				btnEditText: '提 交',
				editFormRules: { //校验规则
					name: [
						{ required: true, message: '请输入字典名称'}
					],
					descp: [
						{ required: true, message: '请输入字典描述'}
					],
					data: [
						{ required: true, message: '请输入项值'}
					]
				}
			};
		},
		created(){
			this.$bus.$on('treeDialogShow', (title,data,type) => {
				//执行处理需要处理事件
				this.treeDialogShow(title,data,type);
			})
		},
		methods: {
			//显示dialog模态框
			treeDialogShow:function(title,data,type){
				this.editFormVisible = true;
				this.editFormTtile = title;
				if(type ==="edit"){
					this.reload(data);
				}else{
					this.editForm = {
						'id':'',
						'name':'',
						'descp':'',
						'access':'',
						'parentPath':''
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

						if (_this.editForm.id) {
							//编辑
							let para = {
								id: _this.editForm.id,
								name: _this.editForm.name,
								descp: _this.editForm.descp
							};
							dictionary.subTree(para).then((res) => {
								_this.editLoading = false;
								_this.btnEditText = '提 交';
								_this.$message({
									message: '提交成功！',
									type: 'success'
								});
								_this.editFormVisible = false;
							}).catch (function(error){
								_this.editLoading = false;
								_this.btnEditText = '提 交';
								_this.$Error(_this,error);
							});


						} else {
							//新增
							let para = {
								name: _this.editForm.name,
								descp: _this.editForm.descp
							};
							dictionary.subTree(this,para,function(){}).then((res) => {
								_this.editLoading = false;
								_this.btnEditText = '提 交';
								_this.$message({
									message: '提交成功！',
									type: 'success'
								});
								_this.editFormVisible = false;
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

<!--编辑界面-->
<template>
	<el-dialog :title="editFormTtile" v-model="editFormVisible" @close="hideDialog">
		<el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="编号(不允许重复)" prop="resName">
						<el-input v-model="editForm.resName" placeholder="请输入编号" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="项值" prop="itemValue">
						<el-input v-model="editForm.itemValue" placeholder="请输入项值" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="别名" prop="alias">
						<el-input  v-model="editForm.alias" placeholder="请输入别名" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="序号" prop="orderId">
						<!--<el-input-number v-model="editForm.orderId" :min="1" :max="200"></el-input-number>-->
						<el-input v-model="editForm.orderId" placeholder="请输入序号" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="扩展字段">
						<el-input  v-model="editForm.itemKey" placeholder="请输入扩展字段"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">

					<el-form-item label="描述" prop="descp">
						<el-input type="textarea" v-model="editForm.descp" placeholder="请输入描述" resize="none"></el-input>
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
	import dictionary from '../../../api/dictionary'
	export default {
		data() {
			var ValidatorNumber = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入请输入序号'));
				} else if(!this.$regExp.number.test(value)){
					callback(new Error('序号必须为数字值'));
				} else {
					callback();
				}
			};
			return {
				editFormVisible: false,//编辑界面显是否显示
				editFormTtile: '编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					id: '',
					resName: '',
					itemValue: '',
					descp: '',
					alias: '',
					orderId: '',
					itemKey:''
				},
				editLoading: false,
				btnEditText: '提交',
				editFormRules: { //校验规则
					resName: [
						{ required: true, message: '请输入编号'},
						{ max: 20, message: '长度不能超过20个字符'}
					],
					itemValue: [
						{ required: true, message: '请输入项值'},
						{ max: 20, message: '长度不能超过20个字符'}
					],
					alias:[
						{ max: 20, message: '长度不能超过20个字符',required:false}
					],
					orderId: [
						{required: true, validator: ValidatorNumber},
						{ max: 20, message: '长度不能超过20个字符'}
					],
					descp: [
						{ required: true, message: '请输入描述'},
						{ max: 150, message: '长度不能超过150个字符'}
					]
				}
			};
		},
		created(){
            this.$bus.$off('dictionaryDialogShow');
			this.$bus.$on('dictionaryDialogShow', (title,data) => {
				//执行处理需要处理事件
				this.dictionaryDialogShow(title,data);
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
			dictionaryDialogShow:function(title,data){
				this.editFormVisible = true;
				this.editFormTtile = title;
				if(data.id){
					this.reload(data);
				}else{
					this.editForm ={
						id: '',
						resName: '',
						itemValue: '',
						descp: '',
						alias: '',
						orderId: '',
						itemKey:'',
						parent_path:data.parent_path //当前目录路径
					}
				}
			},
			reload:function(data){
				this.editForm = data;
				if(this.editForm.orderId){
					this.editForm.orderId = this.editForm.orderId.toString();
				}
			},
			//编辑 or 新增
			editSubmit: function () {
				var _this = this;

				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.editLoading = true;
						_this.btnEditText = '提交中';
						if (_this.editForm.id) {
							var msg = '编辑成功！';
						}else{
							var msg = '新增成功！';
						}
						//新增
						dictionary.submit(_this.editForm).then((res) => {
							_this.editLoading = false;
						_this.btnEditText = '提交';
						this.$message({
							message: msg,
							type: 'success'
						});
						_this.editFormVisible = false;
						_this.$bus.$emit('reloadDictionaryList',_this.editForm.parent_path);
						}).catch(function (error) {
							_this.editLoading = false;
							_this.$Error(_this,error);
							_this.btnEditText = '提交';
						});


					}
				});

			}
		},
		mounted() {
			var _this = this;

		}
	};
</script>

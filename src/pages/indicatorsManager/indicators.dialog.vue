
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible"  @close="hideDialog">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标分类" prop="name">
						<el-input v-model="editForm.name" name="name" auto-complete="off" placeholder="请输入指标分类"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标编号" prop="code">
						<el-input v-model="editForm.code" name="code" auto-complete="off" placeholder="请输入指标编号" :disabled="inputdisabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="所属大类" prop="type">
						<el-select v-model="editForm.type" filterable placeholder="请选择所属大类" style="width: 100%;">
							<el-option v-for="item in options" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标状态" prop="enabled">
						<el-radio-group v-model="editForm.enabled">
							<el-radio label="true">启用</el-radio>
							<el-radio label="false">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="指标分值" prop="score">
						<el-input v-model="editForm.score" name="score" auto-complete="off" placeholder="请输入指标分值"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标说明" prop="notes">
						<el-input type="textarea" v-model="editForm.notes" resize="none" placeholder="请输入指标说明"></el-input>
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
    import indicatorsManager from '../../api/indicatorsManager'
    export default {
        data() {
            var ValidatorCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入指标编号'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('指标编号必须为数字值'));
                } else {
                    callback();
                }
            };
            var ValidatorScore = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入指标分值'));
                } else if(!this.$regExp.numberdS.test(value)){
                    callback(new Error('指标分值必须为数字值'));
                } else {
                    callback();
                }
            };
            return {
                type:'',
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增指标',//编辑界面标题
                inputdisabled:false,//判断input是否可编辑
                options: [],
                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入指标分类'}
                    ],
                    code: [
                        {required: true, validator: ValidatorCode}
                    ],
                    enabled: [
                        { required: true, message: '请选择指标状态'}
                    ],
                    score:[
                        {required: true, validator: ValidatorScore}
                    ],
                    type:[
                        { required: true, message: '请选择所属大类'}
                    ],
                    notes:[
                        { min: 0, max:200, message: '指标说明在200个文字内' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    code: '',
                    type:'',
                    notes:'',
                    score:'',
                    enabled:'',
                },
                editLoading: false,
                btnEditText: '提交',
            };
        },
        created(){
            this.$bus.$off('IndicatorsDialogShow');
            this.$bus.$on('IndicatorsDialogShow', (title,data,type) => {
                this.type=type;
                this.IndicatorsDialogShow(title,data);
            })
        },
        methods: {
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
                    this.editForm.expression='';
                },100)
            },
            //显示dialog模态框
            IndicatorsDialogShow:function(title,data){
                this.inputdisabled=false;
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.id){
                    this.editFormInput=false;//隐藏密码模块
					this.inputdisabled=true;
                    this.reload(data);
                }
            },
            reload:function(data){
                var _this = this;
                indicatorsManager.getInfo(data).then((res) => {
                    _this.editForm = res.result;
                    _this.editForm.type = parseInt(res.result.type);
                    _this.editForm.enabled =String(res.result.enabled);
                }).catch(function (error) {
                    _this.$Error(_this,error);
                });
            },
            getoTypesptions(){//获得归属类别
                var params = {
                    type:'FACT',
                    parentId:'-1'
                }
                indicatorsManager.getoTypesptions(params).then(res=>{
                    if(res.code=="-1"){
						this.$notify({
							title: '提示',
							message: res.msg,
							type: 'error'
						});
					}else{
						this.options = res;
					}
            	}).catch(function (error) {
                    this.$Error(this,error);
                })
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;
                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.type == "add") {
                            //新增
                            var params = {
                                name: _this.editForm.name,
                                code: _this.editForm.code,
                                type:_this.editForm.type,
                                notes:_this.editForm.notes,
                                score:_this.editForm.score,
                                enabled:_this.editForm.enabled
                            };
                            indicatorsManager.add(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataIndicatorsList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else if (_this.type == "edit") {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                name: _this.editForm.name,
                                code: _this.editForm.code,
                                type:_this.editForm.type,
                                notes:_this.editForm.notes,
                                score:_this.editForm.score,
                                enabled:_this.editForm.enabled
                            };
                            indicatorsManager.editInfo(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataIndicatorsList');
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
            var _this=this;
            _this.getoTypesptions();
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

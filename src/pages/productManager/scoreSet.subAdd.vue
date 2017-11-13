<!--wiki 更新产品评分指标  2017/3/27 lhw-->
<!--编辑指标分类界面-->
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible" :close-on-click-modal="false" @close="hideDialog()">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标名称" prop="name">
						<el-input v-model="editForm.name" name="name" :disabled="true"  auto-complete="off" placeholder="请输入指标名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="指标编号" prop="code">
						<el-input v-model="editForm.code" name="code" :disabled="true" auto-complete="off" placeholder="请输入指标编号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row>
				<el-col :span="24">
				<el-form-item label="指标状态" prop="enabled">
					<el-radio-group v-model="editForm.enabled">
						<el-radio label="1">启用</el-radio>
						<el-radio label="0">停用</el-radio>
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
                        <el-input type="textarea" v-model="editForm.notes" placeholder="请输入指标说明" resize="none"> </el-input>
                    </el-form-item>
                </el-col>
            </el-row>


		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import productList from '../../api/productList' //引入API
    export default {
        data() {
            var ValidatorNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入指标分值'));
                } else if(!this.$regExp.numberdS.test(value)){
                    callback(new Error('指标分值必须为数字值'));
                } else {
                    callback();
                }
            };
            return {
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    notes: '',
                    score:'',
                    enabled:''
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入指标名称'}
                    ],
                    code: [
                        { required: true, message: '请输入指标编号'}
                    ],
                    enabled: [
                        { required: true, message: '请选择指标状态'}
                    ],
                    score:[
                        {required: true, validator: ValidatorNumber}
					],
                    notes:[
                        { max: 200, message: '说明字数范围是200字以内', trigger: 'blur' }
                    ]

                }
            };
        },
        created(){
            this.$bus.$off('scoreSet_subAdd_DialogShow');
            this.$bus.$on('scoreSet_subAdd_DialogShow', (title,data) => {
                this.showDialog(title,data);
            })
        },
        methods: {
            //显示dialog模态框
            showDialog:function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.id){
                    this.reload(data);
                }
            },
            hideDialog(){
                setTimeout(() =>{
                    this.$refs.editForm.resetFields();
                 },100)
            },
            reload:function(data){
                var _this = this;
                if(data.id){
                    productList.getFactInfo(data.id).then(res =>{
                        if(res.code == 0){
                         _this.editForm = res.result;
                         _this.editForm.enabled = data.enabled ? '1':'0';
                        }
                    }).catch(error =>{
                        _this.$Error(_this,error);
                    });
                }
                //this.editForm = data;
                //this.editForm.enabled = data.enabled ? '1':'0';
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.editForm.id) {
                            productList.factProductUpdate_put(_this.editForm).then((res) => {
                                if(res.code=='0'){
                                    _this.editFormVisible = false;
                                    _this.$message({
                                        message: "编辑成功！",
                                        type: 'success'
                                    });
                                    _this.$bus.$emit('H_scoreSetList_reload');
                                }else{
                                _this.$message({
                                    message: res.msg || '操作失败！',
                                    type: 'warning'
                                });
                                }
                                _this.editLoading = false;
                            _this.btnEditText = '提交';

                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }

                        /* _this.$confirm('确认提交吗？', '提示', {}).then(() => {


                         });*/

                    }
                });

            }
        },
        mounted() {
            var _this = this;
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

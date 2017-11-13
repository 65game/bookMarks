<!--编辑评分结果配置界面-->
<!--wiki接口对接 2017/3/23  lhw-->
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible"  @close="hideDialog">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="类别" prop="name">
						<el-input v-model="editForm.name" name="name"  auto-complete="off" placeholder="请输入类别"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
            <el-form-item label="分值" required>
                <el-col :span="11">
                    <el-form-item  prop="min">
                        <el-input v-model="editForm.min"  name="min"  auto-complete="off" placeholder="请输入最小值（大于等于）"></el-input>
                    </el-form-item>

                </el-col>
                <el-col class="line" :span="2">~</el-col>
                <el-col :span="11">
                    <el-form-item  prop="lessThan">
                        <el-input v-model="editForm.lessThan"  name="lessThan"  auto-complete="off" placeholder="最大值（小于）"></el-input>
                    </el-form-item>

                </el-col>
            </el-form-item>


            <el-form-item label="评分策略" prop="gradeResult">
                <el-select v-model="editForm.gradeResult" placeholder="请选择评分策略" style="width: 100%;">
                    <el-option v-for="item in options" :label="item.itemValue" :value="item.itemValue"></el-option>
                </el-select>
            </el-form-item>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="说明" prop="remark">
                        <el-input type="textarea" v-model="editForm.remark" placeholder="请输入说明" resize="none"></el-input>
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
    import productList from '../../api/productList' //引入API
    export default {
        data() {
            var ValidatorNumber1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入最小值（大于等于）'));
                } else if(!this.$regExp.numberdOrAmount.test(value)){
                    callback(new Error('分值格式不正确'));
                } else {
                    callback();
                }
            };
            var ValidatorNumber2 = (rule, value, callback) => {
                if(value && !this.$regExp.numberdOrAmount.test(value)){
                    callback(new Error('分值格式不正确'));
                }else if(this.editForm.min && parseInt(this.editForm.min) >= parseInt(value)){
                    callback(new Error('最大值必须要大于最小值'));
                } else {
                    callback();
                }
            };
            return {
                options:[],
                acType:'Add',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    min: '',
                    lessThan:'',
                    remark:'',
                    gradeResult:''
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入类别'},
                        { max:20, message: '长度不能超过20个字符'}
                    ],
                    min: [
                        { required: true, validator: ValidatorNumber1}
                    ],
                    lessThan: [
                        {validator: ValidatorNumber2}
                    ],
                    remark:[
                        { required: true, message: '请输入说明' },
                        { max:150, message: '长度不能超过150个字符'}
					],
                    gradeResult:[
                        {required:true,message:'请选择评分策略'}
                    ]

                }
            };
        },
        created(){
            this.$bus.$on('scoreSet_result_DialogShow', (title,data) => {
                this.scoreSet_result_DialogShow(title,data);
            })
        },
        methods: {
            //显示dialog模态框
            scoreSet_result_DialogShow  :function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.flag=='add'){
                    this.acType = 'Add';
                   this. editForm =  {
                       id: data.productId,
                       name: '',
                       min: '',
                       lessThan:'',
                       remark:'',
                       gradeResult:''
                    }
                }else{
                    this.acType = 'Edit';
                    this.getInfo(data.id);
                }
            },
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs.editForm.resetFields();
                },100)
            },
            getInfo(id){
                var _this = this;
                productList.gradelevelInfo_getById(id).then(res =>{
                    //debugger;
                    _this.editForm = res;
                }).catch (error =>{
                    _this.$Error(_this,error);
                })
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
                        //debugger;
                        if (_this.acType =='Add') {
                            //新增
                            var params = {
                                productId:_this.$route.query.id,
                                name: _this.editForm.name,
                                min: _this.editForm.min, //最小值
                                lessThan: _this.editForm.lessThan,
                                gradeResult:_this.editForm.gradeResult,
                                remark: _this.editForm.remark
                            };
                            productList.gradelevel_post(params).then((res) => {
                                _this.calBack(res,'Add');
                            }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }else{
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                productId:_this.$route.query.id,
                                name: _this.editForm.name,
                                min: _this.editForm.min, //最小值
                                lessThan: _this.editForm.lessThan,
                                gradeResult:_this.editForm.gradeResult,
                                remark: _this.editForm.remark
                            };
                            productList.gradelevel_update(params).then((res) => {
                              _this.calBack(res,'Edit');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }


                    }
                });

            },
            calBack(obj,type){
                var _this = this;
                var msg = type == 'Add' ? '新增成功！':'编辑成功！';
                _this.editLoading = false;
                _this.btnEditText = '提交';
                _this.editFormVisible = false;
                if(obj.code =='0'){
                    _this.$message({
                        message: msg,
                        type: 'success'
                    });
                    _this.$bus.$emit('H_scoreSet_result_reload');
                }else if(obj.code =='-1'){
                    _this.$message({
                        message: obj.msg,
                        type: 'warning'
                    });
                }else{
                    _this.$message({
                        message: obj.msg || '服务器异常！',
                        type: 'warning'
                    });
                }
                _this.$bus.$emit('updatagOperator');
            },
            getOptions(){
                var _this = this;
                productList.gradeResultOptions_get('/系统目录/数据字典/风控系统/评分决策结果/').then(res =>{
                   // debugger;
                    _this.options = res.content;
                }).catch(error =>{
                    _this.$Error(_this,error);
                });
            },
        },
        mounted() {
           this.getOptions();
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>

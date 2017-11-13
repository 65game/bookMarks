<!--指标管理明细 新增/编辑 -->
<template>
	<div v-loading="boxLoading">
		<!--<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">-->
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" id="editForm">
                <div class="h-rule-edit-box clearfix">
                    <div class="h-rule-edit-title">基本信息</div>
                    <el-row>
                        <div style="width: 640px;">
                            <el-form-item label="指标分类" required>
                                <el-input v-model="editForm.type" name="type"  placeholder="请输入指标分类" auto-complete="off" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row>
                        <div style="width: 640px;">
                            <el-form-item label="指标名称" prop="name">
                                <el-input v-model="editForm.name" name="name"  placeholder="请输入指标名称" auto-complete="off"></el-input>
                            </el-form-item>
                         </div>
                    </el-row>

                    <el-row>
                        <el-form-item label="指标编号" prop="code">
                            <el-input v-model="editForm.code" name="code" class="h-ruleInput" placeholder="请输入指标编号" auto-complete="off" :disabled="inputdisabled"></el-input>
                        </el-form-item>
                    </el-row>

                    <el-row>
                            <el-form-item label="指标分值" prop="score">
                                <el-input v-model="editForm.score" name="score" class="h-ruleInput" placeholder="请输入指标分值" auto-complete="off"></el-input>
                            </el-form-item>
                    </el-row>

                    <el-row>
                            <el-form-item label="指标状态" prop="enabled">
                                <el-radio-group v-model="editForm.enabled">
                                    <el-radio label="true">启用</el-radio>
                                    <el-radio label="false">停用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                    </el-row>
                    <el-row>
                        <div style="width: 640px;">
                            <el-form-item label="指标说明" prop="notes">
                                <el-input type="textarea" v-model="editForm.notes" resize="none"  placeholder="请输入指标说明"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                </div>

                <div class="h-rule-edit-box clearfix">
                    <div class="h-rule-edit-title">规则触发条件</div>
                    <devSetting   ref="child1" ></devSetting>
                </div>

                <div class="h-rule-edit-box clearfix" v-show="RuleSetting">
                    <div class="h-rule-edit-title">规则逻辑</div>
                    <el-row >
                        <el-col :span="20" style="width: 950px;">
                            <el-form-item label="逻辑表达式" prop="expression">
                                <v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="editForm.expression" name="expression"></v-editor>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>


               <!-- <el-row v-show="RuleSetting">
					<el-col :span="24">
						<el-form-item label="指标逻辑" prop="expression">
							<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="editForm.expression" name="expression"></v-editor>
						</el-form-item>
					</el-col>
				</el-row>-->
                <el-row>
                    <div>
                        <el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
                        <el-button type="primary" icon="circle-check" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
                    </div>
                </el-row>


			</el-form>
			<!--<div slot="footer" class="dialog-footer">
				<el-button @click.native="hideDialog">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>-->
		<!--</el-dialog>-->

	</div>

</template>

<script>
    import { mapState } from 'vuex'
    import Editor from '../../componnets/wangEditor/Editor.vue'
    import indicators from '../../api/indicatorsManager'
    import ruleConfig from '../../api/ruleConfig' //默认配置文件
    import devSetting from '../../pages/ruleManager/rule.devSettings.vue'  //可视化逻辑配置模块
    export default {
        components: {
            'v-editor': Editor,
            devSetting
        },
        data() {
            var ValidatorNumber = (rule, value, callback) => {
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
            var ValidatorExpression = (rule, value, callback) => {
                if (value === ''|| value === '<p><br></p>') {
                    callback(new Error('请输入指标逻辑'));
                } else {
                    callback();
                }
            };
            return {
                HShow:'', //设置是否显示编辑器
                inputContent: '',  // 设置编辑器原本内容
                uploadUrl: '',  // 设置编辑器图片上传地址

                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增指标',//编辑界面标题
				sumbitype:'',
                inputdisabled:false,//判断input是否可编辑
                //编辑界面数据
                types:'',
                editForm: {
                    id: '',
                    factId:'',
                    type:'',
                    code: '',
                    name: '',
                    score:'',
                    enabled: '',
                    notes:'',
                    expression:''
                },
                editLoading: false,
                btnEditText: '提交',
                editFormRules: { //校验指标
                    name: [
                        { required: true, message: '请输入指标名称'}
                    ],
                    code: [
                        {required: true, validator: ValidatorNumber}
                    ],
                    score: [
                        {required: true, validator: ValidatorScore}
                    ],
                    enabled: [
                        { required: true, message: '请选择指标状态'}
                    ],
                    expression:[
                        {required: true, validator:ValidatorExpression}
                    ],
                    notes:[
                        { mim:0, max:200, message: '指标说明在200个文字内'}
                    ]
                },
                boxLoading:false,
            };
        },
        created(){
            this.$bus.$off('IndicatorsDetailDialogShow');
            this.$bus.$on('IndicatorsDetailDialogShow', (title,data) => {
                this.inputContent='';
                this.IndicatorsDetailDialogShow(title,data);
            });
            this.HShow = this.RuleSetting;
        },
        watch: {
            'editForm.expression'(curVal,oldVal){
                if(curVal=='<p><br></p>'){
                    return;
                }else{
                    var _this = this;
                    _this.editForm.expression=curVal;
                    setTimeout(() =>{
                        _this.$refs.editForm.validateField( 'expression');
                    },1)
				}
            }
        },
        methods: {
            gotoBack(){
                this.$router.push({ path: '/indicators/details',query: {name:this.$route.query.name,cname:this.$route.query.cname,factId:this.$route.query.factId}});
            },
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
                    this.inputContent='<p><br></p>';
                    this.editForm.expression='<p><br></p>';
                },100)
            },
            //显示dialog模态框
            IndicatorsDetailDialogShow(title,data){
                this.inputdisabled=false;
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.type=="edit"){
                    this.sumbitype="edit";
                    this.reload(data);
                    this.inputdisabled=true;
                   // this.HShow = true;
                }else{
                    this.sumbitype="add";
                    //this.HShow = true;
                    this.inputContent = ruleConfig.expression;
                    this.editForm.expression = ruleConfig.expression;
				}
            },
            reload(data){
				var _this = this;
                _this.boxLoading = true;
                indicators.getFact(data).then((res) => {
                    _this.editForm = res;
                    _this.editForm.factId = _this.$route.query.factId;
                    _this.editForm.type=this.$route.query.cname;
                    _this.inputContent=res.expression;
                    _this.editForm.enabled =String(res.enabled);
                   _this.boxLoading = false;

                    //编辑时传参数给子组件（触发条件配置数据）
                    if(res.conditionDataArr && res.conditionDataArr.length > 0){
                        // _this.devData =  res.conditionDataArr;
                        _this.$refs.child1.setData(res.conditionDataArr); //父组件调用子组件方法
                    }

                }).catch(function (error) {
                    _this.$Error(_this,error);
                    _this.boxLoading = false;
                });
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;
                var devData = []; //定义 触发条件表达式数据  -- conditionData
                var devResult = ''; //定义 触发条件表达式  -- conditionExpression
                var devValid = _this.$refs.child1.validate(); // 获取配置是否验证通过,true为通过

                if(devValid){
                    devResult = _this.$refs.child1.toChange();
                    devData = _this.$refs.child1.getData();
                }else{
                    _this.$message.warning('请检查规则触发条件完整性');
                    return ;
                }


                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.sumbitype == "add") {
                            //新增
                            var params = {
                                factId: _this.editForm.factId,
                                code:  _this.editForm.code,
                                name:  _this.editForm.name,
                                score: _this.editForm.score,
                                enabled:  _this.editForm.enabled,
                                notes: _this.editForm.notes,
                                expression: _this.editForm.expression,
                                conditionDataArr:devData,
                                conditionExpression:devResult
                            };
                            indicators.addFact(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            setTimeout(function(){
                                _this.gotoBack();
                            },1000);
                            _this.$bus.$emit('updataIndicatorsList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                factId: _this.editForm.factId,
                                code:  _this.editForm.code,
                                name:  _this.editForm.name,
                                score: _this.editForm.score,
                                enabled:  _this.editForm.enabled,
                                notes: _this.editForm.notes,
                                expression: _this.editForm.expression,
                                conditionDataArr:devData,
                                conditionExpression:devResult
                            };
                            indicators.editFact(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.init();
                            _this.$bus.$emit('updataIndicatorsList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }

                      /*  _this.$confirm('确认提交吗？', '提示', {}).then(() => {

                        }).catch(() => {});*/
                    }
                });

            },
            init(){
                this.editForm.type=this.$route.query.cname;
                this.editForm.factId = this.$route.query.factId;
                this.inputContent='';
                this.inputdisabled=false;
                if(this.$route.query.type=="edit" && this.$route.query.id ){
                    this.sumbitype="edit";
                    var data = {id:this.$route.query.id};
                    this.reload(data);
                    this.inputdisabled=true;
                    // this.HShow = true;
                }else{
                    this.sumbitype="add";
                    //this.HShow = true;
                    this.inputContent = ruleConfig.expression;
                    this.editForm.expression = ruleConfig.expression;
                }
            },
        },
        mounted() {
            this.init();

        },
        computed: {
                ...mapState([
                    'RuleSetting'
                ])
        },
    };
</script>
<style scoped>
    .h-rule-edit-box{position: relative; width: 1000px; margin-bottom: 20px; margin-top: 20px; padding: 10px; border: 1px solid #ddd;}
    .h-rule-edit-title{position: absolute; left: 10px; top: -20px; background: #fff; padding: 8px 5px; font-size: 15px; font-weight: bold; color: #333;}
    .line{ text-align: center; font-size: 14px;}
    .h-ruleInput{width: 240px;}
    .h-ruleInputL{width: 450px;}
</style>
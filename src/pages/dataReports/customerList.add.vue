<!--新增编辑界面-->
<template>
    <el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="产品名称" prop="name">
                        <el-input v-model="editForm.name" name="name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="产品编号" prop="extCode">
                        <el-input v-model="editForm.extCode" name="extCode" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="产品状态" prop="enabled">
                        <el-radio-group v-model="editForm.enabled">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="0">停用</el-radio>
                        </el-radio-group>
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
    import productList from '../../api/productList'
    export default {
        data() {
            return {
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增产品',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    extCode: '',
                    enabled:''
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入产品编号', trigger: 'blur' }
                    ],
                    extCode: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    enabled: [
                        { required: true, message: '请选择产品状态', trigger: 'change' }
                    ]

                }
            };
        },
        created(){
            this.$bus.$on('productListDialogShow', (title,data) => {
                //执行处理需要处理事件
                this.productListDialogShow(title,data);
        })
        },
        methods: {
            //显示dialog模态框
            productListDialogShow:function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.id){
                    this.reload(data);
                }else{
                    this.editForm = {
                        id: '',
                        name: '',
                        extCode: '',
                        enabled:''
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
                            var msg ="编辑成功！";
                        }else{
                            var msg ="新增成功！";
                        }
                        var params = {
                            id: _this.editForm.id ||'',
                            name: _this.editForm.name,
                            extCode: _this.editForm.extCode,
                            enabled: _this.editForm.enabled
                        };
                        productList.productList_put(params).then((res) => {
                            _this.editLoading = false;
                        _this.btnEditText = '提交';
                        _this.editFormVisible = false;
                        _this.$message({
                            message: msg,
                            type: 'success'
                        });
                        _this.$bus.$emit('H_productList_reload');
                    }).catch(function (error) {
                            _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.$Error(_this,error);
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

<style scoped>
    .line{ text-align: center; font-size: 14px;}
</style>

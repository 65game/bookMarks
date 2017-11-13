<!--增加导入导出功能 2017/3/31 lhw-->
<template>
    <section>
        <el-dialog :title="dialogTitle" v-model="dialogVisible" size="tiny">
            <!--上传区-->
            <!--/dlbiz/risk/personblackwhite/person/black/import-->
            <!--https://jsonplaceholder.typicode.com/posts/-->
            <el-upload
                    class="h-upload"
                    ref="upload"
                    action="/dlbiz/risk/personblackwhite/person/black/import"
                    :on-change="handleChange"
                    :before-upload ="beforeUpload"
                    :headers="setHeaders"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2MB</div>
            </el-upload>

        </el-dialog>

        <!--错误提示-->
        <el-dialog
                title="失败提示"
                v-model="dialogTipVisible" size="tiny">
            <div style="max-height: 150px; overflow-y: auto;" v-html="tipHtml" ></div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTipVisible = false">确定</el-button>
          </span>
        </el-dialog>


    </section>
</template>

<script>
    import nameManager from '../../api/nameManager'
    export default {
        components: {

        },
        data() {
            return {
                dialogVisible: false,
                dialogTitle:'',
                setHeaders:{
                    Token:JSON.parse(sessionStorage.getItem("user")).token
                },
                fileList: [],
                dialogTipVisible:false,
                tipHtml:'',
            }
        },
        methods: {
            showDialog(params){
                this.dialogVisible = true;
                this.dialogTitle = params.title || '上传文件';
            },
            handleChange(file, fileList) {

            },
            beforeUpload(file){
                var _this = this;
                const  isExcel = (file.type ==='application/vnd.ms-excel' || file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if(!isExcel){
                    _this.$message({
                        type:'warning',
                        message:'上传文件只能是Excel'
                    });
                    return false;
                }
                if(!isLt2M){
                    _this.$message({
                        type:'warning',
                        message:'上传Excel文件大小不能超过2MB'
                    });
                    return false;
                }
                return isExcel && isLt2M;
            },
            uploadSuccess(res, file, fileList){
                var _this = this;
               if(res.code=='0'){
                   _this.$message({
                       type:'success',
                       message:'导入个人黑名单成功！'
                   });
                   _this.dialogVisible = false;
                   _this.$refs.upload.clearFiles();
                   _this.$bus.$emit('H_userBlack_reload');
               }else{

                   if(res.msg && res.msg.indexOf('[') > 0){
                       var _msgArr = eval('('+res.msg+')');
                       var _html = '';
                       for(var i = 0,len = _msgArr.length; i<len; i++){
                           _html += '<div>'+_msgArr[i]+'</div>'
                       }
                       _this.tipHtml = _html;
                       _this.dialogTipVisible = true;
                       _this.$refs.upload.clearFiles();
                       _this.$bus.$emit('H_userBlack_reload');
                   }else{
                       _this.$message({
                           type:'warning',
                           message:res.msg || '上传文件失败！'
                       });
                       _this.$refs.upload.clearFiles();
                   }

               }


            },
            uploadError(response, file, fileList){
                var _this = this;
                _this.$message({
                    type:'warning',
                    message:'上传文件失败！'
                });

                _this.$refs.upload.clearFiles();
                //_this.$bus.$emit('H_userBlack_reload');
            },
        },
        created(){
            this.$bus.$off('H_userBlack_uploadShow');
            this.$bus.$on('H_userBlack_uploadShow',(params)=>{
                this.showDialog(params);
        });
        },
        mounted(){

        }
    }
</script>

<style scoped>
    .h-upload{width: 98%; margin: 10px auto;  }
</style>
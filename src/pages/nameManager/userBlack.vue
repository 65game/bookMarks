<!--增加导入导出功能 2017/3/30 lhw-->
<template>
    <section>
        <!--工具条-->
        <el-row>
            <el-form label-width="120px">
                <el-col :span="6">
                    <el-form-item label="用户姓名" :inline="true"> <el-input  placeholder="请输入用户姓名" v-model="filters.personName"></el-input></el-form-item>
                </el-col>
               <!-- <el-col :span="6">
                    <el-form-item label="接入系统名称" :inline="true"> <el-input  placeholder="请输入接入系统名称" v-model="filters.custName"></el-input></el-form-item>
                </el-col>-->
                <el-col :span="9" :offset="9">
                    <el-form-item class="btn_box">
                        <el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <el-row class="button_box">
            <el-button  icon="document" class="btn_border_none"  @click="handleDownload">下载模板</el-button>
            <el-button  icon="upload2" class="btn_border_none"  @click="handleImport">导入</el-button>
        </el-row>

        <el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
            <el-table-column prop="personName" label="用户姓名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobiles" label="手机号码" width="130"></el-table-column>
            <el-table-column prop="personIdCard" label="用户身份证" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isLeader" label="是否企业高管" width="120" :formatter="format_isLeader"></el-table-column>
            <el-table-column prop="companyName" label="所属企业" min-width="180" show-overflow-tooltip></el-table-column>
            <!--<el-table-column prop="custName" label="接入系统名称" min-width="200" show-overflow-tooltip></el-table-column>-->
            <el-table-column prop="frequency" label="拉黑次数" width="100"></el-table-column>
            <el-table-column prop="status" label="状态"  width="80" :formatter="formatStatus" show-overflow-tooltip></el-table-column>
            <el-table-column inline-template :context="_self" label="操作" width="180" fixed="right">
	             <span>
					<!--<el-button type="primary" size="small" @click="handleUserEdit(row)">修改</el-button>-->
					 <el-button type="success" size="small" @click="handleActiva(row)" v-if="row.status == 0">启用</el-button>
					 <el-button type="danger" size="small" @click="handleUnActiva(row)" v-else>停用</el-button>
					 <el-button type="success" size="small" @click="handleUserAddWhite(row)">加入白名单</el-button>
				</span>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
            <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
        </el-col>
        <!--新增编辑界面--名单管理-->
        <user-dialog></user-dialog>

        <!--导入-->
        <upload></upload>
    </section>
</template>

<script>
    import userDialog from './user.dialog.vue'
    import upload from './userBlack.upload.dialog.vue'
    import nameManager from '../../api/nameManager'
    export default {
        components: {
            userDialog,
            upload
        },
        data() {
            return {
                filters: {
                    custName: '',
                    personName:'',
                    status:''
                },
                tableData: [],
                total: 0,
                page: 1,
                listLoading: false,
            }
        },
        created(){
            this.$bus.$off('H_userBlack_reload');
            this.$bus.$on('H_userBlack_reload',()=>{
                this.search();
            });
        },
        mounted(){
            this.search();
        },
        methods: {
            handleDownload(){
                window.location.href = '/dlapi/cms/archive/download?id=8076&fullPath=';
                return false;
            },
            handleImport(){
                this.$bus.$emit('H_userBlack_uploadShow',{title:''});
            },
            search(val) {
                var _this = this;
                var params = {
                    pageNum:_this.page, //页数
                    pageSize:10,   //固定每页10条
                    custName: this.filters.custName,
                    personName:this.filters.personName
                }
                _this.listLoading = true;
                nameManager.personblack_get(params)
                        .then(res => {
                       //debugger;
                    _this.total = res.totalElements;
                _this.tableData = res.content;
                _this.listLoading = false;
            })
            .catch(function (error) {
                    _this.listLoading = false;
                    _this.$Error(_this,error);
                })
            },

            formatStatus(row,column){
                return row.status == 1 ? '启用' : row.status == 0 ? '停用' : '在白名单';
            },
            format_isLeader(row,column){
                return row.status == 1 ? '是' : row.status == 0 ? '否' : '--';
            },
            exportExel(){

            },
            handleCurrentChange(val) {
                this.page = val;
                this.search();
            },
            handleSelectionChange(val) {
//                this.multipleSelection = val;
            },
            handleUserEdit(row){
                var _data = this.$Utils.dataClone(row);
                this.$bus.$emit('userDialogShow','编辑',_data);
            },
            handleActiva(row){
                var _this = this;
                _this.$confirm('您确定对该用户启用黑名单？', '提示', {
                }).then(() => {
                    nameManager.personblack_disabled({ids:row.id,status:1}).then(function(res){
                    if(res.code=="0"){
                        _this.$message({
                            type: 'success',
                            message: '启用成功！'
                        });
                    }
                    _this.search();

                }).catch(function(error){
                    _this.$Error(_this,error);
                });

            })
            },
            handleUnActiva(row){
                var _this = this;
                _this.$confirm('您确定对该用户停用黑名单？', '提示', {
                }).then(() => {
                nameManager.personblack_disabled({ids:row.id,status:0})
                .then(res => {
                    if(res.code=="0"){
                        _this.$message({
                            type: 'success',
                            message: '停用成功！'
                        });
                    }
                _this.search();

               })
               .catch(function (error) {
                    _this.$Error(_this,error);
                })
            })
            },
            handleUserAddWhite(row){
                var _this = this;
                _this.$confirm('您确定要把该用户加入白名单吗？', '提示', {
                }).then(() => {
                    nameManager.blackToWhite_post({id:row.id}).then(res =>{
                    if(res.code =="0"){
                    _this.$message({
                        type: 'success',
                        message: '加入白名单成功！'
                    });
                    _this.search();
                }
                }).catch(error =>{
                    _this.$Error(_this,error)
                })

            })
            }
        }
    }
</script>

<style scoped>
    .el-form-item{ margin-bottom: 10px;}
    /*.el-form .el-form-item__content:last-child{margin-left: 0!important;}*/
</style>
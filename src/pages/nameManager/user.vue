<template>
	<section>
		<!--工具条-->
		<el-row>
			<el-form label-width="120px">
				<el-col :span="6">
					<el-form-item label="手机号码" :inline="true"> <el-input  placeholder="请输入手机号码" v-model="filters.mobiles"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="用户姓名" :inline="true"> <el-input  placeholder="请输入用户姓名" v-model="filters.personName"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="身份证号码" :inline="true"> <el-input  placeholder="请输入身份证号码" v-model="filters.personIdCard"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
			<el-table-column prop="personName" label="用户姓名" width="100"></el-table-column>
			<el-table-column prop="mobiles" label="手机号码" width="127" ></el-table-column>
			<el-table-column prop="personIdCard" label="身份证号" width="185"></el-table-column>
			<el-table-column prop="companyName" label="所属企业" min-width="150" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isLeader" label="是否企业高管" width="80" :formatter="format_isLeader"></el-table-column>
			<el-table-column prop="maxLendNorm" label="最大放贷额度（元）" width="110" show-overflow-tooltip></el-table-column>
			<el-table-column prop="lastdate" label="最大借款期限（日）" width="110" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxSingleLendNorm" label="单笔最高放贷金额（元）" width="130" show-overflow-tooltip></el-table-column>
			<!--<el-table-column prop="availableCredit" label="可用额度（元）" width="100" show-overflow-tooltip></el-table-column>-->
			<!--<el-table-column prop="usedCredit" label="已用额度（元）"  width="100" show-overflow-tooltip></el-table-column>-->
			<!--<el-table-column prop="frozenCredit" label="冻结额度（元）"  width="100" show-overflow-tooltip></el-table-column>-->
			<el-table-column inline-template :context="_self" label="操作" width="270" fixed="right">
	             <span>
					<el-button type="primary" size="small" @click="handleUserEdit(row)">修改</el-button>
					 <el-button type="success" size="small" @click="handleUserAddWhite(row)">加入白名单</el-button>
					 <el-button type="danger" size="small" @click="handleUserAddBlack(row)">加入黑名单</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<user-dialog></user-dialog>
	</section>
</template>

<script>
    import userDialog from './user.dialog.vue'
    import nameManager from '../../api/nameManager'
    export default {
        components: {
          userDialog
        },
        data() {
            return {
                activeName2: 'first',
                filters: {
                    mobiles: '',
                    personName:'',
                    personIdCard:''
                },
                tableData: [],
                total: 0,
                page: 1,
                listLoading: false,
            }
        },
        created(){
            this.$bus.$off('H_userList_reload');
            this.$bus.$on('H_userList_reload',()=>{
                this.search();
            });
        },
        mounted(){
            this.search();
        },
        methods: {
            search(val) {
                var _this = this;
                var params = {
                    pageNum:_this.page, //页数
                    pageSize:10,   //固定每页10条
                    mobiles: this.filters.mobiles,
                    personIdCard: this.filters.personIdCard,
                    personName:this.filters.personName
                }
                _this.listLoading = true;
                nameManager.pnormallist_get(params)
                        .then(res => {
                    _this.total = res.totalElements;
                _this.tableData = res.content;
                _this.listLoading = false;
            })
            .catch(function (error) {
                    _this.listLoading = false;
                    _this.$Error(_this,error);
                })
            },
            format_isLeader(row){
                return row.isLeader == 1 ? '是' : '否';
            },
            exportExel(){

            },
            handleCurrentChange(val) {
              this.page = val;
               this.search();
            },
            handleUserEdit(row){
                var _data = this.$Utils.dataClone(row);
                this.$bus.$emit('H_userDialogShow','编辑',_data,'pnormallist_put');
            },

            handleUserAddWhite(row){  //0:正常 1：白名单 2：黑名单
                var _this = this;

                _this.$confirm('您确定要把该用户加入白名单吗？', '提示', {
                }).then(() => {
                    nameManager.pnormallist_change({id:row.id,status:1}).then( res =>{
                    _this.$message({
                    type: 'success',
                    message: '加入白名单成功！'
                    });
                _this.search();
                }).catch( error => {
                    _this.$Error(_this,error);
                });

                })
			},
            handleUserAddBlack(row){
                var _this = this;
                _this.$confirm('您确定要把该用户加入黑名单吗？', '提示', {
                }).then(() => {
                    nameManager.pnormallist_change({id:row.id,status:2}).then( res =>{
                    _this.$message({
                    type: 'success',
                    message: '加入黑名单成功！'
                });
                _this.search();
            }).catch( error => {
                    _this.$Error(_this,error);
            });
                })
            }
        }
    }
</script>

<style scoped>
	.el-form-item{ margin-bottom: 10px;}
</style>
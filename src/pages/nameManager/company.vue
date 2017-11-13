<template>
	<section>
		<!--工具条-->
		<el-row>
			<el-form label-width="85px">
				<el-col :span="4">
					<el-form-item label="企业名称" :inline="true"> <el-input  placeholder="请输入企业名称" v-model="filters.realname"></el-input></el-form-item>
				</el-col>
				<el-col :span="4" :offset="1">
					<el-form-item label="营业执照" :inline="true"> <el-input  placeholder="请输入营业执照" v-model="filters.idcard"></el-input></el-form-item>
				</el-col>
				<el-col :span="14" :offset="1">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
						<el-button type="warning" icon="upload" v-on:click="exportExel()">导出</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
			<el-table-column prop="company" label="企业名称" width="180"></el-table-column>
			<el-table-column prop="companynum" label="营业执照号" width="200"></el-table-column>
			<el-table-column prop="companybig" label="所属企业" width="152"></el-table-column>
			<el-table-column prop="executives" label="企业最大放贷额度（万元）" width="130"></el-table-column>
			<el-table-column prop="lastdate" label="最大借款期限（日）" width="110"></el-table-column>
			<el-table-column prop="lastmoney" label="企业白名单个人额度（万元）" width="140"></el-table-column>
			<el-table-column prop="usermoney" label="单笔最高放贷金额（万元）" width="140"></el-table-column>
			<el-table-column prop="useredmoney" label="企业关系"  width="100"></el-table-column>
			<!--<el-table-column prop="time" label="截止时间"  width="110"></el-table-column>-->
			<!--<el-table-column prop="stateText" label="状态"  width="85"></el-table-column>-->
			<el-table-column inline-template :context="_self" label="操作" width="270" fixed="right">
	             <span>
					 <el-button type="primary" size="small" @click="handleCompanyEdit(row)">修改</el-button>
			         <el-button type="success" size="small" @click="handleCompanyAddWhite(row)">加入白名单</el-button>
					 <el-button type="danger" size="small" @click="handleCompanyAddBlack(row)" >加入黑名单</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<company-dialog></company-dialog>
	</section>
</template>
<script>
    import companyDialog from './company.dialog.vue'
    export default {
        components: {
            companyDialog
        },
        data() {
            return {
                filters: {
                    mobile: '',
                    realname:'',
                    idcard:''
                },
                tableData: [
                    {
                        company:'帝隆云科技',
                        companynum:'FASDFASF16515616',
                        idcard:'442215555544411222',
                        companybig:'帝隆科技集团',
                        executives:'55555',
                        lastdate:'30',
                        lastmoney:'2000',
                        usermoney:'100',
                        useredmoney:'附属',
                        state:'1',
                        stateText:'启用',
                        time:'2017-5-5'
                    },
                    {
                        company:'帝隆云科技',
                        companynum:'FASDFASF16515616',
                        idcard:'442215555544411222',
                        companybig:'帝隆科技集团',
                        executives:'55555',
                        lastdate:'30',
                        lastmoney:'2000',
                        usermoney:'100',
                        useredmoney:'附属',
                        state:'0',
                        stateText:'停用',
                        time:'2017-5-5'
                    },
                    {
                        company:'帝隆云科技',
                        companynum:'FASDFASF16515616',
                        idcard:'442215555544411222',
                        companybig:'帝隆科技集团',
                        executives:'55555',
                        lastdate:'30',
                        lastmoney:'2000',
                        usermoney:'100',
                        useredmoney:'附属',
                        state:'1',
                        stateText:'启用',
                        time:'2017-5-5'
                    }
                ],
                total: 0,
                page: 1,
                listLoading: false,
            }
        },
        methods: {
            search(val) {
//                this.page = val;
//                this.getOperator();
            },
            exportExel(){

            },
            handleCurrentChange(val) {
//                this.page = val;
//                this.getOperator();
            },
            handleCompanyEdit(row){
                var data = {};
                this.$bus.$emit('companyDialogShow','编辑',data);
            },
            handleCompanyAddWhite(row){
                var _this = this;
                _this.$confirm('您确定要把该企业加入白名单吗？', '提示', {
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '加入白名单成功！'
                    });
                })
            },
            handleCompanyAddBlack(row){
                var _this = this;
                _this.$confirm('您确定要把该企业加入黑名单吗？', '提示', {
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '加入黑名单成功！'
                    });
                })
            }
        }
    }
</script>

<style scoped>
	.el-form-item{ margin-bottom: 10px;}
</style>
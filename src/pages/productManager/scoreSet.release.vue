<!--2017/3/30 pm 已发布评分模型 接口测试联调 lhw-->
<template>
    <section v-if="hasData" style="min-height: 450px;">

        <el-row>
            <el-col :span="12">
                <div class="h-scoreSetTitle" style="padding-top: 8px;">
                    <strong>产品名称：</strong> {{result.name}}
                </div>
            </el-col>
            <el-col :span="5" :offset="7">
                <el-input
                        placeholder="请输入指标编号、分类搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>

        <template v-for="(item,index) in Data">
            <el-row class="rule_box">
                <el-col :span="18">
                    <strong>{{item.types}}</strong>
                </el-col>

            </el-row>

            <el-table v-bind:data="item.factList" border  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column prop="code" label="指标编号"  width="150"></el-table-column>
                <el-table-column prop="name" label="指标分类" min-width="150"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="score" label="指标分值" width="120"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="enabled" label="指标状态" width="100" :formatter="formatEnabled"></el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="100" >
                    <div>
						<el-button type="primary" size="small" @click="handleEdit(row)">查看详情</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </template>

        <!--编辑弹窗-->
        <rulSetInfoDialog></rulSetInfoDialog>

        <el-row class="h-scoreSet-btnBox">
            <el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
        </el-row>

    </section>
    <section style="min-height: 450px; text-align: center; line-height: 250px; color: #999; letter-spacing: 5px; font-size: 18px;" v-else>
        <i class="el-icon-warning"></i>暂无规则模型配置数据...
    </section>

</template>

<script>

    import productList from '../../api/productList'
    import rulSetInfoDialog from './scoreSet.release.subAdd.vue' //引入列表编辑弹窗
    export default {
        components:{
            rulSetInfoDialog
        },
        data() {
            return {
                productId:'',
                num:'10',
                hasData:true,
                listLoading:false,
                ruleIds:'',
                unSubmitIds:'',
                result:{
                    "id": '',
                    "name": ' ',
                    "extCode":'',
                    "innerCode": '',
                    "modelId": '',
                    "ownerId": ''
                },
                searchinput:'',
                Data:[]
            }
        },
        methods: {

            handleEdit(row){
                this.$bus.$emit('H_scoreSet_releaseInfo_DialogShow','详情',row);
            },

            formatEnabled(row){
                return row.enabled ? '启用':'停用';
            },
            gotoBack(){
                this.$router.push({ path: '/productList/scoreSet',query:{id:this.$route.query.productId}});
            },
            handleIconClick(ev) {
               this.search();
            },
            getInfo(){
                var _this = this;
                _this.id = _this.$route.query.productId;
                if(_this.$Utils.isNumber(_this.id)){
                    productList.productInfo_getById(_this.id).then( res => {
                        _this.result = res || '';
                }).catch( error =>{
                        _this.$Error(_this,error);
                });
                }
            },
            search(){
                var _this = this;
                var params  = {
                    productId:this.$route.query.productId,//产品id
                    modelId:this.$route.query.modelId,//已发布模型id
                    codeOrName:this.searchinput
                };
                //产品风控规则列表查询
                _this.listLoading = true;
                productList.releaseProductList_get(params).then( res => {
                    _this.Data = res.factListDto;
                _this.listLoading = false;
                if(_this.Data.length){
                    _this.hasData = true;
                }else{
                    _this.hasData = false;
                }
            }).catch( error =>{
                    _this.$Error(_this,error);
                _this.listLoading = false;
            });
            }
        },
        created(){

        },
        mounted(){
            this.search();
            this.getInfo();
        }
    }
</script>

<style scoped>
    .rule_box{ margin-top: 25px;}
    .c_ff0000{ color: #ff0000;}
    .h-scoreSet-btnBox{margin-top: 30px; }
</style>
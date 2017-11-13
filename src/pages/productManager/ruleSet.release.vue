<!--2017/3/29 已发布规则模型 接口测试联调 lhw-->
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
                        placeholder="请输入规则编号、名称搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>

        <template v-for="(item,index) in Data">
            <el-row class="rule_box">
                <el-col :span="18">
                    <strong>{{item.types}}</strong>
                </el-col>

            </el-row>

            <el-table v-bind:data="item.ruleList" border  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
                <el-table-column prop="code" label="指标编号"  width="150"></el-table-column>
                <el-table-column prop="name" label="规则名称" min-width="250"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="smallTypes" label="规则分类" min-width="200"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="enabled" label="规则状态" width="100" :formatter="formatEnabled"></el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="100" >
                    <div>
						<el-button type="primary" size="small" @click="handleEdit(row)">查看详情</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </template>

        <ruleSetReleaseInfo></ruleSetReleaseInfo>
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
    import ruleSetReleaseInfo from './ruleSet.release.Info.dialog'
    export default {
        components:{
            ruleSetReleaseInfo
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
                Data:[
                   /* {
                     "ruleList":
                     [
                     {
                     "id": 1,
                     "code": "1001",
                     "name": "工龄检测",
                     "smallTypes": "工龄检测",
                     "enabled": false
                     },
                     {
                     "id": 2,
                     "code": "1002",
                     "name": "在职时长22",
                     "smallTypes": "在职时长",
                     "enabled": true,
                     "unSubmit":true
                     }
                     ],
                     "types": "职业信息"
                     },
                     {
                     "ruleList":
                     [
                     {
                     "id": 1,
                     "code": "1001",
                     "name": "工龄检测",
                     "smallTypes": "工龄检测",
                     "enabled": false
                     },
                     {
                     "id": 2,
                     "code": "1002",
                     "name": "在职时长",
                     "smallTypes": "在职时长",
                     "enabled": true
                     }
                     ],
                     "types": "鸿文测试--数据对接的"
                     },
                     {
                     "ruleList":
                     [
                     {
                     "id": 3,
                     "code": "2001",
                     "name": "人脸识别",
                     "smallTypes": "人脸识别",
                     "enabled": true
                     },
                     {
                     "id": 4,
                     "code": "2002",
                     "name": "实名认证",
                     "smallTypes": "实名认证",
                     "enabled": true
                     }
                     ],
                     "types": "个人信息"
                     }*/
                ]
            }
        },
        methods: {
            handleEdit(row){
                this.$bus.$emit('H_ruleSet_releaseInfo','详情',row);
            },
            formatEnabled(row){
                return row.enabled ? '启用':'停用';
            },
            gotoBack(){
                this.$router.push({ path: '/productList/ruleSet',query:{id:this.$route.query.productId}});
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
                productList.releaseList_get(params).then( res => {
                    _this.Data = res.ruleInstanceListDto;
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
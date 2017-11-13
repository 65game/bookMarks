<template>
    <div>
        <el-row class="button_box" style="padding: 5px;">
            <el-tooltip content="保存权限菜单" placement="top">
                <el-button type="primary" icon="circle-check" size="mini" @click="savePower"></el-button>
            </el-tooltip>
        </el-row>
        <el-tree :data="menuJSON" show-checkbox  :default-checked-keys=filterCheck  node-key="id" ref="tree" :props="defaultProps"></el-tree>
    </div>
</template>
<script>
    import role from '../../../api/role'
    export default {
        components: {

        },
        data() {
            return {
                listLoading: false,
                currentID:'',//当前角色ID
                defaultProps: {
                    children: 'children',
                    label: 'resName'
                },
                menuJSON:[]
            }
        },

        computed: {
            filterCheck:function(){
                //返回所有checked为true的节点ID
                return this.$Utils.getAllCheckJsonId(this.menuJSON);
            }
        },
        methods: {
            savePower() {
                var _this = this;
                if(this.currentID ==''){
                    this.$message.warning('请先选中一项角色分类！');
                    return;
                }
                this.$confirm('确认保存该角色的菜单权限吗？', '提示', {}).then(() => {
                    var arrID = this.$refs.tree.getCheckedKeys();
                var newArr=[];
                newArr.push(this.menuJSON[0].id); //把根节点的id加入 最后再去重处理
                for(var i=0;i<arrID.length;i++){
                    newArr = newArr.concat(_this.$Utils.getAllFartherId(arrID[i],this.menuJSON[0].children));
                }
                var savePowerID = this.$Utils.removeRepeatItem(newArr).join(','); //去重并转为字符串
                var params ={
                    permissions:"1",
                    resources:savePowerID
                };

                role.saveRoleTreeMenu(_this.currentID,params).then(res => {
                    this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
            })
            .catch(function (error) {_this.listLoading = false;_this.$Error(_this,error);})

            }).catch(() => {});
            },
            getMenuList(){
                var _this = this;
                var id =this.currentID;
                this.listLoading = true;
                role.getTreeMenu(id).then(res => {
                    this.menuJSON = [];//每次清空数据
                for(var i = 0; i < res.length; i++){
                    if( res[i].resName=="风控"){
                        this.menuJSON.push(res[i]);
                    }
                }
                this.listLoading = false;
            }).catch(function (error) {_this.listLoading = false;_this.$Error(_this,error);})
            }
        },
        created: function () {
            this.$bus.$off('getMenuList');
            this.$bus.$on('getMenuList', (dataid) => {
                if(dataid){
                    this.currentID=dataid;
                }
                this.getMenuList();
        })
        },
        mounted() {
            if(this.currentID){
                this.getMenuList();
            }
        }
    };
</script>

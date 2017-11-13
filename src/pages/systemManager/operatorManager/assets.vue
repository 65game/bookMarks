<template>
	<div>
		<!--<el-row>-->
            <!--<el-row class="button_box" style="padding: 5px;">-->
                <!--<el-tooltip content="新增顶级菜单" placement="top">-->
                    <!--<el-button type="primary" icon="plus" size="mini" @click="addNode"></el-button>-->
                <!--</el-tooltip>-->
            <!--</el-row>-->
		<!--</el-row>-->
        <tree-grid :columns="columns" :tree-structure="true" :data-source="filterdataSource"  v-loading="listLoading"></tree-grid>
        <assets-menu-tree-dialog></assets-menu-tree-dialog>
	</div>
</template>
<script>
    import assets from '../../../api/assets'
    import {TreeGrid} from '../../../componnets/treeTable'
    import AssetsMenuTreeDialog from './assets.menu.tree.dialog.vue'
    export default {
        components: {
            TreeGrid,AssetsMenuTreeDialog
        },
        data() {
            return {
                listLoading: false,
                columns: [
                    {
                        text: '菜单列表',
                        dataIndex: 'resName'
                    },
                    {
                        text: '资源地址',
                        dataIndex: 'resUrl'
                    },
                    {
                        text: '描述',
                        dataIndex: 'alias'
                    }
                ],
                dataSource: []
            }
        },
        computed: {
            filterdataSource:function() {
                var tempData = [];
                for(var i = 0; i < this.dataSource.length; i++){
                    if( this.dataSource[i].resName=="风控"){
                        tempData.push(this.dataSource[i]);
                    }
                }
                return tempData;
            }
        },
        methods: {
            addNode(){
                var data={};
                this.$bus.$emit('menuDialogShow','新增顶级菜单',data);
            },
            getMenuList(){
                var _this = this;
                _this.listLoading = true;
                assets.getTreeMenu()
                    .then(res => {
                        _this.dataSource = res;
                        _this.listLoading = false;
                    })
                    .catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })
            }
        },
        created: function () {
            this.$bus.$off('getMenuList');
            this.$bus.$on('getMenuList', () => {
                this.getMenuList();
            })
        },
        mounted() {
            this.getMenuList();
        }
    };
</script>
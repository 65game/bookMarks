
<template>
	<div>
		<el-row class="b_eef1f6 button_box" style="padding: 5px;">
			<el-tooltip content="新增顶级分类" placement="top">
				<el-button type="primary" icon="plus" size="mini" @click="handleAdd"></el-button>
			</el-tooltip>
			<el-tooltip content="新增子级分类" placement="top">
				<el-button type="primary" icon="share" size="mini" @click="handleAddSub"></el-button>
			</el-tooltip>

			<el-tooltip content="编辑分类" placement="top">
				<el-button type="primary" icon="edit" size="mini" @click="handleEdit"></el-button>
			</el-tooltip>

			<el-tooltip content="删除分类" placement="top">
				<el-button type="primary" icon="delete" size="mini" @click="handleDel"></el-button>
			</el-tooltip>
		</el-row>
		<el-tree
				:data="regions"
				:props="props"
				:load="loadNode"
				highlight-current
				lazy
				@node-click="handleNodeClick" v-loading="listLoading">
		</el-tree>
		<tree-dialog-box></tree-dialog-box>
	</div>
</template>
<script>
    import ruleClass from '../../api/ruleClass'
    import TreeDialogBox  from './ruleClass.tree.dialog'
    export default {
        components: {
            TreeDialogBox
        },
        data() {
            return {
                regions: [],
                props: {
                    label: 'name',
                    children: 'zones'
                },
                listLoading: false,
                selectData :{},
                count: 1,
				currentTypeId:''
            };
        },
        created(){
            this.$bus.$off('getTreeList');
            this.$bus.$on('getTreeList', (id) => {
                this.loadList(id);
            })
        },
        methods: {
            handleAdd: function () {
                if(this.currentTypeId){
                    this.$bus.$emit('H_treeDialogShow','新增顶级分类',{id:this.currentTypeId},'addSub');
                }else{
                    this.$message({
                        message: '请先选择规则分类！',
                        type: 'warning'
                    });
                }
            },
            handleAddSub: function () {
                if(this.selectData.id){
                    this.$bus.$emit('H_treeDialogShow','新增子级分类',{id:this.selectData.id},'addSub');
                }else{
                    this.$message({
                        message: '请先选择一条分类！',
                        type: 'warning'
                    });
                }
            },
            handleEdit: function () {
                if(this.selectData.id){
                    var _data = this.$Utils.dataClone(this.selectData);
                    this.$bus.$emit('H_treeDialogShow','编辑',_data,'editTree');
                }else{
                    this.$message({
                        message: '请单击选择一条数据！',
                        type: 'warning'
                    });
                }
            },
            handleDel: function () {
                var _this = this;
                if(_this.selectData.id){
                    _this.$confirm('您确定要删除选中的数据吗？', '提示', {}).then(() => {
                        ruleClass.del(this.selectData.id).then((res) =>{
                            _this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            _this.loadList(_this.currentTypeId);
                        }).catch (function(error){
                            _this.$Error(_this,error);
                        });
                    });
                }else{
                    _this.$message({
                        message: '请单击选择一条数据！',
                        type: 'warning'
                    });
                }
            },
            handleNodeClick(data) {
                this.selectData.id= data.id;
                this.selectData.name= data.name;
            },
			loadList(id){
                var _this = this;
                _this.selectData = {};
                _this.currentTypeId = id;
                var params = {'type':'RULE','parentId':id};
                _this.listLoading = true;
                ruleClass.getList(params).then((res) => {
                    if(res.code=="-1"){
                        _this.$notify({
                            title: '提示',
                            message: res.msg,
                            type: 'error'
                        });
                    }else{
                        _this.regions = res;
                    }
                    _this.listLoading = false;

                }).catch(function (error) {
                    _this.listLoading = false;
                    _this.$Error(_this,error);
                })
			},
            loadNode(node, resolve) {
			    var _this = this;
                if (node.data && node.data.id) {
                    var params = {'type':'RULE','parentId':node.data.id};
                    ruleClass.getList(params).then((res) => {
                        if(res.code=="-1"){
                            _this.$notify({
                                title: '提示',
                                message: res.msg,
                                type: 'error'
                            });
                        }else{
                            resolve(res);
                        }
                        _this.listLoading = false;

                    }).catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })
                }
            }

        }
    };
</script>
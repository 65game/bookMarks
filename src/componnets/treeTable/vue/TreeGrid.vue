<template>
  <el-table :data="data" border style="width: 100%" :row-style="showTr" @selection-change="handleSelectionChange">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text">
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <span style="padding-left: 0px;" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <span v-if="!scope.row._expanded" class="el-tree-node__expand-icon"></span>
          <span v-if="scope.row._expanded" class="el-tree-node__expand-icon expanded"></span>
        </span>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        <!--<label class="el-checkbox" v-if="ChangeShow(index)" style="padding-left: 5px;">-->
          <!--<el-checkbox v-if="scope.row.checked=='true'"  checked>{{scope.row[column.dataIndex]}}</el-checkbox>-->
          <!--<el-checkbox true-label="scope.row.id" v-else>{{scope.row[column.dataIndex]}}</el-checkbox>-->
        <!--</label>-->
        <!--<label v-else>-->
          <!--{{scope.row[column.dataIndex]}}-->
        <!--</label>-->
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'normal'" width="240">
      <template scope="scope">
        <!--<button type="button" class="el-button el-button&#45;&#45;default el-button&#45;&#45;small">-->
        <el-button size="small" type="primary" @click="handleEdit(scope.row.id,scope.row.resName,scope.row.resUrl,scope.row.alias,scope.row.orderId)">编辑</el-button>
        <!--<router-link-->
        <!--:to="{ path: requestUrl + 'edit', query: {id: scope.row.id} }"-->
        <!--tag="span">-->
        <!--编辑-->
        <!--</router-link>-->
        </button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        <el-button size="small" type="success" @click="handleAddMenu(scope.row.id)">添加子菜单</el-button>
        <!--<button type="button" class="el-button el-button&#45;&#45;success el-button&#45;&#45;small">-->
        <!--<router-link :to="{ path: requestUrl, query: {parentId: scope.row.parentOId} }"-->
        <!--tag="span">-->
        <!--添加下级树结构-->
        <!--</router-link>-->
        <!--</button>-->
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
    import role from '../../../api/role.js'
    import Utils from '../utils/index.js'
    //  import Vue from 'vue'
    export default {
        name: 'tree-grid',
        props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
            treeStructure: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
// 这是相应的字段展示
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
// 这是数据源
            dataSource: {
                type: Array,
                default: function () {
                    return []
                }
            },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
            requestUrl: {
                type: String,
                default: function () {
                    return ''
                }
            },
// 这个是是否展示操作列
            treeType: {
                type: String,
                default: function () {
                    return 'normal'
                }
            },
// 是否默认展开所有树
            defaultExpandAll: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        data () {
            return {
                multipleSelection: [],
                checked:[]
            }
        },
        computed: {
            // 格式化数据源
            data: function () {
                let me = this;
                if (me.treeStructure) {
                    let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
                    //console.log(data)
                    return data
                }
                return me.dataSource
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 显示行
            showTr: function (row, index) {
                let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
                row._show = show
                return show ? '' : 'display:none;'
            },
            // 展开下级
            toggle: function (trIndex) {
                let me = this
                let record = me.data[trIndex]
                record._expanded = !record._expanded
            },
            // 显示层级关系的空格和图标
            spaceIconShow (index) {
                let me = this
                if (me.treeStructure && index === 0) {
                    return true
                }
                return false
            },
            // 显示层级关系的空格和图标
            ChangeShow (index) {
                if ( index === 0) {
                    return true
                }
                return false
            },
            // 点击展开和关闭的时候，图标的切换
            toggleIconShow (index, record) {
                let me = this
                if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                    return true
                }
                return false
            },
            handleEdit(id,resName,resUrl,alias,orderId){
                var data={
                    id: id,
                    resName:resName,
                    resUrl: resUrl,
                    orderId:orderId,
                    alias:alias
                };
                this.$bus.$emit('menuDialogShow','编辑',data);
            },
            handleDelete (id) {
                var _this = this;
                _this.$confirm('您确定要删除该菜单吗？', '提示', {}).then(() => {
                    role.delTreeMenu(id).then(res => {
                           if(res.code==0){
                               this.$message({
                                   type: 'success',
                                   message: '删除成功!'
                               })
                               this.$bus.$emit('getMenuList');
                           }
                        })
                        .catch(function (error) {
                            _this.$Error(_this,error);
                        })
                })
            },
            handleAddMenu(id){
                var data={
                    id:id,
                    type:'lowerTree'
                }
                this.$bus.$emit('menuDialogShow','添加子菜单',data);
            },
        }
    }
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 17px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
</style>

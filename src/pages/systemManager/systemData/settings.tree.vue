<!--树形组件 lhw-->
<template>
	<div class="grid-content bg-purple">
		<!--<div>{{ parentPath }}</div>-->
		<el-col :span="24" class="toolbar" style="padding: 0 10px 10px 0;">
			<div id="h-searchBox">
				<el-input placeholder="请输入系统名称搜索" v-model="filterText"  icon="search"  :on-icon-click="handleSearch"></el-input>
			</div>
			<!--工具条-->
			<el-row class="b_eef1f6 button_box" style="padding: 5px;">
				<el-tooltip content="新增顶级分类" placement="top">
					<el-button type="primary" icon="plus" size="mini" @click="addNode"></el-button>
				</el-tooltip>
				<el-tooltip content="新增子分类" placement="top">
					<el-button type="primary" icon="share" size="mini" @click="addSubNode"></el-button>
				</el-tooltip>
				<el-tooltip content="编辑" placement="top">
					<el-button type="primary" icon="edit" size="mini" @click="edtNode"></el-button>
				</el-tooltip>
				<el-tooltip content="删除" placement="top">
					<el-button type="primary" icon="delete" size="mini" @click="delNode"></el-button>
				</el-tooltip>
			</el-row>
			<el-tree
					:data="regions"
					:props="props"
					:load="loadNode"
					:highlight-current="true"
					node-key="id"
					ref="tree"
					lazy
					@node-click="handleNodeClick" v-loading="listLoading">
			</el-tree>
		</el-col>

		<div id="h-HTree-DialogBox">
			<!--树形弹窗-->
			<DialogBox></DialogBox>
		</div>
	</div>
</template>


<script>
	import dictionary from '../../../api/dictionary'
	import DialogBox  from './settings.tree.dialog'
	import list  from './settings.list.vue'
	export default {
		components: {
			DialogBox
		},
		props: ['parentPath'],
		data() {
			return {
				filterText: '',
				regions:[],
				props: {
					label: 'resName',
					children: 'zones'
				},
				listLoading: false,
				selectData :{}
			};
		},
		watch: {
			filterText: function (val, oldVal) {
				setTimeout(() => {
					this.handleSearch();
			},500);

			}
		},
		created(){
			var _this = this;
            _this.$bus.$off('dictionaryTreeReaload');
			_this.$bus.$on('dictionaryTreeReaload',function(){
				//debugger;
				_this.dictionaryTreeReaload();
			});
		},
		mounted() {
			//alert(this.parentPath+":dd");
			if(this.parentPath){
				this.init({'parent_path':encodeURIComponent(this.parentPath),'resName':''});
			}else{
				this.init({'parent_path':encodeURIComponent('/系统目录/配置设置/'),'resName':''});
			}
			//list.methods.test("贷款");
		},
		methods: {
			//初始化
			init(params) {
				var _this = this;
				_this.listLoading = true;
				dictionary.getTree(params).then((res) => {
					_this.regions = res.content;
				_this.listLoading = false;
				_this.selectData = {};
			}).catch(function (error) {
					_this.listLoading = false;
					_this.$Error(_this,error);
				})
			},
			dictionaryTreeReaload(){
				this.init({'parent_path':encodeURIComponent('/系统目录/配置设置/'),'resName':this.filterText});
			},
			//添加根节点
			addNode() {
				//触发diaolog 订阅-发布事件
				this.$bus.$emit('treeDialogShow','添加系统设置顶级分类',{},'add');
			},

			//添加子节点
			addSubNode() {
				if(this.selectData.id){
					this.$bus.$emit('treeDialogShow','添加系统设置分类',this.selectData,'addSub');
				}else{
					this.$message({
						message: '请单击选择一条数据！',
						type: 'warning'
					});
				}

			},
			//编辑
			edtNode() {
				//console.log(this.$refs.tree.getCheckedKeys());
				if(this.selectData.id){
					this.$bus.$emit('treeDialogShow','修改系统设置分类',this.selectData,'edit');
				}else{
					this.$message({
						message: '请单击选择一条数据！',
						type: 'warning'
					});
				}
			},
			//删除
			delNode() {
				var _this = this;
				if(this.selectData.id){
					//var url = "/dlsys/admin/sdk/sys/dic/removeCat/" + data.id;
					this.$confirm('确认删除吗？', '提示', {}).then(() => {
						dictionary.delTree(this.selectData.id).then((res) =>{
						this.$message({
						message: '删除成功！',
						type: 'success'
					});
					this.handleSearch();
				}).catch (function(error){
						_this.$Error(_this,error);
					});
				});

				}else{
					this.$message({
						message: '请单击选择一条数据！',
						type: 'warning'
					});
				}
			},
			//单击节点
			handleNodeClick(data) {
				this.selectData.id= data.id;
				this.selectData.name= data.resName; //名称
				this.selectData.descp= data.descp; //描述
				this.selectData.data= data.data;   //项值
				this.selectData.parent_path= data.parent_path;
				this.selectData.fullPath= data.fullPath;

				this.$bus.$emit('setting_reloadList',this.selectData.fullPath);
			},
			//加载子节点
			loadNode(node, resolve) {
				if (node.data && node.data.id) {
					this.listLoading = true;
					var params = {
						obj:{
							'parent_path':encodeURIComponent('/系统目录/配置设置/')
						},
						'id':node.data.id || ""
					};
					dictionary.loadNode(params).then((res) => {
						var data = res.content;
					this.listLoading = false;
					resolve(data);
				});
				}
			},

			//查询树形
			handleSearch(ev) {

				if(this.parentPath){
					this.init({'parent_path':encodeURIComponent(this.parentPath),'resName':this.filterText});
				}else{
					this.init({'parent_path':encodeURIComponent('/系统目录/配置设置/'),'resName':this.filterText});
				}

			}
		}
	};

</script>

<style scoped>
	#h-searchBox{margin-bottom:10px;}
</style>

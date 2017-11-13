<!--树形组件 lhw-->
<template>
	<div class="grid-content bg-purple">
		<!--<div>{{ parentPath }}</div>-->
		<el-col :span="24" class="toolbar">
			<div id="h-searchBox">
				<el-input placeholder="请输入关键字进行搜索" v-model="filterText" v-loading="listLoading" icon="search"  :on-icon-click="handleSearch"></el-input>
			</div>
			<!--工具条-->
			<el-row class="b_eef1f6 button_box">
				<el-button  icon="plus" class="btn_border_none" @click="addNode">新增顶级分类</el-button>
				<!--<span>|</span>-->
				<el-button  icon="plus" class="btn_border_none" @click="addSubNode">新增子分类</el-button>
				<!--<span>|</span>-->
				<el-button  icon="edit" class="btn_border_none"  @click="edtNode">编辑</el-button>
				<!--<span>|</span>-->
				<el-button  icon="delete" class="btn_border_none" @click="delNode">删除</el-button>
			</el-row>
			<el-tree
					:data="regions"
					:props="props"
					:load="loadNode"
					:highlight-current="true"
					node-key="id"
					ref="tree"
					lazy
					@node-click="handleNodeClick">
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
	import DialogBox  from './HTree.dialog'
	import list  from './dictionary.list.vue'
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
			},800);

			}
		},
		mounted() {
			//alert(this.parentPath+":dd");
			if(this.parentPath){
				this.init({'parent_path':this.parentPath,'resName':''});
			}else{
				this.init({'parent_path':'/系统目录/数据字典/','resName':''});
			}
			//list.methods.test("贷款");
		},
		methods: {
			//初始化
			init(params) {
				this.listLoading = true;
				dictionary.getTree(params).then((res) => {
					this.regions = res.content;
				this.listLoading = false;
				this.selectData = {};
			}).catch(function (error) {
					this.listLoading = false;
					this.$Error(this,error);
				})
			},
			//添加根节点
			addNode() {
				//触发diaolog 订阅-发布事件
				this.$bus.$emit('treeDialogShow','添加数字字典顶级分类',{},'add');
			},

			//添加子节点
			addSubNode() {
				if(this.selectData.id){
					this.$bus.$emit('treeDialogShow','添加数字字典分类',this.selectData,'addSub');
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
					this.$bus.$emit('treeDialogShow','修改数字字典分类',this.selectData,'edit');
				}else{
					this.$message({
						message: '请单击选择一条数据！',
						type: 'warning'
					});
				}
			},
			//删除
			delNode() {
				if(this.selectData.id){
					//var url = "/dlsys/admin/sdk/sys/dic/removeCat/" + data.id;
					this.$confirm('确认删除吗？', '提示', {}).then(() => {
						dictionary.delTree(this.selectData.id).then((res) =>{
							this.$message({
							message: '删除成功！',
							type: 'success'
						});
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
				//console.log(this.selectData.fullPath);
				//list.methods.reloadDictionaryList(this.selectData.fullPath);
				this.$bus.$emit('reloadDictionaryList',this.selectData.fullPath);
			},
			//加载子节点
			loadNode(node, resolve) {
				if (node.data && node.data.id) {
					this.listLoading = true;
					var params = {
						obj:{
							'parent_path':'/系统目录/数据字典/'
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
					this.init({'parent_path':this.parentPath,'resName':this.filterText});
				}else{
					this.init({'parent_path':'/系统目录/数据字典/','resName':this.filterText});
				}

			}
		}
	};

</script>

<!--<style scoped>-->
	<!--#h-searchBox{margin-bottom:4px;}-->
	<!--.box{ padding: 10px 10px 20px 0;}-->
	<!--.btn_box{ text-align: right; padding-right:20px;}-->
	<!--.b_eef1f6{ background: #e4e9f1;}-->
	<!--.button_box span{ color: #bebfc0;}-->
	<!--.btn_border_none{ border:none; background: none; width: 45%; min-width:120px;text-align: left; margin-left: 0;}-->
<!--</style>-->

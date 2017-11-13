<template>
	<el-row class="panel">
		<el-col :span="24" class="panel-top">
			<top-nav></top-nav>
		</el-col>
		<el-col :span="24" class="panel-center">
			<aside style="width:230px;">
				<left-nav></left-nav>
			</aside>
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="margin-bottom:10px; height: 30px; border-bottom: 1px solid #e8e8e8; ">
						<right-bread></right-bread>
					</el-col>
					<el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
						<router-view></router-view>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
    import TopNav from '../componnets/home/TopNav.vue'
    import LeftNav from '../componnets/home/LeftNav.vue'
    import RightBread from '../componnets/home/RightBread.vue'
	import indexApi from '../api/index'
	import { mapState } from 'vuex'
    export default {
        components: {
            TopNav,
            LeftNav,
            RightBread
        },
		methods:{
//			getTitle(){ //获取title设置信息
//				var _title = this.ProjectName;
//				//document.title = _title;
//				indexApi.getSetting('WEBTITLE').then(res =>{
//					if(res.content && res.content.length){
//					_title = res.content[0].itemValue;
//				}
//				document.title = _title;
//				this.$store.commit('UPDATE_PROJECTNAME', _title);
//			}).catch(error =>{
//					document.title = _title;
//			});
//			},
//			getRuleSetting(){
//				indexApi.getSetting('RULESETTING').then(res =>{
//					if(res.content && res.content.length){
//					var _val = res.content[0].itemValue;
//					if(_val =='true' || typeof _val =='boolean' && _val){
//						_val = true;
//					}else{
//						_val = false;
//					}
//					this.$store.commit('UPDATE_RULESETTING', _val);
//				}
//			}).catch(error =>{});
//			},
		},
        mounted() {
//			this.getRuleSetting();
//			this.getTitle();
				//alert('home.')
        }
    }
</script>

<style scoped>
	.panel {  position: absolute;  top: 0px;  bottom: 0px;  width: 100%;  }
	.panel-top {  height: 60px;  line-height: 60px;  background: #1F2D3D;  color: #c0ccda;  }
	.panel-center {  background: #fff;  position: absolute;  top: 60px;  bottom: 0px;  overflow: hidden;  }
	.panel-c-c {  background: #fff;  position: absolute;  right: 0px;  top: 0px;  bottom: 0px;  left: 230px;  overflow-y: scroll;  padding: 20px; border-left: 15px solid #eee;  }
</style>
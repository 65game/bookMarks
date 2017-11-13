<template>
	<div>
		<el-col :span="10" style="font-size:20px;">
			<!--<img src="../assets/logo4.png" class="logo">-->
			<router-link to="/main" class="project_name">{{ProjectName}}</router-link>
		</el-col>
		<!--<el-col :span="16">-->
			<!--<el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal"  id="topNavBox" unique-opened router>-->
				<!--<template v-for="(item,index) in menuList">-->
					<!--<li class="top-ment-item el-menu-item" :index="index+''"  v-on:click="topNavClick(index+'')">{{item.name}}</li>-->
				<!--</template>-->
			<!--</el-menu>-->
		<!--</el-col>-->
		<el-col :span="14" class="rightbar">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;"><img src="../../assets/user.png" class="head"> {{name}}</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
//    import user from '../../api/user'
    export default {
        data() {
            return {
                name:'',
                menuList:' ',
                path:'',
                indexpath:'',
                topName:'' //顶部一级菜单名称
            }
        },
        computed: {
                ...mapState([
                    'ProjectName'
                ])
        },
        methods: {
            //退出登录
            logout() {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    user.delInfo();
                    _this.$router.replace('/login');
                }).catch(() => {

                });
            }
        },
        mounted() {
            var UserName=this.$Utils.getCookie("UserName");
            this.name = UserName;
        }
    }
</script>

<style scoped>
	#topNavBox{background:#333; color: #fff!important;}
	#topNavBox .top-ment-item.el-menu-item{color: #fff;}
	#topNavBox .top-ment-item.el-menu-item:hover{background-color: #4db3ff!important;}
	.panel-top .rightbar{  text-align: right;  padding-right: 35px;  }
	.panel-top .rightbar .head{  width: 40px;  height: 40px;  border-radius: 20px;  margin: 10px 0px 10px 10px;  float: right;  }
	.tip-logout i {  cursor: pointer;  }
	.top-ment-item{ font-size: 16px;}
	.project_name{ color: #fff; padding-left: 20px; text-decoration:none; width: 210px; display:inline-block;}
</style>
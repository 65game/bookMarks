<template>
    <div id="h-leftNav">
        <!--<el-menu :default-active="currentPath" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"  unique-opened router>-->
            <!--<template v-for="(item,index) in currentLeftNavArray">-->
                <!--<el-submenu :index="index+''">-->
                    <!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
                    <!--<el-menu-item v-for="child in item.list" :index="child.url">{{child.name}}</el-menu-item>-->
                <!--</el-submenu>-->
                <!--&lt;!&ndash;<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>&ndash;&gt;-->
            <!--</template>-->
        <!--</el-menu>-->
        <el-menu :default-active="currentPath" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"  unique-opened router>
            <template v-for="(item,index) in currentLeftNavArray" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf">
                    <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                    <el-menu-item v-for="child in item.children" :index="child.path" v-on:click="leftNavClick()" v-if="child.show">{{child.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPath:'',
                currentPathindex: '',
                currentLeftNavArray:'',
            }
        },
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
                //console.log('handleselect');
            }
        },
        created: function () {
            var _this = this;
            this.currentPath = this.$route.path;
            this.currentPathindex = this.$route.matched[0].meta.index||0;
            this.currentLeftNavArray = this.$router.options.routes[this.currentPathindex].children;
            this.$bus.$on('checkLeftNav', (a) => {
                this.currentPathindex = a;
                this.currentLeftNavArray = this.$router.options.routes[a].children;
            })
            this.currentPathindex = this.$route.matched[0].meta.index||0;
            this.currentLeftNavArray = this.$router.options.routes[this.currentPathindex].children;

//            _this.$bus.$on('checkLeftNav', (index,path,data) => {
////                console.log(index);
////                console.log(path);
////                console.log(data);
//                _this.currentPathindex = index;
//                _this.currentLeftNavArray = data;
//                setTimeout(function(){
//                    _this.currentPath = path;
//                },10)
//
//            })
        },
        mounted:function() {
//            debugger;
//            console.log(this.$route.name);
            //console.log(this.$route.path);
//            console.log(this.$route.params);
//            console.log(this.$route.hash);
//            console.log(this.$route.fullPath);
//            console.log(this.$route.matched);
//            console.log(this.$route.matched.index);
//            console.log( this.$router.options.routes);
//            this.currentPath = this.$route.path;
//            this.currentPathName = this.$route.name;
//            this.currentPathNameParent = this.$route.matched[1].name;
//            this.currentPathNameParentParent = this.$route.matched[0].name;
//            var topNavBox = document.getElementById("topNavBox");
//            var childs = topNavBox.childNodes;
//            for(var i = 0; i < childs.length; i++) {
//               if(this.currentPathindex==childs[i].getAttribute("index")){
//                   childs[i].className+=" "+"is-active";
//               }
//            }
        }
    }
</script>
<style scoped>
    /*.el-menu--dark{background-color:#fff;}*/
    /*.el-menu--dark.is-active{  background: #f1f2f7;  }*/
    /*.el-menu{  background: #fff;}*/
    /*.el-submenu .el-menu,.el-menu-item {*/
        /*background-color: #F7F7F7;*/
    /*}*/
    .el-submenu__title{font-weight: bold;}
    .el-submenu.is-opened{border-left: 4px solid #1B68FA; background-color: #e4e8f1;}
</style>
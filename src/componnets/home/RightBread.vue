<template>
    <div>
        <strong style="width:200px;float:left;color: #475669; font-size: 15px;">{{currentPathName}}</strong>
        <el-breadcrumb separator="/" style="float:right;">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPathNameParentParent!=''&&currentPathNameParentParent!='首页'">{{currentPathNameParentParent}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPathNameParent!=''&&currentPathNameParent!='首页'">{{currentPathNameParent}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPath: '',
                currentPathName: '',
                currentPathNameParent: '',
                currentPathNameParentParent:''
            }
        },
        watch: {
            '$route'(to, from) {//监听路由改变
                this.currentPath = to.path;
                this.currentPathName = to.name;
                this.currentPathNameParent = this.$route.matched[1].name;
                this.currentPathNameParentParent = this.$route.matched[0].name;
            }
        },
        mounted() {
            this.currentPath = this.$route.path;
            this.currentPathName = this.$route.name;
            this.currentPathNameParent = this.$route.matched[1].name;
            this.currentPathNameParentParent = this.$route.matched[0].name;
        }
    }
</script>
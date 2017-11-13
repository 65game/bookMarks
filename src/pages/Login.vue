<template>
    <div id="h-loginBox">
        <div class="h-loginForm">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform" id="loginform">
                <h3 class="title">系统登录</h3>
                <el-form-item  prop="account">
                    <div class="el-form-item__content">
                        <div class="el-input">
                            <input type="text" name="name" v-model="ruleForm2.account" autocomplete="off"  placeholder="账号" class="el-input__inner"  v-on:keyup.enter="handleSubmit2">
                        </div>
                    </div>
                    <!--<el-input type="text" name="name" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>-->
                </el-form-item>
                <el-form-item prop="checkPass">
                    <div class="el-form-item__content">
                        <div class="el-input">
                            <input type="password" name="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" class="el-input__inner"  v-on:keyup.enter="handleSubmit2">
                        </div>
                    </div>
                    <!--<el-input type="password" name="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>-->
                </el-form-item>
                <el-form-item prop="code">
                    <el-col :span="18">
                        <div class="el-form-item__content">
                            <div class="el-input">
                                <input type="text" name="checkNum" v-model="ruleForm2.code" auto-complete="off"  placeholder="验证码" class="el-input__inner" v-on:keyup.enter="handleSubmit2"></input>
                            </div>
                        </div>
                        <!--<el-input type="text" name="checkNum" v-model="ruleForm2.code" auto-complete="off"  placeholder="验证码"></el-input>-->
                    </el-col>
                    <el-col :span="5" :offset="1" style="height: 36px;">
                    <img @src="imgSrc" id="codeImg" class="codeImg" @click="CodeImg">
                    </el-col>

                </el-form-item>
                <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住账号</el-checkbox>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div id="login_bg"></div>
    </div>
</template>

<script>
    //    import {userPasswordKey,userLogin } from '../api/api'
    import user from '../api/user'
    import indexApi from '../api/index'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                firstLoadFlag:true, //表示第一次
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: '',
                    code:''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                imgSrc:'/dlsys/portal/console/common/validcode',
                checked: true,
                modulus:'',
                exponent:'',
                origpassword:''
            };
        },
        methods: {
//            getTitle(){ //获取title设置信息
//                var _title = this.ProjectName;
//                //document.title = _title;
//                indexApi.getSetting('WEBTITLE').then(res =>{
//                    if(res.content && res.content.length){
//                        _title = res.content[0].itemValue;
//                    }
//                    document.title = _title;
//                    this.firstLoadFlag = false;
//                    this.$store.commit('UPDATE_PROJECTNAME', _title);
//                }).catch(error =>{
//                    document.title = _title;
//                });
//            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.$router.push({ path: '/main' });
//                        var params={};
//                        user.getLoginKey(params).then(res => {
//                            if(res.code==0){
//                                _this.modulus = res.result.modulus;
//                                _this.exponent = res.result.exponent;
//                                _this.logining = true;
//                                var password = _this.encryptionByRAS(_this.ruleForm2.checkPass);
//                                var loginParams ="name="+this.ruleForm2.account+"&password="+password+"&checkNum="+this.ruleForm2.code+"&returnUrl=&notifyUrl=";
//                                user.login(loginParams).then(data => {
//                                    _this.logining = false;
//                                    let {code, result} = data;
//                                    if (code !== 0) {
//                                        _this.$notify({
//                                            title: '错误',
//                                            message: result.msg,
//                                            type: 'error'
//                                        });
//                                    } else {
//                                        user.saveInfo(JSON.stringify(result));//保存用户信息
//                                        this.$Utils.setCookie("UserLoginID",result.id);//登记用户ID
//                                        this.$Utils.setCookie("UserLoginToken",result.token);//登记用户状态
//                                        this.$Utils.setCookie("UserName",result.name);//登记用户名
//                                        if(this.checked){
//                                            this.$Utils.setCookie("UserLoginName",result.name,"30");//记住用户名
//                                        }else{
//                                            this.$Utils.delete("UserLoginName");//删除用户名
//                                        }
//                                        this.$router.push({ path: '/main' });
//                                    }
//                                })
//                                    .catch(function (error) {
//                                        _this.logining = false;
//                                        _this.CodeImg();
//                                        _this.$Error(_this,error);
//                                    })
//                            }
//                        })


                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
            },

            CodeImg(){
                var _this = this;
                document.getElementById('codeImg').src=this.imgSrc+"?"+Math.random();
                document.getElementById('codeImg').onload = function(){
                    if(_this.firstLoadFlag){
                        _this.getTitle();
                    }

                }
            },
            encryptionByRAS(password){
                var key = RSAUtils.getKeyPair(this.exponent, '', this.modulus);
                var encryptedPassword = RSAUtils.encryptedString(key, password);
                return encryptedPassword;
            }
        },
        mounted() {
            var name =  this.$Utils.getCookie("UserLoginName");
            this.ruleForm2.account = name;
            this.CodeImg();
        },
        computed: {
            ...mapState([
                'ProjectName'
            ])
        }
    }
</script>

<style scoped>
    .card-box {
        padding: 20px;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        margin-bottom: 20px;
        background-color: #fff;
        margin: 180px auto;
        width: 400px;
        border: 2px solid #fff;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .loginform {
        width: 350px;
        padding: 35px 35px 15px 35px;
    }

    .codeImg{ width: 100%; height: 34px; border-radius: 4px; overflow: hidden;cursor: pointer; }
    #h-loginBox .h-loginBox{z-index: 2;}
    #h-loginBox .h-loginForm{position: relative;
        z-index: 999;
    }
    #login_bg {
        width: 100% ;
        height: 100%;
        position: fixed;
        /*background: url("../../static/images/login_bg.jpg") no-repeat;*/
        background-size: cover;
        z-index: 0;
        left: 0; top: 0;
    }

</style>
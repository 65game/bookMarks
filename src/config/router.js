import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Main from '../pages/Main.vue'
import Box from '../pages/Box.vue'
import nofind from '../pages/404'

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: '商家管理',
            meta:{index:0},//路由元信息:当前路由索引
            show:false,//显示在顶部导航中
            hidden: false,//显示在左端导航中  true:隐藏  false：显示
            children: [
                {
                    path: '/',
                    component: Box,
                    name: '商家管理',
                    children: [
                        { path: '/rule', component: require('../pages/ruleManager/rule.vue'), name: '规则管理', show:true },
                    ]
                },
                {
                    path: '/',
                    component: Box,
                    name: '指标库管理',
                    children: [
                        { path: '/indicators', component: require('../pages/indicatorsManager/indicators.vue'), name: '指标管理', show:true },
                        { path: '/indicators/details', component: require('../pages/indicatorsManager/indicators.detail.vue'), name: '指标管理明细', show:false },
                        { path: '/indicators/edit', component: require('../pages/indicatorsManager/indicators.detail.edit.vue'), name: '编辑指标明细', show:false },
                        { path: '/indicators/add', component: require('../pages/indicatorsManager/indicators.detail.edit.vue'), name: '新增指标明细', show:false },
                        { path: '/indicatorsClass', component: require('../pages/indicatorsManager/indicatorsClass.vue'), name: '指标分类管理', show:true }
                    ],
                    button:[]
                },
                {
                    path: '/',
                    component: Box,
                    name: '产品管理',
                    children: [
                        { path: '/productList',component: require('../pages/productManager/productList.vue'), name: '产品列表', show:true},
                        { path: '/productList/ruleSet', component: require('../pages/productManager/ruleSet.vue'), name: '规则模型配置', show:false},
                        { path: '/productList/ruleSet/edit', component: require('../pages/productManager/ruleSet.list.edit.vue'), name: '编辑规则模型配置', show:false},
                        { path: '/productList/ruleSet/release', component: require('../pages/productManager/ruleSet.release.vue'), name: '查看已发布规则模型', show:false},
                        { path: '/productList/scoreSet', component: require('../pages/productManager/scoreSet.vue'), name: '评分模型配置', show:false},
                        { path: '/productList/scoreSet/release', component: require('../pages/productManager/scoreSet.release.vue'), name: '查看已发布评分模型配置', show:false},
                        { path: '/productList/scoreSet-result', component: require('../pages/productManager/scoreSet.result.vue'), name: '评分结果配置', show:false},
                        { path: '/productList/scoreSet-listView', component: require('../pages/productManager/scoreSet.list.view.vue'), name: '指标明细列表', show:false},
                        { path: '/productList/scoreSet-listView/edit', component: require('../pages/productManager/scoreSet.list.view.edit.vue'), name: '编辑指标明细列表', show:false},
                        { path: '/productList/optionsResultSet', component: require('../pages/productManager/optionsResultSet.vue'), name: '决策建议结果设置', show:false},
                        { path: '/productList/optionsResultSet-add', component: require('../pages/productManager/optionsResultSet.addPage.vue'), name: '决策建议结果设置', show:false},
                        { path: '/productList/linesSet', component: require('../pages/productManager/lineSet.vue'), name: '额度策略调整', show:false},

                    ],
                    button:[]
                },
                {
                    path: '/',
                    component: Box,
                    name: '名单管理',
                    children: [
                        { path: '/members', component: require('../pages/nameManager/members.vue'), name: '普通用户', show:true},
                        { path: '/membersWhite', component: require('../pages/nameManager/membersWhite.vue'), name: '白名单管理', show:true},
                        { path: '/membersBlack', component: require('../pages/nameManager/membersBlack.vue'), name: '黑名单管理', show:true}
                    ],
                    button:[]
                }
            ]

        },
        {
            path: '/',
            component: Home,
            name: '模型中心',
            meta:{index:1},//路由元信息:当前路由索引
            show:true,//显示在顶部导航中
            hidden: true,//不显示在左端导航中
            children: [
                {
                    path: '/',
                    component: Box,
                    name: '规则库管理',
                    children: [
                        { path: '/rule', component: require('../pages/ruleManager/rule.vue'), name: '规则管理', show:true },
                        { path: '/rule/edit', component: require('../pages/ruleManager/rule.edit.vue'), name: '编辑规则', show:true },
                        { path: '/rule/add', component: require('../pages/ruleManager/rule.edit.vue'), name: '新增规则', show:true },
                        { path: '/rule/devSetting', component: require('../pages/ruleManager/rule.devSettings.vue'), name: '逻辑配置', show:true },
                        { path: '/rule/resSetting', component: require('../pages/ruleManager/rule.resSettings.vue'), name: '触发结果配置', show:true },
                        { path: '/ruleClass', component: require('../pages/ruleManager/ruleClass.vue'), name: '规则分类管理', show:true }
                    ],
                    button:[]
                },
                {
                    path: '/',
                    component: Box,
                    name: '指标库管理',
                    children: [
                        { path: '/indicators', component: require('../pages/indicatorsManager/indicators.vue'), name: '指标管理', show:true },
                        { path: '/indicators/details', component: require('../pages/indicatorsManager/indicators.detail.vue'), name: '指标管理明细', show:false },
                        { path: '/indicators/edit', component: require('../pages/indicatorsManager/indicators.detail.edit.vue'), name: '编辑指标明细', show:false },
                        { path: '/indicators/add', component: require('../pages/indicatorsManager/indicators.detail.edit.vue'), name: '新增指标明细', show:false },
                        { path: '/indicatorsClass', component: require('../pages/indicatorsManager/indicatorsClass.vue'), name: '指标分类管理', show:true }
                    ],
                    button:[]
                },
                {
                    path: '/',
                    component: Box,
                    name: '产品管理',
                    children: [
                        { path: '/productList',component: require('../pages/productManager/productList.vue'), name: '产品列表', show:true},
                        { path: '/productList/ruleSet', component: require('../pages/productManager/ruleSet.vue'), name: '规则模型配置', show:false},
                        { path: '/productList/ruleSet/edit', component: require('../pages/productManager/ruleSet.list.edit.vue'), name: '编辑规则模型配置', show:false},
                        { path: '/productList/ruleSet/release', component: require('../pages/productManager/ruleSet.release.vue'), name: '查看已发布规则模型', show:false},
                        { path: '/productList/scoreSet', component: require('../pages/productManager/scoreSet.vue'), name: '评分模型配置', show:false},
                        { path: '/productList/scoreSet/release', component: require('../pages/productManager/scoreSet.release.vue'), name: '查看已发布评分模型配置', show:false},
                        { path: '/productList/scoreSet-result', component: require('../pages/productManager/scoreSet.result.vue'), name: '评分结果配置', show:false},
                        { path: '/productList/scoreSet-listView', component: require('../pages/productManager/scoreSet.list.view.vue'), name: '指标明细列表', show:false},
                        { path: '/productList/scoreSet-listView/edit', component: require('../pages/productManager/scoreSet.list.view.edit.vue'), name: '编辑指标明细列表', show:false},
                        { path: '/productList/optionsResultSet', component: require('../pages/productManager/optionsResultSet.vue'), name: '决策建议结果设置', show:false},
                        { path: '/productList/optionsResultSet-add', component: require('../pages/productManager/optionsResultSet.addPage.vue'), name: '决策建议结果设置', show:false},
                        { path: '/productList/linesSet', component: require('../pages/productManager/lineSet.vue'), name: '额度策略调整', show:false},

                    ],
                    button:[]
                },
                {
                    path: '/',
                    component: Box,
                    name: '名单管理',
                    children: [
                        { path: '/members', component: require('../pages/nameManager/members.vue'), name: '普通用户', show:true},
                        { path: '/membersWhite', component: require('../pages/nameManager/membersWhite.vue'), name: '白名单管理', show:true},
                        { path: '/membersBlack', component: require('../pages/nameManager/membersBlack.vue'), name: '黑名单管理', show:true}
                    ],
                    button:[]
                }
            ]

        },

        {
            path: '/login',
            component: Login,
            name:'登录',
            show:false,//不显示在顶部导航中
            hidden: true//不显示在左端导航中
        },
        {
            path: '/',
            component: Home,
            name: '',
            show:false,//不显示在顶部导航中
            hidden: true,//不显示在左端导航中
            children: [
                { path: '/main', component: Main, name: '首页' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '',
            show:false,//不显示在顶部导航中
            hidden: true,//不显示在左端导航中
            children: [
                { path: '/vueDev', component: require('../pages/systemManager/systemData/dictionary.tree'), name: 'vue组件开发' }
            ]
        },
        {
            path: '*',
            name: '404',
            component: nofind,
            show:false,//不显示在顶部导航中
            hidden: true//不显示在左端导航中
        }
    ]
})

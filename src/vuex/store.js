/**
 * Created 2017/11/5
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
    ProjectName:'商家中心',
    RuleSetting: false, //设置是否显示规则配置
}

// 定义所需的 mutations
const mutations = {

    // 更新项目名称
    UPDATE_PROJECTNAME(state, name) {
        state.ProjectName = name;
    },
    // 更新规则配置
    UPDATE_RULESETTING(state, val) {
        state.RuleSetting = val;
        //console.log('store...:'+state.RuleSetting);
    }

}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations
})

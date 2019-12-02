import Vue from 'vue'
import Vuex from 'vuex'
import common from './common/index'
import course from './module/course'
import user from './module/user'
import permiss from './module/permiss'
import nav from './module/nav'
import createLogger from 'vuex/dist/logger'

// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

const state = {
    stu_id_list: null,
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    modules: {
        ...common,
        course,
        user,
        permiss,
        nav,
    },
    // actions,
    // getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

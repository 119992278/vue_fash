import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import userInfo from './modules/userInfo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        userInfo
    },
    getters
})

export default store
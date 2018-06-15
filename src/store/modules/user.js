import { login_api, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
    state: {
        count: 0,
        token: getToken('token'),
        name: '',
        avatar: '',
        roles: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ACCOUNT: (state, name) => {
            state.account = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        login_actions1({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login_api(userInfo).then(response => {
                    commit('increment')
                    commit('SET_TOKEN', response.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        login_actions({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login_api(userInfo).then(response => {
                    setToken('token', response.token)
                    let userRoleInfo = response.userRoleInfo
                    localStorage.setItem("userRoleInfo", JSON.stringify(userRoleInfo))
                    setToken('AccountId', response.userRoleInfo.accountId);
                    setToken('ClubId', response.userRoleInfo.clubId)
                    setToken('IconUrl', response.iconUrl)
                        // commit('SET_NAME', response.userName)
                        //commit('SET_ACCOUNT', response.userRoleInfo.accountId)
                        // commit('SET_AVATAR', response.iconUrl)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        get_test({ commit }, userInfo) {
            console.log(userInfo);
        },
        // 获取用户信息
        getInfo_action({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo_api(state.token).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 前端 登出
        FedLogOut_action({ commit }) {
            return new Promise(resolve => {
                removeToken('token')
                    //commit('SET_TOKEN', response.token)
                resolve()
            })
        },
        // 登出
        LogOut_action({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
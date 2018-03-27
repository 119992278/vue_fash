import request from '@/utils/request'

export function login_api(params) {
    return request({
        url: '/gym/clubUser/login',
        method: 'post',
        data: {
            'accountId': params.username,
            'clientType': 'formPC',
            'password': params.password,
            'random': params.random,
            'seq': 1520237692343,
            'verifyCode': params.verifyCode,
            'versionNo': '2.0'
        }
    })
}

export function getInfo_api(token) {
    return request({
        url: '/gym/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/gym/user/logout',
        method: 'post'
    })
}
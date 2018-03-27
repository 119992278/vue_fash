/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
    const valid_map = ['13798682145', 'editor', '13888888888', '13560409747']
    return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 手机号码验证*/
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}

/* 身份证验证*/
export function isvalidIdentity(str) {
    const reg = /^\d{15}|\d{18}$/
    return reg.test(str)
}

export var validNoEmpty = [{
    required: true,
    trigger: 'blur',
    validator: function(rule, value, callback) {
        if (!value) {
            callback(new Error('该字段不为空'))
        } else {
            callback()
        }
    }
}]

export var validMobile = [{
    required: true,
    trigger: 'blur',
    validator: function validPhone(rule, value, callback) {
        if (!value) {
            callback(new Error('请输入电话号码'))
        } else if (!isvalidPhone(value)) {
            callback(new Error('请输入正确的11位手机号码'))
        } else {
            callback()
        }
    }
}]

export var validIdentity = [{
    required: true,
    trigger: 'blur',
    validator: function validPhone(rule, value, callback) {
        if (!value) {
            callback(new Error('请输入正确的身份证'))
        } else if (!isvalidIdentity(value)) {
            callback(new Error('请输入正确的身份证'))
        } else {
            callback()
        }
    }
}]
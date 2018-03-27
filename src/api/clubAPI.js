import request from '@/utils/request'
import { getToken } from '@/utils/auth'

function setAjaxInfo(params) {
    params.clubId = getToken('ClubId');
    params.clientType = "formPC";
    params.seq = new Date().getTime().toString();
    params.versionNo = "2.0.0";
    return params;
}
/*********************************************
 * @name - 获取会员信息.
 **********************************************/
export function getMemberList(params) {

    return request({
        url: '/gym/vip/list',
        method: 'post',
        data: setAjaxInfo(params)
    })
}

/*********************************************
 * @name - 获取训练计划.
 **********************************************/
export function getTrainingPlanList(params) {

    return request({
        url: '/gymTrainingPlanBackstage/queryTrainingPlanList',
        method: 'post',
        data: setAjaxInfo(params)
    })
}

export function getMemberInfo(params) {
    return request({
        url: '/gym/vip/get',
        method: 'post',
        data: setAjaxInfo(params)
    })
}

/*********************************************
 * @name - APP用户列表.
 **********************************************/
export function getClubUserList(params) {
    return request({
        url: '/gym/queryClubUserList',
        method: 'post',
        data: setAjaxInfo(params)
    })
}



/*********************************************
 * @name - 添加会员信息.
 **********************************************/
export function addMember(params) {
    return request({
        url: '/gym/vip/add',
        method: 'post',
        data: setAjaxInfo(params)
    })
}

/*********************************************
 * @name - 编辑会员信息.
 **********************************************/
export function editMember(params) {
    return request({
        url: '/gym/vip/edit',
        method: 'post',
        data: setAjaxInfo(params)
    })
}
/*********************************************
 * @name - 获取工作人员信息.
 **********************************************/
export function getWorkerList(params) {
    params.accountId = getToken('AccountId');
    return request({
        url: '/gym/clubMemberList',
        method: 'post',
        data: setAjaxInfo(params)
    })
}

/*********************************************
 * @name - 获取俱乐部信息.
 **********************************************/
export function getPersonalcenter(params) {
    params.accountId = getToken('AccountId');
    return request({
        url: '/gym/clubUser/queryPersonalcenter',
        method: 'post',
        data: setAjaxInfo(params)
    })
}
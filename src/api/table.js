import request from '@/utils/request'

export function getVipList(params) {
  return request({
    url: '/vip/list',
    method: 'post',
    data: params
  })
}

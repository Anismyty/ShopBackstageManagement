/* eslint-disable */
import request from '@/utils/request'

export function getBigData() {
  return request({
    url: '/reports/type/1',
    method: 'get',
  })
}

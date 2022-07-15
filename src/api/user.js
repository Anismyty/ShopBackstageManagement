/* eslint-disable */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

//获取用户列表
export function getUserInfo(params) {
  return request({
    url: '/users',
    method: 'GET',
    params
  })
}
//根据ID获取用户信息
export function getUserInfoById(id) {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
}

//修改用户状态
export function changeState(data) {
  return request({
    url: `/users/${data.uId}/state/${data.type}`,
    method: 'PUT'
  })
}
//删除用户
export function delUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
//添加新用户
export function addUser(data) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}
//编辑提交信息
export function editUser(data) {
  return request({
    url: `/users/${data.id}`,
    method: 'PUT',
    data
  })
}

//更新用户角色【存在问题】
export function updateUserRole(data) {
  return request({
    url: `users/${data.id}/role`,
    method: 'PUT',
    data: {
      rid: data.rid
    }
  })
}

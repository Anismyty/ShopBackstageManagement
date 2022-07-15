/* eslint-disable */
import request from '@/utils/request'

/* 获取角色详细列表 */
export function getRoleList() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

/* 根据id查询角色 */
export function getRoleById(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

/* 添加角色 */
export function addRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

/* 编辑角色 */
export function editRole(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'put',
    data
  })
}

/* 删除角色 */
export function delRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

//删除角色指定权限
export function delRolePermission(data) {
  return request({
    url: `roles/${data.roleId}/rights/${data.rightId}`,
    method: 'delete'
  })
}
//获取所有权限
export function getAllPermission(type) {
  return request({
    url: `rights/${type}`,
    method: 'get'
  })
}

/* 角色授权 */
export function giveRolePermission(data) {
  return request({
    url: `roles/${data.roleId}/rights`,
    method: 'POST',
    data: {
      rids: data.rids
    }
  })
}


/* eslint-disable */
import request from '@/utils/request'

export function getGoodsList(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}
/* 删除商品 */
export function delGood(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete'
  })
}
/* 添加商品 */
export function addGood(data) {
  return request({
    url: `/goods`,
    method: 'post',
    data
  })
}

/* 商品分类 */
// 获取分类列表
export function getCategories(params) {
  return request({
    url: `categories`,
    method: 'get',
    params
  })
}
/* 删除分类 */
export function delCategories(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}
/*添加分类 */
export function addCategories(data) {
  return request({
    url: `categories`,
    method: 'post',
    data
  })
}
/* 编辑提交分类 */
export function editCategories(data) {
  return request({
    url: `categories/${data.id}`,
    method: 'put',
    data: {
      cat_name: data.cat_name
    }
  })
}
/* 获取参数列表 */
export function getCategoriesParams(params) {
  return request({
    url: `categories/${params.id}/attributes`,
    method: 'get',
    params: {
      sel: params.sel
    }
  })
}
/* 删除参数 */
export function delCategoriesParams(data) {
  return request({
    url: `categories/${data.id}/attributes/${data.attrid}`,
    method: 'delete'
  })
}
/* 添加参数 */
export function addCategoriesParams(data) {
  return request({
    url: `categories/${data.id}/attributes`,
    method: 'post',
    data
  })
}
/* 编辑参数【tag】 */
export function editCategoriesParams(data) {
  return request({
    url: `categories/${data.cat_id}/attributes/${data.attr_id}`,
    method: 'put',
    data
  })
}

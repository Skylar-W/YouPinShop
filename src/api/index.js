/**
  接口管理模块
*/
import reqt from './request'
import mockReq from './mockAjax'

//全部商品分类菜单 /api/product/getBaseCategoryList   get请求  无参数
export const reqCategoryList = () => reqt({
  url: '/product/getBaseCategoryList',
  method: 'GET'
})

//获取首页主轮播数据
export const reqMainBanner = () => mockReq.get('/banner')

//获取floors数据
export const reqFloorsList = () => mockReq.get('/floors')

//获取search模块的数据  地址: /api/list  请求方式: post  需要携带参数: params  (数据类型务必查看接口文档)
//当前接口(获取search模块的数据),给服务器传递一个默认参数(至少是一个空对象,否则请求会失败)
export const reqSearchInfo = (params) => reqt({
  method: 'POST',
  url: '/list',
  data: params
})

//获取detail数据 地址: /api/item/{ skuId }  请求方式: get  请求参数skuId必选

export const reqDetailInfo = (skuId) => reqt({
  method: 'GET',
  url: `/item/${ skuId }`,
})

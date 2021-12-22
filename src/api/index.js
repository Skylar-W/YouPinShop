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

//获取商品detail数据 地址: /api/item/{ skuId }  请求方式: get  请求参数skuId必选
export const reqDetailInfo = (skuId) => reqt({
  method: 'GET',
  url: `/item/${ skuId }`,
})

//商品添加至购物车  地址: /api/cart/addToCart/{ skuId }/{ skuNum }  [post] 请求参数: skuID, skuNum必选
export const reqAddCart = (skuId, skuNum) => reqt({
  method: 'POST',
  url: `/cart/addToCart/${ skuId }/${ skuNum }`
})

//获取购物车列表  地址: /api/cart/cartList  [get] 无参数
export const reqCartList = () => reqt({
  method: 'GET',
  url: '/cart/cartList'
})

//删除购物车商品  /api/cart/deleteCart/{skuId}  [DELETE]  参数:skuId(必选)
export const reqDeleteCartById = (skuId) => reqt({
  method: 'DELETE',
  url: `/cart/deleteCart/${skuId}`
})

//更新购物车商品的选中状态  /api/cart/checkCart/{skuID}/{isChecked}  [GET]  参数:skuId,isChecked必选
export const reqUpdateCartStatus = (skuId, isChecked) => reqt({
  method: 'GET',
  url: `/cart/checkCart/${skuId}/${isChecked}`
})

//获取验证码  /api/user/passport/sendCode/{phone}  [get]
export const reqVerifyCode = (phone) => reqt({
  method: 'GET',
  url: `/user/passport/sendCode/${phone}`
})

//注册新用户  /api/user/passport/register  [POST]  参数:phone,code,password必填
export const reqRegister = (data) => reqt({
  method: 'POST',
  url: '/user/passport/register',
  data
})

//用户登录  /api/user/passport/login  [post]  参数:phone, password必填
export const reqUserLogin = (data) => reqt({
  method: 'POST',
  url: '/user/passport/login',
  data
})

//获取用户信息(带着token向服务器请求用户信息)  /api/user/passport/auth/getUserInfo  [get]
export const reqUserInfo = () => reqt({
  method: 'GET',
  url: '/user/passport/auth/getUserInfo'
})

//退出登录  /api/user/passport/logout   [GET]
export const reqLogout = () => reqt({
  method: 'GET',
  url: '/user/passport/logout'
})

//获取订单交易信息  /api/order/auth/trade   [GET]
export const reqTradeInfo = () => reqt({
  method: 'GET',
  url: '/order/auth/trade'
})

//获取用户地址  /api/user/userAddress/auth/findUserAddressList  [GET]
export const reqAddress = () => reqt({
  method: 'GET',
  url: '/user/userAddress/auth/findUserAddressList'
})

//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  [POST]  
// 参数: tradeNo "consignee" "consigneeTel" "deliveryAddress" "paymentWay" "orderComment" "orderDetailList"
export const reqSubmitTrade = (tradeNo,data) => reqt({
  method: 'POST',
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data
})

//获取订单支付信息  /api/payment/weixin/createNative/{orderId}  [GET]  参数: orderId
export const reqPayInfo = (orderId) => reqt({
  method: 'GET',
  url: `payment/weixin/createNative/${orderId}`
})

//获取用户支付状态  /api/payment/weixin/queryPayStatus/{orderId}  [GET]  参数: orderId
export const reqPayStatus = (orderId) => reqt({
  method: 'GET',
  url: `/payment/weixin/queryPayStatus/${orderId}`
})

//获取我的订单列表  /api/order/auth/{page}/{limit}   [get]  参数: page页码  limit每页显示数量
export const reqMyOrder = (page, limit) => reqt({
  method: 'GET',
  url: `/order/auth/${page}/${limit}`
})
 
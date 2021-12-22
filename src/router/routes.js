//导入组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import shopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
//路由懒加载
/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/
const Search = () => import('@/pages/Search')
//配置路由参数并导出
export default [
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    // 将params参数和query参数映射成属性传入路由组件
    props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  //页面重定向
  {
    path: '*',
    redirect: '/home'
  },
  //商品详情展示面
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  },
  //添加至购物车成功
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    beforeEnter(to, from, next) {
    //   // 得到当前路由信息对象
    //   // const route = router.currentRoute  // route就是from

    //   // 得到要跳转到目路由的query参数
      const skuNum = to.query.skuNum
    //   // 读取保存的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
    //   console.log('---', skuNum, skuInfo)
    //   // 只有都存在, 才放行
      if (skuNum && skuInfo) {
        next()
      } else { // 在组件对象创建前强制跳转到首页
        next('/')
      }
    }
  },
  //购物车结算页面
  {
    path: '/shopcart',
    component: shopCart,
    meta: { show: true }
  },
  //商品订单信息
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    beforeEnter(to, from, next) {//路由独享守卫  从购物车才能跳转到订单信息页面
      if(from.path == '/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  //提交订单
  {
    path: '/pay',
    component: Pay,
    meta: {show: true},
    beforeEnter(to, from, next) {//只有从交易页面才能进入支付页面
      if(from.path == '/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  //支付成功
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {show: true},
    beforeEnter(to, from, next) {//路由独享守卫
      if(from.path == '/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  //个人中心页面
  {
    path: '/center',
    component: Center,
    meta: {show: true},
    children: [
      {//我的订单子路由
        path: 'myorder',
        component: MyOrder
      },
      {//团购订单子路由
        path: 'grouporder',
        component: GroupOrder
      },
      {//页面重定向
        path: '',
        redirect: 'myorder'
      }
    ]
  }
]
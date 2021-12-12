//导入组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

//配置路由参数并导出
export default [
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true }
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
  }
]
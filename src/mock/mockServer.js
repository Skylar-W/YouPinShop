import Mock from 'mockjs'
//webpack里的json和图片是默认对外暴露的
import banner from "./banner.json"
import floors from "./floors.json"
//mock数据:[参数1: 请求地址; 参数2: 请求数据]
Mock.mock("/mock/banner", {code: 200, data: banner}) //首页主轮播区的数据
Mock.mock("/mock/floors", {code: 200, data: floors})
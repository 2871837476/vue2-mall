// 引入mockjs模块
import Mock from 'mockjs'
// 把json数据格式引入进来(json数据默认对外暴露,无需在json中export)
import banner from './banner.json'
import floor from './floor.json'

// mock():参数1为请求地址,参数2为请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })
// 封装游客临时身份的模块：生成一个随机字符串，且不能再变了
import { v4 as uuidv4 } from "uuid"
// 对外暴露一个生成随机uuid的函数
// 功能：生成一个随机字符串，且每次执行不能发生变化；游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid,看本地存储中是否有,如果本地没有就生成uuid
  let uuid_token = localStorage.getItem("UUIDTOKEN")
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    // 本地存储一次
    localStorage.setItem("UUIDTOKEN", uuid_token)
  }
  return uuid_token
}
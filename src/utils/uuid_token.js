import {v4 as uuidv4} from 'uuid'
//持久化存储用户名(唯一登录标识符)
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token) {
    uuid_token = uuidv4();
    //存到localStorage里面去
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
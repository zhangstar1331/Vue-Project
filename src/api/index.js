/*
接口封装
*/
import ajax from './ajax.js'
const baseUrl = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${baseUrl}/position/${geohash}`)
// 获取食品分类列表
export const reqCategory = () => ajax(baseUrl + '/index_category')
// 根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(baseUrl + '/shops',{latitude,longitude})
// 根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) => ajax(baseUrl + '/search_shops',{geohash,keyword})
// 获取一次性验证码
// 用户名密码登陆
export const reqLoginPwd = ({name,pwd,captcha}) => ajax(baseUrl + '/login_pwd',{name,pwd,captcha},'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(baseUrl + '/sendcode',{phone})
// 手机号验证码登陆
export const reqLoginSms = (phone,code) => ajax(baseUrl + '/login_sms',{phone,code},'POST')
// 根据会话获取用户信息
export const reqGetUserinfo = () => ajax(baseUrl + '/userinfo')
// 用户登出
export const reqLogout = () => ajax(baseUrl + '/logout')
//获取goods
export const reqShopGoods = () => ajax('/goods')
//获取ratings
export const reqShopRatings = () => ajax('/ratings')
//获取info
export const reqShopInfo = () => ajax('/info')
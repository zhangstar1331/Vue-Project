/*
	封装请求函数
	返回值：promise对象
*/
import axios from 'axios'
let ajax = (url,data = {},type = 'GET') => {
	return new Promise((resolve,reject) => {
		let promise;
		if(type == 'GET'){
			let dataString = '';
			Object.keys(data).forEach((key)=>{//组装url后面拼接的请求参数
				dataString += `${key}=${data[key]}&`
			})
			if(dataString != ''){
				dataString = dataString.substring(0,dataString.lastIndexOf('&'))
				url = url + '?' +dataString
			}
			promise = axios.get(url)
		}else{
			promise = axios.post(url,data)
		}
		promise.then((response)=>{
			resolve(response.data)
		}).catch((err)=>{
			reject(err)
		})
	})
}
export default ajax;
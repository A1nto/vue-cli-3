import axios from 'axios'
import uuid from './deviceId'
// import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	withCredentials: false,
	timeout: 120000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

let device = uuid.getUUid();

service.interceptors.request.use(
	config => {
		let userInfo = window.localStorage.getItem('userInfo')

		if (device) config.headers["deviceid"] = device;

		if (userInfo) {
			userInfo = JSON.parse(userInfo)
			const token = userInfo.Token
			if (token) {
				config.headers['UserToken'] = token
			}
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		// if (response.headers['content-type'].indexOf('image') > -1) {
		//   if (response.status === 200) {
		//     return response.data
		//   }
		// }
		const res = response.data

		if (!res.Success) {
			let msg = res.Message
			if (!msg) {
				msg = '未知错误'
			}
			// Message.closeAll()
			// Message({
			// 	message: msg,
			// 	type: 'error',
			// 	duration: 5 * 1000
			// })

			return Promise.reject(res)
		}

		return res
	},
	error => {
		let msg = error

		if (error.Message) {
			msg = error.Message
		}

		if (error.response && error.response.data && error.response.data.msg) {
			msg = error.response.data.msg
		}
		if (error.response.status === 401) {
			msg = '请先登录'
			// store.dispatch('user/logout')
			// router.replace('/')
		}
		// Message.closeAll()
		// Message({
		// 	message: msg,
		// 	type: 'error',
		// 	duration: 5 * 1000
		// })

		return Promise.reject(error)
	}
)

export default service

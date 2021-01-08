import request from '@/utils/request'

export function get(params) {
	return request({
		url: '/js/v9/KOLUser/verifymobilevalidcode',
		method: 'GET',
		params
	})
}

export function post(data) {
	return request({
		url: '/api/v9/KOLUser/verifymobile',
		method: 'POST',
		data
	})
}

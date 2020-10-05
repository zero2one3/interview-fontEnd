/*
	1. get()方法
	   参数：url（请求的地址）、data（携带数据）、callback（成功回调函数）、dataType（返回数据类型）
	2. post()方法
	   参数：url（请求的地址）、data（携带数据）、callback（成功回调函数）、dataType（返回数据类型）
	3. ajax()方法
	   参数：obj（对象中包含了各种参数），其中有url、data、dataType、async、type
*/

let $ = {
	createXHR: function() {
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest()
		} else {
			return new ActiveXObject()
		} 
	},
	get: function(url, data, callback, dataType) {
		let dataType = dataType.toLowerCase()
		if(data) {
			url += '?'
			Object.keys(data).forEach(key => url += `${key}=${data[key]}&`)
			url = url.slice(0, -1)
		}
		let xhr = this.createXHR()

		xhr.open('get', url)
		xhr.send()
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
					callback(res, xhr.status, xhr)
				}
			}
		}
	},
	post: function(url, data, callback, dataType) {
		let dataType = dataType.toLowerCase()

		let xhr = this.createXHR()

		let str = ''
		if(data) {
			Object.keys(data).forEach(key => str += `${key}=${data[key]}&`)
			str = str.slice(0, -1)
		}
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.send(str)
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
					callback(res, xhr.status, xhr)
				}
			}
		}
	},
	ajax: function(params) {
		// 初始化参数
		let type = params.type ? params.type.toLowerCase() : 'get'
		let isAsync = params.isAsync ? params.isAsync : 'true'
		let url = params.url
		let data = params.data ? params.data : {}
		let dataType = params.dataType.toLowerCase()

		let xhr = this.createXHR()
		
		let str = ''
		
		// 拼接字符串
		Object.keys(data).forEach(key => str += `${key}=${data[key]}&`)
		str = str.slice(0, -1)
		
		if(type === 'get') url += `?${str}`;

		return new Promise((resolve, reject) => {
			// 创建请求
			xhr.open(type, url, isAsync)

			if(type === 'post') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-rulencoded')
				xhr.send(str)
			} else {
				xhr.send()
			}

			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4) {
					if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
						let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
						resolve(res) // 请求成功，返回数据
					} else {
						reject(xhr.status) // 请求失败，返回状态码
					}
				}
			}
		})	
	}
}
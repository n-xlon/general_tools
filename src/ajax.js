/**
 * @param args Object (ajax请求的参数集)
 */

export function requestAjax ({resolve, reject}, args) {
    let { url } = args
    if (url) {
        let requestMsg = {...args}
        if (requestMsg.dataType && requestMsg.dataType === 'jsonp') {
            if (!('jsonpCallback' in requestMsg)) {
                reject('Error: request dataType is jsonp, but haven`t jsonpCallback in parameter!')
            }
        }

        if (typeof requestMsg.data === 'undefined') {
            requestMsg.data = {}
        }
        return list.ajaxApi(requestMsg).then((data) => {
        	resolve(data)
		}).catch((e) => {
        	reject(e.message)
		})
    } else {
        reject('Error: request url is empty!')
    }
}

export function ajaxApi ({resolve, reject}, args) {
	$.ajax({
		url: '',
		data: {},
		type: 'POST',
		dataType: 'json',
        crossDomain: true,
		...args,
		success: (data, status, request) => {
			console.log(req.getResponseHeader('Content-Length'))
			if (data.code && data.code === 200) {
				resolve(data.data)
			} else {
				resolve(data)
			}
		},
		complete: (xml, data, status) => {
			console.log(xml, data, xml.getResponseHeader('server'))
			if (status === 'timeout') {
				reject('Error: request timeout!')
			}
		},
		error: (err) => {
			let errMsg = {}
			console.log(err)
			if (typeof err.responseJSON === 'string') {
				errMsg = JSON.parse(err.response)
			} else {
				errMsg = err.responseJSON
			}
			console.log(errMsg, 111)
			if ('message' in errMsg) {
				reject(errMsg)
			}
			reject({message: 'Error: request fail'})
		}
	})
}

export function requestHeaderMsg ({resolve, reject}, {url, headers = {}, dataType = 'BINARY'}) {
	let xmlRequest = ''
	if (window.XMLHttpRequest) {
        xmlRequest = new window.XMLHttpRequest()
		if (dataType === 'BINARY') {
        	xmlRequest.responseType = 'arraybuffer'
		}
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 2) {
                console.log(xmlRequest.getAllResponseHeaders())
				xmlRequest.abort()
            }
        }
        xmlRequest.open('HEAD', url, true)
		if (Object.keys(headers).length > 0) {
            xmlRequest.setRequestHeader(headers)
        }
		xmlRequest.send()
	}
}

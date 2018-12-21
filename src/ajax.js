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
        $.ajax({
            url: '',
            data: {},
            type: 'POST',
            dataType: 'json',
            ...requestMsg,
            success: (data) => {
                if (data.code && data.code === 200) {
                    resolve(data.data)
                } else {
                    resolve(data)
                }
            },
            complete: (xml, status) => {
                if (status === 'timeout') {
                    reject('Error: request timeout!')
                }
            },
            error: (err) => {
                let errMsg = {}
                if (typeof err.responseJSON === 'string') {
                    errMsg = JSON.parse(err.response)
                } else {
                    errMsg = err.responseJSON
                }
                if ('message' in errMsg) {
                    reject(errMsg.message)
                }
                reject('Error: request fail')
            }
        })
    } else {
        reject('Error: request url is empty!')
    }
}

/**
 * 分段下载大文件
 * @param url  String  文件下载地址
 * @param partSize  Number  分段下载文件大小
 * @param partFileAddr  String  片段文件存入地址(目录集)
 * @param tmpFileAddr  String  合并后文件地址
 */
export function segmentedDownload ({resolve, reject}, {url, partSize = 1048576, partFileAddr, tmpFileAddr}) {
    return list.ajaxApi({url, dataType: 'BINARY', type: 'HEAD'}).then(async (data) => {
        let fileAllBytes = 0
        let reqHeaders = data
        let partFileList = []
        if (data[contentLength]) {
            fileAllBytes = +data[contentLength]
        }
        if (fileAllBytes !== 0) {
            let partNum = Math.ceil(fileAllBytes / partSize)
            let ext = (url.match(/\.\w+$/) && url.match(/\.\w+$/)[0]) || ''
            if (!ext) {
                if (reqHeaders['content-type']) {
                    let type = reqHeaders['content-type']
                    if (/^image\//.test(type)) {
                        ext = type.match(/\/\w+$/)[0].replace(/\//, '.')
                    } else {
                        switch (type) {
                            case 'audio/mpeg':
                                ext = '.mp3'
                                break
                            case 'audio/wav':
                                ext = '.wav'
                                break
                            case 'video/mp4':
                                ext = '.mp4'
                                break
                        }
                    }
                }
            }
            while (partNum > 0) {
                let partRanges = +partSize * (partNum - 1) + (partNum - 1)
                await list.ajaxApi({
                    url,
                    dataType: 'BINARY',
                    type: 'GET',
                    cache: true,
                    headers: {
                        'Range': `bytes=${partRanges}-${partRanges + partSize}`
                    }
                }).then((data) => {
                    if (data.responseHeaders[status] && +data.responseHeaders[status] === 206) {
                        let fileAddr = `${partFileAddr}/df_${partRanges + partSize}_${Date.now()}${ext}`
                        list.writeFile(fileAddr, data.response).then(() => {
                            partFileList.push(fileAddr)
                        }).catch((e) => {
                            throw new Error(e)
                        })
                    }
                })
                partNum -= 1
            }
            return list.combineFile({souceFiles: partFileList, targetFiles: partFileList}).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
        }
    })
}
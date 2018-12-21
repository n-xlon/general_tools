/**
 * 合并文件
 */

export function fileIsExists ({fs, promise}, {path}) {
    console.log(fs)
    fs.exists(path, (status) => {
        promise.resolve(status)
    })
}

export function combineFile ({fs, promise}, {souceFiles = [], targetFiles}) {
    let writeStream = fs.createWriteStream(targetFiles)
    if (Array.isArray(souceFiles)) {
        souceFiles.forEach((it) => {
            fs.exists(it, (status) => {
                if (status) {
                    fs.stat(it, (err, stats) => {
                        if (stats.isFile()) {
                            let readStream = fs.createReadStream(it)
                            let data = ''
                            readStream.setEncoding('utf8')
                            readStream.on('data', (content) => {
                                data += content
                            })
                            readStream.on('end', () => {
                                console.log(data)
                                writeStream.write(data)
                            })
                        } else {
                            promise.reject('error file format!')
                        }
                    })
                } else {
                    promise.reject()
                }
            })
        })
    }
}
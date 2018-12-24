/**
 * 合并文件
 */

export function fileIsExists ({fs, promise}, {path}) {
    console.log(fs)
    fs.exists(path, (status) => {
        promise.resolve(status)
    })
}

export function combineFile ({fs, resolve, reject}, {souceFiles = [], targetFiles}) {
    // let writeStream = fs.createWriteStream(targetFiles)
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
                                fs.appendFile(targetFiles, data, (err) => {
                                    if (err) {
                                        throw new Error(err)
                                    }
                                })
                            })
                        } else {
                            reject('error file format!')
                        }
                    })
                } else {
                    reject('Error: file isn`t exist!')
                }
            })
        })
        resolve()
    }
}

/**
 * 异步写文件
 * @param filePath  String  文件全路径
 * @param fileContent  String  文件写入的内容
 */
export function writeFile ({resolve, reject}, {filePath, fileContent}) {
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            reject('Error: write file fail!')
        }
        resolve({status: true})
    })
}

/**
 * 文件属性（字节数，后缀名，文件类型...)
 */
export function fileStat () {

}
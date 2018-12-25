const fs = require('fs')
const http = require('http')
const url = require('url')

// console.log(process, fs)

http.createServer(function (req, res) {
    let hostName = req.headers.hostname
    let pathName = url.parse(req.url).pathname
    if (pathName === '/') {
        readFileAndResponse('./index.html', res)
    }
}).listen(3000)

function readFileAndResponse (fileName, response) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            response.writeHead(404)
            response.end('not such file!')
        } else {
            response.end(data)
        }
    })
}

module.exports = {
    fs
}
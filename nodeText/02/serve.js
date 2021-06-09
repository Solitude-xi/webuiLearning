// 创建 http
var http = require('http')

// 创建 http 服务
var server = http.createServer()

// 创建响应
server.on('request', function (req, res) {
    var url = req.url
    if (url === '/') {
        res.setHeader('content-Type', 'text/html text/css; charset=utf-8');
        res.end('这是首页')
    } else {
        res.setHeader('content-Type', 'text/html text/css; charset=utf-8');
        res.end('404 Not Fount')
    }
})

// 创建监听
server.listen(80, function () {
    console.log('服务器启动成功')
})
// 创建 http 服务
var http = require('http');

// 创建 fs文件
var fs = require('fs');

// 创建 http 服务
var server = http.createServer();

// 创建 http 监听
server.on('request', function (req, res) {

	if (req.url === '/') {
		// 链接网页
		fs.readFile('./add.html', function (err, data) {
			if (err) {
				console.log('读取文件失败');
			} else {
				console.log('读取文件成功');
				res.setHeader('content-Type', 'text/html text/css; charset=utf-8');
				res.end(data);
			}
		});
	} else {
		res.end('404 Not Found');
	}
});
server.listen(80, function () {
	console.log('服务器启动成功，可以访问');
});
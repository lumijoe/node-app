// list2-1(p56)1106
// app.js

// httpを用意
const http = require('http');
// サーバーを用意
var server = http.createServer(
    (request,response) => {
        response.end('Hello Node.js!');
    }
);
// 待ち受け開始
server.listen(3000);

// list2-5(p77)1107
// app.js

/* 
1: require
    モジュールがロードされて変数（定数）にオブジェクトとして設定=httpというモジュール名を用意
2: createServer
    メソッドでサーバーオブジェクトを作成
    -c要求→s, s返信→c アクセスされると実行される処理
    -返信する.終了する(内容を表示)
3: listen
    待ち受け開始
*/

const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request, response) => {
        fs.readFile('./index.html', 'UTF-8',
            (error, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            })
    }
);

server.listen(3000);
// 起動実行の視覚化
console.log('Server start!');
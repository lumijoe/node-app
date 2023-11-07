// list2-2(p67)1107
// app.js

/* 
1: モジュールがロードされて変数（定数）にオブジェクトとして設定=httpというモジュール名を用意
2: createServerメソッドでサーバーオブジェクトを作成
    -c要求→s, s返信→c アクセスされると実行される処理
    -返信する.終了する(テキスト部分を表示)
3: 待ち受け開始
*/

const http = require('http');

var server = http.createServer(
    (request, response) => {
        response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>');
    }
);

server.listen(3000);
// list2-1(p56)1106,1107
// app.js

// モジュールがロードされて変数（定数）にオブジェクトとして設定=httpというモジュール名を用意
const http = require('http');
// createServerメソッドでサーバーオブジェクトを作成
var server = http.createServer(
    // c要求→s, s返信→c アクセスされると実行される処理
    (request, response) => {
        // 返信する.終了する(テキスト部分を表示)
        response.end('Hello Node.js!');
    }
);
// 待ち受け開始
server.listen(3000);


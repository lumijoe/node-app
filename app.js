// list2-3(p70)1107
// app.js

/* 
1: モジュールがロードされて変数（定数）にオブジェクトとして設定=httpというモジュール名を用意
2: createServerメソッドでサーバーオブジェクトを作成
    -c要求→s, s返信→c アクセスされると実行される処理
    -返信する.終了する(内容を表示)
3: 待ち受け開始
*/

const http = require('http');

var server = http.createServer(
    (request, response) => {
        response.setHeader('Content-Type', 'text/html');

        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js!</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです。</p>', 'utf8');
        response.write('</body></html>');

        response.end('');
    }
);

server.listen(3000);
console.log('Server start!');
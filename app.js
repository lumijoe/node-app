// list2-8(p88)1108
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
const ejs = require('ejs');
const path = require('path'); // Vercelデプロイ用

// ファイルから読み込む処理をバックグラウンドで実行する非同期処理、readFileメソッド
const indexFilePath = path.join(__dirname, 'index.ejs');
const index_page = fs.readFileSync(indexFilePath, 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {
    var content = ejs.render(index_page);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
}

// 11081620 nodev18.16.1 
// 11081641 nodev14.2.0


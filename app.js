// list2-16(p104)1110
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
const url = require('url');

// ファイルから読み込む処理をバックグラウンドで実行する非同期処理、readFileメソッド
// 各種ファイルの読み込み
const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8'); // ★追加
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname) {

        case '/':
            var content = ejs.render(index_page, {
                title:"Index",
                content:"これはIndexページです。",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/other': // ★追加
            var content = ejs.render(other_page, {
                title:"Other",
                content:"これは新しく用意したページです。",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('no page...');
            break;
    }   
}

// 11081620 nodev18.16.1 
// 11081641 nodev14.2.0


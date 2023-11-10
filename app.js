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
const fs = require('fs').promises;
const ejs = require('ejs');
const url = require('url');

// ファイルから読み込む処理をバックグラウンドで実行する非同期処理、readFileメソッド
// 各種ファイルの読み込み
const readIndexPage = fs.readFile('./index.ejs', 'utf-8');
const readOtherPage = fs.readFile('./other.ejs', 'utf-8');
const readStyleCss = fs.readFile('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

// 開発環境でのPORT3000サーバー指定、デプロイでのVercelサーバー指定をパイプさせる
server.listen(process.env.PORT || 3000);
console.log('Server start!');

// ここまでメインプログラム========

// createServerの処理
async function getFromClient(request, response) {
    var url_parts = url.parse(request.url);
    let content;

    switch (url_parts.pathname) {
        case '/':
            const indexPage = await readIndexPage;
            content = ejs.render(indexPage, {
                title: "Index",
                content: "これはIndexページです。",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/other':
            const otherPage = await readOtherPage;
            content = ejs.render(otherPage, {
                title: "Other",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('no page...');
            response.end();
            break;
    }
}

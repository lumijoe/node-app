// list3-3(p116)1114
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

// app.js 
const http = require('http');
const fs   = require('fs');
const ejs  = require('ejs');
const url  = require('url');
const qs   = require('querystring'); // ★追加

// ファイルから読み込む処理をバックグラウンドで実行する非同期処理、readFileメソッド
// 各種ファイルを読み込むfs.readFileSync
const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

// 開発環境でのPORT3000サーバー指定、デプロイでのVercelサーバー指定をパイプさせる
// server.listen(process.env.PORT || 3000);
server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {

    var url_parts = url.parse(request.url, true); // ★trueに

    switch (url_parts.pathname) {

        case '/':
            response_index(request, response); // ★修正
            break;

        case '/other':
            response_other(request, response); // ★修正
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write('style_css');
            response.end();
            break;
        
        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

// ★indexのアクセス処理
function response_index(request, response) {
    var msg = "これはIndexページです。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// ★otherのアクセス処理
function response_other(request, response) {
    var msg = "これはotherページです。"

    // POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body); // ★データのパス
            msg += 'あなたは、「' + post_data.msg + '」と書きました。';
            var content = ejs.render(other_page, {
                title: "Other",
                content: msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });

    // GETアクセス時の処理
    } else {
        var msg = "ページがありません。"
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}
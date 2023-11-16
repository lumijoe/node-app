// list3-14(p137)1115
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
// server.listen(process.env.PORT || 3002);
server.listen(3002);
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

// 追加するデータ用変数
var data = {
    'Taro': '09-999-999',
    'Hanako': '080-888-888',
    'Sachiko': '070-777-777',
    'Ichiro': '060-666-666',
};

var data2 = {
    'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
    'Hanako': ['hanako@flower', '080-888-888', 'Yokohama'],
    'Sachiko': ['sachi@happy', '070-777-777', 'Nagoya'],
    'Ichiro': ['ichi@baseball', '060-666-666', 'USA'],
};  

// ★indexのアクセス処理

var data = { msg: 'no message...' };

function response_index(request, response) {
    // POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', () => {
            data = qs.parse(body);  // ★データのパース
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}
/* list3−14（p137）1115実装でコメントアウト
    var msg = "これはIndexページです。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        filename: 'data_item' // ★追記
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
*/

// indexの表示の作成
function write_index(request, response) {
    var msg = "※伝言を表示します。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// otherのアクセス処理
function response_other(request, response) {
    var msg = "これはOtherページです。"
    var content = ejs.render(other_page, {
      title: "Other",
      content: msg,
      data: data2,
      filename: 'data_item'
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

/* list3−12（p134）1115実装でコメントアウト
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
*/
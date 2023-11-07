// list2-3(p70)1107
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

var server = http.createServer(
    (request, response) => {
        // ヘッダー項目を設定するメソッド（コンテンツ種類, テキストタイプでhtml形式）
        response.setHeader('Content-Type', 'text/html');
        // 情報の出力をwriteで区切る事も可能
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js!</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです。</p>', 'utf8');
        response.write('</body></html>');
        // endで終了する
        response.end('');
    }
);

server.listen(3000);
// 起動実行の視覚化
console.log('Server start!');
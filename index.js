// 署名を検証
// const crypto = require('crypto');
//     //チャンネルシークレットを秘密鍵として、HMAC-SHA256を使用しリクエストボディのダイジェスト値を取得
// const channelSecret = process.env.LINE_CHANNEL_SECRET;
// const body = '...';
//     //ダイジェスト値をBase64エンコードした値と、リクエストヘッダーのx-line-signatureに含まれる署名が一致することを確認
// const signature = crypto
//     .createHmac('SHA156', channelSecret)
//     .update(body).digest('base64');

// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const { application } = require("express");
const { append, json } = require("express/lib/response");

// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, //環境変数からアクセストークンをセット
    channelSecret: process.env.LINE_CHANNEL_SECRET //環境変数からチャンネルシークレットをセット
};

// リッチメニュー
const richmenu_function = require('./richmenus/richmenu.js');
richmenu_function.richmenu_make();
richmenu_function.richmenu_image();

// webサーバー設定
server.listen(process.env.PORT || 80);

// ルーター設定
// https://[アプリ名].herokuapp.com/bot/webhookでアクセスすると実行する関数
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});
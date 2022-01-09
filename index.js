// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, //環境変数からアクセストークンをセット
    channelSecret: process.env.LINE_CHANNEL_SECRET //環境変数からチャンネルシークレットをセット
};

// webサーバー設定
server.listen(process.env.PORT || 80);

// ルーター設定
// https://[アプリ名].herokuapp.com/bot/webhookでアクセスすると実行する関数
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});
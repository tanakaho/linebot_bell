// 署名を検証
// const crypto = require('crypto');
//     //チャンネルシークレットを秘密鍵として、HMAC-SHA256を使用しリクエストボディのダイジェスト値を取得
// const channelSecret = process.env.LINE_CHANNEL_SECRET;
// const body = '...';
//     //ダイジェスト値をBase64エンコードした値と、リクエストヘッダーのx-line-signatureに含まれる署名が一致することを確認
// const signature = crypto
//     .createHmac('SHA156', channelSecret)
//     .update(body).digest('base64');

// グローバル設定
const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

// ミドルウェアの設定
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// ルーティングの設定
app.get("/", (req, res) => {
    res.sendStatus(200)
})

// 指定されたパスへのHTTP POSTリクエストをルーティング
app.post("/webhook", function(req, res) {
    res.send("HTTP POST request sent to the webhook URL!")
    // メッセージ
    if (req.body.events[0].type === "message") {
        // 文字列化したメッセージデータ
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "test",
                    "text": "Hello, user"
                },
                {
                    "type": "text",
                    "text": "May I help you?"
                }
            ]
        })
        // リクエストヘッダー
        const headers = {
            "Contest-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }
        // リクエストに渡すオプション
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }
        // リクエストの定義
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })
        // エラーハンドル
        request.on("error", (err) => {
            console.error(err)
            })
        // データを送信
        request.write(dataString)
        request.end()
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})



const server = require("express")()
const line = require("@line/bot-sdk") // Messaging APIのSDKをインポート





// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, //環境変数からアクセストークンをセット
    channelSecret: process.env.LINE_CHANNEL_SECRET //環境変数からチャンネルシークレットをセット
};

// リッチメニュー
// const richmenu_image = require('./richmenus/image_upload')
// const richmenu_function = require('./richmenus/richmenu.js')
// richmenu_function.richmenu_make()
// richmenu_image.richmenu_image()
// richmenu_function.richmenu_defult()

// メッセージ
const message_function = require('./message/helloword.js')
message_function.helloword()

// webサーバー設定
server.listen(process.env.PORT || 1212);

// ルーター設定
// https://[アプリ名].herokuapp.com/bot/webhookでアクセスすると実行する関数
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});
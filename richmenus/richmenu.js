const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 80
const line = require('@line/bot-sdk')

const client = new line.Client({
    channelAccessToken:process.env.LINE_ACCESS_TOKEN
})

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// リッチメニュー作成
exports.richmenu_make = () => {
    app.post("/webhook", function(req, res) {
        res.send("HTTP POST request sent to the webhook URL!")
        const richmenu = {
            size:{
                width: 2500,
                heigth: 1686
            },
        };
        // リクエストヘッダー
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + client
        };
        // リクエストに渡すオプション
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/richmenu",
            "method": headers,
            "body": richmenu
        };
        // リクエストの定義
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            });
        });
        // エラーハンドリング
        request.on("error", (err) => {
            console.error(err)
        });
        // データを送信
        request.write(dataString);
        request.end();

        line.Client.createRichMenu(richmenu)
            .then((richMenuId) =>
            console.log(richMenuId));
    });
}


// デフォルトに設定
exports.richmenu_defult = () => {
    app.post("/webhook", function(req, res) {
        res.send("HTTP POST request sent to the webhook URL!")
        const richmanu_def = client.setDefaultRichMenu(richMenuId);
        // リクエストヘッダー
        const headers = {
            "Authorization": "Bearer " + client
        };
        // リクエストに渡すオプション
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/user/all/richmenu/" + richMenuId,
            "method": headers,
            "body": richimage
        };
        // リクエストの定義
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            });
        });
        // エラーハンドリング
        request.on("error", (err) => {
            console.error(err)
        });
        // データを送信
        request.write(dataString);
        request.end();
    });
}


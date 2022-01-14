const line = require('@line/bot-sdk');
const { application } = require('express');

const client = new line.Client({
    channelAccessToken:process.env.LINE_ACCESS_TOKEN
});

app.post("/webhook", function (req, res) {
    res.send("HTTP POST request sent to the webhook URL!")
    if(req.body.event[0].type === "message") {
        //文字列化したメッセージデータ
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "text",
                    "text": "Hello, user"
                },
                {
                    "type": "text",
                    "text": "Hello word"
                }
            ]
        })
        //リクエストヘッダー
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + client
        }
        //リクエストに渡すオプション
        const webhookOptions ={
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }
        //リクエストの定義
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })
        //エラーハンドル
        request.on("error", (err) => {
            console.error(err)
        })
        //データを送信
        request.write(dataString)
        request.end()
    }
})
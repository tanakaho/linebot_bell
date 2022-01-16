const https = require("https")
// const line = require('@line/bot-sdk')
const express = require("express")
const app = express()
app.listen(process.env.PORT || 3000)
const client = new line.Client({
    channelAccessToken:process.env.LINE_ACCESS_TOKEN
});

const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, //環境変数からアクセストークンをセット
    channelSecret: process.env.LINE_CHANNEL_SECRET //環境変数からチャンネルシークレットをセット
};

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
    })

exports.helloword = () => {
app.post("/bot/webhook", function (req, res) {
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
}

app.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});
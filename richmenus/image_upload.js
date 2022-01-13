const line = require('@line/bot-sdk');

const client = new line.Client({
    channelAccessToken:process.env.LINE_ACCESS_TOKEN
});

// リッチメニューの画像アップロード
exports.richmenu_image = () => {
    app.post("/webhook", function(req, res) {
        res.send("HTTP POST request sent to the webhook URL!")
        const richimage = client.setRichMenuImage(richMenuId, fs.createReadStream('./richImage.png'))
        // リクエストヘッダー
        const headers = {
            "Content-Type": "image/png",
            "Authorization": "Bearer " + client
        };
        // リクエストに渡すオプション
        const webhookOptions = {
            "hostname": "api-data.line.me",
            "path": "/v2/bot/richmenu/"+ richMenuId +"/content",
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

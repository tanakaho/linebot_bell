const cAccessToken = process.env.LINE_ACCESS_TOKEN;

//リッチメニュー作成
exports.richmenu_function = () => {
app.post("/webhook", function(req, res) {
    res.send("https://api.line.me/v2/bot/richmenu")
    const richmenu = {
        size:{
            width: 2500,
            heigth: 1686
        },
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cAccessToken
    }
})

line.Client.createRichMenu(richmenu)
    .then((richMenuId) =>
    console.log(richMenuId))
}
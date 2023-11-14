const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { exec } = require("child_process");

// CORS ミドルウェアを使用
app.use(cors());

// 動的に変更したいハッシュタグ
let hashtagValue = "福岡グルメ";

app.use(express.json());

// ハッシュタグを変更するエンドポイント
app.post("/changeHashtag", (req, res) => {
  const newHashtag = req.body.newHashtag;
  if (newHashtag) {
    // サニタイズやバリデーションを実施すべき
    hashtagValue = newHashtag;
    console.log("ifの中通りました");
    res.json({
      message: "ハッシュタグが変更されました",
      newHashtag: hashtagValue,
    });
  } else {
    res.status(400).json({ error: "無効なハッシュタグ" });
  }
  console.log(hashtagValue);
});

// ハッシュタグを使用してコードを実行
app.get("/runcode", (req, res) => {
  exec(
    `python C:/xampp/htdocs/TIKSearch/TikSearch/python/hashtag_example.py --hashtag ${hashtagValue}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("エラー: ", error);
        res.status(500).json({ error: "内部エラーが発生しました" });
      } else {
        const pythonOutput = Buffer.from(stdout, "utf8").toString();
        const addressLines = pythonOutput.trim().split("\n");
        const addresses = addressLines.map((line) => line.replace(/\r/g, ""));
        res.json({ addresses });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

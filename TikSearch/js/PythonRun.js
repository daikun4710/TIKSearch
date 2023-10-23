const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); // cors パッケージをインポート

const { exec } = require('child_process');

// CORS ミドルウェアを使用
app.use(cors());

app.get('/runcode', (req, res) => {
  exec('python ../../python/hashtag_example.py', (error, stdout, stderr) => {
    if (error) {
      res.status(500).send('Python script execution failed');
    } else {
        // Pythonスクリプトの出力を指定エンコーディングでデコード
        const pythonOutput = Buffer.from(stdout, 'utf8').toString();
        // 出力を行ごとに分割
        const addressLines = pythonOutput.trim().split('\n');
        const addresses = [];

        // 住所が含まれる行を抽出
        addressLines.forEach((line) => {
        if (line.includes('〒')) {
            addresses.push(line.replace(/\r/g, '')); // /r を取り除く
        }
        });
        // Pythonスクリプトの出力をクライアントに JSON 形式で返す
        res.json({ addresses });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

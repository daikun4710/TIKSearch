const { exec } = require('child_process');

// Pythonスクリプトを呼び出す関数
function callPythonScript() {
  return new Promise((resolve, reject) => {
    exec('python hashtag_example.py', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Pythonスクリプトを実行し、結果を受け取る
async function getFullAddress() {
  try {
    const pythonOutput = await callPythonScript();
    // Pythonスクリプトの出力を指定エンコーディングでデコード
    const decodedOutput = Buffer.from(pythonOutput, 'utf8').toString();

    // 出力を行ごとに分割
    const addressLines = decodedOutput.trim().split('\n');
    const addresses = [];

    // 住所が含まれる行を抽出
    addressLines.forEach((line) => {
      if (line.includes('〒')) {
        addresses.push(line.replace(/\r/g, '')); // /r を取り除く
      }
    });

    console.log('Full Addresses:', addresses);
  } catch (error) {
    console.error('Error calling Python script:', error);
  }
}

getFullAddress();

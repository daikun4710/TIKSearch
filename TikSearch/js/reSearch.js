// モバイル値取得
function loadValueGetMb() {
  const selectElement = document.getElementById('placeMb');
  const categorySelect = document.getElementById("categoryMb");
  startReLoading(selectElement,categorySelect);
}
// 値取得
function loadValueGet() {
  const selectElement = document.getElementById('place');
  const categorySelect = document.getElementById("category");
  startReLoading(selectElement,categorySelect);
}
function startReLoading(selectElement,categorySelect) {
    // 実行中画面を半透明に
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.style.display = 'block';
    // let selectElement = document.getElementById('place');
    
    // 選択されたオプションのインデックスを取得
    let selectedIndex = selectElement.selectedIndex;
    
    // 選択されたオプションの値を取得
    let selectedValue = selectElement.options[selectedIndex].value;
    
    // 取得した値を出力（例: コンソールログ）
    console.log('選択された県の値は: ' + selectedValue);

    // const categorySelect = document.getElementById("category");
    let combinedValue = "";
    const selectedCategory = categorySelect.value;
    console.log(selectedCategory);
    // 選択された県とカテゴリを結合
    combinedValue = selectedValue + selectedCategory;
    console.log(combinedValue);
    document.getElementById('loadingMessage').style.display = 'block';

    // テキストボックスの値をサーバーに送信してハッシュタグを変更
    fetch("http://localhost:3000/changeHashtag", {
      method: "POST", // POST リクエストを送信
      headers: {
        "Content-Type": "application/json",
        // 他の必要なヘッダーがあれば追加
      },
      body: JSON.stringify({ newHashtag: combinedValue }), // リクエストボディにデータを送信
    })
      .then((response) => response.json())
      .then((data) => {
        // 最初のfetchリクエストが完了した後に実行されるコード
        // alert(data.message);

        console.log("起動中です");
        // 2つめのfetchリクエストを実行
        // statusElement.textContent = 'API呼び出し成功。処理中...';
        return fetch("http://localhost:3000/runcode");
      })
      .then((response) => response.json())
      .then((data) => {
        // 2つめのfetchリクエストが完了した後に実行されるコード
        addresses = data; // サーバーからのデータをJavaScriptの配列として直接取得
        // console.log("Addresses:", addresses);
        localStorage.removeItem("Addresses");
        localStorage.setItem("Addresses", JSON.stringify(addresses));
        location.href = window.location.href;
        document.getElementById('loadingMessage').style.display = 'none';
      })
      .catch((error) => {
        console.error("Error:", error);
      });
     
    }
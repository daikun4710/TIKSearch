function startLoading() {
    const Select = document.getElementById("select");
    const subSelect = document.getElementById(Select.value);
    const categorySelect = document.getElementById("category");
    // const checkBox = document.getElementById("foo");
    let combinedValue = "";
    let bool = "";
    if(Select.value === "" || categorySelect.value === "" ){
      alert("カテゴリまたは場所を選択して下さい");
      bool = "false";
    }else if(subSelect.value !== ""){
      const selectedsub = subSelect.value;
      const selectedCategory = categorySelect.value;
      // 選択された県とカテゴリを結合
      combinedValue = selectedsub + selectedCategory;
      console.log(combinedValue);
      bool = "true";
    }else{
      alert("地域を選択してください");
      bool = "false";
    }

    if(bool == "true"){
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
     }
    }
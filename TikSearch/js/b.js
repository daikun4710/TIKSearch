var map = L.map('map').setView([38.2048, 138.2529], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
var address = "東京都墨田区押上１丁目１−２"; // 住所を指定
var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + address;

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log("緯度: " + lat + ", 経度: " + lon);

        // 緯度経度を地図上に表示する
        L.marker([lat, lon]).addTo(map);
    })
    .catch(function(error) {
        console.error("ジオコーディングエラー: " + error);
    });

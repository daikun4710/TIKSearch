// ジオコーディング用のAPIキー（OpenCage Geocoding APIの例）
var apiKey = 'fc57f504124644ca843e0f4c2f85ad7c';

// 複数の住所を指定
var addresses = ['博多駅', '福岡県福岡市中央区天神２−１００４', 'ららぽーと福岡'];

var map = L.map('map').setView([38.2048, 138.2529], 5);
//画面のページによって大きさ変化
window.addEventListener('resize', function () {
    map.invalidateSize();
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 各住所をジオコーディングしてマーカーを地図に追加
addresses.forEach(function (address) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.results.length > 0) {
                var result = data.results[0];
                var latitude = result.geometry.lat;
                var longitude = result.geometry.lng;

                // マーカーを地図に追加
                L.marker([latitude, longitude]).addTo(map)
                //マーカの詳細    
                .bindPopup(address)
                    .openPopup();
            }
        })
         // ユーザーの現在位置を取得
 if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // マーカーを追加して現在位置を表示
        L.marker(userLocation).addTo(map)
            .bindPopup("現在の位置")
            .openPopup();
        
        // マップをユーザーの位置に移動
        map.setView(userLocation,13);
    }, function(error) {
        console.error("位置情報を取得できませんでした。エラー: " + error.message);
    });
} else {
    console.error("このブラウザは位置情報をサポートしていません。");
}
});
    

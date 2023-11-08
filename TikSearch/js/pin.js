var map = L.map('map').setView([51.505, -0.09], 13); // デフォルトの座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// ユーザーの現在地を取得
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);

        // ピンの座標を設定
        var pins = [
            L.latLng(51.505, -0.09), // ピン1の座標
            L.latLng(51.51, -0.09),  // ピン2の座標
            L.latLng(51.52, -0.1)    // ピン3の座標
        ];

        // ルート計算用のコントロールを作成
        L.Routing.control({
            waypoints: [currentLocation].concat(pins), // 出発点（現在地）と目的地ピンの座標
        }).addTo(map);

        // ピンを地図に追加
        pins.forEach(function(pin) {
            L.marker(pin).addTo(map);
        });
    });
} else {
    alert("Geolocationがサポートされていません。");
}

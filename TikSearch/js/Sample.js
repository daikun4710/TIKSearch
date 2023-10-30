// Leaflet Map
var map = L.map('map').setView([0, 0], 13); // 初期の地図の中心座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 現在地を取得
navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);

    // マーカーを追加
    L.marker(currentLocation).addTo(map)
        .bindPopup("現在の位置：" + currentLocation.lat + ", " + currentLocation.lng)
        .openPopup();

    // マップを現在地にセンタリング
    map.setView(currentLocation, 13);
});

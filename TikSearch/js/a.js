var map = L.map('map').setView([51.505, -0.09], 13); // デフォルトの座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 出発点と目的地の座標を設定
var startPoint = L.latLng(51.505, -0.09); // 出発点の座標
var endPoint = L.latLng(51.51, -0.1);    // 目的地の座標

// 出発点と目的地にピンを立てる
L.marker(startPoint).addTo(map).bindPopup("出発点");
L.marker(endPoint).addTo(map).bindPopup("目的地");

// ルート計算用のコントロール
L.Routing.control({
    waypoints: [startPoint, endPoint],
}).addTo(map);

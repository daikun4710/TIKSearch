// Leaflet Map
var map = L.map('map').setView([35.682839, 139.759455], 13); // 初期の地図の中心座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
// 現在地を取得
navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);

   
// マーカーを追加
var marker1 = L.marker([currentLocation.lat, currentLocation.lng]).addTo(map); // ピン1の緯度経度
var marker2 = L.marker([35.655464, 139.745693]).addTo(map); // ピン2の緯度経度

// ルート計画を作成
L.Routing.control({
    waypoints: [
        L.latLng(currentLocation.lat, currentLocation.lng), // ピン1の緯度経度
        L.latLng(35.655464, 139.745693)  // ピン2の緯度経度
    ],
    routeWhileDragging: true,
}).addTo(map);

// マップをルートに合わせてセンタリング
var bounds = L.latLngBounds([marker1.getLatLng(), marker2.getLatLng()]);
map.fitBounds(bounds);
});

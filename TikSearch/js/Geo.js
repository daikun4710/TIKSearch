// Leaflet Map
var map = L.map('map').setView([0, 0], 13); // 初期の地図の中心座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// ジオコーディングサービスの設定
var geocoder = L.Control.Geocoder.nominatim();

// 現在地を取得
navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);

    // マーカーを追加
    L.marker(currentLocation).addTo(map);

    // ルート計画を作成
    var control = L.Routing.control({
        waypoints: [
            L.Routing.waypoint(currentLocation), // 現在地を出発点とする
            L.Routing.waypoint([35.682839, 139.759455]), // 例: 目的地1の緯度経度
            L.Routing.waypoint([35.655464, 139.745693]) // 例: 目的地2の緯度経度
        ],
        routeWhileDragging: true,
    }).addTo(map);

    // マップを現在地にセンタリング
    map.setView(currentLocation, 13);
});

var map = L.map('map').setView([38.2048, 138.2529], 5); // 初期の地図の中心座標とズームレベル

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// マップ上に現在位置のピンを表示
var currentLocationMarker = L.marker([0, 0]).addTo(map);
currentLocationMarker.bindPopup("現在の位置");

// 現在位置を取得
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var currentLat = position.coords.latitude;
        var currentLng = position.coords.longitude;
        currentLocationMarker.setLatLng([currentLat, currentLng]).update();

        // 目的地の住所のリスト
        var destinationAddresses = ['東京駅, 東京, 日本', '京セラドーム, 大阪, 日本','首里駅,沖縄,日本'];

        // 目的地ごとにルートを計算して表示
        destinationAddresses.forEach(function(destinationAddress) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destinationAddress}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        var destinationLat = data[0].lat;
                        var destinationLng = data[0].lon;

                        L.Routing.control({
                            waypoints: [
                                L.latLng(currentLat, currentLng),
                                L.latLng(destinationLat, destinationLng)
                            ],
                            routeWhileDragging: true
                        }).addTo(map);
                    }
                });
        });
    });
}

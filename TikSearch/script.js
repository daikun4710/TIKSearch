var map; // マップオブジェクトをグローバル変数として宣言

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // マップの初期中心座標
        zoom: 12 // マップの初期ズームレベル
    });

    var currentLocationButton = document.getElementById('currentLocationButton');

    // 現在地ボタンのクリックリスナーを追加
    currentLocationButton.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // マップの中心を現在地に移動
                map.setCenter(currentLocation);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
}

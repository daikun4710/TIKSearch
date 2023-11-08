// Google Maps JavaScript APIの読み込み
function initMap() {
    // マップの中心座標を指定
    var mapCenter = { lat: 37.7749, lng: -122.4194 }; // 例: サンフランシスコの座標

    // マップを表示する要素を取得
    var mapElement = document.getElementById('map');

    // マップオブジェクトの作成
    var map = new google.maps.Map(mapElement, {
        center: mapCenter, // マップの中心座標
        zoom: 12 // ズームレベル
    });

    // マーカーの追加
    var marker = new google.maps.Marker({
        position: mapCenter, // マーカーの座標
        map: map,
        title: 'サンフランシスコ' // マーカーのタイトル
    });
}

var postalCode = "812-0012"; // 郵便番号を指定
var apiKey = "5d2d24546dcc42adb9010a69bed463ad"; // OpenCage Geocoding APIのAPIキー

fetch(`https://api.opencagedata.com/geocode/v1/json?q=postal_code:${postalCode}&key=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.results.length > 0) {
            var result = data.results[0];
            var placeName = result.formatted;
            console.log("場所の名前: " + placeName);
        } else {
            console.log("場所が見つかりませんでした");
        }
    })
    .catch(function (error) {
        console.error('ジオコーディングエラー:', error);
    });

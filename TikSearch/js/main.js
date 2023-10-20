const btn = document.getElementById("mapper");
btn.addEventListener("click", e => {
    if (navigator.geolocation) {
        //Geolocation APIを利用できる環境向けの処理
        const navi = navigator.geolocation;
        navi.getCurrentPosition((pos) => {
            const latlng = `${pos.coords.latitude},${pos.coords.longitude}`;
            
            //location.href = `https://www.google.com/maps/dir/?api=1&origin=${latlng}&destination=東京駅`;
            location.href= `https://www.google.com/maps/dir/?api=1&origin=${latlng}&destination=札幌ドーム`;
            location.href= `https://www.google.com/maps/dir/?api=1&origin=${latlng}&destination=東京ドーム`;
            //const link = `https://www.google.com/maps/dir/?api=1&origin=${latlng}`;

           // const anchor = document.createElement("a");
            //anchor.text = "GoogleMapで経路を見る"
            //anchor.target = "_blank";
            //anchor.href = link;
            
            //document.body.appendChild(anchor);
        });
    } else {
        //Geolocation APIを利用できない環境向けの処理
    } 
});


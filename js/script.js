$(document).ready(() => {
    $(".weatherContainer").css("display", "none");
});
$("#mainLogo").on("click", () => {
    window.location.reload();
});
/*Requesting current latitude and longitude.👇*/
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, () => {
        showAlert("<img src='https://media.giphy.com/media/nh9k1qzeLf99S/giphy.gif'>", "Location permission is required!", "error")
    });
} else {
    new swal("Error", "Geo location isn't supported by your browser!!", "error");
}

function successCallback(position) {
    /*Getting current latitude and longitude.*/
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    fetchCurrentData(latitude, longitude);

}

function fetchCurrentData(p1, p2) {
    var res = fetch("https://api.weatherapi.com/v1/current.json?key=930b591bc591480f9b583028231405&q=" + p1 + "," + p2)
    res.then((res) => {
        var data = res.json();
        data.then((json) => {
            $(".weatherContainer").css("display", "flex");
            $("#cityName").append("<h1>" +"🗺️ Seems like you are in "+"<mark>"+json.location.name+"</mark>"+json.location.country+".</h1>")
            $(".weatherDetails").append("<h1 class='commonText weatherText'>"+"Current Tempreature :   "+json.current.temp_c +"℃  |   "+  json.current.temp_f +"℉</h1><br><br>");
            $(".weatherDetails").append("<img class='weatherIcon' src="+json.current.condition.icon+" ><br><br>");
            $(".weatherDetails").append("<h1 class='commonText weatherText'>"+"Current Condition :   "+json.current.condition.text+"</h1><br><br>");
            $(".weatherDetails").append("<h1 class='commonText weatherText'>Humidity : "+json.current.humidity+"</h1><br><br>")
            fetchImage(json.location.country);
            /*Adding 500px to the current scroll position.*/
            $(window).scrollTop($(window).scrollTop() + 500);


        });
        data.catch((er) => {
            new swal("Error", "Something went wrong! " + er, "error");
        })
    })
    res.catch((er) => {
        new swal("Error", "Something went wrong! " + er, "error");
    })

}

$("#textField").on("keydown", (event) => {
    if (event.key == "Enter") {


    }

})

function showAlert(title, msg, icon) {
    new swal({
        title: title,
        text: msg,
        icon: icon,
        customClass: "commonText"
    });


}

function fetchImage(country){
    let image = fetch("https://api.unsplash.com/search/photos?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&order_by=relavent&page=100&query="+country)
    image.then((response)=>{
        myJson = response.json();
        myJson.then((finalResult)=>{
            var randomIndex = Math.floor(Math.random() * finalResult.results.length); // Generate a random index within the range of the array
            $("body").css("background-image","url("+finalResult.results[randomIndex].urls.full)+")";

        });
        myJson.catch((error)=>{
            showAlert("Error","Something went wrong! "+error,"error");

        });
    })
    image.catch((error)=>{
        showAlert("Error","Something went wrong! "+error,"error");

    })

}





$(document).ready(() => {
    $(".weatherContainer").css("display", "none");
    $(".myFooter").css("display", "none");
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
    /*Sending the coordinates to the weather API , instead of the city name.*/
    var res = fetch("https://api.weatherapi.com/v1/current.json?key=930b591bc591480f9b583028231405&q=" + p1 + "," + p2)
    res.then((res) => {
        var data = res.json();
        data.then((json) => {
            showWeatherData(json, true);


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
        event.preventDefault();
        fetchCityData();
    }
})

async function fetchCityData() {


    try {
        let response = fetch("https://api.weatherapi.com/v1/current.json?key=930b591bc591480f9b583028231405&q=" + $("#tf").val());
        let weatherData = await response;
        let jsonData = weatherData.json();
        let data = await jsonData;
        $("#tf").val("");
        $("#cityName").empty();
        $(".weatherDetails").empty();
        if (data) {
            showWeatherData(data, false)
        }


    } catch (e) {
        showAlert("Error", "Your city does not exist in this planet! 😂\n" + e, "error");
    }


}

function showWeatherData(json, initialLoad) {
    $(".weatherContainer").css("display", "flex");
    $("#cityName").append("<h1>" + "CITY :  " + "<mark>" + json.location.name + "</mark>" + json.location.country + ".</h1>")
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>" + "Current Tempreature :   " + json.current.temp_c + "℃  |   " + json.current.temp_f + "℉</h1><br><br>");
    $(".weatherDetails").append("<img class='weatherIcon' src=" + json.current.condition.icon + " data-aos='zoom-in'><br><br>");
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>" + "Current Condition :   " + json.current.condition.text + "</h1><br><br>");
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Humidity : " + json.current.humidity + "</h1><br><br>")
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Wind Speed : " + json.current.wind_kph + " km/h</h1><br><br>")
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Wind Direction : " + json.current.wind_dir + "</h1><br><br>")
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Feels Like : " + json.current.feelslike_c + "℃  |   " + json.current.feelslike_f + "℉</h1><br><br>")
    $(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Last Updated : " + json.current.last_updated + "</h1><br><br>")

    $(".myFooter").css("display", "block");


    /*Since unsplash.com does not have images of Sri Lankan cities individually ,I used any image of Sri Lanka. */
    if (initialLoad) {
        fetchCity(json.location.country);
    } else {
        fetchCity(json.location.name);
    }

    /*Adding 500px to the current scroll position.*/
    $(window).scrollTop($(window).scrollTop() + 500);

}


function showAlert(title, msg, icon) {
    new swal({
        title: title,
        text: msg,
        icon: icon,
        customClass: "commonText"
    });


}

function fetchImage(country) {
    let image = fetch("https://api.unsplash.com/search/photos?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&order_by=relavent&page=100&query=" + country)
    image.then((response) => {
        myJson = response.json();
        myJson.then((finalResult) => {
            var randomIndex = Math.floor(Math.random() * finalResult.results.length); // Generate a random index within the range of the array
            $("body").css("background-image", "url(" + finalResult.results[randomIndex].urls.full) + ")";

        });
        myJson.catch((error) => {
            showAlert("Error", "Something went wrong! " + error, "error");

        });
    })
    image.catch((error) => {
        showAlert("Error", "Something went wrong! " + error, "error");

    })

}

/*Same as above using async await.*/

async function fetchCity(fetchThis) {
    try {
        let response = fetch("https://api.unsplash.com/search/photos?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&order_by=relavent&query=" + fetchThis);
        let imageData = await response;
        let jsonData = imageData.json();
        let image = await jsonData;
        /*By using a random number we can randomize the generating image.*/
        var randomIndex = Math.floor(Math.random() * image.results.length);
        $("body").css("background-image", "url(" + image.results[randomIndex].urls.full) + ")";// a random index within the range of the array
    } catch (e) {
        showAlert("Error", "Something went wrong while fetching the image! " + e, "error");
    }


}





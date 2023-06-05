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
            $("#cityName").append("<h1>" + json.location.name + ".</h1>")
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





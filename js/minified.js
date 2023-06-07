function successCallback(e){var t;fetchCurrentData(e.coords.latitude,e.coords.longitude)}function fetchCurrentData(e,t){var r=fetch("https://api.weatherapi.com/v1/current.json?key=930b591bc591480f9b583028231405&q="+e+","+t);r.then(e=>{var t=e.json();t.then(e=>{showWeatherData(e,!0)}),t.catch(e=>{new swal("Error","Something went wrong! "+e,"error")})}),r.catch(e=>{new swal("Error","Something went wrong! "+e,"error")})}async function fetchCityData(){try{let e=await (await fetch("https://api.weatherapi.com/v1/current.json?key=930b591bc591480f9b583028231405&q="+$("#tf").val())).json();$("#tf").val(""),$("#cityName").empty(),$(".weatherDetails").empty(),e&&showWeatherData(e,!1)}catch(t){showAlert("Error","Your city does not exist in this planet! \uD83D\uDE02\n"+t,"error")}}function showWeatherData(e,t){$(".weatherContainer").css("display","flex"),$("#cityName").append("<h1>CITY :  <mark>"+e.location.name+"</mark>"+e.location.country+".</h1>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Current Tempreature :   "+e.current.temp_c+"℃  |   "+e.current.temp_f+"℉</h1><br><br>"),$(".weatherDetails").append("<img class='weatherIcon' src="+e.current.condition.icon+" data-aos='zoom-in'><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Current Condition :   "+e.current.condition.text+"</h1><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Humidity : "+e.current.humidity+"</h1><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Wind Speed : "+e.current.wind_kph+" km/h</h1><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Wind Direction : "+e.current.wind_dir+"</h1><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Feels Like : "+e.current.feelslike_c+"℃  |   "+e.current.feelslike_f+"℉</h1><br><br>"),$(".weatherDetails").append("<h1 class='commonText weatherText' data-aos='zoom-in'>Last Updated : "+e.current.last_updated+"</h1><br><br>"),$(".myFooter").css("display","block"),t?fetchCity(e.location.country):fetchCity(e.location.name),$(window).scrollTop($(window).scrollTop()+500)}function showAlert(e,t,r){new swal({title:e,text:t,icon:r,customClass:"commonText"})}function fetchImage(e){let t=fetch("https://api.unsplash.com/search/photos?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&order_by=relavent&page=100&query="+e);t.then(e=>{(myJson=e.json()).then(e=>{var t=Math.floor(Math.random()*e.results.length);$("body").css("background-image","url("+e.results[t].urls.full)}),myJson.catch(e=>{showAlert("Error","Something went wrong! "+e,"error")})}),t.catch(e=>{showAlert("Error","Something went wrong! "+e,"error")})}async function fetchCity(e){try{let t=await (await fetch("https://api.unsplash.com/search/photos?client_id=lz0WtbT_YAZdZKUvfjBLkO9Fifnhw6y9S4kYJx7cj0A&order_by=relavent&query="+e)).json();var r=Math.floor(Math.random()*t.results.length);$("body").css("background-image","url("+t.results[r].urls.full)}catch(o){showAlert("Error","Something went wrong while fetching the image! "+o,"error")}}$(document).ready(()=>{$(".weatherContainer").css("display","none"),$(".myFooter").css("display","none")}),$("#mainLogo").on("click",()=>{window.location.reload()}),navigator.geolocation?navigator.geolocation.getCurrentPosition(successCallback,()=>{showAlert("<img src='https://media.giphy.com/media/nh9k1qzeLf99S/giphy.gif'>","Location permission is required!","error")}):new swal("Error","Geo location isn't supported by your browser!!","error"),$("#textField").on("keydown",e=>{"Enter"==e.key&&(e.preventDefault(),fetchCityData())});
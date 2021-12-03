const kuva = document.getElementById('saakuva');

$(document).ready(function() {
    $("#form-sub").submit(function(event) { 
        performSearch(event); });
  });
//Tehdään haku kaupungin nimi, lämpötila, 
  function performSearch(event) {
    var request;
    event.preventDefault();
    $("#city-name").text("Searching ...");
    $("#city-temp").text("");
    $(kuva).attr('src', "");
    $("#city-weather").text("");
  
    // lähetetään pyyntö API:lle
    request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: { q: $("#city").val(),                        //Data kaupungeista
                appid: '3ffc68de5d904dae2144e159ec222589', //API KEY
                units: 'metric'                            // pyydetään metri järjestelmässä (oletus imperiaalinen)
            }
    });
  
    // Jos haku onnistuu
    request.done(function (response){
        formatSearchResults(response);
    });
    
    // jos haku epäonnistuu
    request.fail(function (){
        $("#city-name").text("Syötä kaupunki uudelleen!");
        $("#city-temp").text("");
        $("img").attr('src', "");
        $("#city-weather").text("");
    });
  
  }
//Jaotellaan hakukyselyn tulokset/data
  function formatSearchResults(jsonObject) {
    
    var city_name = jsonObject.name;
    city_name = city_name + ", " + jsonObject.sys.country;
    var city_weather = jsonObject.weather[0].main;
    var city_temp = jsonObject.main.temp;
    var imgurl  = 'http://openweathermap.org/img/wn/' + jsonObject.weather[0].icon + '@2x.png'; // Haun mukana palautuva säätilan kuva (esim. lumisade)
    $("img").attr('src', imgurl);
    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text(city_temp+" Celsius");  
  }

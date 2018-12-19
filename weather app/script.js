//7fc29010daf92a86fa43e13f68b94c96 API key

let units = 'metric';
let searchTerm;
let searchMethod;

//called by button event listener
//checks if the searchText value is zip or name
//and assigns value to searchTerm
function zipOrName(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip';
    }else{
        searchMethod = 'q';
    }
}

//called by button event listener
//catches data from link then converts it to .json and sets it to result
//calls function init
function searchWeather(searchTerm){
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=7fc29010daf92a86fa43e13f68b94c96&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    });
}

//called by searchWeather
//contains the result
//parses the result
function init(rezultat){
    console.log(rezultat);
    switch(rezultat.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/sunny.jpg")';
        break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
        break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("img/rainy.jpg")';
        break;

        case 'Atmosphere':
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("img/fog.jpg")';
        break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snowy.jpg")';
        break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/storm.jpg")';
        break;
    }

    //setting the content
    let iconLinkDefault = rezultat.weather[0].icon + '.png';

    let cityName = document.getElementById('cityName');
    let temperatureID = document.getElementById('temperatureID');
    let weatherDescription = document.getElementById('weatherDescription');
    let img = document.getElementById('img');

    img.src = "http://openweathermap.org/img/w/" + iconLinkDefault;
    weatherDescription.textContent = "Description : " + rezultat.weather[0].description;
    temperatureID.textContent = "Temperature : " + rezultat.main.temp + " C";
    cityName.textContent = rezultat.name;


    //http://openweathermap.org/img/w/10d.png
}


function centerWeatherInfo(){
    let weatherDiv = document.getElementById('weatherDiv');
    weatherDiv.style.left = `calc(50%-${weatherDiv.clientWidth/2}px)`;
    weatherDiv.style.top = `calc(50%-${weatherDiv.clientHeight/1.5}px)`;
    weatherDiv.style.visibility = 'visible';
}

document.getElementById("searchButton").addEventListener('click', () => {
    let searchTerm = document.getElementById("searchText").value;
    centerWeatherInfo();
    if(searchTerm){
        zipOrName(searchTerm);
        searchWeather(searchTerm);
    }   
    else{
        alert("Please enter City name or Zip code");
    }
})
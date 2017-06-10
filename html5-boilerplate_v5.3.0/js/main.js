window.onload = getLocation;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation);
	} else {
		return 'Oops... No geolocation support.';
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var weather = new XMLHttpRequest();
	weather.open(
		'GET',
		'http://api.openweathermap.org/data/2.5/weather?lat=' +
			latitude +
			'&lon=' +
			longitude +
			'&units=imperial&appid=2d33251071e497b26eafbf5553aa3cb5',
		false
	);
	weather.send(null);

	var r = JSON.parse(weather.response);
	var city = r.name;
	var temp = r.main.temp;
	var description = r.weather[0].main;
	var newCity = document.getElementById('city');
	newCity.innerHTML = city;
	var newTemp = document.getElementById('temp');
	newTemp.innerHTML = Math.floor(temp) + ' &deg;F';
	var newWeather = document.getElementById('weather');
	newWeather.innerHTML = description;

	if (r.weather[0].id === 800) {
		document.body.style.backgroundImage =
			"url('./html5-boilerplate_v5.3.0/img/sunny.jpg')";
	} else if (r.weather[0].id >= 300 && r.weather[0].id <= 531) {
		document.querySelector('.jumbotron').classList.add('rain');
		document.querySelector('.footer').classList.add('rain');
		document.body.style.backgroundImage =
			"url('./html5-boilerplate_v5.3.0/img/rain.jpg')";
	} else if (r.weather[0].id >= 600 && r.weather[0].id <= 622) {
		document.body.style.backgroundImage =
			"url('./html5-boilerplate_v5.3.0/img/snow.jpg')";
	}

	newTemp.onmouseenter = function() {
		newTemp.innerHTML = Math.floor((temp - 32) * 0.5556) + ' &deg;C';
	};
	newTemp.onmouseout = function() {
		newTemp.innerHTML = Math.floor(temp) + ' &deg;F';
	};
}

function updateWeather(location = 'Guatemala') {
    const apiKey = 'fa0ed160c4624f128be184513241312';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=es`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temp').textContent = `${data.current.temp_c}°C`;
            document.getElementById('humedad').textContent = `${data.current.humidity}%`;
            document.getElementById('viento').textContent = `${data.current.wind_kph} km/h`;
            document.getElementById('fecha_hora').textContent = data.location.localtime;
            document.getElementById('descripcion').textContent = data.current.condition.text;
            document.getElementById('location-name').textContent = data.location.name;
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

function updateForecast(location = 'Guatemala') {
    const apiKey = 'fa0ed160c4624f128be184513241312';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&lang=es`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastDisplay = document.getElementById('forecast-display');
            forecastDisplay.innerHTML = '';
            const currentHour = new Date().getHours();
            const hours = data.forecast.forecastday[0].hour.slice(currentHour, currentHour + 1);

            hours.forEach(hour => {
                const forecastCard = `
                    <p>${hour.condition.text} <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" style="width: 20px;"/></p>
                `;
                forecastDisplay.innerHTML += forecastCard;
            });
        })
        .catch(error => console.error('Error al obtener el pronóstico:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
    updateForecast();
});

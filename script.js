function updateWeather(location = 'Guatemala') {
    const apiKey = 'fa0ed160c4624f128be184513241312';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=es`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.current && data.location) {
                document.getElementById('temp').textContent = `${data.current.temp_c}°C`;
                document.getElementById('humedad').textContent = `${data.current.humidity}%`;
                document.getElementById('viento').textContent = `${data.current.wind_kph} km/h`;
                document.getElementById('fecha_hora').textContent = data.location.localtime;
                document.getElementById('descripcion').textContent = data.current.condition.text;
                document.getElementById('location-name').textContent = data.location.name;
            } else {
                console.error('Datos del clima no disponibles');
            }
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
            if (data && data.forecast && data.forecast.forecastday[0]) {
                const currentHour = new Date().getHours();
                const hours = data.forecast.forecastday[0].hour.slice(currentHour, currentHour + 1);
                
                hours.forEach(hour => {
                    const truncatedText = hour.condition.text.length > 30 
                        ? hour.condition.text.substring(0, 30) + '...' 
                        : hour.condition.text;

                    const forecastCard = `
                        <p>${truncatedText} 
                            <img src="https:${hour.condition.icon}" 
                                 alt="${hour.condition.text}" 
                                 style="width: 30px;"/>
                        </p>
                    `;
                    forecastDisplay.innerHTML += forecastCard;
                });
            } else {
                forecastDisplay.innerHTML = '<p>Pronóstico no disponible</p>';
            }
        })
        .catch(error => console.error('Error al obtener el pronóstico:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
    updateForecast();
});

document.getElementById('menu-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

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
            document.getElementById('location-name').textContent = data.location.name; // Actualiza el encabezado
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

function updateWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const location = `${lat},${lon}`;
                updateWeather(location);
            },
            error => {
                console.error('Error en geolocalización:', error);
                updateWeather(); // Usa "Guatemala" como predeterminado
            }
        );
    } else {
        console.error('Geolocalización no soportada');
        updateWeather(); // Usa "Guatemala" como predeterminado
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeatherByGeolocation();
});






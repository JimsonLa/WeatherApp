// Charge la configuration (ville par défaut)
fetch('data.json')
    .then(response => response.json())
    .then(config => {
        const city = config.city;
        getWeather(city);
        // Met à jour les données météo toutes les heures (3.600.000 ms = 1 heure)
        setInterval(() => getWeather(city), 3600000);
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration:', error));

const apiKey = 'fbd75287eb4c11cdf1769f0afb44f515';

function getWeather(city) {
    // Création de la variable url contenant l'url de l'API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    // Fetch l'API
    fetch(url)
        .then(response => response.json())
        // Récupère les données (ville, température, desscription) grâce à leur ID
        .then(data => {
            document.getElementById('city').innerText = data.name;
            document.getElementById('temperature').innerText = data.main.temp;
            document.getElementById('description').innerText = data.weather[0].description;
        })
        // Si le script ne parvient pas à récupérer les données, cette erreur sera inscrite dans la consoles
        .catch(error => console.error('Erreur lors de la récupération des données météo:', error));
}

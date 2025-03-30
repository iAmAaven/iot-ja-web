const API_KEY = '69343812649edcca68a50a5ca2aed8bc';
const KAUPUNKI = 'Pori';

//              https://api.openweathermap.org/data/2.5/weather?q=Pori&units=metric&lang=fi&appid=69343812649edcca68a50a5ca2aed8bc
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${KAUPUNKI}&units=metric&lang=fi&appid=${API_KEY}`;
//                      https://api.openweathermap.org/data/2.5/forecast?q=Pori&units=metric&lang=fi&appid=69343812649edcca68a50a5ca2aed8bc
const ENNUSTE_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${KAUPUNKI}&units=metric&lang=fi&appid=${API_KEY}`;

async function fetchTanaan() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Säädatan hakeminen epäonnistui');
        const data = await response.json();
        updateTanaan(data);
    } catch (error) {
        console.error(error);
        document.getElementById('weather-info').innerHTML = '<p>Säädatan hakeminen epäonnistui.</p>';
    }
}

async function fetchHuominen() {
    try {
        const response = await fetch(ENNUSTE_API_URL);
        if (!response.ok) throw new Error('Säädatan hakeminen huomiselle epäonnistui');
        const data = await response.json();
        updateHuominen(data);
    } catch (error) {
        console.error(error);
        document.getElementById('huominen-info').innerHTML = '<p>Säädatan hakeminen huomiselle epäonnistui.</p>';
    }
}

async function fetchYlihuominen() {
    try {
        const response = await fetch(ENNUSTE_API_URL);
        if (!response.ok) throw new Error('Säädatan hakeminen ylihuomiselle epäonnistui');
        const data = await response.json();
        updateYlihuominen(data);
    } catch (error) {
        console.error(error);
        document.getElementById('ylihuominen-info').innerHTML = '<p>Säädatan hakeminen ylihuomiselle epäonnistui.</p>';
    }
}

function updateTanaan(data) {
    const weatherInfo = `
        <h1>${data.main.temp}°C</h1>
        <p>Kosteus: ${data.main.humidity}%</p>
        <p>Tuulen nopeus: ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        <p><i>${data.weather[0].description}</i></p>
    `;
    document.getElementById('tanaan-info').innerHTML = weatherInfo;
}

function getWeekday(offset) {
    const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
    const today = new Date();
    return days[(today.getDay() + offset) % 7];
}

function updateHuominen(data) {
    const huominen = data.list.find(item => item.dt_txt.includes('12:00:00'));

    const huominenInfo = `
        <h3>${getWeekday(1)}</h3>
        <p>${huominen.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${huominen.weather[0].icon}@2x.png" alt="Weather Icon">
        <p><i>${huominen.weather[0].description}</i></p>
    `;
    document.getElementById('huominen-info').innerHTML = huominenInfo;
}

function updateYlihuominen(data) {
    const huominen = data.list.find(item => item.dt_txt.includes('12:00:00'));
    const ylihuominen = data.list.find(item => item.dt_txt.includes('12:00:00') && item.dt > huominen.dt);

    const ylihuominenInfo = `
        <h3>${getWeekday(2)}</h3>
        <p>${ylihuominen.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${ylihuominen.weather[0].icon}@2x.png" alt="Weather Icon">
        <p><i>${ylihuominen.weather[0].description}</i></p>
    `;
    document.getElementById('ylihuominen-info').innerHTML = ylihuominenInfo;
}

fetchTanaan();
setInterval(fetchTanaan, 600000);

fetchHuominen();
setInterval(fetchHuominen, 600000);

fetchYlihuominen();
setInterval(fetchYlihuominen, 600000);

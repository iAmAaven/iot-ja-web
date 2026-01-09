const lat = 61.4858;
const lon = 21.7973;

function showView(viewId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

async function fetchWeatherData(variable, hours) {
    const end = new Date();
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=${variable}&start_date=${start.toISOString().slice(0, 10)}&end_date=${end.toISOString().slice(0, 10)}&timezone=auto`;
    const res = await fetch(url);
    return await res.json();
}

function calculateStatistics(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    const mode = values.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
    const modeVal = Object.keys(mode).reduce((a, b) => mode[a] > mode[b] ? a : b);
    const range = Math.max(...values) - Math.min(...values);
    const stdDev = Math.sqrt(values.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / values.length);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        mode: modeVal,
        range: range.toFixed(2),
        stdDev: stdDev.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2)
    };
}

async function updateWindData(type) {
    const selectedHours = parseInt(document.getElementById(`${type}-timespan`).value);
    const variable = type === 'wind_speed' ? 'wind_speed_10m' : 'wind_direction_10m';

    // Fetch selected range for chart and table
    const dataSelected = await fetchWeatherData(variable, selectedHours);
    const times = dataSelected.hourly.time.slice(-selectedHours);
    const values = dataSelected.hourly[variable].slice(-selectedHours);
    const formattedTimes = times.map(time =>
        new Date(time).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    );

    const table = document.getElementById(`${type}-table`);
    table.innerHTML = '<tr><th>Aika</th><th>Arvo</th></tr>';
    formattedTimes.forEach((formattedTime, i) => {
        table.innerHTML += `<tr><td>${formattedTime}</td><td>${values[i]}</td></tr>`;
    });

    const ctx = document.getElementById(`${type}-chart`).getContext('2d');
    if (window[`${type}Chart`]) window[`${type}Chart`].destroy();
    window[`${type}Chart`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedTimes,
            datasets: [{
                label: type === 'wind_speed' ? 'Tuulen Nopeus (m/s)' : 'Tuulen Suunta (°)',
                data: values,
                borderColor: 'blue',
                backgroundColor: 'lightblue',
                fill: true,
                tension: 0.3,
            }]
        },
        options: {
            scales: {
                x: { title: { display: true } },
                y: {
                    title: {
                        display: true,
                        text: type === 'wind_speed' ? 'Nopeus (m/s)' : 'Suunta (°)',
                    }
                }
            }
        }
    });

    // Always fetch 1 week of data for stats
    const fullWeekData = await fetchWeatherData(variable, 168);
    const fullWeekValues = fullWeekData.hourly[variable].slice(-168);
    const stats = calculateStatistics(fullWeekValues);

    const statsContainer = document.getElementById(`${type}-stats`);
    statsContainer.innerHTML = `
<h3>Viimeisen 7 päivän data</h3>
<table>
    <tr><th>Keskiarvo</th><td>${stats.mean}</td></tr>
    <tr><th>Mediaani</th><td>${stats.median}</td></tr>
    <tr><th>Moodi</th><td>${stats.mode}</td></tr>
    <tr><th>Vaihteluväli</th><td>${stats.range}</td></tr>
    <tr><th>Keskiarvopoikkeama</th><td>${stats.stdDev}</td></tr>
    <tr><th>Minimi</th><td>${stats.min}</td></tr>
    <tr><th>Maksimi</th><td>${stats.max}</td></tr>
</table>
`;
}

async function updateMeasurementView() {
    const measurement = document.getElementById("measurement-select").value;
    const timespan = parseInt(document.getElementById("timespan-select").value);

    const variable =
        measurement === "temperature"
            ? "temperature_2m"
            : measurement === "wind_speed"
                ? "wind_speed_10m"
                : "wind_direction_10m";

    const data = await fetchWeatherData(variable, timespan);
    const times = data.hourly.time.slice(-timespan);
    const values = data.hourly[variable].slice(-timespan);
    const formattedTimes = times.map(time =>
        new Date(time).toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" })
    );

    // Update table
    const table = document.getElementById("measurement-table");
    table.innerHTML = `<tr><th>Aika</th><th>${measurement === "temperature" ? "Lämpötila (°C)" : measurement === "wind_speed" ? "Nopeus (m/s)" : "Suunta (°)"}</th></tr>`;
    formattedTimes.forEach((formattedTime, i) => {
        table.innerHTML += `<tr><td>${formattedTime}</td><td>${values[i]}</td></tr>`;
    });

    // Update chart
    const ctx = document.getElementById("measurement-chart").getContext("2d");
    if (window.measurementChart) window.measurementChart.destroy();
    window.measurementChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: formattedTimes,
            datasets: [
                {
                    label:
                        measurement === "temperature"
                            ? "Lämpötila (°C)"
                            : measurement === "wind_speed"
                                ? "Tuulen Nopeus (m/s)"
                                : "Tuulen Suunta (°)",
                    data: values,
                    borderColor: measurement === "temperature" ? "red" : "blue",
                    backgroundColor: measurement === "temperature" ? "salmon" : "lightblue",
                    fill: true,
                    tension: 0.3,
                },
            ],
        },
        options: {
            scales: {
                x: { title: { display: true } },
                y: {
                    title: {
                        display: true,
                        text:
                            measurement === "temperature"
                                ? "Lämpötila (°C)"
                                : measurement === "wind_speed"
                                    ? "Nopeus (m/s)"
                                    : "Suunta (°)",
                    },
                },
            },
        },
    });
}

// Initialize View 1
updateMeasurementView();
updateWindData('wind_speed');
updateWindData('wind_direction');
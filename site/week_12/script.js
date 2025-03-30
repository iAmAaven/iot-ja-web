function getNextMay9th() {
    const now = moment();
    let coolEvent = moment(`${now.year()}-05-09T00:00:00`);

    if (now.isAfter(coolEvent)) {
        coolEvent = moment(`${now.year() + 1}-05-09T00:00:00`);
    }

    return coolEvent;
}

let customEvent = null;

document.getElementById("contribute").addEventListener("click", () => {
    document.getElementById("modal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

document.getElementById("confirm").addEventListener("click", () => {
    const dateInput = document.getElementById("dateInput").value;
    const timeInput = document.getElementById("timeInput").value;

    if (dateInput && timeInput) {
        customEvent = moment(`${dateInput}T${timeInput}`);
        document.getElementById("modal").style.display = "none";
    }
});

function getEventTime() {
    if (customEvent) {
        return customEvent;
    }
    return getNextMay9th();
}

function updateCountdown() {
    const eventTime = getEventTime();
    const currentTime = moment();
    const duration = moment.duration(eventTime.diff(currentTime));

    if (duration.asMilliseconds() <= 0 && duration.asMilliseconds() > -10000) {
        document.getElementById("countdown").innerHTML = "The moment has arrived!";
        document.getElementById("end").innerHTML = "♤";
        document.getElementById("end").style.color = "#bbbbbb00";
        return;
    }
    else if(duration.asMilliseconds() >= 0 && duration.asMilliseconds() < 60000) {
        document.getElementById("end").innerHTML = "I have a feeling we're close to the end...";
        document.getElementById("end").style.color = "#bbbbbb";
    }
    else if(duration.asMilliseconds() >= 60000) {
        document.getElementById("end").innerHTML = "♤";
        document.getElementById("end").style.color = "#bbbbbb00";
    }
    else if (duration.asMilliseconds() <= -10000) {
        document.getElementById("countdown").innerHTML = "Nothing lasts forever...";
        return;
    }
    
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
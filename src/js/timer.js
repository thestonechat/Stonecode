var hours = 0;
var minutes = 0;
var seconds = 0;

setInterval(() => {
    let textToShow = "";
    if (seconds == 59) {
        seconds = 0;
        minutes++;
    } else {
        seconds++;
    }

    if (minutes == 59) {
        minutes = 0;
        hours++;
    }

    hours.toString().length == 1 ? textToShow += `0${hours}:` : textToShow += `${hours}:`;
    minutes.toString().length == 1 ? textToShow += `0${minutes}:` : textToShow += `${minutes}:`;
    seconds.toString().length == 1 ? textToShow += `0${seconds}` : textToShow += `${seconds}`;


    document.getElementById('sidebar_timer').innerHTML =`<center>${textToShow}</center>`;
}, 1000);
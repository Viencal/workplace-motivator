/* 

Gehalt pro Monat: 2800€
Pro Woche: 700€
Pro Tag: 140€
Pro Stunde: 17,50€
Pro Minute: 0,29€
Pro Sekunde: 0,0048€
Pro Milisekunde: 0,0000048

*/

let balanceInterval; // Variable für das Intervall
let isPaused = false; // Statusvariable für Pause

function displayBalance() {
    let start_balance = 0.00;
    const amount = 0.0048; // Betrag, der hinzugefügt werden soll
    const place = document.getElementById("display_balance");
    const worktime = document.getElementById("worktime");

    let balance = start_balance;
    let lastTimestamp = performance.now();
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    function update() {
        if (!isPaused) {
            let now = performance.now();
            let deltaTime = now - lastTimestamp;
            lastTimestamp = now;

            // Betrag hinzufügen und Anzeige aktualisieren
            balance += amount * (deltaTime / 1000); // Adjust amount based on elapsed time
            place.innerHTML = `${(Math.round(balance * 100) / 100).toFixed(2)} €`;
            //place.innerHTML = `${balance} €`;

            milliseconds += deltaTime;
            if (milliseconds >= 1000) { // 1000 Millisekunden = 1 Sekunde
                milliseconds = 0;
                seconds++;
                if (seconds >= 60) { // 60 Sekunden = 1 Minute
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) { // 60 Minuten = 1 Stunde
                        minutes = 0;
                        hours++;
                    }
                }
            }

            // Arbeitszeit aktualisieren
            worktime.innerHTML = `${hours} h ${minutes} m ${seconds} s`;
        }

        // Nächsten Frame anfordern
        requestAnimationFrame(update);
    }

    function startUpdate() {
        lastTimestamp = performance.now();
        requestAnimationFrame(update);
    }

    startUpdate();
}

function togglePause() {
    isPaused = !isPaused; // Pause umschalten
    const button = document.getElementById("pause_button");
    button.innerHTML = isPaused ? "Fortsetzen" : "Pause"; // Button-Text ändern
}
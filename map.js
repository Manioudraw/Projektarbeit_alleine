let canvas, ctx;
let zoom = 1;
let circleScale = 1;
let mouseX = 0;
let mouseY = 0;
let maxScale = 10;
let minScale = 1;

// Zoom & Pan Variablen
let scale = 0.04;      // Start-Zoom
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let lastX, lastY;

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let idleTimer;
    const buttonsDiv = document.getElementById("yearButtons");

    yearButtonActive();

    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX = e.offsetX;
        mouseY = e.offsetY;

        // Kreis, Map & Menü zeichnen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMapInCicrle(x, y);
        
        buttonsDiv.style.display = "none";

        //Abfrage, ob der Kreis eine bestimmte Zeit nicht bewegt wurde, um dann die JahresButtons anzeigen zu lassen
        // clearTimeout(idleTimer);
        // idleTimer = setTimeout(() => {
        //     buttonsDiv.style.position = "absolute";
        //     if(e.clientX<250) { // Wenn Mauszeiger zu weit links, dann werden Buttons rechts angezeigt.
        //         buttonsDiv.style.left = `${((e.clientX + 110) / window.innerWidth) * 100}%`;
        //         buttonsDiv.style.top = `${((e.clientY - 80) / window.innerHeight) * 100}%`;
        //     }
        //     else {
        //         buttonsDiv.style.left = `${((e.clientX - 210) / window.innerWidth) * 100}%`;
        //         buttonsDiv.style.top = `${((e.clientY - 80) / window.innerHeight) * 100}%`;
        //     }
            
        //     buttonsDiv.style.display = "flex";
        //     buttonsDiv.style.flexDirection = "column";
        //     buttonsDiv.style.gap = "10px";
        // }, 400);

        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            buttonsDiv.style.position = "absolute";

            // Prüfen, ob Maus zu weit unten ist
            const threshold = 200; // z. B. 200px Abstand vom unteren Rand
            if (e.clientY > window.innerHeight - threshold) {
                // Maus ist zu weit unten → Buttons ÜBER dem Cursor anzeigen
                buttonsDiv.style.left = `${((e.clientX - 100) / window.innerWidth) * 100}%`;
                buttonsDiv.style.top = `${((e.clientY - 190) / window.innerHeight) * 100}%`;
            } else {
                // Normalfall → Buttons UNTER dem Cursor anzeigen
                buttonsDiv.style.left = `${((e.clientX - 100) / window.innerWidth) * 100}%`;
                buttonsDiv.style.top = `${((e.clientY + 130) / window.innerHeight) * 100}%`;
            }

            buttonsDiv.style.display = "flex";
            buttonsDiv.style.flexDirection = "row";
            buttonsDiv.style.gap = "10px";
        }, 300);
    });


    canvas.addEventListener("wheel", e => {
        e.preventDefault();

        const zoomIntensity = 0.1;
        const wheel = e.deltaY < 0 ? 1 : -1; // hoch: rein, runter: raus
        const zoom = Math.exp(wheel * zoomIntensity);

        circleScale = Math.min(maxScale, Math.max(minScale, circleScale * zoom));

        drawMapInCicrle(mouseX, mouseY);
    });
});

function drawMapInCicrle(x, y) {
    const Lipp_1918 = document.getElementById("Lipp_1918");
    const Lipp_2005 = document.getElementById("Lipp_2005");
    const Lipp_2022 = document.getElementById("Lipp_2022");
    const Lipp_2025 = document.getElementById("Lipp_2025");

    const zoomRadius = 100;

    if (count === images2024.length) {
        drawMap(loaded2024, images2024);
    }

    // if (count_grau === images2024_grau.length) {
    //     drawMap(loaded2024_grau, images2024_grau);
    // }

    // Zoom-Fortschritt berechnen (0 = minZoom, 1 = maxZoom)
    let progress = (circleScale - minScale) / (maxScale - minScale);
    progress = Math.max(0, Math.min(1, progress)); // clamp 0–1

    // Parameter für den Halbkreis
    const outerRadius = zoomRadius + 15; // etwas über dem Kreis
    const startAngle = Math.PI;          // links
    const endAngle = 2 * Math.PI;        // rechts

    // Hintergrund-Halbkreis (immer sichtbar, transparent grün)
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle, endAngle, false);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // halbtransparent weiß
    ctx.stroke();

    // Fortschritts-Halbkreis (sichtbarer Anteil, deckend grün)
    ctx.beginPath();
    ctx.arc(
    x, y,
    outerRadius,
    startAngle,
    startAngle + (endAngle - startAngle) * progress,
    false
    );
    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Text über dem Halbkreis
    ctx.font = "bold 16px Arial";             // Schriftgröße und Schriftart
    ctx.fillStyle = "black";             // Textfarbe
    ctx.textAlign = "center";            // horizontal zentriert
    ctx.textBaseline = "bottom";         // vertikal am unteren Punkt ausrichten
    const percentText = Math.round(progress * 100) + "% Zoom"; 
    ctx.fillText(percentText, x, y - outerRadius - 5);    // 5px Abstand oberhalb


    //Kreis-Bereich definieren
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, zoomRadius, 0, Math.PI * 2, false);
    ctx.clip();

    // Transformation für Zoom
    ctx.translate(x, y);
    ctx.scale(circleScale, circleScale);
    ctx.translate(-x, -y);


    //Andere Karte im Kreis-Bereich darstellen
    const activeButton = document.querySelector(".yearButton.active");

    if (activeButton) {
        const year = activeButton.dataset.year;

        if (year === "1918") {
            ctx.drawImage(Lipp_1918, 0, 0, canvas.width, canvas.height);
        } else if (year === "2005") {
            ctx.drawImage(Lipp_2005, 0, 0, canvas.width, canvas.height);
        } else if (year === "2022") {
            ctx.drawImage(Lipp_2025, 0, 0, canvas.width, canvas.height);
        } 
    }
    else {
        // ctx.drawImage(Lipp_2022, 0, 0, canvas.width, canvas.height);

        if (count_grau === images2024_grau.length) {
            drawMap(loaded2024_grau, images2024_grau);
        }

        // if (count === images2024.length) {
        //     drawMap(loaded2024, images2024);
        // }
    }
    
    ctx.restore();

    ctx.beginPath();
    ctx.arc(x, y, zoomRadius, 0, Math.PI * 2, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
}

// Verhindern, dass das Kontextmenü angezeigt wird, wenn Rechtsklick genutzt wird
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

function yearButtonActive() {
    const buttons = document.querySelectorAll(".yearButton");
    let activeButtonIndex = null;

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (activeButtonIndex === index) {
                // Gleicher Button erneut geklickt → deaktivieren
                button.classList.remove("active");
                activeButtonIndex = null;
            } else {
                // Anderer Button → Umschalten
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                activeButtonIndex = index;
            }
        });
    });
}


function drawMap(array, images){
    if(array.length < images.length) return;

    const tileWidth = array[0].width;
    const tileHeight = array[0].height;

    // 2 Reihen x 4 Spalten
    for(let r=0;r<2;r++){
        for(let c=0;c<4;c++){
        const idx = r*4 + c;
        const x = c*tileWidth*scale + offsetX;
        const y = r*tileHeight*scale + offsetY;

        // nur zeichnen, wenn sichtbar im Canvas
        if(x + tileWidth*scale >= 0 && x <= canvas.width &&
            y + tileHeight*scale >= 0 && y <= canvas.height){
            ctx.drawImage(array[idx], 0,0, tileWidth, tileHeight, x, y, tileWidth*scale, tileHeight*scale);
        }
        }
    }
}
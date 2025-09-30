import { WebsocketTuioReceiver } from "./tuio_client_js/src/common/WebsocketTuioReceiver.js";
import { Tuio20Client } from "./tuio_client_js/src/tuio20/Tuio20Client.js";

function tangibleAndButtonMovement(){
    const rect = canvas.getBoundingClientRect();
    // const x = e.clientX - rect.left;
    // const y = e.clientY - rect.top;

    // Kreis, Map & Menü zeichnen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCircle(x, y);
    
    buttonsDiv.style.display = "none";
    // quizButton.style.display = "inline";

    //Abfrage, ob der Kreis eine bestimmte Zeit nicht bewegt wurde, um dann die JahresButtons anzeigen zu lassen
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        buttonsDiv.style.position = "absolute";
        if(x<250) { // Wenn Tangible zu weit links, dann werden Buttons rechts angezeigt.
            buttonsDiv.style.left = `${((x + 110) / window.innerWidth) * 100}%`;
            buttonsDiv.style.top = `${((y - 80) / window.innerHeight) * 100}%`;
            console.log("Buttons sollen rechts angezeigt werden");
        }
        else {
            buttonsDiv.style.left = `${((x - 210) / window.innerWidth) * 100}%`;
            buttonsDiv.style.top = `${((y- 80) / window.innerHeight) * 100}%`;
            console.log("Buttons sollen links angezeigt werden");
        }
        
        buttonsDiv.style.display = "flex";
        buttonsDiv.style.flexDirection = "column";
        buttonsDiv.style.gap = "10px";
    }, 400);
}

function moveCircle(x, y) {
    const Lipp_1918 = document.getElementById("Lipp_1918");
    const Lipp_2005 = document.getElementById("Lipp_2005");
    const Lipp_2022 = document.getElementById("Lipp_2022");
    const Lipp_2025 = document.getElementById("Lipp_2025");

    const zoomRadius = 100;

    ctx.drawImage(Lipp_2022, 0, 0, canvas.width, canvas.height);

    //Kreis-Bereich definieren
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, zoomRadius, 0, Math.PI * 2, false);
    ctx.clip();

    //Andere Karte im Kreis-Bereich darstellen
    // ctx.drawImage(Lipp_2005, 0, 0, canvas.width, canvas.height);
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
        ctx.drawImage(Lipp_2022, 0, 0, canvas.width, canvas.height);
    }
    
    ctx.restore();

    ctx.beginPath();
    ctx.arc(x, y, zoomRadius, 0, Math.PI * 2, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

class TangibleControl {
    constructor() {
        this.tuioReceiver = new WebsocketTuioReceiver("ws://10.0.0.20:3343/");
        this.tuioClient = new Tuio20Client(this.tuioReceiver);
        this.tuioClient.addTuioListener(this);
        this.tuioClient.connect();
    }

    tuioUpdate(tuioObject) {
        if (tuioObject.token) {
            const x = tuioObject.token.xPos * window.innerWidth - 50;
            const y = tuioObject.token.yPos * window.innerHeight - 50;
            // moveCircle(x, y);
            tangibleAndButtonMovement();
        }
    }

    tuioAdd(tuioObject) {
        if (tuioObject.token) {
            console.log("Tangible erkannt:", tuioObject.token.cId);
        }
    }

    tuioRemove(tuioObject) {
        if (tuioObject.token) {
            console.log("Tangible entfernt:", tuioObject.token.cId);
        }
    }
  
}

new TangibleControl();
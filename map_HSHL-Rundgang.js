function openHSHLRundgang() {
    const windowDiv = document.getElementById("content-window");

    // Vorherigen Inhalt leeren
    windowDiv.innerHTML = "";
    windowDiv.style.overflow = "hidden";
    windowDiv.style.width = "70%";
    windowDiv.style.height = "70%";

    // Schließen-Button erstellen
    const closeBtn = document.createElement("button");
    closeBtn.id = "close-video";
    closeBtn.textContent = "✕";
    closeBtn.onclick = closeHSHLRundgang;

    //Webseite 360 Grad HSHL-Rundgang
    const iframe = document.createElement("iframe");
    iframe.src = "https://360.hshl.de/lippstadt/index.html";
    iframe.allow = "xr-spatial-tracking"; // XR-Zugriff erlauben
    iframe.allowFullscreen = true; // Vollbild erlauben
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.borderRadius = "50px";

    // Struktur zusammensetzen
    windowDiv.appendChild(iframe);
    windowDiv.appendChild(closeBtn);

    // Anzeigen
    windowDiv.style.display = "block";
}

function closeHSHLRundgang() {
    const windowDiv = document.getElementById("content-window");
    windowDiv.style.display = "none";
    windowDiv.innerHTML = ""; // Inhalt entfernen
}
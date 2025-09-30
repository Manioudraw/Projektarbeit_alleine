let inactivityTimer;

function activateStandby() {
  document.getElementById("standby-overlay").style.display = "flex";

  const canvas = document.getElementById("standby-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc((canvas.width / 2), ((canvas.height / 2) * 1.30), 90, 0, Math.PI * 2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 11;
  ctx.stroke();
}

function deactivateStandby() {
  document.getElementById("standby-overlay").style.display = "none";
  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(activateStandby, 20 * 1000); // 2 Minuten: 2 * 60 * 1000; gerade 20 Sekunden
}

// Diese Events zählen als Aktivität:
["mousemove", "mousedown", "keypress", "scroll", "touchstart"].forEach(event => {
  document.addEventListener(event, deactivateStandby);
});

resetInactivityTimer(); // beim Start starten
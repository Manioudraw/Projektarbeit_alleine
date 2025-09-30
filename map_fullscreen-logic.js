/* HTML-Element abfragen fuer Fullscreen */
var html_element = document.documentElement;
            
/* Fullscreen aktivieren */
function openFullscreen() {
    if (html_element.requestFullscreen) {
        html_element.requestFullscreen();
    } else if (html_element.webkitRequestFullscreen) { /* Safari */
        html_element.webkitRequestFullscreen();
    } else if (html_element.msRequestFullscreen) { /* IE11 */
        html_element.msRequestFullscreen();
    }

    var fullscreen_active = document.getElementById("fullscreen_active");
    fullscreen_active.style.display = "none";
}

/* Fullscreen deaktivieren */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }

    var fullscreen_deactivate = document.getElementById("fullscreen_deactivate");
    fullscreen_deactivate.style.display = "none";

    var fullscreen_active = document.getElementById("fullscreen_active");
    fullscreen_active.style.display = "inline";

    scale = 0.04;

    document.body.style.overflowX = "visible";
    document.body.style.overflowY = "visible";
}

document.addEventListener ("keypress", (deactivate_button) => {
	if (deactivate_button.key === "f" || deactivate_button.key === "F") {
		var fullscreen_deactivate = document.getElementById("fullscreen_deactivate");
        fullscreen_deactivate.style.display = "inline";
        fullscreen_deactivate.style.position = "absolute";
        fullscreen_deactivate.style.left = "1%";
        fullscreen_deactivate.style.top = "2%";
	}
});

function resizeCanvasToFullscreen() {
    const canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scale = 0.0433;

    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
}

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        resizeCanvasToFullscreen();
    }
});
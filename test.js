// 8 Tiles (4 Spalten x 2 Reihen)
const images2024 = [
    "Map2024/map2024_08.jpg", "Map2024/map2024_02.jpg", "Map2024/map2024_06.jpg", "Map2024/map2024_05.jpg",
    "Map2024/map2024_01.jpg", "Map2024/map2024_04.jpg", "Map2024/map2024_07.jpg", "Map2024/map2024_03.jpg"
];

const loaded2024 = [];
let count = 0;

// Lade alle Tiles
images2024.forEach((src,i)=>{
    const img = new Image();
    img.onload = () => {
        loaded2024[i] = img;
        count++;

        if (count === images2024.length && loaded2024.every(im => im && im.complete)) {
            try {
                drawMap(loaded2024, images2024);
            } catch (e) {
                console.error("Fehler in drawMap");
            }
        }
    };
    img.onerror = ()=>{ console.error("Fehler beim Laden:",src); };
    img.src=src;
});

// 8 Tiles (4 Spalten x 2 Reihen)
const images2024_grau = [
    "Map2024_grau/map2024_grau_08.jpg", "Map2024_grau/map2024_grau_02.jpg", "Map2024_grau/map2024_grau_06.jpg", "Map2024_grau/map2024_grau_05.jpg",
    "Map2024_grau/map2024_grau_01.jpg", "Map2024_grau/map2024_grau_04.jpg", "Map2024_grau/map2024_grau_07.jpg", "Map2024_grau/map2024_grau_03.jpg"
];

const loaded2024_grau = [];
let count_grau = 0;

// Lade alle Tiles
images2024_grau.forEach((src,i)=>{
  const img = new Image();
  img.onload = () => {
        loaded2024_grau[i] = img;
        count_grau++;

        if (count_grau === images2024_grau.length && loaded2024_grau.every(im => im && im.complete)) {
            try {
                drawMap(loaded2024_grau, images2024_grau);
            } catch (e) {
                console.error("Fehler in drawMap");
            }
        }
    };
  img.onerror = ()=>{ console.error("Fehler beim Laden:",src); };
  img.src=src;
});
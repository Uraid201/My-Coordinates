
// JavaScript functions for geolocation and copying coordinates

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showposition(position) {
    document.getElementById("long").textContent = position.coords.longitude;
    document.getElementById("lat").textContent = position.coords.latitude;
}

function copyCoordinates() {
    const latitude = document.getElementById("lat").textContent;
    const longitude = document.getElementById("long").textContent;
    const coordinates = latitude + ", " + longitude;

    navigator.clipboard.writeText(coordinates).then(() => {
        alert("Coordinates copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
}

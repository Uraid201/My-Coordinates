
// JavaScript functions for geolocation and copying coordinates

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition);
        const statusElement = document.getElementById("status");
        statusElement.textContent = "Fetching location...";
        navigator.geolocation.getCurrentPosition(position => {
            statusElement.textContent = "Location fetched successfully.";
        });
    } else {
        alert("Geolocation is not supported by this browser.");
        statusElement.textContent = "Geolocation not supported.";
    }
}

function showposition(position) {
    document.getElementById("long").textContent = position.coords.longitude;
    document.getElementById("lat").textContent = position.coords.latitude;
    const statusElement = document.getElementById("status");
    statusElement.textContent = "Coordinates displayed.";

}

function copyCoordinates() {
    const latitude = document.getElementById("lat").textContent;
    const longitude = document.getElementById("long").textContent;
    const coordinates = latitude + ", " + longitude;

    navigator.clipboard.writeText(coordinates).then(() => {
    const statusElement = document.getElementById("status");
    statusElement.textContent = "Coordinates copied to clipboard.";
    
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });



}
function clearCoordinates() {
    document.getElementById("lat").textContent = "";
    document.getElementById("long").textContent = "";
    const statusElement = document.getElementById("status");
    statusElement.textContent = "Coordinates cleared.";
};   


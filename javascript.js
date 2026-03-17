
//get location
function getLocation() {
    if (navigator.geolocation) {
        setStatus("Fetching location...,loading");
        navigator.geolocation.getCurrentPosition(showposition, showError);
        
    } else {
        alert("Geolocation is not supported by this browser.");
        setStatus("Geolocation not supported.", "error");
    }
}
function showError(error) {
    setStatus("Error fetching location: " + error.message, "error");
}

//display coordinates

function showposition(position) {
    document.getElementById("long").textContent = position.coords.longitude;
    document.getElementById("lat").textContent = position.coords.latitude;
        setStatus("Location fetched successfully.", "success");
}
//copy
function copyCoordinates() {
    const latitude = document.getElementById("lat").textContent;
    const longitude = document.getElementById("long").textContent;
    const coordinates = latitude + ", " + longitude;
    
    if (!latitude || !longitude) {
        setStatus("No coordinates to copy.", "error");
        return;
    }
    navigator.clipboard.writeText(coordinates).then(() => {
    setStatus("Coordinates copied to clipboard!", "copied");
    
    }).catch(err => {
        console.error("Could not copy text: ", err);
        setStatus("Failed to copy coordinates.", "error");
    });


//clear
}
function clearCoordinates() {
    document.getElementById("lat").textContent = "";
    document.getElementById("long").textContent = "";
    setStatus("Coordinates cleared.", "cleared");
};   

//status

function setStatus(text,type) {
    const statusElement = document.getElementById("status");
    statusElement.textContent = text;
    statusElement.classList.remove("copied", "success", "error", "loading", "cleared");
    statusElement.classList.add(type);
}

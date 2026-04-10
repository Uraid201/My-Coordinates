//check the internet connection
function checkInternet() {
    if (navigator.onLine) {
        setStatus("You are online.", "success");
    } else {
        setStatus("You are offline. Please check your internet connection.", "error");
    }
}
function defaultmap() {
const defaultMap = "https://maps.google.com/maps?center=25,45&z=22&output=embed";
}
window.onload = function() {
    document.getElementById("map").src =
    "https://maps.google.com/maps?center=25,45&z=22&output=embed";
};

//get location
function getLocation() {
    if (navigator.geolocation) {
       setStatus("Fetching location...", "loading");
        navigator.geolocation.getCurrentPosition(showposition, showError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
        
    } else {
        alert("Geolocation is not supported by this browser.");
        setStatus("Geolocation not supported.", "error");
    }
}
function showError(error) {
    if (error.code === 1) {
        setStatus("Permission denied.", "error");
    } else if (error.code === 2) {
        setStatus("Location unavailable.", "error");
    } else if (error.code === 3) {
        setStatus("Request timeout.", "error");
    }
}


//display coordinates

function showposition(position) {
    const accuracy = position.coords.accuracy;
    if (accuracy > 50) {
        setStatus(`Location is approximate, for better accuracy please use a gps device.`, "error");
    }
    else {        setStatus(`Location fetched successfully.`, "success");
    }
    document.getElementById("long").textContent = position.coords.longitude;
    document.getElementById("lat").textContent = position.coords.latitude;
       
   const lat = position.coords.latitude;
const long = position.coords.longitude;

document.getElementById("map").src =
`https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
};

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
    if (!document.getElementById("lat").textContent && !document.getElementById("long").textContent) {
        setStatus("No coordinates to clear.", "error");
        return;
    }
    document.getElementById("lat").textContent = "";
    document.getElementById("long").textContent = "";
    document.getElementById("map").src =
    "https://maps.google.com/maps?center=25,45&z=22&output=embed";
    setStatus("Coordinates cleared.", "cleared");
};   

//status

function setStatus(text,type) {
    const statusElement = document.getElementById("status");
    statusElement.textContent = text;
    statusElement.classList.remove("copied", "success", "error", "loading", "cleared");
    statusElement.classList.add(type);
}

function openInGoogleMaps() {
const lat = document.getElementById("lat").textContent;
const long = document.getElementById("long").textContent;

if (!lat || !long) {
    setStatus("No coordinates to open.", "error");
    return;
}
else {

    const url = `https://www.google.com/maps?q=${lat},${long}`;
window.open(url, "_blank");
}
}

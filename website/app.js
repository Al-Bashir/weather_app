
/* Global Variables */
const OpenWeatherMapAPIKey = 'Your api key';
let zipCode;
let feelings;
let temp;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//  Get zip code
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', async () => {
    feelings = document.querySelector('#feelings').value;
    zipCode = document.querySelector('#zip').value;
    await getWeatherData();
    await sendDataToServer();
    getDataFromServer();
})

// Get weather data from OpenWeatherMap
async function getWeatherData(){
    // OpenWeatherMap URL
    const OpenWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${OpenWeatherMapAPIKey}&units=metric`;

    // Get Data From OpenWeatherMap Using Fetch()
    await fetch(OpenWeatherMapUrl).then( async response => {
        const data = await response.json();
        temp = data.main.temp;
    })
    .catch(error => {
        console.log(error);
    })
}

// Send collected data to server
async function sendDataToServer(){
    await fetch('/receivedData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            temperature: temp,
            date: newDate,
            feelings: feelings
        }),
    })
    .catch(error => {
        console.log(error);
    })
}

// Send collected data to server
async function getDataFromServer(){
    const usableData = await fetch('/sendData').then( async response => {
        return await response.json();
    })
    .catch(error => {
        console.log(error);
    })
    updateUi(usableData);
}

// Dynamically Update UI Function
function updateUi(usableData){
    // Update Date
    document.querySelector('#date').textContent = 'Date: ' + usableData.date;
    // Update Temperature
    const tempDiv = document.querySelector('#temp');
    // Check if the temperature not found
    if(usableData.temperature === undefined){
        tempDiv.innerText = 'Cannot get the temperature!\nPlease check zip code or try again later.'
    }
    else{
        tempDiv.textContent = 'Temperature: ' + usableData.temperature + ' ';
        const tag = document.createElement('span');
        tag.innerHTML = '&#8451;'
        tempDiv.appendChild(tag);
    }
    // Update feeling if found
    if(usableData.feelings){
        document.querySelector('#content').textContent = 'Feelings: ' + usableData.feelings;
    }
}







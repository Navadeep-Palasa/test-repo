
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("inputText");
const card = document.querySelector(".weatherInfo");
const APIkey = "707d4ece341909e0beb0997bbb0dd83c";

weatherForm.addEventListener("submit" , async event => {
    event.preventDefault();
     const cityName = cityInput.value;
    if(cityName){
        try{
            const data = await getWeatherData(cityName);
            console.log(data);
            displayWeatherData(data);
        }
        catch(err){
            console.log(err);
            displayError(err);
        }  
    }
    else{
        displayError("Please Enter City Name");
    }
    
});

async function getWeatherData(city){

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

       return await fetch(apiUrl)
                    .then(async resp => {
                        if(!resp.ok){
                            throw new Error("Unable to Fetch Weather .!");
                        }
                        console.log(resp);
                        return await resp.json();
                    })
                    .catch( resp =>{
                            throw new Error("Unable to Fetch Weather .!");
                    });


// const APIurl = `https://api.openweather.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;
//     let limit = 1;
//     const apiUrlForCoordinats = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIkey}`;
//     const {name,lat ,lon} = await fetch(apiUrlForCoordinats)
//                                     .then(async response => {
//                                         if(!response.ok){
//                                             throw new Error("Unable to Fetch the Weather.!");
//                                             return;
//                                         }
//                                         return (await response.json())[0];

//                                     });
//     // Check
//     //  console.log(`name = ${name} , lat = ${lat} , lon ${lon}`);
//     const apiUrlForWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${(lat).toFixed(2)}&lon=${(lon.toFixed(2))}&exclude=hourly,daily&appid=${APIkey}`;

//    try{
//     const resp = await fetch(apiUrlForWeather)
//     .then(async res =>{
//         if(!resp.ok){
//                 throw new Error("Unable to Fetch the Weather.!");
//                  return;
//             }
//             return await resp.json();
//     });
//    }
//    catch(err){
//         console.log(err);
//    }
//     console.log(resp)






    // if(!resp.ok){
    //     throw new Error("Unable to Fetch the Weather.!");
    //      return;
    // }
    // return await resp.json();
           

    // const response = await fetch(apiUrlForCoordinats);

    // if(!response.ok){
    //     throw new Error("Unable to Fetch the Weather.!");
    //     return;
    // }
    // const obj = await response.json();
    // const {name,lat ,lon} = obj[0];
    // console.log(`name = ${name} , lat = ${lat} , lon ${lon}`);
    // return await response.json();
    // [{lat , lon}] = [{response}];
    // lat = response.lat;
    // lon = response.log;

    // console.log(`latitude=${lat} -longitude=${lon}`)

    // console.log(response);

}

function displayWeatherData(data){

    const {
        name  : city ,
        main : {temp , humidity} ,
        weather : [{description , id }]

    } = data ;

    // console.log(name);
    console.log("Tempperature = "+temp);
    console.log("Humidity = "+humidity);
    console.log(description);

    card.textContent ="";
    card.style.display = "flex";

    // ------CREATING ELEMENTS --------------

    cityElement = document.createElement("h1");
    tempElement = document.createElement("p");
    humidityElement = document.createElement("P");
    descriptionElement = document.createElement("p");
    emojiElement = document.createElement("p");


    //------------ WRITING CONTENT INTO ELEMENTS -------------
    cityElement.textContent = city;
    tempElement.textContent =` Temperature = ${(temp-273.15).toFixed(1)}°C`;
    humidityElement.textContent =` Humidity = ${humidity}`;
    descriptionElement.textContent = description;
    emojiElement.textContent = getEmoji(id);

    //------ADDING STYLES TO NEW ELEMENTS ----------------

    cityElement.classList.add("cityName");
    tempElement.classList.add("temperature");
    humidityElement.classList.add("humidity");
    descriptionElement.classList.add("description");
    emojiElement.classList.add("emoji");

    // ----------- APPENDIND NEWLY CREATED ELEMENTS INTO CARD -------

    card.appendChild(cityElement);
    card.appendChild(tempElement);
    card.appendChild(humidityElement);
    card.appendChild(descriptionElement);
    card.appendChild(emojiElement);
}

function getEmoji(id){
    console.log(`${id} is iD `)
    if(id>=200 && id<=202) return "⛈️";
    else if(id>=203 && id<300)  return "🌩️";
    else if(id>=300 && id<500) return "🌦️";
    else if(id>=500 && id<600)  return "🌧️";
    else if (id>=600 && id<700)  return "🌨️";
    else if(id>=700 && id<800)   return "🌪️";
    else if(id == 800) return "⛅";
    else if(id > 800) return "☁️";
    else{
        return "💀";
    }

    // switch(id){
    //     case true :
    //         return "⛅";
    //     case id > 800:
    //         return "☁️";
    //     case (id>=200 && id<=202):
    //         return "⛈️";
    //     case (id>=203 && id<300):
    //         return "🌩️";
    //     case (id>=300 && id<500):
    //         return "🌦️";
    //     case (id>=500 && id<600):
    //         return "🌧️";
    //     case (id>=600 && id<700):
    //         return "🌨️";
    //     case id>=700 && id<800:
    //         return "🌪️";
    //     case id == 800 :
    //         return "⛅";
    //     case id > 800:
    //         return "☁️";
        // default:
        //     return "💀"
        
    }


function displayError(error){
    card.textContent = "";
    const ele = document.createElement("p");
    ele.textContent = error;
    ele.classList.add("erroeBox");

    card.style.display="flex";

    card.appendChild(ele);
}
document.getElementsByClassName()
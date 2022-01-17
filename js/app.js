//cargar la API
window.addEventListener("load",() =>  {

    let tempValue = document.getElementById("temp-value")
    let tempDescription = document.getElementById("temp-description")

    let tempLocation = document.getElementById("temp-location")
    let iconAnimated = document.getElementById("animated-icon")

    let speedWind = document.getElementById("wind-speed")
    let humidity = document.getElementById("temp-humidity")
    let presion = document.getElementById("presion")


    let day = document.getElementById("day")
    // let tempDay = document.getElementById("temp-day")
    // let tempNight = document.getElementById("temp-night")

    let day0 = document.getElementById("day-0")
    let day1 = document.getElementById("day-1")
    const API_KEY = 'd6ad4f9e8c44a43a79c9c40ac7baea6e'

    function asignar_icono (description_temp){
      
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            let lon = posicion.coords.longitude
            let lat = posicion.coords.latitude

            // clima del momento
            // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=d6ad4f9e8c44a43a79c9c40ac7baea6e`
            // clima para 4 dias
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&lang=es&appid=${API_KEY}`
            fetch(url) 
            .then(response => response.json())
            .then(data => {
                console.log(data)

                let temp = Math.round(data.current.temp)
                tempValue.textContent = `${temp} °C`

                let description = data.current.weather[0].description
                tempDescription.textContent = description


                let location = data.timezone
                tempLocation.textContent = location
                

                let speed = data.current.wind_speed
                speedWind.textContent = `${speed} m/s`

                let hum = data.current.humidity
                humidity.textContent = `${hum} %`

                let presionAtmos = data.current.pressure
                presion.textContent = presionAtmos

                switch(data.current.weather[0].main){
                    case 'Thunderstorm':
                      iconAnimated.src='../animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconAnimated.src='../animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconAnimated.src='../animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconAnimated.src='../animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconAnimated.src='../animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconAnimated.src='../animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconAnimated.src='../animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconAnimated.src='../animated/cloudy-day-1.svg'
                      console.log('por defecto');
                }
                let dayNow = new Date().getDay()
                

                const days=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
                console.log(days[dayNow]); // domingo=0,lunes=1,martes=2,mier=3,jue=4,vie=5

                let nameDayNow = days[dayNow]
                day0.textContent = nameDayNow
                
                day1.textContent = days[dayNow + 1]

                // resolver problema de repeticion
                document.getElementById("day-2").textContent =  days[dayNow + 2]
                document.getElementById("day-3").textContent =  days[dayNow + 3]
                document.getElementById("day-4").textContent =  days[dayNow + 4-7]
                // document.getElementById("day-4").textContent =  days[dayNow + 4]

                document.getElementById("temp-day").textContent = data.daily[0].feels_like.day
                document.getElementById("temp-night").textContent = data.daily[0].feels_like.night

                document.getElementById("temp-day-1").textContent = data.daily[1].feels_like.day
                document.getElementById("temp-night-1").textContent = data.daily[1].feels_like.night
                
                document.getElementById("temp-day-2").textContent = data.daily[2].feels_like.day
                document.getElementById("temp-night-2").textContent = data.daily[2].feels_like.night

                document.getElementById("temp-day-3").textContent = data.daily[3].feels_like.day
                document.getElementById("temp-night-3").textContent = data.daily[3].feels_like.night

                document.getElementById("temp-day-4").textContent = data.daily[4].feels_like.day
                document.getElementById("temp-night-4").textContent = data.daily[4].feels_like.night
                
                // let day_night = data.daily[0].feels_like.night
                // tempNight.textContent = day_night

                // let day_day = data.daily[1].feels_like.day
                // tempDay.textContent = day_day

                

            })
        })
            
            

    
        
    }
})
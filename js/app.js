//  preloader
window.onload = function(){
  $('#onload').fadeOut();
  $('body').removeClass('hidden');
}

window.addEventListener("load",() =>  {
    
  // cargamos variables del DOM
    let tempValue = document.getElementById("temp-value")
    let tempDescription = document.getElementById("temp-description")

    let tempLocation = document.getElementById("temp-location")
    let iconAnimated = document.getElementById("animated-icon")
    let speedWind = document.getElementById("wind-speed")
    let humidity = document.getElementById("temp-humidity")
    let presion = document.getElementById("presion")
    let iconDay_0 = document.getElementById("animated-icon-0")
    let iconDay_1 = document.getElementById("animated-icon-1")
    let iconDay_2 = document.getElementById("animated-icon-2")
    let iconDay_3 = document.getElementById("animated-icon-3")
    let iconDay_4 = document.getElementById("animated-icon-4")

    function asignar_icono (description_temp,icon_day){
      switch(description_temp){
        case 'tormenta con lluvia ligera':
          icon_day.src='/animated/thunder.svg'
          break;
        case 'Thunderstorm':
          icon_day.src='/animated/thunder.svg'
          console.log('TORMENTA');
          break;
        case 'Drizzle':
          icon_day.src='/animated/rainy-2.svg'
          break;
        case 'Snow':
          icon_day.src='/animated/snowy-6.svg'
          break;                        
        case 'Clear':
          icon_day.src='/animated/day.svg'
          break;
        case 'Atmosphere':
          icon_day.src='/animated/weather.svg'
          break;  
        case 'algo de nubes':
          icon_day.src='/animated/cloudy-day-1.svg'
          break;  
        case 'nubes dispersas':
            icon_day.src='/animated/cloudy.svg'
          break;
        case 'lluvia ligera':
            icon_day.src='/animated/rainy-4.svg'
            break;
        case 'lluvia moderada':
          icon_day.src='/animated/rainy-5.svg'            
          break;
        case 'lluvia de gran intensidad':
          icon_day.src='/animated/rainy-6.svg'
          break;
        case 'muy nuboso':
          icon_day.src='/animated/cloudy.svg'
          break;  
        case 'cielo limpio':
          icon_day.src='/animated/day.svg'
          break;       
        default:
          icon_day.src='/animated/cloudy-day-1.svg'
          console.log('por defecto');
      }
    }

    let day0 = document.getElementById("day-0")
    let day1 = document.getElementById("day-1")
    const API_KEY = 'd6ad4f9e8c44a43a79c9c40ac7baea6e'
    

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

                let icon_animated = data.current.weather[0].description
                asignar_icono(icon_animated,iconAnimated)

                let description_temp_0 = data.daily[0].weather[0].description
                asignar_icono(description_temp_0,iconDay_0)
                console.log(description_temp_0)


                let description_temp_1 = data.daily[1].weather[0].description
                asignar_icono(description_temp_1,iconDay_1)

                let description_temp_2 = data.daily[2].weather[0].description
                asignar_icono(description_temp_2,iconDay_2)

                let description_temp_3 = data.daily[3].weather[0].description
                asignar_icono(description_temp_3,iconDay_3)

                let description_temp_4 = data.daily[4].weather[0].description
                asignar_icono(description_temp_4,iconDay_4)

                let dayNow = new Date().getDay()
                
                const days=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo","Lunes","Martes","Miercoles","Jueves"]
                console.log(days[dayNow]); // domingo=0,lunes=1,martes=2,mier=3,jue=4,vie=5,sabado=6

                let nameDayNow = days[dayNow]
                day0.textContent = nameDayNow
                
                day1.textContent = days[dayNow + 1]

                // resolver problema de repeticion
                document.getElementById("day-2").textContent =  days[dayNow + 2]
                document.getElementById("day-3").textContent =  days[dayNow + 3]
                document.getElementById("day-4").textContent =  days[dayNow + 4]

                document.getElementById("temp-day").textContent = `${Math.round(data.daily[0].temp.min)} °C`
                document.getElementById("temp-night").textContent = `${Math.round(data.daily[0].temp.max)} °C`

                document.getElementById("temp-day-1").textContent = `${Math.round(data.daily[1].temp.min)} °C`
                document.getElementById("temp-night-1").textContent = `${Math.round(data.daily[1].temp.max)} °C`
                
                document.getElementById("temp-day-2").textContent = `${Math.round(data.daily[2].temp.min)} °C`
                document.getElementById("temp-night-2").textContent = `${Math.round(data.daily[2].temp.max)} °C`

                document.getElementById("temp-day-3").textContent = `${Math.round(data.daily[3].temp.min)} °C`
                document.getElementById("temp-night-3").textContent = `${Math.round(data.daily[3].temp.max)} °C`

                document.getElementById("temp-day-4").textContent = `${Math.round(data.daily[4].temp.min)} °C`
                document.getElementById("temp-night-4").textContent = `${Math.round(data.daily[4].temp.max)} °C`
              
                

            })
        })
            
            

    
        
    }
})
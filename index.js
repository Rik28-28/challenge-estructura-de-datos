const fs = require('fs');
var data = require("./datastructure-challenge/input.json")

var initial = {
    weather: {
        id: 800,
        main: "Clear",
        description: "Sky is Clear",
        icon: "02d"
    },
    cities: []
}

var weathers = [initial]

data.cities.map((citie) => {

    let shouldContinueMapping = true;

    /*
    Mapea la matriz "weathers" y verifica si el ID del clima en el objeto "weather" coincide con el ID del clima en el objeto "citie"
    */

    weathers.map((weather, index) => {
        if (shouldContinueMapping) {
            if (weather.weather.id === citie.weather[0].id) {
                delete citie.weather
                weather.cities.push(citie)
                shouldContinueMapping = false
                /*
                    Si el ID del clima no coincide y se ha llegado al final de la matriz "weathers", crea un nuevo objeto "newWeather"
                */
            } else if (index === weathers.length - 1) {
                var newWeather = {
                    weather: citie.weather[0],
                    cities: []
                }
                delete citie.weather
                newWeather.cities.push(citie)
                weathers.push(newWeather)
                shouldContinueMapping = false
            }
        }
    })

})

let datos = JSON.stringify(weathers)

fs.writeFile('newdatos.json', datos, (err) => {
    if (err) throw err;
    console.log('Archivo creado exitosamente!');
})
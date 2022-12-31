document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value
    
    if(input!==''){
        clearInfo()
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(input)}&limit=1&appid=2a92e269c9abc5b813fb9794fa5adace`
          
        let results = await fetch(url)
        let json = await results.json()
        
        if(json.length>0){
            let lat = json[0].lat
            let lon = json[0].lon
            
            let urlPesquisa = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2a92e269c9abc5b813fb9794fa5adace&units=metric`

            let resultsPesquisa = await fetch(urlPesquisa)
            if (resultsPesquisa.status === 200){

                let urlFinal = resultsPesquisa.url

                let resultado = await fetch(urlFinal)
                let weatherData = await resultado.json()
                
                if(weatherData.cod === 200){
                    console.log(weatherData)
                    showInfo({
                        name: weatherData.name,
                        country: weatherData.sys.country,
                        temp: weatherData.main.temp,
                        tempIcon: weatherData.weather[0].icon,
                        windSpeed: weatherData.wind.speed,
                        windAngle: weatherData.wind.deg
                    })
                } else{
                    clearInfo()
                    showWarning('Ocorreu algum erro inesperado.')
                }

            }else{
                clearInfo()
                showWarning('Não encontramos essa localização.')
            }
        } else {
            clearInfo()
            showWarning('Não encontramos essa localização.')
        }

        
    }else{
        clearInfo()
    }
})

function showInfo(weatherData){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${weatherData.name}, ${weatherData.country}`
    document.querySelector('.tempInfo').innerHTML = `${weatherData.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${weatherData.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${weatherData.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${weatherData.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}
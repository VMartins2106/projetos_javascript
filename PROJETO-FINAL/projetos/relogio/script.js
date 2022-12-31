let digitalElement = document.querySelector('.digital')
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function updateClock(){

    //RELÓGIO DIGITAL
    let now = new Date()
    let hour = now.getHours()
    let min = now.getMinutes()
    let sec = now.getSeconds()

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(min)}:${fixZero(sec)}`

    //RELÓGIO ANALÓGICO
    let sDeg = ((360/60) * sec) - 90
    let mDeg = ((360/60) * min) - 90
    let hDeg = ((360/12) * hour) - 90

    sElement.style.transform = `rotate(${sDeg}deg)`
    mElement.style.transform = `rotate(${mDeg}deg)`
    hElement.style.transform = `rotate(${hDeg}deg)`
}

function fixZero(time){
    /*
    if (time < 10){
        return '0'+time
    }else{
        return time
    }
    SIMPLIFICANDO : 
    */
    return time < 10 ? `0${time}` : time
}

setInterval(updateClock, 1000);
updateClock()
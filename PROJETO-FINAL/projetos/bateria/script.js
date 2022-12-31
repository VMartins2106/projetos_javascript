document.body.addEventListener('keyup',(event)=>{
    playSound(event.code.toLowerCase())
})
document.querySelector('.composer button').addEventListener('click', ()=>{
    let teclas  = document.querySelector('#input').value

    if (teclas != ''){
        let songArray = teclas.split('')
        playComposition(songArray)
    }
})

function playSound(sound){
    let enter = ''
    if (sound == 'enter'){
        enter = sound
    }
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key=${sound}]`)

    if(audioElement){
        audioElement.currentTime = 0
        audioElement.play()
    }
    if(keyElement){
        keyElement.classList.add('active')
        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 300);
    }
    if(enter != ''){
        songArray2 = document.querySelector('#input').value
        if (songArray2 != ''){
            let musica = songArray2.split('')
            playComposition(musica)
        }        
    }
}

function playComposition(songArray){

    let wait = 0

    for (let songItem of songArray){

        setTimeout(()=>{
            playSound(`key${songItem}`)
        },wait)

        wait += 250
    }
}
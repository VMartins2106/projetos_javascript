
// INITIAL DATA
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// EVENTS
document.querySelector('.scoreArea button').addEventListener('click',resetQuiz)

// FUNCTIONS
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) *100)
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''

        let optionsHtml = ''
        for (let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click',optionClickEvent)
        })
    } else{
        finishQuiz()
    }
}
function optionClickEvent(event){
    
    let clickedOption = parseInt(event.target.getAttribute('data-op'))
    if(questions[currentQuestion].answer === clickedOption){
        setTimeout(addCorrect(event),0);
        correctAnswers++
    } else{
        setTimeout(addWrong(event),0);
    }
    currentQuestion++
    setTimeout(showQuestion,500);
}
function addCorrect(event){
    event.target.classList.add('correct')
    setTimeout(() => {
        event.target.classList.remove('correct')
    }, 500);
}
function addWrong(event){
    event.target.classList.add('wrong')
    setTimeout(() => {
        event.target.classList.remove('wrong')
    }, 500);
}
function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if(points<30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!'
        document.querySelector('.scorePct').style.color = "#ff0000" 
    } else if(points>=30 && points<70){
        document.querySelector('.scoreText1').innerHTML = 'Caramba... parabéns!'
        document.querySelector('.scorePct').style.color = "#ffff00"
    } else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Você foi o melhor!'
        document.querySelector('.scorePct').style.color = "#0d630d"
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`


    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`
}
function resetQuiz(){
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}
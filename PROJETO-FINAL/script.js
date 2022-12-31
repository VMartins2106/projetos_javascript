

// EVENTS
document.querySelector('.closeWindow').addEventListener('click',closeProjectsWindow)
document.getElementById('li1').addEventListener('click',openProject)
document.querySelector('.sair img').addEventListener('click',closeCrud)

for(let i = 0; i<document.querySelectorAll('.linkProjeto').length;i++){
    document.querySelectorAll('.linkProjeto')[i].addEventListener('click',openProject)
 }

 document.querySelector('.finish').addEventListener('click',salvarDados)

// FUNCTIONS 
function openProjectsWindow(){
    document.querySelector('.header--options').style.opacity = '0'
    document.querySelector('.projetos').style.marginLeft = '0%'
    document.querySelector('.projetos').style.boxShadow = '#4983b9 10px 15px 29px 0px'
}
function closeProjectsWindow(){
    document.querySelector('.header--options').style.opacity = '1'
    document.querySelector('.projetos').style.marginLeft = '-30%'
    setTimeout(() => {
        document.querySelector('.projetos').style.boxShadow = 'none'
    }, 2000);
}
function openProject(event){
    let nome = event.target.getAttribute('data-link')
    event.target.style.cursor = 'progress'
    setTimeout(() => {
        event.target.style.cursor = 'pointer'
        window.open(`http://127.0.0.1:5500/projetos/${nome}/${nome}.html`, "_blank");
    }, 1500);
    cursorPointer(event)
}
function cadastrar(){
    let el = document.getElementById('crud')
    document.getElementById('textoForm').innerText = 'Cadastro de usuário'

    document.getElementById('nome').innerText = 'Primeiro nome'
    let nome = document.getElementsByName('firstname')[0]
    nome.placeholder='Digite seu primeiro nome';
    nome.type='text';
    document.getElementById('sobrenome').innerText = 'Sobrenome'
    document.getElementById('celular').innerText = 'Celular'
    document.getElementsByName('number')[0].placeholder='(xx) xxxx-xxxx';
    document.getElementById('email').innerText = 'E-mail'
    document.getElementsByName('email')[0].placeholder='Digite seu email';
    document.getElementById('senha').innerText = 'Senha'
    document.getElementsByName('password')[0].placeholder='Digite sua senha';
    document.getElementById('senhaC').innerText = 'Confirme sua senha'
    document.getElementsByName('Confirmpassword')[0].placeholder='Confirme sua senha';

    document.querySelector('#caixaCelular').style.display='flex'
    document.querySelector('#input2').style.display='flex'
    document.querySelector('#input3').style.display='flex'
    document.querySelector('#input4').style.display='flex'

    // MUDAR LAYOUT EM RELAÇÃO AO POSICIONAMENTO
    if(el.style.marginLeft == '10%' && el.classList.contains('entrar')){
        el.classList.remove('entrar')
        el.classList.add('cadastro')
    }else if(el.classList.contains('entrar')){
        el.classList.remove('entrar')
        el.classList.add('cadastro')
        document.querySelector('.cadastro').style.marginLeft = '10%'
        let sobrenome = document.getElementsByName('lastname')[0]
        sobrenome.placeholder='Digite seu último nome';
        sobrenome.type='text';
    } else{
        document.querySelector('.cadastro').style.marginLeft = '10%'
        let sobrenome = document.getElementsByName('lastname')[0]
        sobrenome.placeholder='Digite seu último nome';
        sobrenome.type='text';
    }
}
function entrar(){
    let el = document.getElementById('crud')
    document.getElementById('textoForm').innerText = 'Autenticar usuário'

    document.getElementById('nome').innerText = 'E-mail'
    document.getElementsByName('firstname')[0].placeholder='Digite seu email';
    document.getElementById('firstname').type='email';
    document.getElementById('sobrenome').innerText = 'Senha'
    document.getElementsByName('lastname')[0].placeholder='Digite sua senha';
    document.getElementById('lastname').type='password';
    document.querySelector('#caixaCelular').style.display='none'
    document.querySelector('#input2').style.display='none'
    document.querySelector('#input3').style.display='none'
    document.querySelector('#input4').style.display='none'

    // MUDAR LAYOUT EM RELAÇÃO AO POSICIONAMENTO
    if(el.style.marginLeft == '10%' && el.classList.contains('cadastro')){
        el.classList.remove('cadastro')
        el.classList.add('entrar')
    }else{
        el.classList.remove('cadastro')
        el.classList.add('entrar')
        document.querySelector('.entrar').style.marginLeft = '10%'
    }
}
function closeCrud(){
    let el = document.getElementById('crud')
    el.style.marginLeft = '110%'
}
function salvarDados(){
    if(document.getElementById('crud').classList.contains('cadastro')){
        var nome = document.querySelector('#firstname').value
        var sobrenome = document.querySelector('#lastname').value        
        var celular = document.querySelector('#number').value        
        var email = document.querySelector('#email').value        
        var senha = document.querySelector('#password').value        
        var senhaConfirmada = document.querySelector('#Confirmpassword').value
    } else if(document.getElementById('crud').classList.contains('entrar')){
        var email = document.querySelector('#firstname').value
        var senha = document.querySelector('#lastname').value
    }
}
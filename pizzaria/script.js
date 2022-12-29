let modalQTD = 1
let cart = []
let modalKey = 0

const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

// LISTAGEM DAS PIZZAS
pizzaJson.map((item, index) => {
    let pizzaItem = select('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQTD = 1
        modalKey = key

        select('.pizzaBig img').src = pizzaJson[key].img
        select('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        select('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        select('.pizzaInfo--size.selected').classList.remove('selected')
        selectAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{

            if(sizeIndex == 1){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        })

        select('.pizzaInfo--qt').innerHTML = modalQTD

        select('.pizzaWindowArea').style.opacity = 0
        select('.pizzaWindowArea').style.display = 'flex'   
        setTimeout(() => {
            select('.pizzaWindowArea').style.opacity = 1
        }, 200);
    })

    select('.pizza-area').append(pizzaItem)
})

// Eventos do modal

// FECHAR MODEL
function closeModal(){
    select('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        select('.pizzaWindowArea').style.display = 'none'
    }, 500);
}
selectAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click',closeModal)
})

// ADICIONAR / RETIRAR QUANTIDADE
select('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQTD>1){
        modalQTD--
        select('.pizzaInfo--qt').innerHTML = modalQTD
    }
})
select('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQTD++
    select('.pizzaInfo--qt').innerHTML = modalQTD
})

// MUDAR TAMANHO E PREÇO RESPECTIVO
selectAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    // select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson.price.toFixed(2)}`
    size.addEventListener('click',()=> {
        select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].price.toFixed(2)}`
        /*
        OU PEGAMOS O NOME E DESCOBRIMOS O VALOR DA ATUAL
        let nome = select('.pizzaInfo h1').innerText
        pizzaJson.filter((value)=>{
            if (value.name == nome){
                valor = value.price
                return valor
            }
            return 
        })
        //select('.pizzaInfo--actualPrice').innerHTML = `R$ ${valor.toFixed(2)}`
        */
        select('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
        if(sizeIndex==0){
            select('.pizzaInfo--actualPrice').innerHTML = `R$ ${((pizzaJson[modalKey].price) - 5).toFixed(2)}`
            /* OU PEGAMOS O PREÇO E MODIFICAMOS E ALTERAMOS
            let preco = select('.pizzaInfo--actualPrice').innerText
            let lista_preco = preco.split(' ')
            lista_preco = parseFloat(lista_preco[1])
            novo_preco = (lista_preco - 5).toFixed(2)
            select('.pizzaInfo--actualPrice').innerHTML = `R$ ${novo_preco}`*/
        } else if(sizeIndex==2){
            select('.pizzaInfo--actualPrice').innerHTML = `R$ ${((pizzaJson[modalKey].price) + 5).toFixed(2)}`
            /* OU PEGAMOS O PREÇO E MODIFICAMOS E ALTERAMOS
            let preco = select('.pizzaInfo--actualPrice').innerText
            let lista_preco = preco.split(' ')
            lista_preco = parseFloat(lista_preco[1])
            novo_preco = (lista_preco + 5).toFixed(2)
            select('.pizzaInfo--actualPrice').innerHTML = `R$ ${novo_preco}`*/
        }
    })
})

// ADICIONAR AO CARRINHO
select('.pizzaInfo--addButton').addEventListener('click',()=> {
    // QUAL A PIZZA ?
    // modalKey
    // QUAL O TAMANHO ?
    let size = select('.pizzaInfo--size.selected').getAttribute('data-key')
    // size
    // QUANTAS PIZZAS ?
    // modalQTD
    // QUAL VALOR TOTAL ?
    let valor_total
    if(size==0){
        valor_total = (pizzaJson[modalKey].price - 5).toFixed(2)
    } else if(size==1){
        valor_total = pizzaJson[modalKey].price
    } else if(size==2){
        valor_total = (pizzaJson[modalKey].price + 5).toFixed(2)
    }
    valor_total = valor_total * modalQTD;
    // valor_total

    // ADICIONA TODOS OS DETALHES CARRINHO

    let identifier = pizzaJson[modalKey].id + '@' + parseInt(size)

    let key = cart.findIndex((item)=>item.identifier == identifier)

    if (key > -1){
        cart[key].qtd += modalQTD
        cart[key].valor += parseFloat(valor_total.toFixed(2))
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: parseInt(size),
            qtd: modalQTD,
            valor: parseFloat(valor_total.toFixed(2))
        })
    }
    updateCart()
    // FECHA O MODAL
    closeModal()
})

// ABERTURA DO CARRINHO NO MOBILE
select('.menu-openner').addEventListener('click',()=>{
    if(cart.length>0){
        select('aside').style.left = '0'
    }
})

select('.menu-closer').addEventListener('click',()=>select('aside').style.left = '100vw')

// UPDATE CART
function updateCart(){

    select('.menu-openner span').innerHTML = cart.length

    if(cart.length>0){
        select('aside').classList.add('show')

        select('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for ( let i in cart ){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)

            let cartItem = select('.models .cart--item').cloneNode(true)

            let pizzaSizeName = '';

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }
        
            let preco_total=0

            if (pizzaSizeName == 'P'){
                preco_total = (pizzaItem.price + 5).toFixed(2)
            } else if(pizzaSizeName == 'G'){
                preco_total = (pizzaItem.price + 5).toFixed(2)
            } else{
                preco_total = pizzaItem.price
            }

            subtotal += preco_total * cart[i].qtd

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qtd > 1){
                    cart[i].qtd--
                } else {
                    cart.splice(i,1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qtd++
                updateCart()
            })

            select('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        select('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        select('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        select('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        select('aside').classList.remove('show')
        select('aside').style.left = '100vw'
    }
}
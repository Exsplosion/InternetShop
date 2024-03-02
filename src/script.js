import { generateProduct,generateBtn } from "./generate"  //Денис
import { show,autoSlide } from "./slider"
const images = document.querySelectorAll('.slider-img')
const controlls = document.querySelectorAll('.controlls')
let imageIndex = 0

setInterval(autoSlide, 4000);
show(imageIndex);

const cartwindow = document.querySelector('.cartwindow')
    const close = document.querySelector('.close')
    close.addEventListener('click', () => {
        cartwindow.classList.remove('opened')
    })

    const open = document.querySelector('.inner__button')
    open.addEventListener('click', () => {
        cartwindow.classList.add('opened')
})

const mainBlock = document.querySelector('.main__blockcard')

const storage = []
setName = () => localStorage.setItem('DataFromJs',JSON.stringify(storage))
getName = () => localStorage.getItem('DataFromJs')
let sum = 0

sumOfItem = (data) => {
    let totalSum = 0;
    storage.forEach(item => {
        totalSum += parseFloat(item.prod);
    });
    return totalSum.toFixed(2); 
}
function updateTotalSum() {
    const sumItem = document.querySelector('.content_sumitem');
    sumItem.innerText = `Итого ${sumOfItem()} $`
}
function saveTotalSumToLocalStorage() {
    localStorage.setItem('totalSum', sumOfItem());
}

function generateCard(srcImg,cardprice,cardproduct){
    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = srcImg + '?random'+ Math.random()
    img.className = 'card__img'
    card.append(img)

    const btnadd = generateBtn('card__btnadd','Добавить в корзину')
    const btnCheck = generateBtn('card__check','Быстрый просмотр')

    const price = document.createElement('div')
    price.className = 'card__price'
    price.innerText = cardprice

    const product = document.createElement('div')

    product.className = 'card__product'
    product.innerText = cardproduct+'$'

    card.append(price)
    card.append(product)
    card.append(btnadd)
    card.append(btnCheck)
    btnCheck.addEventListener('click', () => {
        const srcImg = img.src
        const modalImg = document.querySelector('.modal-img')
        modalImg.src = srcImg
        const modal = document.querySelector('.modal')
        modal.style.display = 'block' 
    })
    
    
    const closeModal = document.querySelector('.close-modal')
    closeModal.addEventListener('click', () => {
        const modal = document.querySelector('.modal')
        modal.style.display = 'none'
    }) //Настя
    

    btnadd.addEventListener('click', () => {
    
        const cartContent = document.querySelector('.content_item')

        const data = {
            id: Date.now().toString(),
            price:cardprice,
            prod:cardproduct,
        }

        const cartproduct = generateProduct(data)
        
        cartContent.appendChild(cartproduct)
        storage.push(data)

        setName()

        updateTotalSum();
        const sumItem = document.querySelector('.content_sumitem')
        sumItem.innerText = `Итого ${sumOfItem()} $` 
        if (storage.length > 12)
        {
            
        }
        saveTotalSumToLocalStorage()
    })
    return card
}
window.addEventListener('DOMContentLoaded',() => {
    const totalSumFromLocalStorage = localStorage.getItem('totalSum')
    if (totalSumFromLocalStorage) {
        const sumItem = document.querySelector('.content_sumitem')
        
        sumItem.innerText = `Итого  ${totalSumFromLocalStorage} $`
    }

    const data = getName()
    const cartContent = document.querySelector('.content_item')
    if (data) {
        const cards = JSON.parse(data)
        cards.forEach((cardData) => {
            const card = generateProduct(cardData)
            cartContent.append(card);
        })
        storage.push(...cards)
    }
})
fetch('https://65e3122c88c4088649f542c0.mockapi.io/stuff')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            const card = generateCard(element.img,element.name,element.price)
            mainBlock.append(card)
        })
    })
const btnDelete = document.querySelector('.buttons_delete')

btnDelete.addEventListener('click', () => {
    const cartContent = document.querySelector('.content_item')
    if (cartContent) {
        while (cartContent.firstChild) {
            cartContent.removeChild(cartContent.firstChild)
        }
        storage.length = 0
        localStorage.clear()
        localStorage.setItem('totalSum', 0)
        const itemSum = document.querySelector('.content_sumitem')
        itemSum.innerText = 'Итого 0 $'        
    }    
})
const searchInput = document.querySelector('.inner__input')

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase().trim()
    const cards = document.querySelectorAll('.card')
    if (searchText !== '') {
        cards.forEach(card => {
            const productName = card.querySelector('.card__price').innerText.toLowerCase()

            if (productName.includes(searchText)) {
                card.classList.add('highlight')
                card.querySelector('.card__price').classList.add('highlight-price')
                card.style.display = 'flex'               
            } else {
                card.classList.remove('highlight')
                card.querySelector('.card__price').classList.remove('highlight-price')
                card.style.display = 'none'               
            }
        })
    } else {
        cards.forEach(card => {
            card.classList.remove('highlight')
            card.querySelector('.card__price').classList.remove('highlight-price') 
            card.style.display = 'flex' 
        })
    }
})
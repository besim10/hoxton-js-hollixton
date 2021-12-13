
const state = {
    store: []
}


function fetchDataFromServer(){
    return fetch('http://localhost:3000/store').then(resp => resp.json())
}
fetchDataFromServer().then(function (resp){
    state.store = resp
    render()
})



function renderHeader(){

    const headerEl = document.createElement('header')
    
    const logoH1El = document.createElement('h1')
    logoH1El.textContent = 'HOLLIXTON'

    const navEl = document.createElement('nav')
    navEl.setAttribute('class','header-Nav')

    const leftMenu = document.createElement('ul')
    leftMenu.classList.add('menu-header')
    leftMenu.classList.add('left-menu-header')

    const listItemGirls = document.createElement('li')
    listItemGirls.textContent = 'Girls'
    const listItemBoys = document.createElement('li')
    listItemBoys.textContent = 'Guys'
    const listItemSale = document.createElement('li')
    listItemSale.textContent = 'Sale'

    const rightMenu = document.createElement('ul')
    rightMenu.classList.add('menu-header')
    rightMenu.classList.add('right-menu-header')

    const listItemSearch = document.createElement('li')
    const searchImg = document.createElement('img')
    searchImg.setAttribute('class','icons')
    searchImg.setAttribute('src','icons/search_icon.svg')

    const listItemProf = document.createElement('li')
    const personImg = document.createElement('img')
    personImg.setAttribute('class','icons')
    personImg.setAttribute('src','icons/person-icon.svg')
    
    const listItemBag = document.createElement('li')
    const bagImg = document.createElement('img')
    bagImg.setAttribute('class','icons')
    bagImg.setAttribute('src','icons/bag-icon.svg')

    document.body.append(headerEl)
    headerEl.append(logoH1El,navEl)
    navEl.append(leftMenu,rightMenu)
    leftMenu.append(listItemGirls,listItemBoys,listItemSale)
    rightMenu.append(listItemSearch, listItemProf, listItemBag)
    listItemSearch.append(searchImg)
    listItemProf.append(personImg)
    listItemBag.append(bagImg)

}
function renderMain(){
    const mainEl = document.createElement('main')
    
    const titleEl = document.createElement('h2')
    titleEl.textContent = 'Home'

    const articleEl = document.createElement('article')
    articleEl.setAttribute('class','article')

    const ulListEl = document.createElement('ul')
    ulListEl.setAttribute('class','article-list')

    ulListEl.innerHTML = ''

    for(const card of state.store){

        const listItem = document.createElement('li')
        listItem.setAttribute('class','article-list-item')
    
        const newProductEl = document.createElement('span')
        newProductEl.setAttribute('class','newProduct')
        newProductEl.textContent = 'NEW!'
    
        const descriptionEl = document.createElement('div')
        descriptionEl.setAttribute('class','article-list-item--description')
        const imageEl = document.createElement('img')
        imageEl.setAttribute('src', card.image)
        
        const productTitleEl = document.createElement('h3')
        productTitleEl.textContent = card.name
    
        const productPriceEl = document.createElement('h4')
        productPriceEl.textContent = `£${card.price}`

        ulListEl.append(listItem)
        listItem.append(newProductEl, descriptionEl)
        descriptionEl.append(imageEl,productTitleEl,productPriceEl)
    }
    
    document.body.append(mainEl)
    mainEl.append(titleEl, articleEl)
    articleEl.append(ulListEl)
    
}


function renderFooter(){
    const footerEl = document.createElement('footer')
    footerEl.textContent = 'Footer here!'

    document.body.append(footerEl)
}
function render(){
    document.body.innerHTML = ''
    renderHeader()
    renderMain()
    renderFooter() 
}
render()

const state = {
    store: [],
    tab: '',
    selectedProduct: null,
    search: '',
    modal : ''
}

//server function

function getDataFromServer() {
    return fetch('http://localhost:3000/store').then(resp => resp.json())
}

//Helper functions
function isItemNew(product) {
    const daysToConsider = 11

    // check how many ms are there in 10 days
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const msForTenDaysAgo = Date.now() - day * daysToConsider

    // get ms for current product
    const msForProductDate = Date.parse(product.dateEntered)

    // check if the product ms is more recent than 10 days ago
    return msForProductDate > msForTenDaysAgo
}

function getProductsToDisplay() {

    let productsToDisplay = state.store

    productsToDisplay = productsToDisplay.filter(product => product.type.includes(state.tab))

    if (state.tab === 'Sale') {
        productsToDisplay = state.store.filter(product => product.discountedPrice)
    }

    if(state.search !== '') productsToDisplay = productsToDisplay.filter(product => product.name.toUpperCase().includes(state.search))

    return productsToDisplay
}

function listenToLeftMenuHeader(logoH1El, listItemGirls, listItemGuys, listItemSale) {
    logoH1El.addEventListener('click', function (event) {
        event.preventDefault()
        state.tab = ''
        state.search = ''
        state.selectedProduct = null
        render()
    })

    listItemGirls.addEventListener('click', function (event) {
        event.preventDefault()
        state.tab = listItemGirls.textContent
        state.selectedProduct = null
        state.search = ''
        render()
    })

    listItemGuys.addEventListener('click', function (event) {
        event.preventDefault()
        state.tab = listItemGuys.textContent
        state.selectedProduct = null
        state.search = ''
        render()
    })

    listItemSale.addEventListener('click', function (event) {
        event.preventDefault()
        state.tab = listItemSale.textContent
        state.selectedProduct = null
        state.search = ''
        render()
    })
}
function renderHeader() {

    const headerEl = document.createElement('header')

    const logoH1El = document.createElement('h1')
    logoH1El.setAttribute('class', 'header-logo')
    logoH1El.textContent = 'HOLLIXTON'

    const navEl = document.createElement('nav')
    navEl.setAttribute('class', 'header-nav')

    const leftMenu = document.createElement('ul')
    leftMenu.classList.add('menu-header')
    leftMenu.classList.add('left-menu-header')

    const listItemGirls = document.createElement('li')
    listItemGirls.setAttribute('class', 'left-menu-header__item')
    const aTagGirlsEl = document.createElement('a')
    aTagGirlsEl.textContent = 'Girls'

    const listItemGuys = document.createElement('li')
    listItemGuys.setAttribute('class', 'left-menu-header__item')
    const aTagGuysEl = document.createElement('a')
    aTagGuysEl.textContent = 'Guys'

    const listItemSale = document.createElement('li')
    listItemSale.setAttribute('class', 'left-menu-header__item')
    const aTagSaleEl = document.createElement('a')
    aTagSaleEl.textContent = 'Sale'

    listenToLeftMenuHeader(logoH1El, listItemGirls, listItemGuys, listItemSale)

    const rightMenu = document.createElement('ul')
    rightMenu.classList.add('menu-header')
    rightMenu.classList.add('right-menu-header')

    const listItemSearch = document.createElement('li')
    const searchImg = document.createElement('img')
    searchImg.setAttribute('class', 'icons')
    searchImg.setAttribute('src', 'icons/search_icon.svg')
    listItemSearch.addEventListener('click',function(){
        state.modal = 'search'

        render()
    })


    const listItemProf = document.createElement('li')
    const personImg = document.createElement('img')
    personImg.setAttribute('class', 'icons')
    personImg.setAttribute('src', 'icons/person-icon.svg')
    listItemProf.addEventListener('click',function(){
        state.modal = 'profile'

        render()
    })
    
    const listItemBag = document.createElement('li')
    const bagImg = document.createElement('img')
    bagImg.setAttribute('class', 'icons')
    bagImg.setAttribute('src', 'icons/bag-icon.svg')

    document.body.append(headerEl)
    headerEl.append(logoH1El, navEl)
    navEl.append(leftMenu, rightMenu)
    leftMenu.append(listItemGirls, listItemGuys, listItemSale)
    rightMenu.append(listItemSearch, listItemProf, listItemBag)
    listItemSearch.append(searchImg)
    listItemProf.append(personImg)
    listItemBag.append(bagImg)
    listItemGirls.append(aTagGirlsEl)
    listItemGuys.append(aTagGuysEl)
    listItemSale.append(aTagSaleEl)

}
function renderStoreItem(product, ulListEl) {

    const listItem = document.createElement('li')
    listItem.setAttribute('class', 'product-item')

    listItem.addEventListener('click', function (event) {
        event.preventDefault()
        
        state.selectedProduct = product

        render()
    })
    const imageEl = document.createElement('img')
    imageEl.setAttribute('class', 'product-item__image')
    imageEl.setAttribute('alt', product.name)
    imageEl.setAttribute('src', product.image)


    const productTitleEl = document.createElement('h3')
    productTitleEl.setAttribute('class', 'product-item__title')
    productTitleEl.textContent = product.name

    const priceEl = document.createElement('p')
    priceEl.setAttribute('class', 'product-item__price')

    const fullPriceEl = document.createElement('span')
    fullPriceEl.setAttribute('class', 'product-item__full-price')
    fullPriceEl.textContent = `£${product.price}`

    priceEl.append(fullPriceEl)

    if (product.discountedPrice) {

        fullPriceEl.classList.add('discounted-price')
        const discountedPriceEl = document.createElement('span')
        discountedPriceEl.setAttribute('class', 'product-item__discounted-price')
        discountedPriceEl.textContent = `£${product.discountedPrice}`

        priceEl.append(discountedPriceEl)
    }
    listItem.append(imageEl, productTitleEl, priceEl)


    if (isItemNew(product)) {
        const newProductEl = document.createElement('span')
        newProductEl.setAttribute('class', 'product-item__new')
        newProductEl.textContent = 'NEW!'
        listItem.append(newProductEl)
    }
    ulListEl.append(listItem)
}
function renderSelectedProduct() {

    const mainEl = document.createElement('main')
    mainEl.setAttribute('class', 'main-selected-product')


    const imageEl = document.createElement('img')
    imageEl.setAttribute('class', 'selected-product__image')
    imageEl.setAttribute('src', state.selectedProduct.image)
    imageEl.setAttribute('alt', state.selectedProduct.name)

    const productInfoEl = document.createElement('div')
    productInfoEl.setAttribute('class', 'selected-product__info')
    const titleEl = document.createElement('h3')
    titleEl.setAttribute('class', 'selected-product__title')
    titleEl.textContent =state.selectedProduct.name

    const buttonEl = document.createElement('button')
    buttonEl.setAttribute('class', 'selected-product__button')
    buttonEl.textContent = 'ADD TO BAG'
    buttonEl.addEventListener('click',function(){
        state.selectedProduct = null
        render()
    })
    mainEl.append(imageEl, productInfoEl)
    productInfoEl.append(titleEl, buttonEl)

    document.body.append(mainEl)
}
function renderSearchModal(mainEl){

    const searchModalWrapperEl = document.createElement('div')
    searchModalWrapperEl.classList.add('modal-wrapper')
    searchModalWrapperEl.addEventListener('click',function(){
        state.modal = ''
        render()
    })

    const searchModalEl = document.createElement('div')
    searchModalEl.classList.add('modal-container')
    searchModalEl.addEventListener('click',function(event){
        event.stopPropagation()
    })
    
    const closeButtonEl = document.createElement('button')
    closeButtonEl.setAttribute('class','modal__close-button')
    closeButtonEl.textContent = 'X'
    closeButtonEl.addEventListener('click',function(){
        state.modal = ''
        render()
    })

    const titleH2El = document.createElement('h2')
    titleH2El.textContent = 'Search for your favorite items!'

    const formEl = document.createElement('form')
    formEl.setAttribute('class','search-products-form')
    
    const inputEl = document.createElement('input')
    inputEl.setAttribute('type','text')
    inputEl.setAttribute('name','search')
    inputEl.setAttribute('class','input')
    inputEl.setAttribute('placeholder','Search...')

    formEl.addEventListener('submit', function(event){
        event.preventDefault()

        state.search = formEl.search.value.toUpperCase()
        
        state.modal = ''

        render()
    })
    mainEl.append(searchModalWrapperEl)
    searchModalWrapperEl.append(searchModalEl)
    searchModalEl.append(closeButtonEl,titleH2El, formEl)
    formEl.append(inputEl)
}
function renderProfileModal(mainEl){

    const profileModalWrapperEl = document.createElement('div')
    profileModalWrapperEl.classList.add('modal-wrapper')
    profileModalWrapperEl.addEventListener('click',function(){
        state.modal = ''
        render()
    })

    const profileModalEl = document.createElement('div')
    profileModalEl.classList.add('modal-container')
    profileModalEl.addEventListener('click',function(event){
        event.stopPropagation()
    })
    
    const closeButtonEl = document.createElement('button')
    closeButtonEl.setAttribute('class','modal__close-button')
    closeButtonEl.textContent = 'X'
    closeButtonEl.addEventListener('click',function(){
        state.modal = ''
        render()
    })

    const titleH2El = document.createElement('h2')
    titleH2El.textContent = 'Sign In'

    const formEl = document.createElement('form')
    formEl.setAttribute('class','profile-form')
    
    const emailLabelEl = document.createElement('label')
    emailLabelEl.setAttribute('for','email')
    emailLabelEl.textContent = 'Email'

    const emailInputEl = document.createElement('input')
    emailInputEl.setAttribute('type','email')
    emailInputEl.setAttribute('name','email')
    emailInputEl.setAttribute('id','email')
    emailInputEl.setAttribute('class','input')
    emailInputEl.classList.add('input-profile')
    emailInputEl.setAttribute('required','true')

    const passwordLabelEl = document.createElement('label')
    passwordLabelEl.setAttribute('for','password')
    passwordLabelEl.textContent = 'Password'

    const passwordInputEl = document.createElement('input')
    passwordInputEl.setAttribute('type','password')
    passwordInputEl.setAttribute('name','password')
    passwordInputEl.setAttribute('id','password')
    passwordInputEl.setAttribute('class','input')
    passwordInputEl.classList.add('input-profile')
    passwordInputEl.setAttribute('required','true')

    const signInButtonEl = document.createElement('button')
    signInButtonEl.setAttribute('class','sign-in__button')
    signInButtonEl.textContent = 'SIGN IN'

    formEl.addEventListener('submit', function(event){
        event.preventDefault()
        
        state.modal = ''

        render()
    })
    mainEl.append(profileModalWrapperEl)
    profileModalWrapperEl.append(profileModalEl)
    profileModalEl.append(closeButtonEl,titleH2El, formEl)
    formEl.append(emailLabelEl,emailInputEl,passwordLabelEl, passwordInputEl,signInButtonEl)
}
function renderMain() {

    if (state.selectedProduct !== null) return renderSelectedProduct()

    const mainEl = document.createElement('main')

    const titleEl = document.createElement('h2')
    titleEl.textContent = 'Home'

    if (state.tab === 'Girls') {
        titleEl.textContent = state.tab
    }
    if (state.tab === 'Guys') {
        titleEl.textContent = state.tab
    }
    if (state.tab === 'Sale') {
        titleEl.textContent = state.tab
    }
    const ulListEl = document.createElement('ul')
    ulListEl.setAttribute('class', 'product-list')

    let productsToDisplay = getProductsToDisplay()

    for (const product of productsToDisplay) {
        renderStoreItem(product, ulListEl)
    }
    document.body.append(mainEl)
    mainEl.append(titleEl, ulListEl)

    if(state.modal === 'search') renderSearchModal(mainEl)
    if(state.modal === 'profile') renderProfileModal(mainEl)
}

function renderFooter() {
    const footerEl = document.createElement('footer')

    const logoh4El = document.createElement('h4')
    logoh4El.textContent = 'HOLLIXTON'

    const infoEl = document.createElement('h5')
    infoEl.textContent = 'United Kingdom'


    document.body.append(footerEl)
    footerEl.append(logoh4El, infoEl)
}
function render() {
    document.body.innerHTML = ''
    renderHeader()
    renderMain()
    renderFooter()
}


function init() {
    render()
    getDataFromServer().then(function (dataFromServer) {
        state.store = dataFromServer
        render()
    })
}
init()

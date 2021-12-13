
const state = {}

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
    mainEl.textContent = 'Main here!'

    document.body.append(mainEl)
}
function renderFooter(){
    const footerEl = document.createElement('footer')
    footerEl.textContent = 'Footer here!'

    document.body.append(footerEl)
}
function render(){
    renderHeader()
    renderMain()
    renderFooter() 
}
render()
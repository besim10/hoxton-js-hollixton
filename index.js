
const state = {}

function renderHeader(){

    const headerEl = document.createElement('header')
    headerEl.textContent = 'Header here!'

    document.body.append(headerEl)
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
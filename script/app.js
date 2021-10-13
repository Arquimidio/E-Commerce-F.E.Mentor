const modals = (function(){
    const mobileModal = document.getElementById('mobile-modal')
    const openMobileMenuBtn = document.getElementById('hamburguer-menu')
    const closeMobileMenuBtn = document.getElementById('mobile-menu-close-button')
    const cartModal = document.getElementById('mobile-cart')
    const openCartBtn = document.getElementById('nav-cart')

    function closeMobileMenu(){
        mobileModal.classList.add('hide')
    }

    function openMobileMenu(){
        mobileModal.classList.remove('hide')
    }

    function openCart(){
        cartModal.classList.remove('hide')
    }

    function verifyClick(e){
        if(!cartModal.contains(e.target) && 
           !document.querySelector('nav').contains(e.target) 
           ){
            cartModal.classList.add('hide')
        }
    }
    
    return{
        mobileModal,
        openMobileMenuBtn,
        closeMobileMenuBtn,
        cartModal,
        openCartBtn,
        closeMobileMenu,
        openMobileMenu,
        openCart,
        verifyClick
    }
})()

modals.closeMobileMenuBtn.addEventListener('click', modals.closeMobileMenu)
modals.openMobileMenuBtn.addEventListener('click', modals.openMobileMenu)
modals.openCartBtn.addEventListener('click', modals.openCart)
document.addEventListener('click', modals.verifyClick)

/*******************IMAGE CHANGER*********************** */
const imgFunctionalities = (function(){
    const previousImgBtn = document.getElementById('previous-img')
    const nextImgBtn = document.getElementById('next-img')
    const img = document.getElementById('actual-image')
    let actualImage = 1

    function getNextImage(){
        if(actualImage < 4){
            ++actualImage
        }else{
            actualImage = 1
        }
        changeImage()
    }

    function getPreviousImage(){
        if(actualImage > 1){
            --actualImage
        }else{
            actualImage = 4
        }
        changeImage()
    }

    function changeImage(){
        img.src = `images/image-product-${actualImage}.jpg`
    }

    const listeners = [
        previousImgBtn.addEventListener('click', getPreviousImage),
        nextImgBtn.addEventListener('click', getNextImage)
    ]

    return{
        previousImgBtn,
        nextImgBtn,
        getNextImage,
        getPreviousImage,
        changeImage
    }
})()


/******************** BUY PRODUCT **************************** */

const product = (function(){
    const choosenQuantity = document.getElementById('quantity')
    const addBtn = document.getElementById('plus-quantity')
    const reducebtn = document.getElementById('less-quantity')

    function incrementQuantity(){
        choosenQuantity.textContent = +choosenQuantity.textContent + 1
    }

    function decrementQuantity(){
        if(+choosenQuantity.textContent > 0){
            choosenQuantity.textContent = +choosenQuantity.textContent - 1
        }
    }

    addBtn.addEventListener('click', incrementQuantity)
    reducebtn.addEventListener('click', decrementQuantity)
    return{
        choosenQuantity
    }
})()

/*** ADD TO CART FUNCTIONALITY *****/

const cart = (function(){
    const cartProducts = document.getElementById('product-cart')
    const addToCartBtn = document.getElementById('add-to-cart')


    function createElt(type, className){
        let elt = document.createElement(type)
        elt.className = className
        return elt
    }

    function getProductName(){
        return reduceString(document.getElementById('product-name').textContent)
    }

    function getProductAmount(){
        return product.choosenQuantity.textContent
    }

    function getUnityPrice(){
        return document.getElementById('price-with-discount').textContent.replace('$', '')
    }

    function calculatePrice(amount, price){
        return `\$${(+amount) * (+price)}`
    }

    function makePriceString(){
        let amount = getProductAmount()
        let price = getUnityPrice()
        return `\$ ${price} x ${amount} `
    }

    function reduceString(str){
        if(str.length > 20){
            return str.slice(0, 20) + '...'
        }
    }

    function hideEmptyCartMsg(){
        document.getElementById('empty-cart').classList.add('hide')
    }

    function removeFromCart(){
        let parent = this.closest('.cart-product-wrapper')
        cartProducts.removeChild(parent)
        if(cartProducts.childNodes.length <= 3){
            document.getElementById('empty-cart').classList.remove('hide')
            showCheckoutBtn(false)
        }
    }

    function showCheckoutBtn(show){
        const btn = document.getElementById('checkout')
        if(!show){
            btn.classList.add('hide')
        }else{
            btn.classList.remove('hide')
        }
    }

    function addToCart(){
        let wrapper = createElt('div', 'cart-product-wrapper')
        let strong = createElt('strong')
        let img = createElt('img', 'product-cart-image')
        let description = createElt('div', 'product-cart-info')
        let name = createElt('p', 'product-cart-name')
        let price = createElt('p', 'product-cart-price')
        let remove = createElt('div', 'delete-from-cart')
        remove.addEventListener('click', removeFromCart)
        strong.textContent = calculatePrice(getProductAmount(), getUnityPrice())
        name.textContent = getProductName()
        price.textContent = makePriceString() 
        price.appendChild(strong)
        img.src = 'images/image-product-1-thumbnail.jpg'
        remove.innerHTML = '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>'
        let eltArr = [img, description, remove]
        description.appendChild(name)
        description.appendChild(price)
        eltArr.forEach(elt => wrapper.appendChild(elt))
        cartProducts.appendChild(wrapper)
        showCheckoutBtn(true)
        hideEmptyCartMsg()
    }

    addToCartBtn.addEventListener('click', addToCart)

    return {showCheckoutBtn}
})()





/*const svg = (function(){
    const paths = [...document.getElementsByTagName('path')]
    paths.forEach(path => path.addEventListener('mouseover', function(){
        path.style.fill = 'red'
    }))
})()*/


/*******************IMAGE CHANGER*********************** */

const imgFunctionalities = (function(){
    const previousImgBtn = document.getElementById('previous-img')
    const nextImgBtn = document.getElementById('next-img')
    const img = document.getElementById('actual-image')
    const thumbnails = [...document.getElementById('thumbs-container').children]
    let actualImage = 1

    function getImage(direction){
        switch(direction){
            case 'previous':
                actualImage < 4? ++actualImage: actualImage = 1
                break;
            case 'next':
                actualImage > 1? --actualImage: actualImage = 4
                break;
        }
        changeImage()
    }

    function changeImage(){
        img.src = `images/image-product-${actualImage}.jpg`
    }

    function changeImageWithThumb(event){
        img.src = thumbToMain(event.target.src)
        actualImage = getImageNumber(event.target)
    }

    function thumbToMain(src){
        return src.replace('-thumbnail', '')
    }
    
    function getImageNumber(elt){
        let matches = elt.src.match(/[0-9]/gi)
        return matches[matches.length - 1]
    }

    const listeners = [
        previousImgBtn.addEventListener('click', () => getImage('previous')),
        nextImgBtn.addEventListener('click', () => getImage('next')),
        thumbnails.map(elt => elt.addEventListener('click', changeImageWithThumb))
    ]

    return{
        previousImgBtn,
        nextImgBtn,
        getImage,
        changeImage,
        img,
        thumbToMain,
        getImageNumber
    }
})()

const modals = (function(){
    const mobileModal = document.getElementById('mobile-modal')
    const openMobileMenuBtn = document.getElementById('hamburguer-menu')
    const closeMobileMenuBtn = document.getElementById('mobile-menu-close-button')
    const cartModal = document.getElementById('mobile-cart')
    const openCartBtn = document.getElementById('nav-cart')
    const lightbox = document.getElementById('lightbox-area')
    const lightboxThumbnails = [...document.getElementById('lightbox-thumbnails').children]
    const lightboxMainImage = document.getElementById('lightbox-actual-main')
    const closeLightboxBtn = document.getElementById('close-lightbox')
    const nextLightbox = document.getElementById("next-lightbox")
    const previousLightbox = document.getElementById("previous-lightbox")
    let actualImage = 1

    function getImage(direction){
        switch(direction){
            case 'previous':
                actualImage < 4? ++actualImage: actualImage = 1
                break;
            case 'next':
                actualImage > 1? --actualImage: actualImage = 4
                break;
        }
        changeImage()
    }


    function changeImage(){
        lightboxMainImage.src = `images/image-product-${actualImage}.jpg`
    }


    function closeMobileMenu(){
        mobileModal.classList.add('hide')
    }

    function openMobileMenu(){
        mobileModal.classList.remove('hide')
    }

    function openCart(){
        cartModal.classList.remove('hide')
    }

    function openLightBox(event){
        lightboxMainImage.src = event.target.src.replace('-thumbnail', '')
        lightbox.style.display = 'flex'
    }

    function closeLightbox(){
        lightbox.style.display = 'none'
    }

    function verifyClick(e){
        if(!cartModal.contains(e.target) && 
           !document.querySelector('nav').contains(e.target) 
           ){
            cartModal.classList.add('hide')
        }
    }

    function changeMainImageWithThumb(event){
        lightboxMainImage.src = imgFunctionalities.thumbToMain(event.target.src)
        actualImage = imgFunctionalities.getImageNumber(event.target)
        console.log(actualImage)
    }

    closeMobileMenuBtn.addEventListener('click', closeMobileMenu)
    openMobileMenuBtn.addEventListener('click', openMobileMenu)
    openCartBtn.addEventListener('click', openCart)
    lightboxThumbnails.forEach(elt => elt.addEventListener('click', changeMainImageWithThumb))
    closeLightboxBtn.addEventListener('click', closeLightbox)
    imgFunctionalities.img.addEventListener('click', openLightBox)
    document.addEventListener('click', verifyClick)  
    nextLightbox.addEventListener('click', () => getImage('next'))
    previousLightbox.addEventListener('click', () => getImage('previous'))

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
    const itemCounter = document.getElementById('products-in-cart')
    let itemQuantity = 0

    function manageCounterVisibility(visible){
        if(visible){
            itemCounter.classList.remove('hide')
        }else{
            itemCounter.classList.add('hide')
        }
    }

    function countItems(adding){
        if(adding){
            itemQuantity++
            itemCounter.textContent = itemQuantity
            manageCounterVisibility(true)
        }
        else{
            itemQuantity--
            itemCounter.textContent = itemQuantity
            if(cartProducts.children.length <= 1){
                console.log(cartProducts.children.length)
                manageCounterVisibility(false)
            }
        }
    }

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
        const parent = this.closest('.cart-product-wrapper')
        cartProducts.removeChild(parent)
        countItems(false)
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
        const wrapper = createElt('div', 'cart-product-wrapper')
        const strong = createElt('strong')
        const img = createElt('img', 'product-cart-image')
        const description = createElt('div', 'product-cart-info')
        const name = createElt('p', 'product-cart-name')
        const price = createElt('p', 'product-cart-price')
        const remove = createElt('div', 'delete-from-cart')
        const eltArr = [img, description, remove]
        remove.addEventListener('click', removeFromCart)
        remove.classList.add('pointer', 'svg-darker')
        strong.textContent = calculatePrice(getProductAmount(), getUnityPrice())
        name.textContent = getProductName()
        price.textContent = makePriceString() 
        price.appendChild(strong)
        img.src = 'images/image-product-1-thumbnail.jpg'
        remove.innerHTML = '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>'
        description.appendChild(name)
        description.appendChild(price)
        
        eltArr.forEach(elt => wrapper.appendChild(elt))
        cartProducts.appendChild(wrapper)
        showCheckoutBtn(true)
        countItems(true)
        hideEmptyCartMsg()
    }

    addToCartBtn.addEventListener('click', addToCart)
    return {showCheckoutBtn}
})()





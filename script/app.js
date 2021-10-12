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
           !document.querySelector('nav').contains(e.target)){
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

/*******************IMAGE changer*********************** */
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
    return{}
})()



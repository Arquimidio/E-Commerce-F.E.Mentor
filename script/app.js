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

modals.closeMobileMenuBtn.addEventListener('touchstart', modals.closeMobileMenu)
modals.openMobileMenuBtn.addEventListener('touchstart', modals.openMobileMenu)
modals.openCartBtn.addEventListener('touchstart', modals.openCart)
document.addEventListener('click', modals.verifyClick)



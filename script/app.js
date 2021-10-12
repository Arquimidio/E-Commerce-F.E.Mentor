const modals = (function(){
    const mobileModal = document.getElementById('mobile-modal')
    const openMobileMenu = document.getElementById('hamburguer-menu')
    const closeMobileMenu = document.getElementById('mobile-menu-close-button')
    return{
        mobileModal,
        openMobileMenu,
        closeMobileMenu
    }
})()

modals.closeMobileMenu.addEventListener('touchstart', closeMobileMenu)
modals.openMobileMenu.addEventListener('touchstart', openMobileMenu)

function closeMobileMenu(){
    modals.mobileModal.style.display = 'none'
}

function openMobileMenu(){
    modals.mobileModal.style.display = 'block'
}
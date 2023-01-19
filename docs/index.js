const menu = document.querySelector('.links ul');
const burger = document.querySelector('a[href="#menu-show"]');

function toggleMenu(display = 'inline-block'){
    menu.style.display = display
}

(function(){ 

    if(!menu || !burger) return console.log('Не обнаружены меню или бургер.')
    document.addEventListener("click", e => {
        let target = e.target;      
        do {
            if (target == menu || target == burger) return;
            target = target.parentNode;
        } while (target);
        toggleMenu('none')
    });

    function checkWindowWidth(){
        toggleMenu(window.innerWidth > 420 ? 'inline-block' : 'none')
    }

    checkWindowWidth()

    window.addEventListener('resize', e => {
        checkWindowWidth()
    })

    window.addEventListener('keyup', e => e.key == 'Escape' && toggleMenu('none'))

    burger.addEventListener('click', e => toggleMenu('block'))
})()

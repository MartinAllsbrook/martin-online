let linkedfrom = 'homepage';
sessionStorage.setItem('linkedfrom', linkedfrom);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('enter').addEventListener('click', () => {
        // document.getElementById('welcome').style.opacity = '0';
        document.getElementById('welcome').style.display  = 'none';
    }, false)
}, false)


window.addEventListener('DOMContentLoaded', () => {
    let linkedfrom = 'homepage';
    sessionStorage.setItem('linkedfrom', linkedfrom);

    document.getElementById('enter').addEventListener('click', () => {
        // document.getElementById('welcome').style.opacity = '0';
        document.getElementById('welcome').style.display  = 'none';
    }, false)
}, false)
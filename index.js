window.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem('linkedfrom', 'homepage'); // set linked from

    let entered = sessionStorage.getItem('entered');
    if(entered){
        document.getElementById('welcome').style.display = 'none';
    }else{
        document.getElementById('enter').addEventListener('click', () => {
            // document.getElementById('welcome').style.opacity = '0';
            document.getElementById('welcome').style.display = 'none';
            sessionStorage.setItem('entered', true);
        }, false)
    }
}, false)
window.addEventListener("DOMContentLoaded", () => {
    let linkedfrom = sessionStorage.getItem('linkedfrom'); // Get the tag of the most recent page we could have linked from
    console.log(linkedfrom); // DEBUG: Log it
    
    if(linkedfrom == 'homepage'){
      document.getElementById('backlink').innerHTML = '<a class="biglink"  href="../../index.html">BACK</a>';
    }else if(linkedfrom == 'portfolio'){
      document.getElementById('backlink').innerHTML = '<a class="biglink"  href="../index.html">BACK</a>';
    }
}, false)

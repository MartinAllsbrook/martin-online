//Code to link back to the correct page
let linkedfrom = sessionStorage.getItem('linkedfrom');
console.log(linkedfrom);
if(linkedfrom == 'homepage'){
  document.getElementById('backlink').innerHTML = '<a class="biglink"  href="../../index.html">BACK</a>';
}else if(linkedfrom == 'portfolio'){
  document.getElementById('backlink').innerHTML = '<a class="biglink"  href="../index.html">BACK</a>';
}
var slideSource = document.getElementById('slideSource');

document.getElementById('glee-basic').onclick = function () {
  slideSource.classList.toggle('fade');
  document.getElementById('overlay-text').innerHTML = '';
  document.getElementById('slideSource').style.zIndex = -1000;
}
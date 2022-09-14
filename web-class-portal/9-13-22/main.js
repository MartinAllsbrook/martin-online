const button = document.querySelector('#my-button');
button.addEventListener('click', () => {
    const firstTextInput = document.querySelector('#first-text-input');
    console.log(firstTextInput.value);

    const colorInput = document.querySelector('#color-input');
    console.log(colorInput.value);

    const checkboxesElement = document.querySelector('#checkboxes');
    const checkboxes = checkboxesElement.querySelectorAll('input');

    for(const checkbox of checkboxes){
        console.log(checkbox.checked);
    }
});
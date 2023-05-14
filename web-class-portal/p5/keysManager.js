const keys = {}; // Create empty keys object

// If a key is pressed add it to the list of currently pressed keys
window.addEventListener("keydown", function(e){
    if(e.key != ' '){
        eval('keys.' + e.key + ' = true');
    }else{
        eval('keys.Space = true');
    }
}, false);

// If a key is released remove it from the list of currently pressed keys
window.addEventListener('keyup', function(e){
    if(e.key != ' '){
        eval('keys.' + e.key + ' = false');
    }else{
        eval('keys.Space = false');
    }
}, false);

export default keys;
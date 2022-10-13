let places = [''];

let activeGuess = 1;

for (let i = 1; i <= 6; i++) {
    let element = document.getElementById(`guess${i}`);
    // add event listener
    element.addEventListener('keydown', onKeyPress);
    // 'disable' all but the first guess
    if (i != activeGuess) element.disabled = true;
    else element.disabled = false;
}

function onKeyPress(event) {
    // validate answer code
    if (event.code === 'Enter') {
        // deactivate earlier input box
        let currentElement = document.getElementById(`guess${activeGuess}`);
        currentElement.disabled = true;
        let className = currentElement.className;
        className = className.replace('text-white', 'text-slate-400');
        currentElement.className = className;

        if (activeGuess < 6) activeGuess++;
        else return; // do smth for game over

        // 'activate' next input box

        currentElement = document.getElementById(`guess${activeGuess}`);
        className = currentElement.className;
        className = className.replace('placeholder-gray-400', 'placeholder-gray-100');
        currentElement.className = className;
        currentElement.disabled = false;
    }

    // update autocomplete
}

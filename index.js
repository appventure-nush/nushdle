let activeGuess = 1;

for (let i = 1; i <= 6; i++) {
    // add onkeypress event listener

    // 'disable' all but the first guess
    if (i != activeGuess) document.getElementById(`guess${i}`).disabled = true;
}

function onKeyPress(event) {}

let places = [
    {
        name: 'Admin Office',
        x: 482.0,
        y: 390.0,
        z: 3.0
    },
    {
        name: 'Lower Auditorium',
        x: 482.0,
        y: 390.0,
        z: 4.0
    },
    {
        name: 'Upper Auditorium',
        x: 482.0,
        y: 390.0,
        z: 5.0
    },
    {
        name: 'Seminar Room 2A',
        x: 386.0,
        y: 368.0,
        z: 6.0
    },
    {
        name: 'Chemistry Lab 3',
        x: 386.0,
        y: 368.0,
        z: 3.0
    },
    {
        name: 'Seminar Room 2B',
        x: 386.0,
        y: 337.0,
        z: 6.0
    },
    {
        name: 'Chemistry Lab 2',
        x: 386.0,
        y: 327.0,
        z: 3.0
    },
    {
        name: 'Seminar Room 2C',
        x: 386.0,
        y: 317.0,
        z: 6.0
    },
    {
        name: 'Seminar Room 1',
        x: 450.0,
        y: 316.0,
        z: 6.0
    },
    {
        name: 'Chemistry Lab 1',
        x: 450.0,
        y: 316.0,
        z: 3.0
    },
    {
        name: 'Math ICT Lab',
        x: 330.0,
        y: 364.0,
        z: 6.0
    },
    {
        name: 'Biology Lab 1',
        x: 330.0,
        y: 364.0,
        z: 3.0
    },
    {
        name: 'Applied Technology Lab',
        x: 269.0,
        y: 373.0,
        z: 6.0
    },
    {
        name: 'Biology Lab 2',
        x: 269.0,
        y: 373.0,
        z: 3.0
    },
    {
        name: 'Clean Energy Lab',
        x: 284.0,
        y: 326.0,
        z: 6.0
    },
    {
        name: 'Biology Lab 3',
        x: 284.0,
        y: 326.0,
        z: 3.0
    },
    {
        name: 'Netball Court',
        x: 151.0,
        y: 426.0,
        z: 5.0
    },
    {
        name: 'Hall',
        x: 151.0,
        y: 426.0,
        z: 2.0
    },
    {
        name: 'Lab Manager Room',
        x: 232.0,
        y: 340.0,
        z: 6.0
    },
    {
        name: 'Physics Lab 1',
        x: 232.0,
        y: 330.0,
        z: 3.0
    },
    {
        name: 'Computer Lab 3',
        x: 232.0,
        y: 330.0,
        z: 4.0
    },
    {
        name: 'Synthetic Chemistry Lab',
        x: 232.0,
        y: 320.0,
        z: 6.0
    },
    {
        name: 'IT Helpdesk',
        x: 197.0,
        y: 301.0,
        z: 4.0
    },
    {
        name: 'Computer Lab 2',
        x: 197.0,
        y: 282.0,
        z: 4.0
    },
    {
        name: 'Analytical Chemistry Lab',
        x: 197.0,
        y: 291.0,
        z: 6.0
    },
    {
        name: 'Physics Lab 2',
        x: 197.0,
        y: 291.0,
        z: 3.0
    },
    {
        name: 'Life Sciences Lab',
        x: 173.0,
        y: 330.0,
        z: 6.0
    },
    {
        name: 'Physics Lab 3',
        x: 173.0,
        y: 330.0,
        z: 3.0
    },
    {
        name: 'Computer Lab 1',
        x: 173.0,
        y: 330.0,
        z: 4.0
    },
    {
        name: 'Canteen',
        x: 154.0,
        y: 604.0,
        z: 1.0
    },
    {
        name: 'Concourse',
        x: 323.0,
        y: 410.0,
        z: 3.0
    },
    {
        name: 'Staffroom',
        x: 323.0,
        y: 410.0,
        z: 2.0
    }
];

var maxDistance = 0;
var distance;
for (const place of places) {
    distance = (place.x - correct.x) ** 2 + (place.y - correct.y) ** 2 + 10 * (place.z - correct.z) ** 2;
    if (maxDistance < distance) {
        maxDistance = distance;
    }
}
let scaleFactor = 1.7353;
let activeGuess = 1;
let win = false;
let date = getDate();
let correct = places[Math.floor((mulberry32(cyrb32(date))()*100000))%32];

for (let i = 1; i <= 6; i++) {
    let element = document.getElementById(`guess${i}`);
    // add event listener
    element.addEventListener('keyup', onKeyPress);
    // 'disable' all but the first guess
    if (i != activeGuess) element.disabled = true;
    else element.disabled = false;
}

let activeInput = document.getElementById('guess1');

//cookie shenanigans
if(!checkCookieExists("date") || getCookieValue("date") != date.toString()){
    deleteCookies();
    document.cookie = "date=" + date.toString(0);
}
else{
    for (let i = 1; i <= 6; i++) {
        if(checkCookieExists('guess' + i.toString())){
            answerEntered(getCookieValue('guess' + i.toString()));
        }
    }
}

// actual functions
function onKeyPress(event) {
    let val = this.value; // get string in the textbox

    if (event.code === 'Enter') {
        // find place that matches half-filled text - autocomplete algorithm is used here btw:
        let selectedPlace = places.find((place) => place.name.substr(0, val.length).toUpperCase() == val.toUpperCase());
        if (selectedPlace) {
            this.value = selectedPlace.name;
            closeAllLists();
            return answerEntered(selectedPlace.name);
        }
    }
    // update autocomplete

    // close any already open lists of autocompleted values
    closeAllLists();

    // if input box is empty dont show anything
    if (!val) return;

    // create a div that will contain all the autocomplete values...
    let div = document.createElement('DIV');
    div.setAttribute('id', this.id + 'autocomplete-list');
    div.setAttribute('class', 'autocomplete-items max-h-80 overflow-auto');
    // ... and append it as a child of the autocomplete container:
    this.parentNode.parentNode.appendChild(div);

    // for each prompt to be shown...
    for (i = 0; i < places.length; i++) {
        // check if the prompt starts with the same letters as input as autocomplete algorithm - can replace with more fancy fuzzy searching later
        let obj = places[i];
        let name = obj.name;
        if (name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // create a div for the matching prompt
            let subdiv = document.createElement('DIV');

            // make the matching letters bold - can be changed if needed
            subdiv.innerHTML = `<strong>${name.substr(0, val.length)}</strong>${name.substr(val.length)}`;

            // insert a input field that will hold the current array item's value:
            subdiv.innerHTML += `<input type='hidden' value='${name}'>`;
            // execute a function when clicked on the item
            subdiv.addEventListener('click', function (e) {
                //insert the value for the autocomplete text field:
                activeInput.value = this.getElementsByTagName('input')[0].value;

                // close the list of autocompleted values, (or any other open lists of autocompleted values:
                closeAllLists();

                // enter the answer
                answerEntered(activeInput.value);
            });
            div.appendChild(subdiv);
        }
    }
}

function answerEntered(val) {
    // deactivate earlier input box
    let currentElement = document.getElementById(`guess${activeGuess}`);
    currentElement.value = val;
    currentElement.disabled = true;

    let answer = places.find((e) => e.name == val);

    let dx = correct.x - answer.x;
    let dy = correct.y - answer.y;
    let dz = correct.z - answer.z;

    // temp scaling:

    let trueDistance = Math.sqrt(dx ** 2 + dy ** 2 + dy ** 2 * 10) / scaleFactor;

    let win = dx == 0 && dy == 0 && dz == 0;

    let exactDist = document.getElementById(`dist${activeGuess}`);
    let floor = document.getElementById(`floor${activeGuess}`);
    
    let innerTextDistance = Math.sqrt(dx ** 2 + dy ** 2) / scaleFactor
    exactDist.innerText = `${innerTextDistance.toFixed(1)}m`;
    floor.innerText = `${Math.abs(dz.toFixed(0))}`; // add plus sign if positive

    if (win) {
        console.log('win');
        floor.innerText = '🎉';
        exactDist.classList.toggle('invisible');
    }

    // set green bar:
    // scale the distance up, and make lower values of distance better
    var distance;
    // if maxdistance not set, set it
    distance = (maxDistance - trueDistance)/maxDistance * 100;
    currentElement.style = `background: linear-gradient(to right, #19a7a7 ${distance}%, #374151 ${distance}% 100%)`;

    document.cookie = "guess" + activeGuess.toString() + "=" + val + ";";

    if (win) {
        const ans = document.getElementById('ans');
        ans.innerText = `🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉`;
        ans.classList.toggle('hidden');
        return;
    } else if (activeGuess >= 6) {
        // game over
        // show the answer:
        const ans = document.getElementById('ans');
        ans.innerText = `The answer was ${correct.name}`;
        ans.classList.toggle('hidden');
        return;
    } else {
        activeGuess++;
    };

    // 'activate' next input box
    currentElement = document.getElementById(`guess${activeGuess}`);
    currentElement.disabled = false;
    currentElement.classList.remove('placeholder-gray-400');
    currentElement.classList.add('placeholder-gray-100');
    // set cursor on next input
    currentElement.focus();
    currentElement.select();
    // update activeInput variable
    activeInput = document.getElementById(`guess${activeGuess}`);
}

function closeAllLists(elmnt) {
    // close all autocomplete lists in the document, except the one passed as an argument:
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != activeInput) x[i].parentNode.removeChild(x[i]);
    }
}

// random number generator codes (stolen from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript)

function cyrb32(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return (h1^h2^h3^h4)>>>0;
}

function mulberry32(a) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function getDate() {
    const d = new Date();
    return d.getUTCDate().toString()+"-"+d.getUTCMonth().toString()+"-"+d.getUTCFullYear().toString();
}

// cookie code
function checkCookieExists(str) {
    return document.cookie.split(';').some((item) => item.trim().startsWith(str + '='));
}

function getCookieValue(str) {
    return document.cookie.split('; ').find((row) => row.startsWith(str + '='))?.split('=')[1];
}

function deleteCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

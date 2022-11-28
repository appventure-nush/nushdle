let places = [
    {
        name: 'place 1',
        x: 0,
        y: 0,
        z: 0.854178288
    },
    {
        name: 'place 2',
        x: 0.512582208,
        y: 0.134471841,
        z: 0.920822741
    },
    {
        name: 'place 3',
        x: 0.202778892,
        y: 0.820380186,
        z: 0.454834828
    },
    {
        name: 'place 4',
        x: 0.770676901,
        y: 0.292151368,
        z: 0.375406863
    },
    {
        name: 'place 5',
        x: 0.526588985,
        y: 0.437756311,
        z: 0.08265056
    },
    {
        name: 'place 6',
        x: 0.387084723,
        y: 0.175070959,
        z: 0.130626088
    },
    {
        name: 'place 7',
        x: 0.529835023,
        y: 0.732157954,
        z: 0.987092154
    },
    {
        name: 'place 8',
        x: 0.866641749,
        y: 0.550039491,
        z: 0.254233701
    },
    {
        name: 'place 9',
        x: 0.124388519,
        y: 0.613100631,
        z: 0.651592196
    },
    {
        name: 'place 10',
        x: 1,
        y: 1,
        z: 0.304884091
    },
    {
        name: 'place 11',
        x: 0.864972,
        y: 0.567332734,
        z: 0.607666
    },
    {
        name: 'place 12',
        x: 0.454144676,
        y: 0.166723767,
        z: 0.97369145
    },
    {
        name: 'place 13',
        x: 0.149843492,
        y: 0.271396392,
        z: 0.285288677
    },
    {
        name: 'place 14',
        x: 0.421403724,
        y: 0.578683188,
        z: 0.012462762
    },
    {
        name: 'place 15',
        x: 0.798234045,
        y: 0.862729883,
        z: 0.509267117
    },
    {
        name: 'place 16',
        x: 0.269594915,
        y: 0.17984353,
        z: 0.455789703
    },
    {
        name: 'place 17',
        x: 0.653122456,
        y: 0.231764849,
        z: 0.767309997
    },
    {
        name: 'place 18',
        x: 0.968293093,
        y: 0.125573715,
        z: 0.516575695
    },
    {
        name: 'place 19',
        x: 0.71600816,
        y: 0.546025268,
        z: 0.235038383
    },
    {
        name: 'place 20',
        x: 0.230399119,
        y: 0.506666407,
        z: 0.79205129
    },
    {
        name: 'place 21',
        x: 0.364725107,
        y: 0.072736979,
        z: 0.239337962
    },
    {
        name: 'place 22',
        x: 0.37325166,
        y: 0.045965876,
        z: 0.912158849
    },
    {
        name: 'place 23',
        x: 0.079908996,
        y: 0.867985361,
        z: 0.845692398
    },
    {
        name: 'place 24',
        x: 0.420590028,
        y: 0.377059165,
        z: 0.611572504
    },
    {
        name: 'place 25',
        x: 0.588713259,
        y: 0.333398537,
        z: 0.843898888
    },
    {
        name: 'place 26',
        x: 0.681889456,
        y: 0.470399899,
        z: 0.0032185
    },
    {
        name: 'place 27',
        x: 0.628629997,
        y: 0.958499407,
        z: 0.402258287
    },
    {
        name: 'place 28',
        x: 0.45036783,
        y: 0.264462527,
        z: 0.516624691
    },
    {
        name: 'place 29',
        x: 0.433360407,
        y: 0.591688526,
        z: 0.794473219
    },
    {
        name: 'place 30',
        x: 0.089134372,
        y: 0.802151858,
        z: 0.778166946
    },
    {
        name: 'place 31',
        x: 0.449221465,
        y: 0.542458064,
        z: 0.074239533
    },
    {
        name: 'place 32',
        x: 0.925000515,
        y: 0.48875095,
        z: 0.398576421
    },
    {
        name: 'place 33',
        x: 0.646036362,
        y: 0.557757669,
        z: 0.12983435
    },
    {
        name: 'place 34',
        x: 0.763431532,
        y: 0.104867496,
        z: 0.585097398
    },
    {
        name: 'place 35',
        x: 0.839634804,
        y: 0.86734811,
        z: 0.151459945
    },
    {
        name: 'place 36',
        x: 0.965947101,
        y: 0.535966137,
        z: 0.429304387
    },
    {
        name: 'place 37',
        x: 0.20198144,
        y: 0.751292298,
        z: 0.490931551
    }
];

let activeGuess = 1;
let win = false;
let correct = places[9];

for (let i = 1; i <= 6; i++) {
    let element = document.getElementById(`guess${i}`);
    // add event listener
    element.addEventListener('keyup', onKeyPress);
    // 'disable' all but the first guess
    if (i != activeGuess) element.disabled = true;
    else element.disabled = false;
}

let activeInput = document.getElementById('guess1');

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
    currentElement.disabled = true;

    let answer = places.find((e) => e.name == val);

    let dx = correct.x - answer.x;
    let dy = correct.y - answer.y;
    let dz = correct.z - answer.z;

    // temp scaling:
    dx *= 10;
    dy *= 10;
    dz *= 10;

    let distance = Math.sqrt(dx ** 2 + dy ** 2);

    let win = distance == 0;

    let exactDist = document.getElementById(`dist${activeGuess}`);
    let floor = document.getElementById(`floor${activeGuess}`);

    exactDist.innerText = `${distance.toFixed(1)}m`;
    floor.innerText = `${Math.abs(dz.toFixed(0))}`; // add plus sign if positive

    if (win && dz == 0) {
        console.log('win');
        floor.innerText = '🎉';
        exactDist.classList.toggle('invisible');
    }

    // set green bar:
    // scale the distance up, and make lower values of distance better. MUST BE CHANGED TO FIT DATA RANGE
    distance = (10 - distance / 10) * 10;
    currentElement.style = `background: linear-gradient(to right, #19a7a7 ${distance}%, #374151 ${distance}% 100%)`;

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
    } else activeGuess++;

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

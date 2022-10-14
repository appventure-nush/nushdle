let places = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua &amp; Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia &amp; Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central Arfrican Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cuba',
    'Curacao',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Polynesia',
    'French West Indies',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauro',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Pierre &amp; Miquelon',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'St Kitts &amp; Nevis',
    'St Lucia',
    'St Vincent',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    "Timor L'Este",
    'Togo',
    'Tonga',
    'Trinidad &amp; Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks &amp; Caicos',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe'
];

let activeGuess = 1;

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
    console.log('onKeyPress');

    if (event.code === 'Enter') {
        // deactivate earlier input box
        let currentElement = document.getElementById(`guess${activeGuess}`);
        currentElement.disabled = true;
        currentElement.classList.remove('text-white');
        currentElement.classList.add('text-slate-400');

        // TODO: check if answer is correct here

        if (activeGuess < 6) activeGuess++;
        else {
            // TODO: do smth for game over
            return;
        }

        // 'activate' next input box
        currentElement = document.getElementById(`guess${activeGuess}`);
        currentElement.disabled = false;
        currentElement.classList.remove('placeholder-gray-400');
        currentElement.classList.add('placeholder-gray-100');

        activeInput = document.getElementById(`guess${activeGuess}`);
        return;
    }
    let val = this.value; // get string in the textbox
    // console.log(a, b, i, val);

    // update autocomplete

    // close any already open lists of autocompleted values
    closeAllLists();

    // if input box is empty dont show anything
    if (!val) return;

    // create a div that will contain all the autocomplete values...
    let div = document.createElement('DIV');
    div.setAttribute('id', this.id + 'autocomplete-list');
    div.setAttribute('class', 'autocomplete-items');
    // ... and append it as a child of the autocomplete container:
    this.parentNode.appendChild(div);

    // for each prompt to be shown...
    for (i = 0; i < places.length; i++) {
        // check if the prompt starts with the same letters as input - can replace with more fancy fuzzy searching later
        if (places[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // create a div for the matching prompt
            let subdiv = document.createElement('DIV');

            // make the matching letters bold - can be changed if needed
            subdiv.innerHTML = `<strong>${places[i].substr(0, val.length)}</strong>${places[i].substr(val.length)}`;

            // insert a input field that will hold the current array item's value:
            subdiv.innerHTML += `<input type='hidden' value='${places[i]}'>`;
            // execute a function when clicked on the item
            subdiv.addEventListener('click', function (e) {
                /*insert the value for the autocomplete text field:*/
                activeInput.value = this.getElementsByTagName('input')[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            div.appendChild(subdiv);
        }
    }
}

function closeAllLists(elmnt) {
    // close all autocomplete lists in the document, except the one passed as an argument:
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != activeInput) x[i].parentNode.removeChild(x[i]);
    }
}

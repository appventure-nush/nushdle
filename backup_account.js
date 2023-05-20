//document.cookie = "uid="+""+";";

const fs = require('fs')
function setPwdVisible() {
  let x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function login() {
    console.log("Making account"); 
    if (checkCookieExists("uname")) {
        console.log("Logged in already")
        return "Logged in already"; 
    } 
    let uname = document.getElementById("uname"); 
    let pwd = document.getElementById("pwd"); 
    let accounts = getAccounts(); 
    let accObj = accounts.find(account=>account.username===uname)
    if(!accObj) return "no account w/ that usname"
    if(accObj.password===pwd){
        
    }

    for (let i = 0; i < currAccs.length; i++) {
        if (currAccs[i][0] === uname) {
            if (currAccs[i][1] === pwd) {
                document.cookie = "uname="+uname+";";
                console.log("Successfully logged in"); 
                return "Successfully logged in. "
            } else {
                console.log("Wrong username or password") 
                return "Wrong username or password"; 
            }
        }
    }
    //account doesn't exist yet, create it 

    const data = uname+","+pwd+",\n";

    fs.appendFile('accountData1357908642.csv', data, (err) => {
    if (err) throw err;
    console.log('Account created');
    });

    //let file = new File([""], "accountData1357908642.csv");

}

/*function editData(data) {
    if (!checkCookieExists("uname")) {
        return; 
    } 
    let uname = getCookieValue("uname"); 
    let allAccs = getAccounts(); 
    let success = false; 
    for (let i=0; i<allAccs.length; i++) {
        if (allAccs[i][0] === uname) {
            allAccs[i] = data; 
            success = true; 
            break; 
        }
    }
    if (!success) {
        return; 
    }
    
}*/

function writeData(data) {
    fs.writeFileSync(JSON.stringify(data))
}

function getHist() {
    if (!checkCookieExists("uname")) {
        return; 
    } 
    let uname = getCookieValue("uname"); 
    let allAccs = getAccounts(); 
    let index = -1; 
    for (let i=0; i<allAccs.length; i++) {
        if (allAccs[i][0] === uname) {
            index = i; 
            break; 
        }
    }
    if (index == -1) {
        return; 
    }
    return allAccs[index].slice(2, allAccs[index].length); 
}

 function getAccounts(){
    console.log("Getting current accounts"); 
    /*let file = new File([""], "accountData1357908642.csv");
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        let csvdata = event.target.result;
        let rowData = csvdata.split('\n');
        let splitData = new Array(rowData.length); 
        console.log(csvdata); 
        //let rowColData = []; 
        for (let row = 0; row < rowData.length; row++) {
            let rowColData = rowData[row].split(',');
            splitData[row] = rowColData; 
*/
            /*for (let col = 0; col < rowColData.length; col++) {
                let newCell = newRow.insertCell();
                newCell.innerHTML = rowColData[col];

            }*/ /*

        }
        console.log("success"); 
        console.log(splitData);
        return splitData;
    };*/
    
    //const fs = require("fs") 
    
    let raw = fs.readFileSync("accountData.json");
    let data = JSON.parse(raw) // []

    return data
}

function checkCookieExists(str) {
    return document.cookie.split(';').some((item) => item.trim().startsWith(str + '='));
}

function getCookieValue(str) {
    return document.cookie.split('; ').find((row) => row.startsWith(str + '='))?.split('=')[1];
}

console.log(getAccounts())
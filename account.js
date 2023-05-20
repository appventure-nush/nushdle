// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBn-tIWURsEHSJsnQMriFc1Ydhp6TyTRkM",
    authDomain: "nushdle.firebaseapp.com",
    projectId: "nushdle",
    storageBucket: "nushdle.appspot.com",
    messagingSenderId: "756863899871",
    appId: "1:756863899871:web:f727558c1288e6904ef16a",
    measurementId: "G-CXCBKH6HND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function makeAcc() {
    console.log("Making account"); 
    if (checkCookieExists("uname")) {
        console.log("Logged in already")
        return "Logged in already"; 
    } 
    var uname = document.getElementById("uname"); 
    var pwd = document.getElementById("pwd"); 
    var currAccs = getAccounts(); 
    for (var i = 0; i < currAccs.length; i++) {
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
    

}
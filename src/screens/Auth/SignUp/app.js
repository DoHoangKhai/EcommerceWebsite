import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyDUnRN3NqKgJu367YW-jzi_k9EjxFSV7NY",
    authDomain: "e-commerce-2f974.firebaseapp.com",
    databaseURL: "https://e-commerce-2f974-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-commerce-2f974",
    storageBucket: "e-commerce-2f974.appspot.com",
    messagingSenderId: "903149086064",
    appId: "1:903149086064:web:c8419dff240476ac551bb5",
    measurementId: "G-GBEFH4S9Z0"
  };


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

const First = document.getElementById("first")
const Last = document.getElementById("last")
const Mail = document.getElementById("mail")
const Pass = document.getElementById("password")
const ConPass = document.getElementById("con-password")
const EyePos = document.getElementById("eyes")
const ConEyePos = document.getElementById("coneyes")
const ButtonLogin = document.getElementById("b_submit")

var i = 0

function ShowPass(){
    const InputType = document.querySelector("#pass");
    const Eye = document.querySelector("#eyes");

    const eyeclose = document.createElement("img");
    eyeclose.src = "../../../../assets/icon/Line\ 130.svg";

    if(InputType.getAttribute("type") == "password"){
        InputType.setAttribute("type", "text");
        Eye.appendChild(eyeclose);
    }else{
        InputType.setAttribute("type", "password");
        Eye.innerHTML = ' '
    }
}

function ShowConPass(){
    const InputType = document.querySelector("#con-pass");
    const Eye = document.querySelector("#coneyes");

    const eyeclose = document.createElement("img");
    eyeclose.src = "../../../../assets/icon/Line\ 130.svg";

    if(InputType.getAttribute("type") == "password"){
        InputType.setAttribute("type", "text");
        Eye.appendChild(eyeclose);
    }else{
        InputType.setAttribute("type", "password");
        Eye.innerHTML = ' '
    }
}

ConEyePos.addEventListener('click', ShowConPass)
EyePos.addEventListener('click', ShowPass)

function check(){
    let Username = document.getElementById("username").value;
    let Age = document.getElementById("Aged").value;
    let PhoneNumber = document.getElementById("PhoneNum").value;
    let Email = document.getElementById("email").value;
    let Password = document.getElementById("pass").value;
    let Address = document.getElementById("address").value;
    let ConPassword = document.getElementById("con-pass").value;
    let ErrorText = ""

    if(Username == ''){
        ErrorText = "Missing Input"
        First.innerHTML = ErrorText
        return
    }else{
        First.innerHTML = ''
    }

    if(Age == ''){
        ErrorText = `Missing Input`
        Last.innerHTML = ErrorText
        return
    }else{
        Last.innerHTML = ''
    }

    if(Email == ''){
        ErrorText = `Missing Input`
        Mail.innerHTML = ErrorText
        return
    }else{
        Mail.innerHTML = ''
    }

    if(Address == ''){
        ErrorText = `Missing Input`
        Address.innerHTML = ErrorText
        return
    }else{
        Mail.innerHTML = ''
    }

    if(Password == ''){
        ErrorText = `Missing Input`
        Pass.innerHTML = ErrorText
        return
    }else{
        Pass.innerHTML = ''
    }
    
    if(ConPassword == ''){
        ErrorText = 'Missing Input'
        ConPass.innerHTML = ErrorText
        return
    }else{
        ConPass.innerHTML = ''
    }

    if(Password != ConPassword){
        ErrorText = `Password confirmation failed, please type again`
        ConPass.innerHTML = ErrorText
        return
    }else{
        Pass.innerHTML = ''
    }

    createUserWithEmailAndPassword(auth, Email, Password)
    .then((success) => {
        const user = success.user
        console.log(user.uid)
        
        set(ref(database, 'Newusers/' + user.uid), {
            id: user.uid,
            username: Username, 
            age: Age,
            phonenumber: PhoneNumber,
            address: Address,
            email: Email,
            role: 0,
            status: 1
        })

        alert("Register Successful")
    })

    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

ButtonLogin.addEventListener('click', check)
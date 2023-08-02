import { getDatabase, update, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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

const SuperAdmin = {
  email: "SuperAdmin@gmail.com",
  password: "123456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const dbRef = ref(database)

const MailBox = document.getElementById("email-text")
const PassBox = document.getElementById("pass-text")
const EyePos = document.getElementById("eyes")
const ButtonLogin = document.getElementById("b_login")

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



function check(){
    let Mail = document.getElementById("email").value;
    let Pass = document.getElementById("pass").value;

    if(Mail == SuperAdmin.email && Pass == SuperAdmin.password){
      alert("Super Admin granted")
      location.replace("../../Admin/index.html")
    }else{
      signInWithEmailAndPassword(auth, Mail, Pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid)


      get(child(dbRef, "Newusers/" + user.uid)).then((snapshot) =>{
      if(snapshot.val().status == 0){
        alert("User Banned")
        return
      }

      if(snapshot.val().role == 0){
        const dt = new Date()
        update(ref(database, 'users/' + user.uid), {
          last_login : dt,
        })
    
        alert("User Loged in")
        location.replace("../../Shopping Page/index.html")
      }else if(snapshot.val().role == 1){
        const dt = new Date()
        update(ref(database, 'users/' + user.uid), {
          last_login : dt,
        })
    
        alert("Admin Loged in")
        location.replace("../../Admin/index.html")
      }
    })


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
    });
    }
}

ButtonLogin.addEventListener('click', check)
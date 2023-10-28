// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, get, child, ref, set, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getDocs} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
const itemsRef = ref(database);

const AdvisorTable = document.getElementById("product-body")

var stdNo = 0



function AddItemToTable(id, username, age, email, phonenumber, address, role, status){
    let ItemRow = document.createElement("tr")
    let TdName = document.createElement("td")
    let TdID = document.createElement("td")
    let TdAge = document.createElement("td")
    let TdEmail = document.createElement("td")
    let TdPhone = document.createElement("td")
    let TdAddress = document.createElement("td")
    let TdRole = document.createElement("td")
    let TdStatus = document.createElement("td")

    TdName.innerHTML = username
    TdID.innerHTML = id
    TdAge.innerHTML = age
    TdEmail.innerHTML = email
    TdPhone.innerHTML = phonenumber
    TdAddress.innerHTML = address

    if(role == 0){
        TdRole.innerHTML = "User " + "- " + role
    }else{
        TdRole.innerHTML = "Admin " + "- " + role
    }

    if(status == 0){
        TdStatus.innerHTML = "Banned " + "- " + status
    }else{
        TdStatus.innerHTML = "Active " + "- " + status
    }

    ItemRow.appendChild(TdID)
    ItemRow.appendChild(TdName)
    ItemRow.appendChild(TdAge)
    ItemRow.appendChild(TdEmail)
    ItemRow.appendChild(TdPhone)
    ItemRow.appendChild(TdAddress)
    ItemRow.appendChild(TdRole)
    ItemRow.appendChild(TdStatus)


    AdvisorTable.appendChild(ItemRow)
}

function AddAllItemTable(Product){
    stdNo = 0
    AdvisorTable.innerHTML = ""
    Product.forEach(element => {
        AddItemToTable(element.id, element.username, element.age, element.email, element.phonenumber, element.address, element.role, element.status);
    })
}

function GetAllData(){
    const itemsRef = ref(database)

    get(child(itemsRef, "Newusers"))
    .then((snapshot) =>{
        var product =[];

        snapshot.forEach(childSnapshot => {
            product.push(childSnapshot.val());
        });

        AddAllItemTable(product)
    })
}


window.onload = GetAllData


async function AddUser() {
    const N_ID = document.getElementById("NewID").value;
    const N_Username = document.getElementById("NewUsername").value;
    const N_Age = document.getElementById("NewAge").value;
    const N_Email = document.getElementById("NewEmail").value;
    const N_Phone = document.getElementById("NewPhone").value;
    const N_Address = document.getElementById("NewAddress").value;
    const N_Role = document.getElementById("NewRole").value;
    const N_Status = document.getElementById("NewStatus").value;
  
    AdvisorTable.innerHTML = "";
    const Password = '00000000'
  
    // if(N_ID == ''){
    //     alert("ID must not be left empty")
    //     return
    // }
  
    // if(N_Name == ''){
    //     alert("Advisor name must not be left empty")
    //     return
    // }
  
    // if(N_Company == ''){
    //     alert("Company name must not be left empty")
    //     return
    // }
  
    // if(N_Fluffle == ''){
    //     alert("Fluffle name must not be left empty")
    //     return
    // }
  
    // if(N_Customer == ''){
    //     alert("Customer must not be left empty")
    //     return
    // }
  
    // if(N_Wallet == ''){
    //     alert("Wallet must not be left empty")
    //     return
    // }
  
    set(ref(database, "Newusers/" + N_ID), {
        id: N_ID,
        username: N_Username,
        age: N_Age,
        email: N_Email,
        phonenumber: N_Phone,
        address: N_Address,
        role: N_Role,
        status: N_Status
    });

    createUserWithEmailAndPassword(auth, N_Email, Password)
    .then((success) => {
        const user = success.user
        console.log(user.uid)
    })

    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      alert(errorMessage);
    });

    alert("Add successful, Password is: " + Password)
  
    GetAllData();
}

function UpdateUser() {
    const U_ID = document.getElementById("UpID").value;
    const UN_ID = document.getElementById("NewUpID").value;
    const U_Username = document.getElementById("UpUsername").value;
    const U_Age = document.getElementById("UpAge").value;
    const U_Email = document.getElementById("UpEmail").value;
    const U_Phone = document.getElementById("UpPhone").value;
    const U_Address = document.getElementById("UpAddress").value;
    const U_Role = document.getElementById("UpRole").value;
    const U_Status = document.getElementById("UpStatus").value;
  
    if(UN_ID != ""){
      update(ref(database, "Newusers/" + U_ID), {
        id : UN_ID
      });
    }
  
    if(U_Username != ""){
      update(ref(database, "Newusers/" + U_ID), {
        username : U_Username
      });
    }
  
    if(U_Age != ""){
      update(ref(database, "Newusers/" + U_ID), {
        age : U_Age
      });
    }

    if(U_Email != ""){
        update(ref(database, "Newusers/" + U_ID), {
          email : U_Email
        });
      }
  
    if(U_Phone != ""){
      update(ref(database, "Newusers/" + U_ID), {
        phonenumber : U_Phone
      });
    }
  
    if(U_Address != ""){
      update(ref(database, "Newusers/" + U_ID), {
        address : U_Address
      });
    }
  
    if(U_Role != ""){
      update(ref(database, "Newusers/" + U_ID), {
        role : U_Role
      });
    }
  
    if(U_Status != ""){
      update(ref(database, "Newusers/" + U_ID), {
        status : U_Status
      });
    }
  
    alert("Update successful")
    GetAllData
  }


document.getElementById("gotoProduct").addEventListener('click', function(){
    location.replace("../ManagerProduct/index.html")
})

document.getElementById("UpdateUser").addEventListener('click', UpdateUser)

document.getElementById("AddUser").addEventListener('click', AddUser)

document.getElementById("gotoHome").addEventListener('click', function(){
    location.replace("../index.html")
})

document.getElementById("LogGoTo").addEventListener('click', function(){
  location.replace("../../Auth/SignIn/index.html")
})



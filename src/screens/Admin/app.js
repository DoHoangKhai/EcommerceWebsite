// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getFirestore, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

const database = getDatabase(app);
const db = getFirestore(app);

const Cart = document.getElementById("cart")
const listProduct = collection(db, "Product")

var stdNo = 0

const AdvisorTable = document.getElementById("product-body")

function AddItemToTable(name, price, stock){
    let ItemRow = document.createElement("tr")
    let TdName = document.createElement("td")
    let TdPrice = document.createElement("td")
    let TdStock = document.createElement("td")

    TdName.innerHTML = name
    TdPrice.innerHTML = price
    TdStock.innerHTML = stock

    ItemRow.appendChild(TdName)
    ItemRow.appendChild(TdPrice)
    ItemRow.appendChild(TdStock)

    AdvisorTable.appendChild(ItemRow)
}




function AddAllItemTable(Product){
    stdNo = 0
    AdvisorTable.innerHTML = ""
    Product.forEach(element => {
        AddItemToTable(element.name, element.price, element.stock);
    })
}


function GetAllData(){
    const itemsRef = ref(database)

    get(child(itemsRef, "NewProduct"))
    .then((snapshot) =>{
        var product =[];

        snapshot.forEach(childSnapshot => {
            product.push(childSnapshot.val());
        });
        stdNo = product.length
        AddAllItemTable(product)
    })
}
///////////////////////////////////////////////////////

function AddUserToTable(name, email){
    let UserRow = document.createElement("div")
    let UserInfo = document.createElement("div")
    let UserContact = document.createElement("div")
    let UserTitle = document.createElement("div")
    let UserImage = document.createElement("img")
    let UserName = document.createElement("h4")
    let UserEmail = document.createElement("small")
    let IconComment = document.createElement("span")
    let IconPhone = document.createElement("span")

    UserRow.classList.add("customer")
    UserInfo.classList.add("info")
    UserContact.classList.add("contact")

    UserImage.src = "../../../assets/Images/Sample_User_Icon.png"
    UserImage.style.width = '40px'
    UserImage.style.height = '40px'
    UserName.innerHTML = name
    UserEmail.innerHTML = email

    IconComment.classList.add("las")
    IconPhone.classList.add("las")
    IconComment.classList.add("la-comment")
    IconPhone.classList.add("la-phone")

    UserTitle.appendChild(UserName)
    UserTitle.appendChild(UserEmail)

    UserInfo.appendChild(UserImage)
    UserInfo.appendChild(UserTitle)

    UserContact.appendChild(IconComment)
    UserContact.appendChild(IconPhone)

    UserRow.appendChild(UserInfo)
    UserRow.appendChild(UserContact)


    document.getElementById("user-body").appendChild(UserRow)
}

function AddAllUserTable(Product){
    stdNo = 0
    document.getElementById("user-body").innerHTML = ""
    Product.forEach(element => {
        AddUserToTable(element.username, element.email);
    })
}

function GetAllUserData(){
    const itemsRef = ref(database)

    get(child(itemsRef, "Newusers"))
    .then((snapshot) =>{
        var productUser =[];

        snapshot.forEach(childSnapshot => {
            productUser.push(childSnapshot.val());
        });

        AddAllUserTable(productUser)
    })
}
///////////////////////////////////////////////////////////////////////

GetAllData()
GetAllUserData()




document.getElementById("gotoProduct").addEventListener('click', function(){
    location.replace("./ManagerProduct/index.html")
})

document.getElementById("gotoUser").addEventListener('click', function(){
    location.replace("./ManagerUser/index.html")
})

document.getElementById("LogGoTo").addEventListener('click', function(){
    location.replace("../Auth/SignIn/index.html")
})

document.getElementById("ProductGo").addEventListener('click', function(){
    location.replace("./ManagerProduct/index.html")
})

document.getElementById("UserGo").addEventListener('click', function(){
    location.replace("./ManagerUser/index.html")
})





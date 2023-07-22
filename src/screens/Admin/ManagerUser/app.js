// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, get, child, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getDocs} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
const itemsRef = ref(database);

const AdvisorTable = document.getElementById("product-body")

const getDataProduct = async () => {
    try{
        // const data = await getDocs(listProduct);
        const chicken = await  get(child(itemsRef, 'NewUsers/'))
        // let response =  data.docs.map((item) => item.data());
        console.log(chicken);
  
        const productsContainer = document.getElementById("product-body");
  
        // response.map((item) => {
        //     const rowItem = document.createElement("tr");
  
        //     const ColName = document.createElement("td")
        //     ColName.innerText = item.name
  
        //     const ColPrice = document.createElement("td")
        //     ColPrice.innerText = "$"+item.price

        //     const ColStock = document.createElement("td")
        //     ColStock.innerText = item.stock + " Remaining"

        //     rowItem.appendChild(ColName)
        //     rowItem.appendChild(ColPrice)
        //     rowItem.appendChild(ColStock)
  
        //     productsContainer.appendChild(rowItem)
        // })
    } catch (error) {
        console.error("Error occure", error);
        throw error;
    }
  
};

var stdNo = 0



function AddItemToTable(id, username, age, email, phonenumber, address){
    let ItemRow = document.createElement("tr")
    let TdName = document.createElement("td")
    let TdID = document.createElement("td")
    let TdAge = document.createElement("td")
    let TdEmail = document.createElement("td")
    let TdPhone = document.createElement("td")
    let TdAddress = document.createElement("td")

    TdName.innerHTML = username
    TdID.innerHTML = id
    TdAge.innerHTML = age
    TdEmail.innerHTML = email
    TdPhone.innerHTML = phonenumber
    TdAddress.innerHTML = address

    ItemRow.appendChild(TdID)
    ItemRow.appendChild(TdName)
    ItemRow.appendChild(TdAge)
    ItemRow.appendChild(TdEmail)
    ItemRow.appendChild(TdPhone)
    ItemRow.appendChild(TdAddress)

    AdvisorTable.appendChild(ItemRow)
}

function AddAllItemTable(Product){
    stdNo = 0
    AdvisorTable.innerHTML = ""
    Product.forEach(element => {
        AddItemToTable(element.id, element.username, element.age, element.email, element.phonenumber, element.address);
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


function getUserProduct(){
    AdvisorTable.innerHTML = ''
    for(var i = 0; i < 100; i++){
        get(child(itemsRef, 'NewUsers/' + i)).then((snap) => {
            if(snap.exists()){
                let baseRow = ``
                baseRow = `
                <tr class="work">
                    <td>${snap.val().id}</td>
                    <td>${snap.val().name}</td>
                    <td>${snap.val().age}</td>
                    <td>${snap.val().phonenum}</td>
                </tr>
                `
    
                AdvisorTable.innerHTML += baseRow
            }
        })
    }
}



document.getElementById("gotoProduct").addEventListener('click', function(){
    location.replace("../ManagerProduct/index.html")
})

document.getElementById("gotoHome").addEventListener('click', function(){
    location.replace("../index.html")
})


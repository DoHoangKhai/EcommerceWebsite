// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, set, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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
;

const Cart = document.getElementById("cart")
const listProduct = collection(db, "Product")

const AdvisorTable = document.getElementById("product-body")

const FoodProduct = get(child(itemsRef, 'NewProduct/'))
console.log(FoodProduct)

let j = 0

function getFoodProduct(){
    AdvisorTable.innerHTML = ''
    for(var i = 0; i < 100; i++, j++){
        get(child(itemsRef, 'NewProduct/' + i)).then((snap) => {
            if(snap.exists()){
                let baseRow = ``
                baseRow = `
                <tr class="work">
                    <td>${snap.val().id}</td>
                    <td>${snap.val().name}</td>
                    <td>${snap.val().price}</td>
                    <td>${snap.val().stock}</td>
                </tr>
                `
    
                AdvisorTable.innerHTML += baseRow
            }
        })
    }
}

function AddItemToTable(id, name, price, stock){
    let ItemRow = document.createElement("tr")
    let TdName = document.createElement("td")
    let TdID = document.createElement("td")
    let TdPrice = document.createElement("td")
    let TdStock = document.createElement("td")

    TdName.innerHTML = name
    TdID.innerHTML = id
    TdPrice.innerHTML = price
    TdStock.innerHTML = stock

    ItemRow.appendChild(TdID)
    ItemRow.appendChild(TdName)
    ItemRow.appendChild(TdPrice)
    ItemRow.appendChild(TdStock)

    AdvisorTable.appendChild(ItemRow)
}

function GetAllData(){
    const itemsRef = ref(database)

    get(child(itemsRef, "NewProduct"))
    .then((snapshot) =>{
        var product =[];

        snapshot.forEach(childSnapshot => {
            
        });
    })
}




function AddAdvisor(){
    const N_ID = document.getElementById("NewID").value
    const N_Image = document.getElementById("NewImage").value
    const N_Name = document.getElementById("NewName").value
    const N_Price = document.getElementById("NewPrice").value
    const N_Rating = document.getElementById("NewRating").value
    const N_Stock = document.getElementById("NewStock").value
    const N_Description = document.getElementById("NewDescription").value
    const N_Shipping = document.getElementById("NewShipping").value

    let newRow = ``
    AdvisorTable.innerHTML = ''

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

    set(ref(database, 'NewProduct/' + N_ID), {
        id: N_ID,
        image: N_Image,
        name: N_Name,
        price: N_Price,
        rating: N_Rating,
        stock: N_Stock,
        description: N_Description,
        shipping: N_Shipping
    })

    getFoodProduct()
}

function DeleteAdvisor(){
    const IDRemove = document.getElementById("RemoveID").value

    remove(ref(database, 'NewProduct/' + IDRemove))
    .then(() => {
        alert("delete successfully")
        getFoodProduct()
    })
    .catch((error) => {
        alert("Unsuccessful, error: " + error)
    })
}

document.getElementById("AddItem").addEventListener('click', AddAdvisor)
document.getElementById("RemoveItem").addEventListener('click', DeleteAdvisor)

getFoodProduct()

const IDList = document.getElementsByClassName("work")
console.log(IDList)
console.log(IDList.length)
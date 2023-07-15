// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

const getDataProduct = async () => {
    try{
        const data = await getDocs(listProduct);
        let response =  data.docs.map((item) => item.data());
        console.log(response);
  
        const productsContainer = document.getElementById("product-body");
  
        response.map((item) => {
            const rowItem = document.createElement("tr");
  
            const ColName = document.createElement("td")
            ColName.innerText = item.name
  
            const ColPrice = document.createElement("td")
            ColPrice.innerText = "$"+item.price

            const ColStock = document.createElement("td")
            ColStock.innerText = item.stock + " Remaining"

            rowItem.appendChild(ColName)
            rowItem.appendChild(ColPrice)
            rowItem.appendChild(ColStock)
  
            productsContainer.appendChild(rowItem)
        })
    } catch (error) {
        console.error("Error occure", error);
        throw error;
    }
  
};

getDataProduct()

document.getElementById("gotoProduct").addEventListener('click', function(){
    location.replace("./ManagerProduct/index.html")
})

document.getElementById("gotoUser").addEventListener('click', function(){
    location.replace("./ManagerUser/index.html")
})


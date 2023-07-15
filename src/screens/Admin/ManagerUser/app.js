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

getDataProduct()


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


getUserProduct()

document.getElementById("gotoProduct").addEventListener('click', function(){
    location.replace("./ManagerProduct/index.html")
})
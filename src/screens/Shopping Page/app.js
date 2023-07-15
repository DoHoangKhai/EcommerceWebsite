// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, get, child, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

const itemsRef = ref(database);

let i = 0;

function getFoodProduct(){
  for(var i = 0; i < 100; i++){
      get(child(itemsRef, 'NewProduct/' + i)).then((snap) => {
          if(snap.exists()){
            const card = document.createElement("div");
            card.classList.add("card-single")
            card.setAttribute("id", snap.val().id);

            const cardImage = document.createElement("div")
            cardImage.classList.add("product-imag")

            const cardImg = document.createElement("img")
            cardImg.src = snap.val().image

            cardImage.appendChild(cardImg)

            const nameProduct = document.createElement("h5")
            nameProduct.innerText = snap.val().name

            nameProduct.addEventListener('click', function(){
              const modal = document.createElement("div");
              modal.setAttribute("class", "modal");
              //Modal Product

              const modalProduct = document.createElement("div")
              modalProduct.classList.add("modal-item")

              const modalDetail = document.createElement("div")
              modalDetail.classList.add("modal-detail")

              const modalMore = document.createElement("div")
              modalMore.classList.add("modal-desc")
        
              const modalImage = document.createElement("div")
              modalImage.classList.add("modal-image")

              const modalImg = document.createElement("img")
              modalImg.src = snap.val().image

              modalImage.appendChild(modalImg)
              
              

              const modalName = document.createElement("h3")
              modalName.innerText = snap.val().name
              modal.appendChild(modalName)

              const modalPrice = document.createElement("h2")
              modalPrice.innerText = "$" + snap.val().price

              const modalStock = document.createElement("h4")
              modalStock.innerText = "Remaining in stock: " + snap.val().stock

              const modalShipping = document.createElement("h4")
              modalShipping.innerText = "Shipping: " + snap.val().freeshipping

              const modalRating = document.createElement("h4")
              modalRating.innerText = "Rating: " + snap.val().rating +"/5"

              const modalDesc = document.createElement("h5")
              modalDesc.innerText = "Product Detail"

              const modalDescription = document.createElement("p")
              modalDescription.innerText = snap.val().description

              const modalAddCart = document.createElement("button")
              modalAddCart.classList.add("addCart")
              modalAddCart.innerHTML = "Add to Cart"
              // modalAddCart.addEventListener('click', addtocart(item.id))
              modalAddCart.addEventListener('click', function(){
                cart.push({...categories[snap.val().id]});
                displaycart();
              })

              modalDetail.appendChild(modalName)
              modalDetail.appendChild(modalStock)
              modalDetail.appendChild(modalPrice)
              modalDetail.appendChild(modalShipping)
              modalDetail.appendChild(modalRating)
              modalDetail.appendChild(modalAddCart)
              
              
              modalProduct.appendChild(modalImage)
              modalProduct.appendChild(modalDetail)

              // Description
              modalMore.appendChild(modalDesc)
              modalMore.appendChild(modalDescription)
              
              // Div button
              const closeButton = document.createElement("button");
              closeButton.setAttribute("type", "button");
              closeButton.innerHTML = "Close";
              modal.appendChild(closeButton);


              const ButtonDiv = document.createElement("div")
              ButtonDiv.classList.add("modal-button")

              ButtonDiv.appendChild(closeButton)
              

              modal.appendChild(modalProduct)
              modal.appendChild(modalMore)
              modal.appendChild(ButtonDiv)
              
              closeButton.addEventListener("click", function() {
                modal.remove()
              });

              document.getElementById(snap.val().id).appendChild(modal)
            })

            const rating = document.createElement("h6")
            rating.classList.add("first")
            rating.innerText = snap.val().rating + "/5"

            const cost = document.createElement("h3")
            cost.innerText = "$" + snap.val().price

            const stock = document.createElement("h6")
            stock.innerText = snap.val().stock

            const freeShipping = document.createElement("h6")
            freeShipping.innerText = snap.val().shipping

            const ProductTitle = document.createElement("div")
            ProductTitle.classList.add("product-title")

            const BottomDetail = document.createElement("div")
            BottomDetail.classList.add("bottom-detail")
            BottomDetail.appendChild(stock)
            BottomDetail.appendChild(freeShipping)
            


            ProductTitle.appendChild(nameProduct)
            ProductTitle.appendChild(rating)
            ProductTitle.appendChild(cost)
            ProductTitle.appendChild(BottomDetail)
            


            card.appendChild(cardImage)
            card.appendChild(ProductTitle)

            document.getElementById("product-body").appendChild(card)
          }
      })
  }
}



const data = await getDocs(listProduct);
let response =  data.docs.map((item) => item.data());
console.log(response);



const categories = [...new Set(response.map((item) => 
  {return item}))]
console.log(categories)

var cart = [];

// function addtocart(a){
//     cart.push({...categories[a]});
//     displaycart();
//     console.log(cart)
// }

function work(){
  alert("work")
}


function displaycart(a){
    let j = 0, total = 0;
    document.getElementById("item-num").innerHTML = cart.length
    document.getElementById("cart-num").innerHTML = cart.length
    if(cart.length == 0){
        document.getElementById("ul-mini").innerHTML = ''
        document.getElementById('total-cost').innerHTML = "$" + 0
        document.getElementById('cart-total').innerHTML = 0
    }else{
      document.getElementById("ul-mini").innerHTML = ''
        cart.map((items)=>
        {
            var {id, image, name, price} = items;
            total = total + price;
            document.getElementById("total-cost").innerHTML = "$" + total
            document.getElementById("cart-total").innerHTML = total

            //div
            const ItemCart = document.createElement("div")
            ItemCart.classList.add('item')

            const ImageCart = document.createElement("div")
            ImageCart.classList.add('thumbnail')

            const ContentCart = document.createElement("div")
            ContentCart.classList.add('item-content')

            //div element img
            const ItemImg = document.createElement("img")
            ItemImg.src = image

            const ItemName = document.createElement("a")
            ItemName.innerText = name

            const ItemPrice = document.createElement("span")
            ItemPrice.classList.add("price")

            const ItemCost = document.createElement("span")
            ItemCost.innerText = price

            ItemPrice.appendChild(ItemCost)

            const ItemTrashIcon = document.createElement("i")
            ItemTrashIcon.classList.add("ri-close-line")

            const ItemTrash = document.createElement("a")
            ItemTrash.classList.add("item-remove")

            ItemTrash.appendChild(ItemTrashIcon)
            ItemTrashIcon.addEventListener('click', function(){
              cart.splice(id, 1)
              displaycart()
              console.log(cart)
            })

            ImageCart.appendChild(ItemImg)
            ContentCart.appendChild(ItemName)
            ContentCart.appendChild(ItemPrice)

            // Assemble
            ItemCart.appendChild(ImageCart)
            ItemCart.appendChild(ContentCart)
            ItemCart.appendChild(ItemTrash)

            document.getElementById("ul-mini").appendChild(ItemCart)
        })
    }

}



function delElement(a){
    cart.splice(a, 1)
    displaycart()
    console.log(cart)
}


document.getElementById("shop-cart").addEventListener('click', function(){


    if(Cart.style.display == 'block'){
        Cart.style.display = 'none'
    }else{
        Cart.style.display = 'block'
    }
})

getFoodProduct()

const shopping = document.getElementsByClassName("addCart")

for(var p = 0; p < shopping.length; i++){
  shopping[p].addEventListener("click", addtocart(p))
}

 







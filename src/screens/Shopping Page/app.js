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
        const card = document.createElement("div");
        card.classList.add("card-single")

        const cardImage = document.createElement("div")
        cardImage.classList.add("product-imag")

        const cardImg = document.createElement("img")
        cardImg.src = item.image

        cardImage.appendChild(cardImg)

        const nameProduct = document.createElement("h5")
        nameProduct.innerText = item.name
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
          modalImg.src = item.image

          modalImage.appendChild(modalImg)
          
          

          const modalName = document.createElement("h3")
          modalName.innerText = item.name
          modal.appendChild(modalName)

          const modalPrice = document.createElement("h2")
          modalPrice.innerText = "$" + item.price

          const modalStock = document.createElement("h4")
          modalStock.innerText = "Remaining in stock: " + item.stock

          const modalShipping = document.createElement("h4")
          modalShipping.innerText = "Shipping: " + item.freeshipping

          const modalRating = document.createElement("h4")
          modalRating.innerText = "Rating: " + item.rating +"/5"

          const modalDesc = document.createElement("h5")
          modalDesc.innerText = "Product Detail"

          const modalDescription = document.createElement("p")
          modalDescription.innerText = item.desc

          const modalAddCart = document.createElement("button")
          modalAddCart.classList.add("addCart")
          modalAddCart.innerHTML = "Add to Cart"
          modalAddCart.addEventListener('click', addtocart(item.id))

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

          document.getElementById('product-body').appendChild(modal)
        })

        const rating = document.createElement("h6")
        rating.classList.add("first")
        rating.innerText = item.rating + "/5"

        const cost = document.createElement("h3")
        cost.innerText = "$" + item.price

        const stock = document.createElement("h6")
        stock.innerText = item.stock

        const freeShipping = document.createElement("h6")
        freeShipping.innerText = item.freeshipping

        const ProductTitle = document.createElement("div")
        ProductTitle.classList.add("product-title")


        ProductTitle.appendChild(nameProduct)
        ProductTitle.appendChild(rating)
        ProductTitle.appendChild(cost)
        ProductTitle.appendChild(stock)
        ProductTitle.appendChild(freeShipping)

        card.appendChild(cardImage)
        card.appendChild(ProductTitle)

        productsContainer.appendChild(card)
      })
      
  } catch (error) {
      console.error("Error occure", error);
      throw error;
  }
};

const data = await getDocs(listProduct);
let response =  data.docs.map((item) => item.data());
console.log(response);



const categories = [...new Set(response.map((item) => 
  {return item}))]
  let i = 0;
console.log(categories)

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
    console.log(cart)
}

function displaycart(a){
    let j = 0, total = 0;
    document.getElementById("item-num").innerHTML = cart.length
    if(cart.length == 0){
        document.getElementById('total-cost').innerHTML = "$" + 0
    }else{
        document.getElementById("ul-mini").innerHTML = cart.map((items)=>
        {
            var {image, name, title, price} = items;
            total = total + price;
            document.getElementById("total-cost").innerHTML = "$" + total
            return(
                `<div class='item'>
                    <div class = 'thumbnail image-cover'>
                      <a href="#"><img src="${image}" alt=""></a>
                    </div>

                  <div class="item-content">
                    <a href="#">${name}</a>
                    <span class="price">
                      <span>$${price}</span>
                    </span>
                  </div>
                  <a href="" class="item-remove"><i class="ri-close-line" onclick="delElement(${j++})"></i></a>
                </div>`
            )
        }).join('')
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



getDataProduct();
console.log(database)
 

 







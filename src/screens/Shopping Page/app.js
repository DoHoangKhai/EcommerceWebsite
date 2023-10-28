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

let stdNo = 0;
const AdvisorTable = document.getElementById("product-body")
const Notify = document.getElementById("alert")

function AddItemToTable(id, name, image, price, stock, shipping, rating, description, category){
  const card = document.createElement("div");
  card.classList.add("card-single")
  card.setAttribute("id", id);

  const cardImage = document.createElement("div")
  cardImage.classList.add("product-imag")

  const cardImg = document.createElement("img")
  cardImg.src = image

  cardImage.appendChild(cardImg)

  const nameProduct = document.createElement("h5")
  nameProduct.innerText = name

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
    modalImg.src = image

    modalImage.appendChild(modalImg)
    
    

    const modalName = document.createElement("h3")
    modalName.innerText = name
    modal.appendChild(modalName)

    const modalPrice = document.createElement("h2")
    modalPrice.innerText = "$" + price

    const modalStock = document.createElement("h4")
    modalStock.innerText = "Remaining in stock: " + stock

    const modalShipping = document.createElement("h4")
    modalShipping.innerText = "Shipping: " + shipping

    const modalRating = document.createElement("h4")
    modalRating.innerText = "Rating: " + rating +"/5"

    const modalDesc = document.createElement("h5")
    modalDesc.innerText = "Category: " + category + " Food"

    const modalDescription = document.createElement("p")
    modalDescription.innerText = description

    const modalAddCart = document.createElement("button")
    modalAddCart.classList.add("addCart")
    modalAddCart.innerHTML = "Add to Cart"
    
    modalAddCart.addEventListener('click', function(){
      cart.push({...categories[id]});
      displaycart();
      document.getElementById("notification").innerText = 'Item Added successfully'
      Notify.classList.remove("hide")
      Notify.classList.add("show")
      Notify.classList.add("showAlert")
      setTimeout(function(){
          Notify.classList.add("hide")
          Notify.classList.remove("show")
      }, 5000)
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

    document.getElementById(id).appendChild(modal)
  })

  const ratingDiv = document.createElement("h6")
  ratingDiv.classList.add("first")
  ratingDiv.innerText = rating + "/5"

  const cost = document.createElement("h3")
  cost.innerText = "$" + price

  const stockDiv = document.createElement("h6")
  stockDiv.innerText = "Remaining Stock: " + stock

  const freeShipping = document.createElement("h6")
  freeShipping.innerText = shipping

  const ProductTitle = document.createElement("div")
  ProductTitle.classList.add("product-title")

  const BottomDetail = document.createElement("div")
  BottomDetail.classList.add("bottom-detail")
  BottomDetail.appendChild(stockDiv)
  BottomDetail.appendChild(freeShipping)
  


  ProductTitle.appendChild(nameProduct)
  ProductTitle.appendChild(ratingDiv)
  ProductTitle.appendChild(cost)
  ProductTitle.appendChild(BottomDetail)
  


  card.appendChild(cardImage)
  card.appendChild(ProductTitle)

  document.getElementById("product-body").appendChild(card)
}

function AddAllItemTable(Product){
  stdNo = 0
  AdvisorTable.innerHTML = ""
  Product.forEach(element => {
      AddItemToTable(element.id, element.name, element.image, element.price, element.stock, element.shipping, element.rating, element.description, element.cate);
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

      AddAllItemTable(product)
  })
}

window.onload = GetAllData

// ALL DATA

let str = "stopRightNow"
let regEx = /^stop/

let testVar = "stop"
var regex = new RegExp("^" + testVar + "");
console.log(regex)

if(str.match(regex)){
  console.log("match")
}else{
  console.log("Not match")
}


let categories =[];
get(child(itemsRef, "NewProduct"))
  .then((snapshot) =>{
      

      snapshot.forEach(childSnapshot => {
          categories.push(childSnapshot.val());
      });
  })


console.log(categories)

var cart = [];

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function ShowSearchItem(){
  const itemsRef = ref(database)
  const searchInput = document.getElementById("searchProduct").value

  get(child(itemsRef, "NewProduct"))
  .then((snapshot) =>{
      var product =[];

      snapshot.forEach(childSnapshot => {
          product.push(childSnapshot.val());
      });

      AddSearchItemTable(product, searchInput)
  })
}

function AddSearchItemTable(Product, searched){
  stdNo = 0
  let len = 0 
  let regExp =  new RegExp("^" + searched + "");
  AdvisorTable.innerHTML = ""
  Product.forEach(element => {
      if(element.name.match(regExp)){
        AddItemToTable(element.id, element.name, element.image, element.price, element.stock, element.shipping, element.rating, element.description);
        len += 1
      }
      document.getElementById("title-cate").innerHTML = len + " Item found"
  })
}

document.getElementById("search-icon").addEventListener('click', ShowSearchItem)

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function ShowCateItem(categories){
  const itemsRef = ref(database)

  get(child(itemsRef, "NewProduct"))
  .then((snapshot) =>{
      var product =[];

      snapshot.forEach(childSnapshot => {
          product.push(childSnapshot.val());
      });

      AddCateItemTable(product, categories)
  })
}

function AddCateItemTable(Product, categories){
  stdNo = 0
  const BannerImg = document.getElementById("banner-cover")
  AdvisorTable.innerHTML = ""
  Product.forEach(element => {
    if(element.cate == categories){
      AddItemToTable(element.id, element.name, element.image, element.price, element.stock, element.shipping, element.rating, element.description);
    }
  })
  document.getElementById("title-cate").innerHTML = categories + " Food"
  
  if(categories == "America"){
    BannerImg.style.backgroundImage = "url(../../../assets/Images/americabg.jpg)"
  }

  if(categories == "Vietnam"){
    BannerImg.style.backgroundImage = "url(../../../assets/Images/vietnambg.jpg)"
  }

  if(categories == "India"){
    BannerImg.style.backgroundImage = "url(../../../assets/Images/indiabg.jpg)"
  }

  if(categories == "Japan"){
    BannerImg.style.backgroundImage = "url(../../../assets/Images/japanbg.jpg)"
  }

  if(categories == "Other"){
    BannerImg.style.backgroundImage = "url(../../../assets/Images/OtherFood.jpg)"
  }
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



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
            document.getElementById("total-cost").innerHTML = "$" + total.toFixed(2)
            document.getElementById("cart-total").innerHTML = total.toFixed(2)

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
            ItemCost.innerText = "$" + price

            ItemPrice.appendChild(ItemCost)

            const ItemTrashIcon = document.createElement("i")
            ItemTrashIcon.classList.add("ri-close-line")

            const ItemTrash = document.createElement("a")
            ItemTrash.classList.add("item-remove")

            ItemTrash.appendChild(ItemTrashIcon)
            ItemTrashIcon.addEventListener('click', function(){
              cart.splice(j++, 1)
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

const shopping = document.getElementsByClassName("addCart")

for(var p = 0; p < shopping.length; i++){
  shopping[p].addEventListener("click", addtocart(p))
}

document.getElementById("close-button").addEventListener('click', function(){
  Notify.classList.add("hide")
  Notify.classList.remove("show")
})

 document.getElementById("AmericaFood").addEventListener('click', function(){
    ShowCateItem("America")
 })

 document.getElementById("IndiaFood").addEventListener('click', function(){
    ShowCateItem("India")
 })

 document.getElementById("JapanFood").addEventListener('click', function(){
    ShowCateItem("Japan")
 })

 document.getElementById("VietnamFood").addEventListener('click', function(){
    ShowCateItem("Vietnam")
 })

 document.getElementById("OtherFood").addEventListener('click', function(){
  ShowCateItem("Other")
 })

 document.getElementById("head-logout").addEventListener('click', function(){
    location.replace("../Auth/SignIn/index.html")
 })

 document.getElementById("checkout").addEventListener('click', function(){
    document.getElementById("notification").innerText = 'Order purchased successfully'
    Notify.classList.remove("hide")
    Notify.classList.add("show")
    Notify.classList.add("showAlert")
    setTimeout(function(){
        Notify.classList.add("hide")
        Notify.classList.remove("show")
    }, 5000)
})






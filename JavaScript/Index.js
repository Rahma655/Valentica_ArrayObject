let But_QuickView = document.querySelectorAll(".But_QuickView_Card");
let ID_ProductCard_Img_QV = document.getElementById("ID_ProductCard_Img_QV");
let ID_Name_Text_QV = document.getElementById("ID_Name_Text_QV");
let ID_Price_Text_QV = document.getElementById("ID_Price_Text_QV");
let ID_Products_Preview = document.getElementById("ID_Products_Preview");
let Shop_Container = document.getElementById("ID_ProductCard_MainContainer");
let ID_Cart_Icon = document.getElementById("ID_Cart_Icon");
let Cart_Text = document.getElementById("ID_Cart_Text");
let ID_Cart_Container = document.getElementById("ID_Cart_Container");
let Closing_Icon = document.querySelector(".fa-times");

let Basket = JSON.parse(window.localStorage.getItem("data")) || [];

let ShopItemsData = [
  {
    id: "1",
    image: "../Images/product1jpg",
    name: "White Shirt",
    price: "12",
  },
  {
    id: "2",
    image: "../Images/product2.jpg",
    name: "White Shirt",
    price: "13",
  },
  {
    id: "3",
    image: "../Images/product3.jpg",
    name: "White Shirt",
    price: "14",
  },
  {
    id: "4",
    image: "../Images/product4.jpg",
    name: "White Shirt",
    price: "15",
  },
  {
    id: "5",
    image: "../Images/product55.jpg",
    name: "White Shirt",
    price: "16",
  },
  {
    id: "6",
    image: "../Images/product6.jpg",
    name: "White Shirt",
    price: "17",
  },
];

// -------------------------------Arrow Function to show products data --------------------------------------

let generateShop = () => {
  return (Shop_Container.innerHTML = ShopItemsData.map((x) => {
    //x means returning all data item by item
    let { id, image, name, price } = x;
    let search = Basket.find((x) => x.id == id) || [];
    return `
        <div class="ProductCard_SubContainer" id=ID_Product_${id}>
            <img class="CardImg_Containet" src=${image} alt="">
            <h1>${name}</h1>
        
            <div class="ProductItem_Counting">
                <p>$ ${price}</p>
                <div class="">
                    <i class="fa-solid fa-minus" onclick="Decrement(${id})"></i>
                    <span id=${id}>${
      search.item == undefined ? 0 : search.item
    }</span>
                    <i class="fa-solid fa-plus" onclick="Increment(${id})"></i>
                </div>
            </div>
            <button class="But_QuickView_Card" onclick="get_Quick_View(${id})">Quick View</button>
            <button class="But_AddToCart_Card" onclick="Remove_Cart_Items_Shop(${id})"  onmousup="Remove(this)">${
      search.item == undefined ? "Add to Cart" : search.status
    }</button>
        </div>
         `;
  }).join(""));
};
generateShop();

// -------------------------------Function for quick view button --------------------------------------
function get_Quick_View(id) {
  ID_Products_Preview.style.display = "flex";
  let search = ShopItemsData.find((x) => x.id == id);
  let Basket_Search = Basket.find((x) => x.id == id);
  let button_text = "";
  if (Basket_Search == undefined) {
    button_text = "Add to cart";
  } else {
    button_text = Basket_Search.status;
  }
  return (ID_Products_Preview.innerHTML = `<div class="Preview">
  <div class="CardImg_Containet_QV">
      <img class="Product_Img_QV" src=${search.image} id="ID_ProductCard_Img_QV" alt="Product">
  </div>
  <div class="CardContents_Container">
      <i class="fas fa-times" onclick="Closing_Quick_View(this)"></i>
      <h1 id="ID_Name_Text_QV">${search.name}</h1>
      <p id="ID_Price_Text_QV">$ ${search.price}</p>
      <button id="ID_But_QV_${id}" class="But_AddToCart_Card_QV" onclick="Remove_Cart_Items_Shop(${id})">${button_text}</button>
  </div>

</div>`);
}
function Closing_Quick_View(e) {
  e.parentElement.parentElement.parentElement.style.display = "none";
}
// -------------------------------Function for Inceremnt / Dercrement Items button --------------------------------------
let Generate_Cart_Items = () => {
  if (Basket.length !== 0) {
    return (ID_Cart_Container.innerHTML = Basket.map((x) => {
      let Search_Item = ShopItemsData.find((y) => y.id == x.id) || [];
      return `
            <div class="Cart_Items" id="ID_Cart_Items">
                <img class="Cart_Item_Img" src="${Search_Item.image}" alt="">
                <div>
                        <h4>${Search_Item.name}</h4>
                        <div class="">
                            <p>$ ${Search_Item.price}</p>
                            <i class="fa-solid fa-minus" onclick="Decrement(${x.id})"></i>
                            <span>${x.item}</span>
                            <i class="fa-solid fa-plus" onclick="Increment(${x.id})"></i>
                        </div>
                        <button onclick="Remove_Cart_Items(${x.id})">Remove</button>
                </div>
            </div>
            `;
    }).join(""));
  } else {
    return (Cart_Text.innerHTML = `
    <h3>Cart Is Empty</h3>
    `);
  }
};
let Increment = (id) => {
  let Search_Items = Basket.find((x) => x.id === id);
  if (Search_Items == undefined) {
    Basket.push({
      id: id,
      item: 1,
      status: "Remove",
    });
  } else {
    Search_Items.item += 1;
  }
  Update(id);
  Basket = Basket.filter((x) => x.item !== 0);
  Generate_Cart_Items();
  window.localStorage.setItem("data", JSON.stringify(Basket));
};
let Decrement = (id) => {
  let Search_Items = Basket.find((x) => x.id === id);
  if (Search_Items == undefined || Search_Items.item === 0) return;
  else {
    Search_Items.item -= 1;
  }
  Update(id);
  Basket = Basket.filter((x) => x.item !== 0);
  Generate_Cart_Items();

  localStorage.setItem("data", JSON.stringify(Basket));
};
let Update = (id) => {
  let Search_Items = Basket.find((x) => x.id === id);
  document.getElementById(id).textContent = Search_Items.item;
  document
    .getElementById("ID_Product_" + id)
    .getElementsByTagName("button")[1].textContent = Search_Items.status;

  Add_To_Cart_Ietms();
};
function Remove(e) {
  let Product_ID = e.parentElement
    .getElementsByTagName("div")[0]
    .getElementsByTagName("div")[0]
    .getElementsByTagName("span")[0].id;
  if (e.textContent == "Remove") {
    Remove_Cart_Items(Product_ID);
  }
  window.location.reload();
}
function Add_To_Cart_Ietms() {
  ID_Cart_Icon.setAttribute(
    "value",
    Basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  ); //reduce calculates previous next number with addition starting from 0
  Generate_Cart_Items();
}

Add_To_Cart_Ietms();

Generate_Cart_Items();
function Remove_Cart_Items(id) {
  let Basket_Search = Basket.find((x) => x.id == id);
  if (Basket_Search == undefined) {
    Increment(id);
  } else {
    Basket = Basket.filter((x) => x.id !== id);
    localStorage.setItem("data", JSON.stringify(Basket));
    Generate_Cart_Items();
    if (ID_Cart_Container.childElementCount == 1) {
      window.location.reload();
    }
  }
}
function Remove_Cart_Items_Shop(id) {
  let Basket_Search = Basket.find((x) => x.id == id);
  if (Basket_Search == undefined) {
    Increment(id);
  } else {
    Basket = Basket.filter((x) => x.id !== id);
    localStorage.setItem("data", JSON.stringify(Basket));
    Generate_Cart_Items();
    window.location.reload();
  }
}
ID_Cart_Icon.onclick = function () {
  var TargetElement = window.getComputedStyle(ID_Cart_Container, null);
  if (TargetElement.getPropertyValue("display") == "none") {
    ID_Cart_Container.style.display = "block";
  } else {
    ID_Cart_Container.style.display = "none";
  }
};

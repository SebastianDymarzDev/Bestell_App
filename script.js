function init() {
    renderAllMenu();
}

function renderAllMenu() {
    renderBurger();
    renderPizza();
    renderSalad();
}

function addToBasket(indexMenu, startKey) {
    let basketMenuNamesRef = allMenus[startKey + "Names"][indexMenu];
    let basketMenuPricesRef = allMenus[startKey + "Prices"][indexMenu];
    let basketMenuNames = basketMenuNamesRef.value;
    let basketMenuPrices = basketMenuPricesRef.value;

    if (basketMenuNames == "" || basketMenuPrices == "") {
        return
    }

    allMenus.basketMenuNames.push(basketMenuNamesRef);
    allMenus.basketMenuPrices.push(basketMenuPricesRef);

    renderBasket();

    basketMenuNamesRef.value = "";
    basketMenuPricesRef.value = "";
}

function renderBurger() {
    let burgerContentRef = document.getElementById('burgers');
    burgerContentRef.innerHTML = "";

    for (let indexBurger = 0; indexBurger < allMenus.burgerMenuNames.length; indexBurger++) {
        burgerContentRef.innerHTML += getBurgerTemplate(indexBurger);
    }
}

function renderPizza() {
    let pizzaContentRef = document.getElementById('pizza');
    pizzaContentRef.innerHTML = "";

    for (let indexPizza = 0; indexPizza < allMenus.pizzaMenuNames.length; indexPizza++) {
        pizzaContentRef.innerHTML += getPizzaTemplate(indexPizza);
    }
}

function renderSalad() {
    let saladContentRef = document.getElementById('salad');
    saladContentRef.innerHTML = "";

    for (let indexSalad = 0; indexSalad < allMenus.saladMenuNames.length; indexSalad++) {
        saladContentRef.innerHTML += getSaladTemplate(indexSalad);
    }
}

function renderBasket() {
    let basketContentRef = document.getElementById('basket')
    basketContentRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < allMenus.basketMenuNames.length; indexBasket++) {
        basketContentRef.innerHTML += getBasketTemplate(indexBasket);
    }
}

function incrementQuantity(indexBasket) {
    let quantityElement = document.getElementById(`quantity-${indexBasket}`);
    let priceElement = document.getElementById(`price-${indexBasket}`);

    let quantity = parseInt(quantityElement.innerHTML);
    quantity++;
    quantityElement.innerHTML = quantity;

    let price = allMenus.basketMenuPrices[indexBasket];
    let newPrice = price * quantity;
    priceElement.innerHTML = `${newPrice.toFixed(2)} €`;
}

// function decrementQuantity(indexBasket) {
//     const quantityElement = document.getElementById(`quantity-${indexBasket}`);
//     let quantity = parseInt(quantityElement.textContent);

//     if (quantity <= 1) {
//         deleteFromBasket(indexBasket);
//         return;
//     }

//     quantity--;
//     updateBasketItem(indexBasket, quantity);
// }

// function updateBasketItem(indexBasket, quantity) {
//     const quantityElement = document.getElementById(`quantity-${indexBasket}`);
//     const priceElement = document.getElementById(`price-${indexBasket}`);
//     const nameElement = document.getElementById(`name-${indexBasket}`);
//     const decrementButton = document.getElementById(`decrement-${indexBasket}`);

//     quantityElement.textContent = quantity;

//     const basePrice = allMenus.basketMenuPrices[indexBasket];
//     const newPrice = basePrice * quantity;
//     priceElement.textContent = `${newPrice.toFixed(2)} €`;

//     nameElement.textContent = `${quantity} x ${allMenus.basketMenuNames[indexBasket]}`;

//     if (quantity === 1) {
//         decrementButton.className = 'trash_button';
//     } else {
//         decrementButton.className = 'selection_button';
//         decrementButton.textContent = '-';
//     }
// }

function deleteFromBasket(indexBasket) {
    allMenus.basketMenuNames.splice(indexBasket, 1);
    allMenus.basketMenuPrices.splice(indexBasket, 1);
    renderBasket();
}

function calculateSubtotal() {
    
}

function calculateTotal() {
    
}

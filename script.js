function init() {
    renderAllMenu();
}

function renderAllMenu() {
    renderBurger();
    renderPizza();
    renderSalad();
}

const deliveryFee = 4.99;

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
    updatePrices();

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

    let quantity = parseInt(quantityElement.innerHTML);
    quantity++;

    updateBasketItem(indexBasket, quantity);
    updatePrices();
}

function decrementQuantity(indexBasket) {
    let quantityElement = document.getElementById(`quantity-${indexBasket}`);
    let quantity = parseInt(quantityElement.innerHTML);

    if (quantity <= 1) {
        deleteFromBasket(indexBasket);
        return;
    }

    quantity--;
    updateBasketItem(indexBasket, quantity);
    updatePrices();
}

function updateBasketItem(indexBasket, quantity) {
    let quantityElement = document.getElementById(`quantity-${indexBasket}`);
    let priceElement = document.getElementById(`price-${indexBasket}`);
    let nameElement = document.getElementById(`name-${indexBasket}`);

    quantityElement.innerHTML = quantity;

    let basePrice = allMenus.basketMenuPrices[indexBasket];
    let newPrice = basePrice * quantity;
    priceElement.innerHTML = `${newPrice.toFixed(2)} €`;

    nameElement.innerHTML = `${quantity} x ${allMenus.basketMenuNames[indexBasket]}`;

    updateDecrementButton(indexBasket, quantity);
}

function updateDecrementButton(indexBasket, quantity) {
    let decrementButton = document.getElementById(`decrement-${indexBasket}`);

    if (quantity === 1) {
        decrementButton.className = 'trash_button';
    } else {
        decrementButton.className = 'selection_button';
        decrementButton.textContent = '-';
    }
}

function deleteFromBasket(indexBasket) {
    allMenus.basketMenuNames.splice(indexBasket, 1);
    allMenus.basketMenuPrices.splice(indexBasket, 1);
    renderBasket();
    updatePrices();
}

function calculateSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < allMenus.basketMenuNames.length; i++) {
        let priceElement = document.getElementById(`price-${i}`);

        if (!priceElement) {
            continue; // Artikel wurde gelöscht, also überspringen
        }

        let priceText = priceElement.innerHTML.replace('€', '').trim();
        let price = parseFloat(priceText.replace(',', '.'));

        subtotal += price;
    }

    return subtotal;
}

function updatePrices() {
    let subtotal = calculateSubtotal();
    let total = subtotal + deliveryFee;

    document.getElementById('subtotal').innerHTML = `${subtotal.toFixed(2)} €`;
    document.getElementById('total').innerHTML = `${total.toFixed(2)} €`;
    document.getElementById('buy_button').innerHTML = `Buy Now (${total.toFixed(2)} €)`;
}

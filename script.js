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

function deleteFromBasket(indexBasket) {
    allMenus.basketMenuNames.splice(indexBasket, 1);
    allMenus.basketMenuPrices.splice(indexBasket, 1);
    renderBasket();
}
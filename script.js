function init() {
    // burger = document.getElementById('burger');
    // pizza = document.getElementById('pizza');
    // salad = document.getElementById('salad');

    renderAllMenu();
}

function renderAllMenu() {
    renderBurger();
    renderPizza();
    renderSalad();
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
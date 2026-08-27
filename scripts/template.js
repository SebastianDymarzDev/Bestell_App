function getBurgerTemplate(indexBurger) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                src="${allMenus.burgerMenuImages[indexBurger]}"
                alt="${allMenus.burgerMenuNames[indexBurger]}"
            >
            <article class="menu_content">
                <div class="left_content">
                    <h3>${allMenus.burgerMenuNames[indexBurger]}</h3>
                    <p>${allMenus.burgerMenuDescriptions[indexBurger]}</p>
                </div>
                <div class="right_content">
                    <h3>${allMenus.burgerMenuPrices[indexBurger]}€</h3>
                    <button id="add-button-burgerMenu-${indexBurger}" onclick="addToBasket(${indexBurger}, 'burgerMenu')" class="add_button">Add to basket</button>
                </div>
            </article>
        </div>
    `;
}

function getPizzaTemplate(indexPizza) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                src="${allMenus.pizzaMenuImages[indexPizza]}"
                alt="${allMenus.pizzaMenuNames[indexPizza]}"
            >
            <article class="menu_content">
                <div class="left_content">
                    <h3>${allMenus.pizzaMenuNames[indexPizza]}</h3>
                    <p>${allMenus.pizzaMenuDescriptions[indexPizza]}</p>
                </div>
                <div class="right_content">
                    <h3>${allMenus.pizzaMenuPrices[indexPizza]}€</h3>
                    <button id="add-button-pizzaMenu-${indexPizza}" onclick="addToBasket(${indexPizza}, 'pizzaMenu')" class="add_button">Add to basket</button>
                </div>
            </article>
        </div>
    `;
}

function getSaladTemplate(indexSalad) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                src="${allMenus.saladMenuImages[indexSalad]}"
                alt="${allMenus.saladMenuNames[indexSalad]}"
            >
            <article class="menu_content">
                <div class="left_content">
                    <h3>${allMenus.saladMenuNames[indexSalad]}</h3>
                    <p>${allMenus.saladMenuDescriptions[indexSalad]}</p>
                </div>
                <div class="right_content">
                    <h3>${allMenus.saladMenuPrices[indexSalad]}€</h3>
                    <button id="add-button-saladMenu-${indexSalad}" onclick="addToBasket(${indexSalad}, 'saladMenu')" class="add_button">Add to basket</button>
                </div>
            </article>
        </div>
    `;
}

function getBasketTemplate(indexBasket) {
    let quantity = allMenus.basketMenuQuantities[indexBasket];

    return `
        <div class="basket_menu_box">
            <h3 id="name-${indexBasket}"> ${quantity} x ${allMenus.basketMenuNames[indexBasket]}</h3>
            <div class="basket_menu_content">
                <div class="selection_field">
                    <button id="decrement-${indexBasket}" onclick="decrementQuantity(${indexBasket})" class="trash_button"></button>
                    <p id="quantity-${indexBasket}"> ${quantity} </p>
                    <button class="selection_button" onclick="incrementQuantity(${indexBasket})"> + </button>
                </div>
                <p id="price-${indexBasket}">${allMenus.basketMenuPrices[indexBasket]} €</p>
            </div>
        </div>
    `;
}
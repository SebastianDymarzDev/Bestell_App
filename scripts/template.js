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
                    <h3>${allMenus.burgerMenuPrices[indexBurger]}</h3>
                    <button class="add_button">Add to basket</button>
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
                    <h3>${allMenus.pizzaMenuPrices[indexPizza]}</h3>
                    <button class="add_button">Add to basket</button>
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
                    <h3>${allMenus.saladMenuPrices[indexSalad]}</h3>
                    <button class="add_button">Add to basket</button>
                </div>
            </article>
        </div>
    `;
}
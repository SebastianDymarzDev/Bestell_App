function getBurgerTemplate(indexBurger) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                ${allMenus.burgerMenuImages[indexBurger]}
            >
            <article class="menu_content">
                <div class="menu_headline">
                   <h3>${allMenus.burgerMenuNames[indexBurger]}</h3>
                    <h3>${allMenus.burgerMenuPrices[indexBurger]}</h3>
                </div>
                <p>${allMenus.burgerMenuDescriptions[indexBurger]}</p>
                <button></button>
            </article>
        </div>
    `;
}

function getPizzaTemplate(indexPizza) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                ${allMenus.pizzaMenuImages[indexPizza]}
            >
            <article class="menu_content">
                <div class="menu_headline">
                    <h3>${allMenus.pizzaMenuNames[indexPizza]}</h3>
                    <h3>${allMenus.pizzaMenuPrices[indexPizza]}</h3>
                </div>
                <p>${allMenus.pizzaMenuDescriptions[indexPizza]}</p>
                <button></button>
            </article>
        </div>
    `;
}

function getSaladTemplate(indexSalad) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                ${allMenus.saladMenuImages[indexSalad]}
            >
            <article class="menu_content">
                <div class="menu_headline">
                    <h3>${allMenus.saladMenuNames[indexSalad]}</h3>
                    <h3>${allMenus.saladMenuPrices[indexSalad]}</h3>
                </div>
                <p>${allMenus.saladMenuDescriptions[indexSalad]}</p>
                <button></button>
            </article>
        </div>
    `;
}
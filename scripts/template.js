function getMenuTemplate(indexMenu, startKey) {
    return `
        <div class="menu_box">
            <img
                class="menu_image"
                src="${allMenus[startKey + "Images"][indexMenu]}"
                alt="${allMenus[startKey + "Names"][indexMenu]}"
            >
            <article class="menu_content">
                <div class="left_content">
                    <h3>${allMenus[startKey + "Names"][indexMenu]}</h3>
                    <p>${allMenus[startKey + "Descriptions"][indexMenu]}</p>
                </div>
                <div class="right_content">
                    <h3>${allMenus[startKey + "Prices"][indexMenu]}€</h3>
                    <button id="add-button-${startKey}-${indexMenu}" onclick="addToBasket(${indexMenu}, '${startKey}')" class="add_button">Add to basket</button>
                </div>
            </article>
        </div>
    `;
}

function getBasketTemplate(indexBasket) {
    let quantity = allMenus.basketMenuQuantities[indexBasket];

    return `
        <div class="basket_menu_box">
            <div class="basket_menu_header">
                <h3 id="name-${indexBasket}">${quantity} x ${allMenus.basketMenuNames[indexBasket]}</h3>
                <button id="delete-${indexBasket}" onclick="deleteFromBasket(${indexBasket})" class="delete_button"></button>
            </div>
            <div class="basket_menu_content">
                <div class="selection_field">
                    <button id="decrement-${indexBasket}" onclick="decrementQuantity(${indexBasket})" class="selection_button">-</button>
                    <p id="quantity-${indexBasket}"> ${quantity} </p>
                    <button class="selection_button" onclick="incrementQuantity(${indexBasket})"> + </button>
                </div>
                <p id="price-${indexBasket}">${allMenus.basketMenuPrices[indexBasket]} €</p>
            </div>
        </div>
    `;
}

function getEmptyBasketTemplate() {
    return `
        <div class="empty_basket">
            <p>Nothing here yet. Go ahead and choose something delicious!</p>
            <img src="./assets/icons/basket.svg" alt="Leerer Warenkorb">
        </div>
    `;
}
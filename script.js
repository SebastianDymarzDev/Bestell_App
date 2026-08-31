const deliveryFee = 4.99;

function init() {
    renderAllMenu();
}

function renderAllMenu() {
    renderBurger();
    renderPizza();
    renderSalad();
}

function addToBasket(indexMenu, startKey) {
    let existingIndex = findBasketIndex(indexMenu, startKey);

    if (existingIndex !== -1) {
        incrementQuantity(existingIndex);
        return;
    }

    addNewBasketItem(indexMenu, startKey);
}

function findBasketIndex(indexMenu, startKey) {
    for (let i = 0; i < allMenus.basketMenuOrigin.length; i++) {
        let origin = allMenus.basketMenuOrigin[i];

        if (origin.indexMenu === indexMenu && origin.startKey === startKey) {
            return i;
        }
    }

    return -1;
}

function addNewBasketItem(indexMenu, startKey) {
    let basketMenuNamesRef = allMenus[startKey + "Names"][indexMenu];
    let basketMenuPricesRef = allMenus[startKey + "Prices"][indexMenu];

    if (!basketMenuNamesRef || !basketMenuPricesRef) {
        return
    }

    pushToBasket(basketMenuNamesRef, basketMenuPricesRef, indexMenu, startKey);

    renderBasket();
    updatePrices();
    updateAddButton(indexMenu, startKey);
    updateBasketButton();
}

function pushToBasket(name, price, indexMenu, startKey) {
    allMenus.basketMenuNames.push(name);
    allMenus.basketMenuPrices.push(price);
    allMenus.basketMenuOrigin.push({ indexMenu, startKey });
    allMenus.basketMenuQuantities.push(1);
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
    updateBasketButton();

    let origin = allMenus.basketMenuOrigin[indexBasket];
    setAddButtonCount(origin.indexMenu, origin.startKey, quantity);
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
    updateBasketButton();

    let origin = allMenus.basketMenuOrigin[indexBasket];
    setAddButtonCount(origin.indexMenu, origin.startKey, quantity);
}

function updateBasketItem(indexBasket, quantity) {
    allMenus.basketMenuQuantities[indexBasket] = quantity;

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
    let origin = allMenus.basketMenuOrigin[indexBasket];

    allMenus.basketMenuNames.splice(indexBasket, 1);
    allMenus.basketMenuPrices.splice(indexBasket, 1);
    allMenus.basketMenuOrigin.splice(indexBasket, 1);
    allMenus.basketMenuQuantities.splice(indexBasket, 1);

    setAddButtonCount(origin.indexMenu, origin.startKey, 0);

    renderBasket();
    updatePrices();
    updateBasketButton();
}

function calculateSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < allMenus.basketMenuNames.length; i++) {
        subtotal += getItemPrice(i);
    }

    return subtotal;
}

function getItemPrice(index) {
    let priceElement = document.getElementById(`price-${index}`);

    if (!priceElement) {
        return 0; // Artikel wurde gelöscht, also überspringen
    }

    let priceText = priceElement.innerHTML.replace('€', '').trim();
    return parseFloat(priceText.replace(',', '.'));
}

function updatePrices() {
    let subtotal = calculateSubtotal();
    let total = subtotal + deliveryFee;

    document.getElementById('subtotal').innerHTML = `${subtotal.toFixed(2)} €`;
    document.getElementById('total').innerHTML = `${total.toFixed(2)} €`;
    document.getElementById('buy_button').innerHTML = `Buy Now ${total.toFixed(2)} €`;
}

function updateAddButton(indexMenu, startKey) {
    let button = document.getElementById(`add-button-${startKey}-${indexMenu}`);
    let count = parseInt(button.dataset.count || 0) + 1;
    setAddButtonCount(indexMenu, startKey, count);
}

function setAddButtonCount(indexMenu, startKey, count) {
    let button = document.getElementById(`add-button-${startKey}-${indexMenu}`);

    if (!button) {
        return;
    }

    button.dataset.count = count;
    updateAddButtonDisplay(button, count);
}

function updateAddButtonDisplay(button, count) {
    if (count <= 0) {
        button.innerHTML = 'Add to basket';
        button.classList.remove('added_button');
    } else {
        button.innerHTML = `Added ${count}`;
        button.classList.add('added_button');
    }
}

function openOrderDialog() {
    let dialog = document.getElementById('order_dialog');
    dialog.showModal();

    setTimeout(closeOrderDialog, 3000);

    closeBasketDialog();
    resetBasket();
}

function closeOrderDialog() {
    document.getElementById('order_dialog').close();
}

function resetBasket() {
    allMenus.basketMenuOrigin.forEach(origin => {
        setAddButtonCount(origin.indexMenu, origin.startKey, 0);
    });

    allMenus.basketMenuNames = [];
    allMenus.basketMenuPrices = [];
    allMenus.basketMenuOrigin = [];
    allMenus.basketMenuQuantities = [];

    renderBasket();
    updatePrices();
    updateBasketButton();
}

function openBasketDialog() {
    let dialog = document.getElementById('basket_dialog_mobile');
    let basketContainer = document.querySelector('.basket_container');

    dialog.appendChild(basketContainer);
    dialog.showModal();
    dialog.classList.add('slide_in');
}

function closeBasketDialog() {
    let dialog = document.getElementById('basket_dialog_mobile');

    dialog.classList.remove('slide_in');
    dialog.classList.add('slide_out');

    setTimeout(finishClosingBasketDialog, 300);;
}

function closeBasketDialogOnBackdrop(event) {
    if (event.target.id === 'basket_dialog_mobile') {
        closeBasketDialog();
    }
}

function finishClosingBasketDialog() {
    let dialog = document.getElementById('basket_dialog_mobile');
    let basketSection = document.querySelector('.basket_section');
    let basketContainer = dialog.querySelector('.basket_container');

    basketSection.appendChild(basketContainer);
    dialog.classList.remove('slide_out');
    dialog.close();
}

function updateBasketButton() {
    let basketIcon = document.getElementById('basket_icon');
    let totalItems = allMenus.basketMenuQuantities.reduce((sum, quantity) => sum + quantity, 0);

    if (totalItems <= 0) {
        basketIcon.src = '/assets/icons/basket.svg';
    } else {
        basketIcon.src = '/assets/icons/shopping_cart.svg';
    }
}

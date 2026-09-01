const deliveryFee = 4.99;

function init() {
    renderAllMenu();
    renderBasket();
    updatePrices();
}

function renderAllMenu() {
    renderMenu('burgers', 'burgerMenu');
    renderMenu('pizza', 'pizzaMenu');
    renderMenu('salad', 'saladMenu');
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

function renderMenu(containerId, startKey) {
    let contentRef = document.getElementById(containerId);
    contentRef.innerHTML = "";

    let names = allMenus[startKey + "Names"];

    for (let indexMenu = 0; indexMenu < names.length; indexMenu++) {
        contentRef.innerHTML += getMenuTemplate(indexMenu, startKey);
    }
}

function renderBasket() {
    let basketContainerRef = document.querySelector('.basket_content');

    if (allMenus.basketMenuNames.length === 0) {
        showEmptyBasket();
        return;
    }

    basketContainerRef.classList.remove('basket_empty');
    renderBasketItems();
}

function showEmptyBasket() {
    let basketContentRef = document.getElementById('basket');
    let basketContainerRef = document.querySelector('.basket_content');

    basketContentRef.innerHTML = getEmptyBasketTemplate();
    basketContainerRef.classList.add('basket_empty');
}

function renderBasketItems() {
    let basketContentRef = document.getElementById('basket');
    basketContentRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < allMenus.basketMenuNames.length; indexBasket++) {
        let decrementClass = getDecrementButtonClass(indexBasket);
        basketContentRef.innerHTML += getBasketTemplate(indexBasket, decrementClass);
    }
}

function getDecrementButtonClass(indexBasket) {
    let quantity = allMenus.basketMenuQuantities[indexBasket];

    if (quantity === 1) {
        return "selection_button delete_icon";
    }

    return "selection_button";
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
    updateAfterDecrement(indexBasket, quantity);
}

function updateAfterDecrement(indexBasket, quantity) {
    updateBasketItem(indexBasket, quantity);
    updatePrices();
    updateBasketButton();

    let origin = allMenus.basketMenuOrigin[indexBasket];
    setAddButtonCount(origin.indexMenu, origin.startKey, quantity);
}

function updateBasketItem(indexBasket, quantity) {
    allMenus.basketMenuQuantities[indexBasket] = quantity;

    let quantityElement = document.getElementById(`quantity-${indexBasket}`);
    quantityElement.innerHTML = quantity;

    updateBasketItemDisplay(indexBasket, quantity);
    updateDecrementButton(indexBasket, quantity);
}

function updateBasketItemDisplay(indexBasket, quantity) {
    let priceElement = document.getElementById(`price-${indexBasket}`);
    let nameElement = document.getElementById(`name-${indexBasket}`);

    let basePrice = allMenus.basketMenuPrices[indexBasket];
    let newPrice = basePrice * quantity;
    priceElement.innerHTML = `${newPrice.toFixed(2)} €`;

    nameElement.innerHTML = `${quantity} x ${allMenus.basketMenuNames[indexBasket]}`;
}

function updateDecrementButton(indexBasket, quantity) {
    let deleteButton = document.getElementById(`delete-${indexBasket}`);
    let decrementButton = document.getElementById(`decrement-${indexBasket}`);

    if (quantity === 1) {
        deleteButton.classList.remove('visible');
        decrementButton.classList.add('delete_icon');
    } else {
        deleteButton.classList.add('visible');
        decrementButton.classList.remove('delete_icon');
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
        return 0;
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
    document.body.classList.add('dialog_open');
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
    document.body.classList.remove('dialog_open');
}

function updateBasketButton() {
    let basketIcon = document.getElementById('basket_icon');
    let basketCount = document.getElementById('basket_count');
    let totalItems = allMenus.basketMenuQuantities.reduce((sum, quantity) => sum + quantity, 0);

    if (totalItems <= 0) {
        basketIcon.src = './assets/icons/basket.svg';
        basketCount.classList.remove('visible');
    } else {
        basketIcon.src = './assets/icons/shopping_cart.svg';
        basketCount.textContent = totalItems;
        basketCount.classList.add('visible');
    }
}

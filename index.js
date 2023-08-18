import { menuArray } from './data.js';
const menuContainer = document.getElementById('menu');
/*Render Menu on the oage*/
for (let item of menuArray) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';

    const itemEmoji = document.createElement('h2');
    itemEmoji.className = 'item-emoji';
    itemEmoji.textContent = item.emoji;

    const itemDetails = document.createElement('div'); // Create a container for stacking
    itemDetails.className = 'item-details';

    const itemName = document.createElement('p');
    itemName.className = 'item-name';
    itemName.textContent = item.name;

    const ingredientItem = document.createElement('span');
    ingredientItem.className = 'ingredient';
    ingredientItem.textContent = item.ingredients.join(', ');

    const itemPrice = document.createElement('p');
    itemPrice.className = 'item-price';
    itemPrice.textContent = `$${item.price}`;

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-circle-plus';
    icon.dataset.name = `${item.name}`
    icon.dataset.price = `${item.price}`
    // Appending elements in the correct order
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(ingredientItem);
    itemDetails.appendChild(itemPrice);

    menuItem.appendChild(itemEmoji);
    menuItem.appendChild(itemDetails);
    menuItem.appendChild(icon);
    menuContainer.appendChild(menuItem);
}

/*Render Order Section*/
const order = document.getElementById('order');
const orderItems = document.getElementById('order-items');
const icons = [...document.querySelectorAll('i')];

function addItemToOrder(item) {
    const orderItemContainer = document.createElement('div');
    orderItemContainer.className = 'order-item';

    const orderName = document.createElement('p');
    orderName.classList = 'order-name';
    orderName.textContent = item.name;

    const removeBtn = document.createElement('button');
    removeBtn.classList = 'remove-btn';
    removeBtn.textContent = 'remove';

    const orderPrice = document.createElement('p');
    orderPrice.classList = 'order-price';
    orderPrice.textContent = `$${item.price}`;

    orderItemContainer.appendChild(orderName);
    orderItemContainer.appendChild(removeBtn);
    orderItemContainer.appendChild(orderPrice);
    orderItems.appendChild(orderItemContainer);
}

icons.forEach(icon => icon.addEventListener('click', function(event) {
    const itemName = event.target.dataset.name;
    const selectedItem = menuArray.find(item => item.name === itemName)
    addItemToOrder(selectedItem)
    order.classList.remove('hidden')
    const totalPrice = document.querySelector('.total-price')
    totalPrice.textContent = `${calculateTotalPrice()}`
}));

orderItems.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        event.target.parentElement.remove();
    }
    const totalPrice = document.querySelector('.total-price')
    totalPrice.textContent = `${calculateTotalPrice()}`
});

function calculateTotalPrice() {
    const orderItemContainers = document.querySelectorAll('.order-item');
    let totalPrice = 0;
    orderItemContainers.forEach(orderItemContainer => {
        const orderPriceElement = orderItemContainer.querySelector('.order-price');
        const orderPrice = parseFloat(orderPriceElement.textContent.substring(1)); // Remove "$" and convert to a number
        totalPrice += orderPrice;
    });
    return totalPrice;
}

const orderBtn = document.getElementById("order-btn");
const modal = document.getElementById("modal");
function renderModal() {
    modal.classList.remove('hidden')
    modal.style.display = "grid"
}
orderBtn.addEventListener("click", renderModal);

const payBtn = document.getElementById("pay-btn")
payBtn.addEventListener('click',function(){
    const nameInput = document.getElementById('name')
    modal.style.display='none'
    
    const orderMessage = document.getElementById("order-message")
    orderMessage.classList.remove('none')
    orderMessage.classList.add('message')
    orderMessage.innerHTML += `Thanks, ${nameInput.value} ! Your order is on its way!`
})





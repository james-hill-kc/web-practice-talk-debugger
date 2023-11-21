const menuItems = [
    {
        id: '0',
        name: 'cheeseburger',
        price: 500,
        time: 10
    },
    {
        id: '1',
        name: 'vegan burger',
        price: 600,
        time: 10
    },
    {
        id: '2',
        name: 'salad',
        price: 200,
        time: 1
    },
    {
        id: '3',
        name: 'fries',
        price: 300,
        time: 5
    }
];

const order = {
    items: [],
    time: 0,
    cost: 0
};

function resetOrder () {
    order.items.length = 0;
    order.time = 0;
    order.cost = 0;
}

function getOrderedItems () {
    resetOrder();

    document.querySelectorAll('#menu input[type="checkbox"]:checked').forEach(item => {
        order.items.push(menuItems.filter(menuItem => menuItem.name === item.value));
        // order.items.push(menuItems.find(menuItem => menuItem.name === item.value));
    });

    if (order.items.length === 0) {
        alert('Please select at least one menu item');
    }
}

function calculateWaitingTime () {
    let totalTime = 0;

    for (let i = 0; i < order.items.length; i++) {
        totalTime += order.items[i].time;
    }

    order.time = totalTime;
}

function calculateCost () {
    order.cost = order.items.reduce((sum, item) => sum + item.cost, 0);
    //order.cost = order.items.reduce((sum, item) => sum + item.price, 0);
}

function calculateOrderInformation () {
    calculateWaitingTime();
    calculateCost();
}

function displayOrderInformation () {
    document.querySelector('#display-items').textContent = order.items.map(item => item.name).join(', ');
    document.querySelector('#display-cost').textContent = `£${(order.cost / 100).toFixed(2)}`;
    document.querySelector('#display-time').textContent = `${order.time} minutes`;
}

function placeOrder (event) {
    getOrderedItems();
    calculateOrderInformation();
    displayOrderInformation();
}

document.querySelector('#place-order').addEventListener('click', placeOrder);
let count = 1;
const form = document.querySelector('form');
const addButton = document.getElementById('add-button');

function addNewBeverage() {
    const originalBeverage = document.querySelector('.beverage');
    const newBeverage = originalBeverage.cloneNode(true);

    const addButtonDiv = document.querySelector('.add-button').closest('div');
    form.insertBefore(newBeverage, addButtonDiv);

    const allBeverages = document.querySelectorAll('.beverage');
    allBeverages.forEach((beverage, index) => {
        const title = beverage.querySelector('.beverage-count');
        title.textContent = `Напиток №${index + 1}`;
    });
}

addButton.addEventListener('click', addNewBeverage);
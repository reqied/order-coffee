let count = 1;

const form = document.querySelector('form');
const addButton = document.getElementById('add-button');
const submitButton = document.getElementById('submit-button');

function addNewBeverage() {
    const originalBeverage = document.querySelector('.beverage');
    const newBeverage = originalBeverage.cloneNode(true);

    newBeverage.querySelectorAll('input, textarea').forEach(el => {
        el.value = '';
    });

    const addButtonDiv = document.querySelector('.add-button').closest('div');
    form.insertBefore(newBeverage, addButtonDiv);

    updateTitles();
}

function updateTitles() {
    const allBeverages = document.querySelectorAll('.beverage');

    allBeverages.forEach((beverage, index) => {
        const title = beverage.querySelector('.beverage-count');
        title.textContent = `Напиток №${index + 1}`;
    });
}

function deleteBeverage(button) {
    const beverageToRemove = button.closest('.beverage');
    const beverages = document.querySelectorAll('.beverage');

    if (beverages.length === 1) return;

    beverageToRemove.remove();
    updateTitles();
}

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const modalClose = document.getElementById('modal-close');

    modalClose.onclick = () => {
        modal.style.display = 'none';
    };
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNewBeverage();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
});

form.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        deleteBeverage(e.target);
    }
});
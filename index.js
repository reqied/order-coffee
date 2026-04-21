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
    count++;
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
    count--;
}

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modal.querySelector(".drink_count_frase").textContent = `Вы заказали ${count} ${pluralCount(count)}`;

    const modalClose = document.getElementById('modal-close');

    modalClose.onclick = () => {
        modal.style.display = 'none';
    };
    console.log(count);
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

function pluralCount(n) {
    const n10 = n % 10;
    const n100 = n % 100;
    if ((n100 >= 11 && n100 <= 19) || n10 <= 1) {
        return "напиток";
    }
    if (n10 >= 2 && n10 <= 4) {
        return "напитка";
    }
    return "напитков";
}

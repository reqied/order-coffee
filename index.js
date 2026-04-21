let count = 1;

const form = document.querySelector('form');
const addButton = document.getElementById('add-button');
const submitButton = document.getElementById('submit-button');

function addNewBeverage() {
    const originalBeverage = document.querySelector('.beverage');
    const newBeverage = originalBeverage.cloneNode(true);

    const uniqueName = `milk_${Date.now()}_${count}`;
    const radioButtons = newBeverage.querySelectorAll('input[type="radio"][name="milk"]');
    radioButtons.forEach(radio => {
        radio.name = uniqueName;
        radio.checked = false;
    });

    const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"][name="options"]');
    checkboxes.forEach(cb => cb.checked = false);

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

function getMilkText(milkValue) {
    const milkMap = {
        'usual': 'обычное',
        'no-fat': 'обезжиренное',
        'soy': 'соевое',
        'coconut': 'кокосовое'
    };
    return milkMap[milkValue] || milkValue;
}

function getSelectedOptions(checkboxGroup) {
    const selected = [];
    checkboxGroup.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling;
            if (label && label.tagName === 'SPAN') {
                selected.push(label.textContent.trim());
            }
        }
    });
    return selected.join(', ');
}

function getDrinkName(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    return selectedOption ? selectedOption.textContent : '';
}

function generateTableData() {
    const beverages = document.querySelectorAll('.beverage');
    const tableBody = document.getElementById('order-table');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    beverages.forEach((beverage, index) => {
        const drinkSelect = beverage.querySelector('select');
        const drinkName = getDrinkName(drinkSelect);

        const selectedMilkRadio = beverage.querySelector('input[type="radio"]:checked');
        const milkText = selectedMilkRadio ? getMilkText(selectedMilkRadio.value) : '—';

        const optionsCheckboxes = beverage.querySelectorAll('input[name="options"]');
        const optionsText = getSelectedOptions(optionsCheckboxes) || '—';

        const row = tableBody.insertRow();

        const cellDrink = row.insertCell(0);
        const cellMilk = row.insertCell(1);
        const cellOptions = row.insertCell(2);

        cellDrink.textContent = drinkName;
        cellMilk.textContent = milkText;
        cellOptions.textContent = optionsText;
    });
}

function showModal() {
    generateTableData();

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
    if (e.target.classList.contains('delete-button') && e.target.id !== 'modal-close') {
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
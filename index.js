let count = 1;
for (const addButton of document.getElementsByClassName("add-button")) {
    addButton.addEventListener('click', () => {
        count += 1;
        const original = document.getElementsByTagName("form")[0];
        const clone = original.cloneNode(true);
        clone, id = `beverage${count}`;
        clone.querySelector('.beverage-count').textContent = `Напиток №${count}`;
        document.getElementsByTagName('body')[0].appendChild(clone);
    })
}
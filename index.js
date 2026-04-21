let count = 1;

document.querySelector(".add-button").addEventListener('click', () => {
    count += 1;
    const original = document.querySelector(".beverage");
    const clone = original.cloneNode(true);
    clone,id = `beverage${count}`;
    clone.querySelector('.beverage-count').textContent = `Напиток №${count}`;
    document.getElementsByTagName('form')[0].appendChild(clone);
})
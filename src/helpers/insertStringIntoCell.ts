export default (cellOrText: HTMLElement | SVGTextElement, val: string, type: string) => {
    let newElement;
    if (type === 'standard') {
        newElement = document.createElement('span');
        newElement.setAttribute('style', 'font-size:10px; font-style:italic');
        newElement.innerText = `(${val}%)`;
        cellOrText.insertBefore(newElement, cellOrText.firstChild);
    } else {
        const elemX = cellOrText.getAttributeNS(null, 'x');
        const elemY = cellOrText.getAttributeNS(null, 'y');
        cellOrText.setAttributeNS(null, 'dx', '-30');

        newElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newElement.setAttributeNS(null, 'x', elemX);
        newElement.setAttributeNS(null, 'y', elemY);
        newElement.setAttributeNS(null, 'style', 'font: 10px Roboto, sans-serif;');
        newElement.setAttributeNS(null, 'dx', '13');
        newElement.setAttributeNS(null, 'dy', '-5');
        newElement.setAttributeNS(null, 'class', 'align-right');
        newElement.textContent = `(${val}%)`;
        cellOrText.insertAdjacentElement('afterend', newElement);
    }
};


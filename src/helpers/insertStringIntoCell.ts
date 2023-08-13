import { CLASS_NAME_ALL_EXTENSION_CHANGES, TABLE_TYPE } from './constants';

export const insertStringIntoCell = (cellOrText: HTMLElement | SVGTextElement, val: string, type: string) => {
	if (type === TABLE_TYPE.STANDARD_REPORTING) {
		const newElement = createSpanElement(val);
		cellOrText.insertBefore(newElement, cellOrText.firstChild);
	} else {
		const newElement = createSVGElement(cellOrText as SVGTextElement, val);
		cellOrText.insertAdjacentElement('afterend', newElement);
	}
};

const createSpanElement = (val: string) => {
	const newElement = document.createElement('span');
	newElement.setAttribute('style', 'font-size:10px; font-style:italic');
	newElement.setAttribute('class', CLASS_NAME_ALL_EXTENSION_CHANGES);
	newElement.innerText = `(${val}%)`;
	return newElement;
};

const createSVGElement = (cellOrText: SVGTextElement, val: string) => {
	const elemX = cellOrText.getAttributeNS(null, 'x');
	const elemY = cellOrText.getAttributeNS(null, 'y');
	cellOrText.setAttributeNS(null, 'dx', '-30');

	const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	newElement.setAttributeNS(null, 'x', elemX);
	newElement.setAttributeNS(null, 'y', elemY);
	newElement.setAttributeNS(null, 'style', 'font: 10px Roboto, sans-serif;');
	newElement.setAttributeNS(null, 'dx', '13');
	newElement.setAttributeNS(null, 'dy', '-5');
	newElement.setAttributeNS(null, 'class', `align-right ${CLASS_NAME_ALL_EXTENSION_CHANGES}`);
	newElement.textContent = `(${val}%)`;
	return newElement;
};



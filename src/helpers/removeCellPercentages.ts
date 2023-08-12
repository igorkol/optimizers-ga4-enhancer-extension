import { CLASS_NAME_ALL_EXTENSION_CHANGES } from './constants';

export const removeCellPercentages = (element: Element) => {
	let processedHeaders = 0;
	const getAllExtensionChanges = element.querySelectorAll(`.${CLASS_NAME_ALL_EXTENSION_CHANGES}`);
	getAllExtensionChanges.forEach((el) => {
		el.remove();
		processedHeaders++;
	});
	return processedHeaders;
};

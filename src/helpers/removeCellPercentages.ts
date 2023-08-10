import { getReportingTable } from './getReportingTable';
import { CLASS_NAME_ALL_EXTENSION_CHANGES } from './constants';

export const removeCellPercentages = () => {
	const { element } = getReportingTable();
	const getAllExtensionChanges = element.querySelectorAll(`.${CLASS_NAME_ALL_EXTENSION_CHANGES}`);
	getAllExtensionChanges.forEach(el => el.remove());
}

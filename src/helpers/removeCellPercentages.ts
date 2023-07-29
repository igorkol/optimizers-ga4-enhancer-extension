import getReportingTable from './getReportingTable';
import { CLASS_NAME_ALL_EXTENSION_CHANGES } from './constants';

export default () => {
	const { element } = getReportingTable();
	console.log('got in removals');
	const getAllExtensionChanges = element.querySelectorAll(`.${CLASS_NAME_ALL_EXTENSION_CHANGES}`);
	console.log('getAllExtensionChanges: ', getAllExtensionChanges);
	getAllExtensionChanges.forEach(el => el.remove());
	console.log('removed all extension changes');
}

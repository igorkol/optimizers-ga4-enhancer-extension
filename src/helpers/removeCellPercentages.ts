import getReportingTable from './getReportingTable';
import { CLASS_NAME_ALL_EXTENSION_CHANGES, TABLE_TYPE } from './constants';

export default () => {
	const { type, element } = getReportingTable();
	if (type === TABLE_TYPE.CUSTOM_EXPLORATION) {
		const getAllExtensionChanges = element.querySelectorAll(`.${CLASS_NAME_ALL_EXTENSION_CHANGES}`);
		return getAllExtensionChanges.forEach(el => el.remove());
	}
}

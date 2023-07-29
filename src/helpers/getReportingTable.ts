import { CUSTOM_EXPLORATION_TABLE, STANDARD_REPORTING_TABLE } from './constants';

export default () => {
	const standardReportingTable = window.document.querySelector(STANDARD_REPORTING_TABLE);
	const customReportingTable = window.document.querySelector(CUSTOM_EXPLORATION_TABLE);

	if (standardReportingTable) return { 'type': 'standard', 'element': standardReportingTable };
	if (customReportingTable) return { 'type': 'custom', 'element': customReportingTable };

	return;
};

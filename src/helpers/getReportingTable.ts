import { CUSTOM_EXPLORATION_TABLE, STANDARD_REPORTING_TABLE, TABLE_TYPE } from './constants';

export default () => {
	const standardReportingTable = window.document.querySelector(STANDARD_REPORTING_TABLE);
	const customReportingTable = window.document.querySelector(CUSTOM_EXPLORATION_TABLE);

	if (standardReportingTable) return { 'type': TABLE_TYPE.STANDARD_REPORTING, 'element': standardReportingTable };
	if (customReportingTable) return { 'type': TABLE_TYPE.CUSTOM_EXPLORATION, 'element': customReportingTable };

	return;
};

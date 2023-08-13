import { CUSTOM_EXPLORATION_TABLE, STANDARD_REPORTING_TABLE, TABLE_TYPE } from './constants';

export const getReportingTable = (): { type: TABLE_TYPE; element: Element } | null => {
	// page will have one or the other, never both
	const standardReportingTable = window.document.querySelector(STANDARD_REPORTING_TABLE);
	if (standardReportingTable) {
		return { type: TABLE_TYPE.STANDARD_REPORTING, element: standardReportingTable };
	}

	const customReportingTable = window.document.querySelector(CUSTOM_EXPLORATION_TABLE);
	if (customReportingTable) {
		return { type: TABLE_TYPE.CUSTOM_EXPLORATION, element: customReportingTable };
	}

	return null;
};

import getTableHeaders from '../helpers/getTableHeaders';
import getTableRowsAndInsertPercentagesToCells from '../helpers/getTableRowsAndInsertPercentagesToCells';
import {
	STANDARD_REPORT_HEADERS,
	STANDARD_REPORT_ROWS,
	STANDARD_REPORT_SUMMARY_TOTALS,
	CUSTOM_REPORT_ROWS,
	CUSTOM_REPORT_HEADERS,
	CUSTOM_REPORT_SUMMARY_TOTALS,
} from '../helpers/constants';
import getReportingTable from '../helpers/getReportingTable';

export default () => {
	const { type, element } = getReportingTable();
	const getAllTableHeaders = Array.from(
		element.querySelectorAll(type === 'standard' ? STANDARD_REPORT_HEADERS : CUSTOM_REPORT_HEADERS),
	);
	const getAllTableRows = Array.from(
		element.querySelectorAll(type === 'standard' ? STANDARD_REPORT_ROWS : CUSTOM_REPORT_ROWS),
	);

	getAllTableHeaders.forEach((header: HTMLElement, i) => {
		const tableHeaderWithSummaryTotals = header.querySelectorAll(type === 'standard' ? STANDARD_REPORT_SUMMARY_TOTALS : CUSTOM_REPORT_SUMMARY_TOTALS);
		const { index: columnIndex, total: columnTotal } = getTableHeaders(tableHeaderWithSummaryTotals, i);

		if (columnIndex !== undefined && columnTotal !== undefined) {
			getTableRowsAndInsertPercentagesToCells(getAllTableRows, columnIndex, columnTotal, type);
		}
	});
};

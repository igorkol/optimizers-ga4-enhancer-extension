import { getTableHeaders } from '../helpers/getTableHeaders';
import { getTableRowsAndInsertPercentagesToCells } from '../helpers/getTableRowsAndInsertPercentagesToCells';
import {
	CUSTOM_REPORT_HEADERS,
	CUSTOM_REPORT_ROWS,
	CUSTOM_REPORT_SUMMARY_TOTALS,
	STANDARD_REPORT_HEADERS,
	STANDARD_REPORT_ROWS,
	STANDARD_REPORT_SUMMARY_TOTALS,
	TABLE_TYPE,
} from '../helpers/constants';

const extensionStorage = chrome.storage?.local;

type StorageEntry = { index: number; total: number };

export const addCellPercentages = async (element: Element, type: TABLE_TYPE) => {
	let processedHeaders = 0;
	const storageObject = [];

	const getAllTableHeaders = Array.from(
		element.querySelectorAll(
			type === TABLE_TYPE.STANDARD_REPORTING ? STANDARD_REPORT_HEADERS : CUSTOM_REPORT_HEADERS,
		),
	);
	const getAllTableRows = Array.from(
		element.querySelectorAll(type === TABLE_TYPE.STANDARD_REPORTING ? STANDARD_REPORT_ROWS : CUSTOM_REPORT_ROWS),
	);

	if (getAllTableHeaders.length !== 0) {
		for (const [i, header] of getAllTableHeaders.entries()) {
			const tableHeaderWithSummaryTotals = header.querySelectorAll(
				type === TABLE_TYPE.STANDARD_REPORTING ? STANDARD_REPORT_SUMMARY_TOTALS : CUSTOM_REPORT_SUMMARY_TOTALS,
			);
			const { index: columnIndex, total: columnTotal } = getTableHeaders(tableHeaderWithSummaryTotals, i);

			// saving index and total to local extension storage
			storageObject.push({
				index: columnIndex,
				total: columnTotal,
			});

			if (columnIndex !== undefined && columnTotal !== undefined) {
				getTableRowsAndInsertPercentagesToCells(getAllTableRows, columnIndex, columnTotal, type);
				processedHeaders++;
			}
		}
		await extensionStorage.set({ optimizersStorage: storageObject });
	} else {
		const storageResult = await new Promise<StorageEntry[]>((resolve) => {
			extensionStorage.get("optimizersStorage", (result) => {
				resolve(result.optimizersStorage);
			});
		});

		for (const { index, total } of storageResult) {
			getTableRowsAndInsertPercentagesToCells(getAllTableRows, index, total, type);
			processedHeaders++;
		}
	}

	return processedHeaders;
};


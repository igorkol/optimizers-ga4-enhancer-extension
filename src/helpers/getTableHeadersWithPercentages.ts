import { cleanupStringToNumber } from './cleanupStringToNumber';
import { COLUMNS_FOR_PERCENTAGES } from './constants';

export const getTableHeadersWithPercentages = (i: number, tableHeaderWithSummaryTotals: NodeListOf<Element>) => {
	let index: number | undefined;
	let total: number | undefined;

		tableHeaderWithSummaryTotals.forEach((headerSummary: HTMLElement) => {
		// TODO: rework how percentage columns are recognized to support other languages
		if (headerSummary.innerHTML.includes(COLUMNS_FOR_PERCENTAGES)) {
			const returnPreviousSibling =
				headerSummary.previousElementSibling as HTMLElement;
			const previousSiblingValue = returnPreviousSibling.innerHTML;
			const columnSingleSummaryNumber =
				cleanupStringToNumber(previousSiblingValue);
			index = i;
			total = columnSingleSummaryNumber;
		}
	});

	return { index, total };
}

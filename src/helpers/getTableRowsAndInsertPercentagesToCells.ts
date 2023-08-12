import { cleanupStringToNumber } from './cleanupStringToNumber';
import { insertStringIntoCell } from './insertStringIntoCell';
import { TABLE_TYPE } from './constants';

export const getTableRowsAndInsertPercentagesToCells = (getAllTableRows: Element[], columnIndex: number, columnTotal: number, type: string) => {
	getAllTableRows.forEach((row: HTMLElement) => {
		const targetedCellOrSvgText = getTargetedCellOrSvgText(row, columnIndex, type);
		if (!targetedCellOrSvgText) {
			return;
		}

		const rowSingleColumnNumber = cleanupStringToNumber(targetedCellOrSvgText.innerHTML);
		const calculatePercentageOfTotal = ((rowSingleColumnNumber / columnTotal) * 100).toFixed(2);

		insertStringIntoCell(targetedCellOrSvgText, calculatePercentageOfTotal, type);
	});
};

export const getTargetedCellOrSvgText = (row: HTMLElement, columnIndex: number, type: string) => {
	if (type === TABLE_TYPE.STANDARD_REPORTING) {
		return row.children[columnIndex] as HTMLElement;
	} else {
		if (row.matches(`[column-index="${columnIndex}"]`)) {
			return row.querySelector('text');
		}
	}
	return null;
};

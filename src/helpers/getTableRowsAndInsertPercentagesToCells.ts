import cleanupStringToNumber from './cleanupStringToNumber';
import insertStringIntoCell from './insertStringIntoCell';

export default (getAllTableRows: Element[], columnIndex: number, columnTotal: number, type: string) => {
	const getTargetedCellOrSvgText = (row: HTMLElement, columnIndex: number, type: string) => {
		if (type === 'standard') {
			return row.children[columnIndex] as HTMLElement;
		} else {
			if (row.matches(`[column-index="${columnIndex}"]`)) {
				return row.querySelector('text') as SVGTextElement;
			}
		}
		return null;
	};

	getAllTableRows.forEach((row: HTMLElement) => {
		const targetedCellOrSvgText = getTargetedCellOrSvgText(row, columnIndex, type);

		if (!targetedCellOrSvgText) {
			return;
		}

		const rowSingleColumnNumber = cleanupStringToNumber(
			targetedCellOrSvgText.innerHTML,
		);
		const calculatePercentageOfTotal = (
			(rowSingleColumnNumber / columnTotal) *
			100
		).toFixed(2);

		insertStringIntoCell(targetedCellOrSvgText, calculatePercentageOfTotal, type);
	});
}


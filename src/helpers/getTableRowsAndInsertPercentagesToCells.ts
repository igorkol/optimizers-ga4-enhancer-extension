import cleanupStringToNumber from "./cleanupStringToNumber";
import insertStringIntoCell from "./insertStringIntoCell";

export default (getAllTableRows: Element[], columnIndex: number, columnTotal: number, type: string) => {
    getAllTableRows.forEach((row: HTMLElement) => {
        const targetedCellOrSvgText = type === 'standard' ? row.children[columnIndex] as HTMLElement : row.matches(`[column-index="${columnIndex}"]`) && row.querySelector('text') as SVGTextElement;

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

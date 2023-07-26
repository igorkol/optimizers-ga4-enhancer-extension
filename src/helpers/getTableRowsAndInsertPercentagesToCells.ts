import cleanupStringToNumber from "./cleanupStringToNumber";
import insertStringIntoCell from "./insertStringIntoCell";

export default (getAllTableRows: Element[], columnIndex: number, columnTotal: number) => {
    getAllTableRows.forEach((row: HTMLElement) => {
        const targetedCell = row.children[columnIndex] as HTMLElement;
        const rowSingleColumnNumber = cleanupStringToNumber(
            targetedCell.innerText,
        );
        const calculatePercentageOfTotal = (
            (rowSingleColumnNumber / columnTotal) *
            100
        ).toFixed(2);
        insertStringIntoCell(targetedCell, calculatePercentageOfTotal);
    });
}

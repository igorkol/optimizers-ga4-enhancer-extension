import cleanupStringToNumber from '../helpers/cleanupStringToNumber';
import insertStringIntoCell from '../helpers/insertStringIntoCell';

export default () => {
  const getAllTableHeaders = Array.from(
    window.document.querySelectorAll(
      'ga-reporting-table thead tr[class*="summary-totals"] th',
    ),
  );
  const getAllTableRows = Array.from(
    window.document.querySelectorAll('ga-reporting-table tbody tr'),
  );

  getAllTableHeaders.forEach((header: HTMLElement, i) => {
    let columnIndex: number;
    let columnTotal: number;
    const tableHeaderWithSummaryTotals = header.querySelectorAll(
      'div[class*="summary-text"]',
    );
    tableHeaderWithSummaryTotals.forEach((headerSummary: HTMLElement) => {
      if (headerSummary.innerText.includes('100%')) {
        const returnPreviousSibling =
          headerSummary.previousElementSibling as HTMLElement;
        const previousSiblingValue = returnPreviousSibling.innerText;
        const columnSingleSummaryNumber =
          cleanupStringToNumber(previousSiblingValue);
        columnIndex = i;
        columnTotal = columnSingleSummaryNumber;
      }
    });
    if (columnIndex !== undefined) {
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
  });
};

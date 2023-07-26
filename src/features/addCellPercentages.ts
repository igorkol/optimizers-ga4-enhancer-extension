import getTableHeaders from "../helpers/getTableHeaders";
import getTableRowsAndInsertPercentagesToCells from "../helpers/getTableRowsAndInsertPercentagesToCells";
import {ALL_TABLE_HEADERS, ALL_TABLE_ROWS, SUMMARY_TOTALS_TABLE_HEADERS} from "../helpers/constants";

export default () => {
    const getAllTableHeaders = Array.from(
        window.document.querySelectorAll(ALL_TABLE_HEADERS),
    );
    const getAllTableRows = Array.from(
        window.document.querySelectorAll(ALL_TABLE_ROWS),
    );

    getAllTableHeaders.forEach((header: HTMLElement, i) => {
        const tableHeaderWithSummaryTotals = header.querySelectorAll(SUMMARY_TOTALS_TABLE_HEADERS);

        const {index: columnIndex, total: columnTotal} = getTableHeaders(tableHeaderWithSummaryTotals, i);

        if (columnIndex !== undefined && columnTotal !== undefined) {
            getTableRowsAndInsertPercentagesToCells(getAllTableRows, columnIndex, columnTotal)
        }
    });
};

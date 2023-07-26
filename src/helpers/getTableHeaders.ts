import cleanupStringToNumber from "./cleanupStringToNumber";
import {COLUMNS_FOR_PERCENTAGES} from "./constants";

export default (tableHeaderWithSummaryTotals: NodeListOf<Element>, i: number) => {
    let index: number | undefined;
    let total: number | undefined;

    tableHeaderWithSummaryTotals.forEach((headerSummary: HTMLElement) => {
        if (headerSummary.innerText.includes(COLUMNS_FOR_PERCENTAGES)) {
            const returnPreviousSibling =
                headerSummary.previousElementSibling as HTMLElement;
            const previousSiblingValue = returnPreviousSibling.innerText;
            const columnSingleSummaryNumber =
                cleanupStringToNumber(previousSiblingValue);
            index = i;
            total = columnSingleSummaryNumber;
        }
    });

    return {index, total};
}

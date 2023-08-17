/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stopObserving = exports.startObserving = exports.handlePercentages = void 0;
const addCellPercentages_1 = __webpack_require__(/*! ./features/addCellPercentages */ "./src/features/addCellPercentages.ts");
const removeCellPercentages_1 = __webpack_require__(/*! ./helpers/removeCellPercentages */ "./src/helpers/removeCellPercentages.ts");
const constants_1 = __webpack_require__(/*! ./helpers/constants */ "./src/helpers/constants.ts");
const getReportingTable_1 = __webpack_require__(/*! ./helpers/getReportingTable */ "./src/helpers/getReportingTable.ts");
const { element } = (0, getReportingTable_1.getReportingTable)();
const handlePercentages = () => {
    const { type, element } = (0, getReportingTable_1.getReportingTable)();
    if (!element)
        return;
    try {
        const removeResult = (0, removeCellPercentages_1.removeCellPercentages)(element);
        const addResult = (0, addCellPercentages_1.addCellPercentages)(element, type);
        if (!removeResult && type !== constants_1.TABLE_TYPE.CUSTOM_EXPLORATION) {
            console.error('removeCellPercentages returned unexpected result:', removeResult);
            // handle unexpected result from removeCellPercentages
        }
        if (!addResult) {
            console.error('addCellPercentages returned unexpected result:', addResult);
            // handle unexpected result from addCellPercentages
        }
    }
    catch (error) {
        console.error('An error occurred while handling percentages:', error);
        // or display a user-friendly error message
        // showError('An error occurred while handling percentages. Please try again later.');
    }
};
exports.handlePercentages = handlePercentages;
// Start observing the document with the configured parameters.
const observers = new WeakMap();
const startObserving = () => {
    const { type, element } = (0, getReportingTable_1.getReportingTable)();
    if (element === null || type === constants_1.TABLE_TYPE.STANDARD_REPORTING)
        return;
    if (observers.has(element)) {
        // An observer for this element already exists, so return early.
        return;
    }
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //stopObserving(element);
                    (0, exports.handlePercentages)();
                    (0, exports.stopObserving)(element);
                    //observer.disconnect();
                    //observers.delete(element); // Remove the reference to the observer.
                    setTimeout(exports.startObserving, 500); // TODO: fine-tune this value
                    break;
                }
            }
        });
        observer.observe(element, { childList: true, subtree: true });
        observers.set(element, observer); // Store the reference to the observer.
    }
};
exports.startObserving = startObserving;
const stopObserving = (element) => {
    const observer = observers.get(element);
    if (observer) {
        observer.disconnect();
        observers.delete(element); // Remove the reference to the observer.
    }
};
exports.stopObserving = stopObserving;
(0, exports.stopObserving)(element);
(0, exports.handlePercentages)();
(0, exports.startObserving)();


/***/ }),

/***/ "./src/features/addCellPercentages.ts":
/*!********************************************!*\
  !*** ./src/features/addCellPercentages.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCellPercentages = void 0;
const getTableHeadersWithPercentages_1 = __webpack_require__(/*! ../helpers/getTableHeadersWithPercentages */ "./src/helpers/getTableHeadersWithPercentages.ts");
const getTableRowsAndInsertPercentagesToCells_1 = __webpack_require__(/*! ../helpers/getTableRowsAndInsertPercentagesToCells */ "./src/helpers/getTableRowsAndInsertPercentagesToCells.ts");
const constants_1 = __webpack_require__(/*! ../helpers/constants */ "./src/helpers/constants.ts");
const extensionStorage = chrome.storage?.local;
const addCellPercentages = async (element, type) => {
    let processedHeaders = 0;
    const storageObject = [];
    const getAllTableHeadersNumbers = Array.from(element.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_HEADER_NUMBERS : constants_1.CUSTOM_REPORT_HEADERS));
    const getAllTableRows = Array.from(element.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_ROWS : constants_1.CUSTOM_REPORT_ROWS));
    if (getAllTableHeadersNumbers.length !== 0) {
        console.log('headers found');
        for (const [i, header] of getAllTableHeadersNumbers.entries()) {
            let x = i;
            const tableHeaderWithSummaryTotals = header.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_SUMMARY_TOTALS : constants_1.CUSTOM_REPORT_SUMMARY_TOTALS);
            if (type === constants_1.TABLE_TYPE.STANDARD_REPORTING) {
                const getAllTableHeadersTitles = Array.from(element.querySelectorAll(constants_1.STANDARD_REPORT_HEADER_TITLES));
                if (getAllTableHeadersTitles.length > getAllTableHeadersNumbers.length) {
                    x++;
                }
            }
            const { index: columnIndex, total: columnTotal } = (0, getTableHeadersWithPercentages_1.getTableHeadersWithPercentages)(x, tableHeaderWithSummaryTotals);
            // saving index and total to local extension storage
            storageObject.push({
                index: columnIndex,
                total: columnTotal,
            });
            if (columnIndex !== undefined && columnTotal !== undefined) {
                (0, getTableRowsAndInsertPercentagesToCells_1.getTableRowsAndInsertPercentagesToCells)(getAllTableRows, columnIndex, columnTotal, type);
                processedHeaders++;
            }
        }
        await extensionStorage.set({ optimizersStorage: storageObject });
    }
    else {
        console.log('No headers found');
        // this is for the custom exploration tables when report is scrolled down and the headers are hidden
        const storageResult = await new Promise((resolve) => {
            extensionStorage.get('optimizersStorage', (result) => {
                resolve(result.optimizersStorage);
            });
        });
        for (const { index, total } of storageResult) {
            (0, getTableRowsAndInsertPercentagesToCells_1.getTableRowsAndInsertPercentagesToCells)(getAllTableRows, index, total, type);
            processedHeaders++;
        }
    }
    console.log(`Added ${processedHeaders} headers`);
    return processedHeaders;
};
exports.addCellPercentages = addCellPercentages;


/***/ }),

/***/ "./src/helpers/cleanupStringToNumber.ts":
/*!**********************************************!*\
  !*** ./src/helpers/cleanupStringToNumber.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cleanupStringToNumber = void 0;
const cleanupStringToNumber = (str) => {
    return Number(str.replace(/[,£$<>!-]/g, '')); // TODO: add support for other currencies
};
exports.cleanupStringToNumber = cleanupStringToNumber;


/***/ }),

/***/ "./src/helpers/constants.ts":
/*!**********************************!*\
  !*** ./src/helpers/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// main
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUSTOM_REPORT_SUMMARY_TOTALS = exports.CUSTOM_REPORT_HEADERS = exports.CUSTOM_REPORT_ROWS = exports.CUSTOM_EXPLORATION_TABLE = exports.STANDARD_REPORT_SUMMARY_TOTALS = exports.STANDARD_REPORT_HEADER_TITLES = exports.STANDARD_REPORT_HEADER_NUMBERS = exports.STANDARD_REPORT_ROWS = exports.STANDARD_REPORTING_TABLE = exports.TABLE_TYPE = exports.COLUMNS_FOR_PERCENTAGES = exports.CLASS_NAME_ALL_EXTENSION_CHANGES = void 0;
exports.CLASS_NAME_ALL_EXTENSION_CHANGES = 'optimizers-extension';
// percentages feature
exports.COLUMNS_FOR_PERCENTAGES = '% of total';
/// standard reports
var TABLE_TYPE;
(function (TABLE_TYPE) {
    TABLE_TYPE["STANDARD_REPORTING"] = "standard";
    TABLE_TYPE["CUSTOM_EXPLORATION"] = "custom";
})(TABLE_TYPE || (exports.TABLE_TYPE = TABLE_TYPE = {}));
exports.STANDARD_REPORTING_TABLE = 'ga-reporting-table';
exports.STANDARD_REPORT_ROWS = 'tbody tr';
exports.STANDARD_REPORT_HEADER_NUMBERS = 'thead tr[class*="summary-totals"] th';
exports.STANDARD_REPORT_HEADER_TITLES = 'thead tr[class*="table-header-row"] th';
exports.STANDARD_REPORT_SUMMARY_TOTALS = 'div[class*="summary-text"]';
/// custom reports
exports.CUSTOM_EXPLORATION_TABLE = 'analysis-canvas';
exports.CUSTOM_REPORT_ROWS = 'svg g.cell:not([row-index="0"])';
exports.CUSTOM_REPORT_HEADERS = 'svg g.cell[row-index="0"]';
exports.CUSTOM_REPORT_SUMMARY_TOTALS = 'text[class*="percent-of-total"]';


/***/ }),

/***/ "./src/helpers/getReportingTable.ts":
/*!******************************************!*\
  !*** ./src/helpers/getReportingTable.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getReportingTable = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
const getReportingTable = () => {
    // page will have one or the other, never both
    const standardReportingTable = window.document.querySelector(constants_1.STANDARD_REPORTING_TABLE);
    if (standardReportingTable) {
        return { type: constants_1.TABLE_TYPE.STANDARD_REPORTING, element: standardReportingTable };
    }
    const customReportingTable = window.document.querySelector(constants_1.CUSTOM_EXPLORATION_TABLE);
    if (customReportingTable) {
        return { type: constants_1.TABLE_TYPE.CUSTOM_EXPLORATION, element: customReportingTable };
    }
    return null;
};
exports.getReportingTable = getReportingTable;


/***/ }),

/***/ "./src/helpers/getTableHeadersWithPercentages.ts":
/*!*******************************************************!*\
  !*** ./src/helpers/getTableHeadersWithPercentages.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTableHeadersWithPercentages = void 0;
const cleanupStringToNumber_1 = __webpack_require__(/*! ./cleanupStringToNumber */ "./src/helpers/cleanupStringToNumber.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
const getTableHeadersWithPercentages = (i, tableHeaderWithSummaryTotals) => {
    let index;
    let total;
    tableHeaderWithSummaryTotals.forEach((headerSummary) => {
        // TODO: rework how percentage columns are recognized to support other languages
        if (headerSummary.innerHTML.includes(constants_1.COLUMNS_FOR_PERCENTAGES)) {
            const returnPreviousSibling = headerSummary.previousElementSibling;
            const previousSiblingValue = returnPreviousSibling.innerHTML;
            const columnSingleSummaryNumber = (0, cleanupStringToNumber_1.cleanupStringToNumber)(previousSiblingValue);
            index = i;
            total = columnSingleSummaryNumber;
        }
    });
    return { index, total };
};
exports.getTableHeadersWithPercentages = getTableHeadersWithPercentages;


/***/ }),

/***/ "./src/helpers/getTableRowsAndInsertPercentagesToCells.ts":
/*!****************************************************************!*\
  !*** ./src/helpers/getTableRowsAndInsertPercentagesToCells.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTargetedCellOrSvgText = exports.getTableRowsAndInsertPercentagesToCells = void 0;
const cleanupStringToNumber_1 = __webpack_require__(/*! ./cleanupStringToNumber */ "./src/helpers/cleanupStringToNumber.ts");
const insertStringIntoCell_1 = __webpack_require__(/*! ./insertStringIntoCell */ "./src/helpers/insertStringIntoCell.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
const getTableRowsAndInsertPercentagesToCells = (getAllTableRows, columnIndex, columnTotal, type) => {
    //console.log('in getTableRowsAndInsertPercentagesToCells', getAllTableRows);
    getAllTableRows.forEach((row) => {
        const targetedCellOrSvgText = (0, exports.getTargetedCellOrSvgText)(row, columnIndex, type);
        if (!targetedCellOrSvgText) {
            return;
        }
        const rowSingleColumnNumber = (0, cleanupStringToNumber_1.cleanupStringToNumber)(targetedCellOrSvgText.innerHTML);
        const calculatePercentageOfTotal = ((rowSingleColumnNumber / columnTotal) * 100).toFixed(2);
        (0, insertStringIntoCell_1.insertStringIntoCell)(targetedCellOrSvgText, calculatePercentageOfTotal, type);
    });
};
exports.getTableRowsAndInsertPercentagesToCells = getTableRowsAndInsertPercentagesToCells;
const getTargetedCellOrSvgText = (row, columnIndex, type) => {
    if (type === constants_1.TABLE_TYPE.STANDARD_REPORTING) {
        //console.log('in getTargetedCellOrSvgText', columnIndex, row.children[columnIndex]);
        return row.children[columnIndex];
    }
    else {
        if (row.matches(`[column-index="${columnIndex}"]`)) {
            return row.querySelector('text');
        }
    }
    return null;
};
exports.getTargetedCellOrSvgText = getTargetedCellOrSvgText;


/***/ }),

/***/ "./src/helpers/insertStringIntoCell.ts":
/*!*********************************************!*\
  !*** ./src/helpers/insertStringIntoCell.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertStringIntoCell = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
const insertStringIntoCell = (cellOrText, val, type) => {
    if (type === constants_1.TABLE_TYPE.STANDARD_REPORTING) {
        const newElement = createSpanElement(val);
        cellOrText.insertBefore(newElement, cellOrText.firstChild);
    }
    else {
        const newElement = createSVGElement(cellOrText, val);
        cellOrText.insertAdjacentElement('afterend', newElement);
    }
};
exports.insertStringIntoCell = insertStringIntoCell;
const createSpanElement = (val) => {
    const newElement = document.createElement('span');
    newElement.setAttribute('style', 'font-size:10px; font-style:italic');
    newElement.setAttribute('class', constants_1.CLASS_NAME_ALL_EXTENSION_CHANGES);
    newElement.innerText = `(${val}%)`;
    return newElement;
};
const createSVGElement = (cellOrText, val) => {
    const elemX = cellOrText.getAttributeNS(null, 'x');
    const elemY = cellOrText.getAttributeNS(null, 'y');
    cellOrText.setAttributeNS(null, 'dx', '-30');
    const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    newElement.setAttributeNS(null, 'x', elemX);
    newElement.setAttributeNS(null, 'y', elemY);
    newElement.setAttributeNS(null, 'style', 'font: 10px Roboto, sans-serif;');
    newElement.setAttributeNS(null, 'dx', '13');
    newElement.setAttributeNS(null, 'dy', '-5');
    newElement.setAttributeNS(null, 'class', `align-right ${constants_1.CLASS_NAME_ALL_EXTENSION_CHANGES}`);
    newElement.textContent = `(${val}%)`;
    return newElement;
};


/***/ }),

/***/ "./src/helpers/removeCellPercentages.ts":
/*!**********************************************!*\
  !*** ./src/helpers/removeCellPercentages.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeCellPercentages = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
const removeCellPercentages = (element) => {
    let processedHeaders = 0;
    const getAllExtensionChanges = element.querySelectorAll(`.${constants_1.CLASS_NAME_ALL_EXTENSION_CHANGES}`);
    getAllExtensionChanges.forEach((el) => {
        el.remove();
        processedHeaders++;
    });
    console.log(`Removed ${processedHeaders} headers`);
    return processedHeaders;
};
exports.removeCellPercentages = removeCellPercentages;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxFQUFFO0lBQ3pELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksNENBQWdDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ3JDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNaLGdCQUFnQixFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsZ0JBQWdCLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sZ0JBQWdCLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBVFcsNkJBQXFCLHlCQVNoQzs7Ozs7OztVQ1hGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvY29udGVudC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvZmVhdHVyZXMvYWRkQ2VsbFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2NsZWFudXBTdHJpbmdUb051bWJlci50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvZ2V0UmVwb3J0aW5nVGFibGUudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzV2l0aFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9pbnNlcnRTdHJpbmdJbnRvQ2VsbC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9yZW1vdmVDZWxsUGVyY2VudGFnZXMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGRDZWxsUGVyY2VudGFnZXMgfSBmcm9tICcuL2ZlYXR1cmVzL2FkZENlbGxQZXJjZW50YWdlcyc7XG5pbXBvcnQgeyByZW1vdmVDZWxsUGVyY2VudGFnZXMgfSBmcm9tICcuL2hlbHBlcnMvcmVtb3ZlQ2VsbFBlcmNlbnRhZ2VzJztcbmltcG9ydCB7IFRBQkxFX1RZUEUgfSBmcm9tICcuL2hlbHBlcnMvY29uc3RhbnRzJztcbmltcG9ydCB7IGdldFJlcG9ydGluZ1RhYmxlIH0gZnJvbSAnLi9oZWxwZXJzL2dldFJlcG9ydGluZ1RhYmxlJztcblxuY29uc3QgeyBlbGVtZW50IH0gPSBnZXRSZXBvcnRpbmdUYWJsZSgpO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlUGVyY2VudGFnZXMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgdHlwZSwgZWxlbWVudCB9ID0gZ2V0UmVwb3J0aW5nVGFibGUoKTtcblx0aWYgKCFlbGVtZW50KSByZXR1cm47XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVtb3ZlUmVzdWx0ID0gcmVtb3ZlQ2VsbFBlcmNlbnRhZ2VzKGVsZW1lbnQpO1xuXHRcdGNvbnN0IGFkZFJlc3VsdCA9IGFkZENlbGxQZXJjZW50YWdlcyhlbGVtZW50LCB0eXBlKTtcblxuXHRcdGlmICghcmVtb3ZlUmVzdWx0ICYmIHR5cGUgIT09IFRBQkxFX1RZUEUuQ1VTVE9NX0VYUExPUkFUSU9OKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdyZW1vdmVDZWxsUGVyY2VudGFnZXMgcmV0dXJuZWQgdW5leHBlY3RlZCByZXN1bHQ6JywgcmVtb3ZlUmVzdWx0KTtcblx0XHRcdC8vIGhhbmRsZSB1bmV4cGVjdGVkIHJlc3VsdCBmcm9tIHJlbW92ZUNlbGxQZXJjZW50YWdlc1xuXHRcdH1cblxuXHRcdGlmICghYWRkUmVzdWx0KSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdhZGRDZWxsUGVyY2VudGFnZXMgcmV0dXJuZWQgdW5leHBlY3RlZCByZXN1bHQ6JywgYWRkUmVzdWx0KTtcblx0XHRcdC8vIGhhbmRsZSB1bmV4cGVjdGVkIHJlc3VsdCBmcm9tIGFkZENlbGxQZXJjZW50YWdlc1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBoYW5kbGluZyBwZXJjZW50YWdlczonLCBlcnJvcik7XG5cdFx0Ly8gb3IgZGlzcGxheSBhIHVzZXItZnJpZW5kbHkgZXJyb3IgbWVzc2FnZVxuXHRcdC8vIHNob3dFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgaGFuZGxpbmcgcGVyY2VudGFnZXMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyk7XG5cdH1cbn07XG5cbi8vIFN0YXJ0IG9ic2VydmluZyB0aGUgZG9jdW1lbnQgd2l0aCB0aGUgY29uZmlndXJlZCBwYXJhbWV0ZXJzLlxuY29uc3Qgb2JzZXJ2ZXJzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgTXV0YXRpb25PYnNlcnZlcj4oKTtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0T2JzZXJ2aW5nID0gKCkgPT4ge1xuXHRjb25zdCB7IHR5cGUsIGVsZW1lbnQgfSA9IGdldFJlcG9ydGluZ1RhYmxlKCk7XG5cdGlmIChlbGVtZW50ID09PSBudWxsIHx8IHR5cGUgPT09IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HKSByZXR1cm47XG5cblx0aWYgKG9ic2VydmVycy5oYXMoZWxlbWVudCkpIHtcblx0XHQvLyBBbiBvYnNlcnZlciBmb3IgdGhpcyBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBzbyByZXR1cm4gZWFybHkuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uc0xpc3QpIHtcblx0XHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG5cdFx0XHRcdFx0Ly9zdG9wT2JzZXJ2aW5nKGVsZW1lbnQpO1xuXHRcdFx0XHRcdGhhbmRsZVBlcmNlbnRhZ2VzKCk7XG5cdFx0XHRcdFx0c3RvcE9ic2VydmluZyhlbGVtZW50KTtcblx0XHRcdFx0XHQvL29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHRcdFx0XHQvL29ic2VydmVycy5kZWxldGUoZWxlbWVudCk7IC8vIFJlbW92ZSB0aGUgcmVmZXJlbmNlIHRvIHRoZSBvYnNlcnZlci5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KHN0YXJ0T2JzZXJ2aW5nLCA1MDApOyAvLyBUT0RPOiBmaW5lLXR1bmUgdGhpcyB2YWx1ZVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0b2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcblx0XHRvYnNlcnZlcnMuc2V0KGVsZW1lbnQsIG9ic2VydmVyKTsgLy8gU3RvcmUgdGhlIHJlZmVyZW5jZSB0byB0aGUgb2JzZXJ2ZXIuXG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBzdG9wT2JzZXJ2aW5nID0gKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcblx0Y29uc3Qgb2JzZXJ2ZXIgPSBvYnNlcnZlcnMuZ2V0KGVsZW1lbnQpO1xuXHRpZiAob2JzZXJ2ZXIpIHtcblx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0b2JzZXJ2ZXJzLmRlbGV0ZShlbGVtZW50KTsgLy8gUmVtb3ZlIHRoZSByZWZlcmVuY2UgdG8gdGhlIG9ic2VydmVyLlxuXHR9XG59O1xuXG5zdG9wT2JzZXJ2aW5nKGVsZW1lbnQpO1xuaGFuZGxlUGVyY2VudGFnZXMoKTtcbnN0YXJ0T2JzZXJ2aW5nKCk7XG4iLCJpbXBvcnQgeyBnZXRUYWJsZUhlYWRlcnNXaXRoUGVyY2VudGFnZXMgfSBmcm9tICcuLi9oZWxwZXJzL2dldFRhYmxlSGVhZGVyc1dpdGhQZXJjZW50YWdlcyc7XG5pbXBvcnQgeyBnZXRUYWJsZVJvd3NBbmRJbnNlcnRQZXJjZW50YWdlc1RvQ2VsbHMgfSBmcm9tICcuLi9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyc7XG5pbXBvcnQge1xuXHRDVVNUT01fUkVQT1JUX0hFQURFUlMsXG5cdENVU1RPTV9SRVBPUlRfUk9XUyxcblx0Q1VTVE9NX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyxcblx0U1RBTkRBUkRfUkVQT1JUX0hFQURFUl9USVRMRVMsXG5cdFNUQU5EQVJEX1JFUE9SVF9IRUFERVJfTlVNQkVSUyxcblx0U1RBTkRBUkRfUkVQT1JUX1JPV1MsXG5cdFNUQU5EQVJEX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyxcblx0VEFCTEVfVFlQRSxcbn0gZnJvbSAnLi4vaGVscGVycy9jb25zdGFudHMnO1xuXG5jb25zdCBleHRlbnNpb25TdG9yYWdlID0gY2hyb21lLnN0b3JhZ2U/LmxvY2FsO1xuXG50eXBlIFN0b3JhZ2VFbnRyeSA9IHsgaW5kZXg6IG51bWJlcjsgdG90YWw6IG51bWJlciB9O1xuXG5leHBvcnQgY29uc3QgYWRkQ2VsbFBlcmNlbnRhZ2VzID0gYXN5bmMgKGVsZW1lbnQ6IEVsZW1lbnQsIHR5cGU6IFRBQkxFX1RZUEUpID0+IHtcblx0bGV0IHByb2Nlc3NlZEhlYWRlcnMgPSAwO1xuXHRjb25zdCBzdG9yYWdlT2JqZWN0ID0gW107XG5cblx0Y29uc3QgZ2V0QWxsVGFibGVIZWFkZXJzTnVtYmVycyA9IEFycmF5LmZyb20oXG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0dHlwZSA9PT0gVEFCTEVfVFlQRS5TVEFOREFSRF9SRVBPUlRJTkcgPyBTVEFOREFSRF9SRVBPUlRfSEVBREVSX05VTUJFUlMgOiBDVVNUT01fUkVQT1JUX0hFQURFUlMsXG5cdFx0KSxcblx0KTtcblx0Y29uc3QgZ2V0QWxsVGFibGVSb3dzID0gQXJyYXkuZnJvbShcblx0XHRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSA9PT0gVEFCTEVfVFlQRS5TVEFOREFSRF9SRVBPUlRJTkcgPyBTVEFOREFSRF9SRVBPUlRfUk9XUyA6IENVU1RPTV9SRVBPUlRfUk9XUyksXG5cdCk7XG5cblx0aWYgKGdldEFsbFRhYmxlSGVhZGVyc051bWJlcnMubGVuZ3RoICE9PSAwKSB7XG5cdFx0Y29uc29sZS5sb2coJ2hlYWRlcnMgZm91bmQnKTtcblx0XHRmb3IgKGNvbnN0IFtpLCBoZWFkZXJdIG9mIGdldEFsbFRhYmxlSGVhZGVyc051bWJlcnMuZW50cmllcygpKSB7XG5cdFx0XHRsZXQgeCA9IGk7XG5cdFx0XHRjb25zdCB0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdHR5cGUgPT09IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HID8gU1RBTkRBUkRfUkVQT1JUX1NVTU1BUllfVE9UQUxTIDogQ1VTVE9NX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyxcblx0XHRcdCk7XG5cblx0XHRcdGlmICh0eXBlID09PSBUQUJMRV9UWVBFLlNUQU5EQVJEX1JFUE9SVElORykge1xuXHRcdFx0XHRjb25zdCBnZXRBbGxUYWJsZUhlYWRlcnNUaXRsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChTVEFOREFSRF9SRVBPUlRfSEVBREVSX1RJVExFUykpXG5cdFx0XHRcdGlmIChnZXRBbGxUYWJsZUhlYWRlcnNUaXRsZXMubGVuZ3RoID4gZ2V0QWxsVGFibGVIZWFkZXJzTnVtYmVycy5sZW5ndGgpIHtcblx0XHRcdFx0XHR4Kys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgeyBpbmRleDogY29sdW1uSW5kZXgsIHRvdGFsOiBjb2x1bW5Ub3RhbCB9ID0gZ2V0VGFibGVIZWFkZXJzV2l0aFBlcmNlbnRhZ2VzKHgsIHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMpO1xuXG5cdFx0XHQvLyBzYXZpbmcgaW5kZXggYW5kIHRvdGFsIHRvIGxvY2FsIGV4dGVuc2lvbiBzdG9yYWdlXG5cdFx0XHRzdG9yYWdlT2JqZWN0LnB1c2goe1xuXHRcdFx0XHRpbmRleDogY29sdW1uSW5kZXgsXG5cdFx0XHRcdHRvdGFsOiBjb2x1bW5Ub3RhbCxcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCAmJiBjb2x1bW5Ub3RhbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyhnZXRBbGxUYWJsZVJvd3MsIGNvbHVtbkluZGV4LCBjb2x1bW5Ub3RhbCwgdHlwZSk7XG5cdFx0XHRcdHByb2Nlc3NlZEhlYWRlcnMrKztcblx0XHRcdH1cblx0XHR9XG5cdFx0YXdhaXQgZXh0ZW5zaW9uU3RvcmFnZS5zZXQoeyBvcHRpbWl6ZXJzU3RvcmFnZTogc3RvcmFnZU9iamVjdCB9KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZygnTm8gaGVhZGVycyBmb3VuZCcpO1xuXHRcdC8vIHRoaXMgaXMgZm9yIHRoZSBjdXN0b20gZXhwbG9yYXRpb24gdGFibGVzIHdoZW4gcmVwb3J0IGlzIHNjcm9sbGVkIGRvd24gYW5kIHRoZSBoZWFkZXJzIGFyZSBoaWRkZW5cblx0XHRjb25zdCBzdG9yYWdlUmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8U3RvcmFnZUVudHJ5W10+KChyZXNvbHZlKSA9PiB7XG5cdFx0XHRleHRlbnNpb25TdG9yYWdlLmdldCgnb3B0aW1pemVyc1N0b3JhZ2UnLCAocmVzdWx0KSA9PiB7XG5cdFx0XHRcdHJlc29sdmUocmVzdWx0Lm9wdGltaXplcnNTdG9yYWdlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Zm9yIChjb25zdCB7IGluZGV4LCB0b3RhbCB9IG9mIHN0b3JhZ2VSZXN1bHQpIHtcblx0XHRcdGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyhnZXRBbGxUYWJsZVJvd3MsIGluZGV4LCB0b3RhbCwgdHlwZSk7XG5cdFx0XHRwcm9jZXNzZWRIZWFkZXJzKys7XG5cdFx0fVxuXHR9XG5cblx0Y29uc29sZS5sb2coYEFkZGVkICR7cHJvY2Vzc2VkSGVhZGVyc30gaGVhZGVyc2ApO1xuXHRyZXR1cm4gcHJvY2Vzc2VkSGVhZGVycztcbn07XG4iLCJleHBvcnQgY29uc3QgY2xlYW51cFN0cmluZ1RvTnVtYmVyID0gKHN0cjogc3RyaW5nKSA9PiB7XG5cdHJldHVybiBOdW1iZXIoc3RyLnJlcGxhY2UoL1sswqMkPD4hLV0vZywgJycpKTsgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIG90aGVyIGN1cnJlbmNpZXNcbn07XG4iLCIvLyBtYWluXG5cbmV4cG9ydCBjb25zdCBDTEFTU19OQU1FX0FMTF9FWFRFTlNJT05fQ0hBTkdFUyA9ICdvcHRpbWl6ZXJzLWV4dGVuc2lvbic7XG5cbi8vIHBlcmNlbnRhZ2VzIGZlYXR1cmVcblxuZXhwb3J0IGNvbnN0IENPTFVNTlNfRk9SX1BFUkNFTlRBR0VTID0gJyUgb2YgdG90YWwnO1xuXG4vLy8gc3RhbmRhcmQgcmVwb3J0c1xuZXhwb3J0IGVudW0gVEFCTEVfVFlQRSB7XG5cdFNUQU5EQVJEX1JFUE9SVElORyA9ICdzdGFuZGFyZCcsXG5cdENVU1RPTV9FWFBMT1JBVElPTiA9ICdjdXN0b20nLFxufVxuXG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUSU5HX1RBQkxFID0gJ2dhLXJlcG9ydGluZy10YWJsZSc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1JPV1MgPSAndGJvZHkgdHInO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9IRUFERVJfTlVNQkVSUyA9ICd0aGVhZCB0cltjbGFzcyo9XCJzdW1tYXJ5LXRvdGFsc1wiXSB0aCc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX0hFQURFUl9USVRMRVMgPSAndGhlYWQgdHJbY2xhc3MqPVwidGFibGUtaGVhZGVyLXJvd1wiXSB0aCc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ2RpdltjbGFzcyo9XCJzdW1tYXJ5LXRleHRcIl0nO1xuXG4vLy8gY3VzdG9tIHJlcG9ydHNcbmV4cG9ydCBjb25zdCBDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUgPSAnYW5hbHlzaXMtY2FudmFzJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1JPV1MgPSAnc3ZnIGcuY2VsbDpub3QoW3Jvdy1pbmRleD1cIjBcIl0pJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX0hFQURFUlMgPSAnc3ZnIGcuY2VsbFtyb3ctaW5kZXg9XCIwXCJdJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ3RleHRbY2xhc3MqPVwicGVyY2VudC1vZi10b3RhbFwiXSc7XG4iLCJpbXBvcnQgeyBDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUsIFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSwgVEFCTEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGdldFJlcG9ydGluZ1RhYmxlID0gKCk6IHsgdHlwZTogVEFCTEVfVFlQRTsgZWxlbWVudDogRWxlbWVudCB9IHwgbnVsbCA9PiB7XG5cdC8vIHBhZ2Ugd2lsbCBoYXZlIG9uZSBvciB0aGUgb3RoZXIsIG5ldmVyIGJvdGhcblx0Y29uc3Qgc3RhbmRhcmRSZXBvcnRpbmdUYWJsZSA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSk7XG5cdGlmIChzdGFuZGFyZFJlcG9ydGluZ1RhYmxlKSB7XG5cdFx0cmV0dXJuIHsgdHlwZTogVEFCTEVfVFlQRS5TVEFOREFSRF9SRVBPUlRJTkcsIGVsZW1lbnQ6IHN0YW5kYXJkUmVwb3J0aW5nVGFibGUgfTtcblx0fVxuXG5cdGNvbnN0IGN1c3RvbVJlcG9ydGluZ1RhYmxlID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFKTtcblx0aWYgKGN1c3RvbVJlcG9ydGluZ1RhYmxlKSB7XG5cdFx0cmV0dXJuIHsgdHlwZTogVEFCTEVfVFlQRS5DVVNUT01fRVhQTE9SQVRJT04sIGVsZW1lbnQ6IGN1c3RvbVJlcG9ydGluZ1RhYmxlIH07XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQgeyBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgfSBmcm9tICcuL2NsZWFudXBTdHJpbmdUb051bWJlcic7XG5pbXBvcnQgeyBDT0xVTU5TX0ZPUl9QRVJDRU5UQUdFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGdldFRhYmxlSGVhZGVyc1dpdGhQZXJjZW50YWdlcyA9IChpOiBudW1iZXIsIHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4pID0+IHtcblx0bGV0IGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cdGxldCB0b3RhbDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG5cdFx0dGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFscy5mb3JFYWNoKChoZWFkZXJTdW1tYXJ5OiBIVE1MRWxlbWVudCkgPT4ge1xuXHRcdC8vIFRPRE86IHJld29yayBob3cgcGVyY2VudGFnZSBjb2x1bW5zIGFyZSByZWNvZ25pemVkIHRvIHN1cHBvcnQgb3RoZXIgbGFuZ3VhZ2VzXG5cdFx0aWYgKGhlYWRlclN1bW1hcnkuaW5uZXJIVE1MLmluY2x1ZGVzKENPTFVNTlNfRk9SX1BFUkNFTlRBR0VTKSkge1xuXHRcdFx0Y29uc3QgcmV0dXJuUHJldmlvdXNTaWJsaW5nID1cblx0XHRcdFx0aGVhZGVyU3VtbWFyeS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0Y29uc3QgcHJldmlvdXNTaWJsaW5nVmFsdWUgPSByZXR1cm5QcmV2aW91c1NpYmxpbmcuaW5uZXJIVE1MO1xuXHRcdFx0Y29uc3QgY29sdW1uU2luZ2xlU3VtbWFyeU51bWJlciA9XG5cdFx0XHRcdGNsZWFudXBTdHJpbmdUb051bWJlcihwcmV2aW91c1NpYmxpbmdWYWx1ZSk7XG5cdFx0XHRpbmRleCA9IGk7XG5cdFx0XHR0b3RhbCA9IGNvbHVtblNpbmdsZVN1bW1hcnlOdW1iZXI7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4geyBpbmRleCwgdG90YWwgfTtcbn1cbiIsImltcG9ydCB7IGNsZWFudXBTdHJpbmdUb051bWJlciB9IGZyb20gJy4vY2xlYW51cFN0cmluZ1RvTnVtYmVyJztcbmltcG9ydCB7IGluc2VydFN0cmluZ0ludG9DZWxsIH0gZnJvbSAnLi9pbnNlcnRTdHJpbmdJbnRvQ2VsbCc7XG5pbXBvcnQgeyBUQUJMRV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgZ2V0VGFibGVSb3dzQW5kSW5zZXJ0UGVyY2VudGFnZXNUb0NlbGxzID0gKGdldEFsbFRhYmxlUm93czogRWxlbWVudFtdLCBjb2x1bW5JbmRleDogbnVtYmVyLCBjb2x1bW5Ub3RhbDogbnVtYmVyLCB0eXBlOiBUQUJMRV9UWVBFKSA9PiB7XG5cdC8vY29uc29sZS5sb2coJ2luIGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscycsIGdldEFsbFRhYmxlUm93cyk7XG5cdGdldEFsbFRhYmxlUm93cy5mb3JFYWNoKChyb3c6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0Y29uc3QgdGFyZ2V0ZWRDZWxsT3JTdmdUZXh0ID0gZ2V0VGFyZ2V0ZWRDZWxsT3JTdmdUZXh0KHJvdywgY29sdW1uSW5kZXgsIHR5cGUpO1xuXHRcdGlmICghdGFyZ2V0ZWRDZWxsT3JTdmdUZXh0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qgcm93U2luZ2xlQ29sdW1uTnVtYmVyID0gY2xlYW51cFN0cmluZ1RvTnVtYmVyKHRhcmdldGVkQ2VsbE9yU3ZnVGV4dC5pbm5lckhUTUwpO1xuXHRcdGNvbnN0IGNhbGN1bGF0ZVBlcmNlbnRhZ2VPZlRvdGFsID0gKChyb3dTaW5nbGVDb2x1bW5OdW1iZXIgLyBjb2x1bW5Ub3RhbCkgKiAxMDApLnRvRml4ZWQoMik7XG5cblx0XHRpbnNlcnRTdHJpbmdJbnRvQ2VsbCh0YXJnZXRlZENlbGxPclN2Z1RleHQsIGNhbGN1bGF0ZVBlcmNlbnRhZ2VPZlRvdGFsLCB0eXBlKTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGFyZ2V0ZWRDZWxsT3JTdmdUZXh0ID0gKHJvdzogSFRNTEVsZW1lbnQsIGNvbHVtbkluZGV4OiBudW1iZXIsIHR5cGU6IHN0cmluZykgPT4ge1xuXHRpZiAodHlwZSA9PT0gVEFCTEVfVFlQRS5TVEFOREFSRF9SRVBPUlRJTkcpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdpbiBnZXRUYXJnZXRlZENlbGxPclN2Z1RleHQnLCBjb2x1bW5JbmRleCwgcm93LmNoaWxkcmVuW2NvbHVtbkluZGV4XSk7XG5cdFx0cmV0dXJuIHJvdy5jaGlsZHJlbltjb2x1bW5JbmRleF0gYXMgSFRNTEVsZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHJvdy5tYXRjaGVzKGBbY29sdW1uLWluZGV4PVwiJHtjb2x1bW5JbmRleH1cIl1gKSkge1xuXHRcdFx0cmV0dXJuIHJvdy5xdWVyeVNlbGVjdG9yKCd0ZXh0Jyk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7IENMQVNTX05BTUVfQUxMX0VYVEVOU0lPTl9DSEFOR0VTLCBUQUJMRV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgaW5zZXJ0U3RyaW5nSW50b0NlbGwgPSAoY2VsbE9yVGV4dDogSFRNTEVsZW1lbnQgfCBTVkdUZXh0RWxlbWVudCwgdmFsOiBzdHJpbmcsIHR5cGU6IHN0cmluZykgPT4ge1xuXHRpZiAodHlwZSA9PT0gVEFCTEVfVFlQRS5TVEFOREFSRF9SRVBPUlRJTkcpIHtcblx0XHRjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlU3BhbkVsZW1lbnQodmFsKTtcblx0XHRjZWxsT3JUZXh0Lmluc2VydEJlZm9yZShuZXdFbGVtZW50LCBjZWxsT3JUZXh0LmZpcnN0Q2hpbGQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVTVkdFbGVtZW50KGNlbGxPclRleHQgYXMgU1ZHVGV4dEVsZW1lbnQsIHZhbCk7XG5cdFx0Y2VsbE9yVGV4dC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgbmV3RWxlbWVudCk7XG5cdH1cbn07XG5cbmNvbnN0IGNyZWF0ZVNwYW5FbGVtZW50ID0gKHZhbDogc3RyaW5nKSA9PiB7XG5cdGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdmb250LXNpemU6MTBweDsgZm9udC1zdHlsZTppdGFsaWMnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ0xBU1NfTkFNRV9BTExfRVhURU5TSU9OX0NIQU5HRVMpO1xuXHRuZXdFbGVtZW50LmlubmVyVGV4dCA9IGAoJHt2YWx9JSlgO1xuXHRyZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZVNWR0VsZW1lbnQgPSAoY2VsbE9yVGV4dDogU1ZHVGV4dEVsZW1lbnQsIHZhbDogc3RyaW5nKSA9PiB7XG5cdGNvbnN0IGVsZW1YID0gY2VsbE9yVGV4dC5nZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcpO1xuXHRjb25zdCBlbGVtWSA9IGNlbGxPclRleHQuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ3knKTtcblx0Y2VsbE9yVGV4dC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHgnLCAnLTMwJyk7XG5cblx0Y29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAndGV4dCcpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgZWxlbVgpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgZWxlbVkpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdHlsZScsICdmb250OiAxMHB4IFJvYm90bywgc2Fucy1zZXJpZjsnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHgnLCAnMTMnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHknLCAnLTUnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCBgYWxpZ24tcmlnaHQgJHtDTEFTU19OQU1FX0FMTF9FWFRFTlNJT05fQ0hBTkdFU31gKTtcblx0bmV3RWxlbWVudC50ZXh0Q29udGVudCA9IGAoJHt2YWx9JSlgO1xuXHRyZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cblxuIiwiaW1wb3J0IHsgQ0xBU1NfTkFNRV9BTExfRVhURU5TSU9OX0NIQU5HRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCByZW1vdmVDZWxsUGVyY2VudGFnZXMgPSAoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuXHRsZXQgcHJvY2Vzc2VkSGVhZGVycyA9IDA7XG5cdGNvbnN0IGdldEFsbEV4dGVuc2lvbkNoYW5nZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0NMQVNTX05BTUVfQUxMX0VYVEVOU0lPTl9DSEFOR0VTfWApO1xuXHRnZXRBbGxFeHRlbnNpb25DaGFuZ2VzLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0ZWwucmVtb3ZlKCk7XG5cdFx0cHJvY2Vzc2VkSGVhZGVycysrO1xuXHR9KTtcblx0Y29uc29sZS5sb2coYFJlbW92ZWQgJHtwcm9jZXNzZWRIZWFkZXJzfSBoZWFkZXJzYCk7XG5cdHJldHVybiBwcm9jZXNzZWRIZWFkZXJzO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
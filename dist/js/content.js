/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const addCellPercentages_1 = __importDefault(__webpack_require__(/*! ./features/addCellPercentages */ "./src/features/addCellPercentages.ts"));
const removeCellPercentages_1 = __importDefault(__webpack_require__(/*! ./helpers/removeCellPercentages */ "./src/helpers/removeCellPercentages.ts"));
console.log('usao u content');
// we want to clean up first before adding new ones
(0, removeCellPercentages_1.default)();
(0, addCellPercentages_1.default)();


/***/ }),

/***/ "./src/features/addCellPercentages.ts":
/*!********************************************!*\
  !*** ./src/features/addCellPercentages.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getTableHeaders_1 = __importDefault(__webpack_require__(/*! ../helpers/getTableHeaders */ "./src/helpers/getTableHeaders.ts"));
const getTableRowsAndInsertPercentagesToCells_1 = __importDefault(__webpack_require__(/*! ../helpers/getTableRowsAndInsertPercentagesToCells */ "./src/helpers/getTableRowsAndInsertPercentagesToCells.ts"));
const constants_1 = __webpack_require__(/*! ../helpers/constants */ "./src/helpers/constants.ts");
const getReportingTable_1 = __importDefault(__webpack_require__(/*! ../helpers/getReportingTable */ "./src/helpers/getReportingTable.ts"));
exports["default"] = () => {
    const { type, element } = (0, getReportingTable_1.default)();
    const getAllTableHeaders = Array.from(element.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_HEADERS : constants_1.CUSTOM_REPORT_HEADERS));
    const getAllTableRows = Array.from(element.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_ROWS : constants_1.CUSTOM_REPORT_ROWS));
    getAllTableHeaders.forEach((header, i) => {
        const tableHeaderWithSummaryTotals = header.querySelectorAll(type === constants_1.TABLE_TYPE.STANDARD_REPORTING ? constants_1.STANDARD_REPORT_SUMMARY_TOTALS : constants_1.CUSTOM_REPORT_SUMMARY_TOTALS);
        const { index: columnIndex, total: columnTotal } = (0, getTableHeaders_1.default)(tableHeaderWithSummaryTotals, i);
        if (columnIndex !== undefined && columnTotal !== undefined) {
            (0, getTableRowsAndInsertPercentagesToCells_1.default)(getAllTableRows, columnIndex, columnTotal, type);
            console.log('added new percentages to cells');
        }
    });
};


/***/ }),

/***/ "./src/helpers/cleanupStringToNumber.ts":
/*!**********************************************!*\
  !*** ./src/helpers/cleanupStringToNumber.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (str) => {
    return Number(str.replace(/[$,<>!-]/g, '')); // TODO: add support for other currencies
};


/***/ }),

/***/ "./src/helpers/constants.ts":
/*!**********************************!*\
  !*** ./src/helpers/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// main
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUSTOM_REPORT_SUMMARY_TOTALS = exports.CUSTOM_REPORT_HEADERS = exports.CUSTOM_REPORT_ROWS = exports.CUSTOM_EXPLORATION_TABLE = exports.STANDARD_REPORT_SUMMARY_TOTALS = exports.STANDARD_REPORT_HEADERS = exports.STANDARD_REPORT_ROWS = exports.STANDARD_REPORTING_TABLE = exports.TABLE_TYPE = exports.COLUMNS_FOR_PERCENTAGES = exports.SVG_URL_PATH_CUSTOM_EXPLORATIONS = exports.CLASS_NAME_ALL_EXTENSION_CHANGES = void 0;
exports.CLASS_NAME_ALL_EXTENSION_CHANGES = 'optimizers-extension';
exports.SVG_URL_PATH_CUSTOM_EXPLORATIONS = '/vero/arrow_downward.svg';
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
exports.STANDARD_REPORT_HEADERS = 'thead tr[class*="summary-totals"] th';
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
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
exports["default"] = () => {
    const standardReportingTable = window.document.querySelector(constants_1.STANDARD_REPORTING_TABLE);
    const customReportingTable = window.document.querySelector(constants_1.CUSTOM_EXPLORATION_TABLE);
    if (standardReportingTable)
        return { 'type': constants_1.TABLE_TYPE.STANDARD_REPORTING, 'element': standardReportingTable };
    if (customReportingTable)
        return { 'type': constants_1.TABLE_TYPE.CUSTOM_EXPLORATION, 'element': customReportingTable };
    return;
};


/***/ }),

/***/ "./src/helpers/getTableHeaders.ts":
/*!****************************************!*\
  !*** ./src/helpers/getTableHeaders.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const cleanupStringToNumber_1 = __importDefault(__webpack_require__(/*! ./cleanupStringToNumber */ "./src/helpers/cleanupStringToNumber.ts"));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
exports["default"] = (tableHeaderWithSummaryTotals, i) => {
    let index;
    let total;
    tableHeaderWithSummaryTotals.forEach((headerSummary) => {
        if (headerSummary.innerHTML.includes(constants_1.COLUMNS_FOR_PERCENTAGES)) {
            const returnPreviousSibling = headerSummary.previousElementSibling;
            const previousSiblingValue = returnPreviousSibling.innerHTML;
            const columnSingleSummaryNumber = (0, cleanupStringToNumber_1.default)(previousSiblingValue);
            index = i;
            total = columnSingleSummaryNumber;
        }
    });
    return { index, total };
};


/***/ }),

/***/ "./src/helpers/getTableRowsAndInsertPercentagesToCells.ts":
/*!****************************************************************!*\
  !*** ./src/helpers/getTableRowsAndInsertPercentagesToCells.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const cleanupStringToNumber_1 = __importDefault(__webpack_require__(/*! ./cleanupStringToNumber */ "./src/helpers/cleanupStringToNumber.ts"));
const insertStringIntoCell_1 = __importDefault(__webpack_require__(/*! ./insertStringIntoCell */ "./src/helpers/insertStringIntoCell.ts"));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
exports["default"] = (getAllTableRows, columnIndex, columnTotal, type) => {
    const getTargetedCellOrSvgText = (row, columnIndex, type) => {
        if (type === constants_1.TABLE_TYPE.STANDARD_REPORTING) {
            return row.children[columnIndex];
        }
        else {
            if (row.matches(`[column-index="${columnIndex}"]`)) {
                return row.querySelector('text');
            }
        }
        return null;
    };
    getAllTableRows.forEach((row) => {
        const targetedCellOrSvgText = getTargetedCellOrSvgText(row, columnIndex, type);
        if (!targetedCellOrSvgText) {
            return;
        }
        const rowSingleColumnNumber = (0, cleanupStringToNumber_1.default)(targetedCellOrSvgText.innerHTML);
        const calculatePercentageOfTotal = ((rowSingleColumnNumber / columnTotal) *
            100).toFixed(2);
        (0, insertStringIntoCell_1.default)(targetedCellOrSvgText, calculatePercentageOfTotal, type);
    });
};


/***/ }),

/***/ "./src/helpers/insertStringIntoCell.ts":
/*!*********************************************!*\
  !*** ./src/helpers/insertStringIntoCell.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
exports["default"] = (cellOrText, val, type) => {
    if (type === constants_1.TABLE_TYPE.STANDARD_REPORTING) {
        const newElement = createSpanElement(val);
        cellOrText.insertBefore(newElement, cellOrText.firstChild);
    }
    else {
        const newElement = createSVGElement(cellOrText, val);
        cellOrText.insertAdjacentElement('afterend', newElement);
    }
};
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getReportingTable_1 = __importDefault(__webpack_require__(/*! ./getReportingTable */ "./src/helpers/getReportingTable.ts"));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/helpers/constants.ts");
exports["default"] = () => {
    const { type, element } = (0, getReportingTable_1.default)();
    console.log('got in removals');
    //if (type === TABLE_TYPE.CUSTOM_EXPLORATION) {
    const getAllExtensionChanges = element.querySelectorAll(`.${constants_1.CLASS_NAME_ALL_EXTENSION_CHANGES}`);
    console.log('getAllExtensionChanges: ', getAllExtensionChanges);
    getAllExtensionChanges.forEach(el => el.remove());
    console.log('removed all extension changes');
    //}
};


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2ZlYXR1cmVzL2FkZENlbGxQZXJjZW50YWdlcy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9jbGVhbnVwU3RyaW5nVG9OdW1iZXIudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFJlcG9ydGluZ1RhYmxlLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYmxlSGVhZGVycy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9nZXRUYWJsZVJvd3NBbmRJbnNlcnRQZXJjZW50YWdlc1RvQ2VsbHMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvaW5zZXJ0U3RyaW5nSW50b0NlbGwudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvcmVtb3ZlQ2VsbFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZENlbGxQZXJjZW50YWdlcyBmcm9tICcuL2ZlYXR1cmVzL2FkZENlbGxQZXJjZW50YWdlcyc7XG5pbXBvcnQgcmVtb3ZlQ2VsbFBlcmNlbnRhZ2VzIGZyb20gJy4vaGVscGVycy9yZW1vdmVDZWxsUGVyY2VudGFnZXMnO1xuXG5jb25zb2xlLmxvZygndXNhbyB1IGNvbnRlbnQnKTtcbi8vIHdlIHdhbnQgdG8gY2xlYW4gdXAgZmlyc3QgYmVmb3JlIGFkZGluZyBuZXcgb25lc1xucmVtb3ZlQ2VsbFBlcmNlbnRhZ2VzKCk7XG5hZGRDZWxsUGVyY2VudGFnZXMoKTtcbiIsImltcG9ydCBnZXRUYWJsZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9nZXRUYWJsZUhlYWRlcnMnO1xuaW1wb3J0IGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyBmcm9tICcuLi9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyc7XG5pbXBvcnQge1xuXHRDVVNUT01fUkVQT1JUX0hFQURFUlMsXG5cdENVU1RPTV9SRVBPUlRfUk9XUyxcblx0Q1VTVE9NX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyxcblx0U1RBTkRBUkRfUkVQT1JUX0hFQURFUlMsXG5cdFNUQU5EQVJEX1JFUE9SVF9ST1dTLFxuXHRTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMsXG5cdFRBQkxFX1RZUEUsXG59IGZyb20gJy4uL2hlbHBlcnMvY29uc3RhbnRzJztcbmltcG9ydCBnZXRSZXBvcnRpbmdUYWJsZSBmcm9tICcuLi9oZWxwZXJzL2dldFJlcG9ydGluZ1RhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuXHRjb25zdCB7IHR5cGUsIGVsZW1lbnQgfSA9IGdldFJlcG9ydGluZ1RhYmxlKCk7XG5cdGNvbnN0IGdldEFsbFRhYmxlSGVhZGVycyA9IEFycmF5LmZyb20oXG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHR5cGUgPT09IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HID8gU1RBTkRBUkRfUkVQT1JUX0hFQURFUlMgOiBDVVNUT01fUkVQT1JUX0hFQURFUlMpLFxuXHQpO1xuXHRjb25zdCBnZXRBbGxUYWJsZVJvd3MgPSBBcnJheS5mcm9tKFxuXHRcdGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSBUQUJMRV9UWVBFLlNUQU5EQVJEX1JFUE9SVElORyA/IFNUQU5EQVJEX1JFUE9SVF9ST1dTIDogQ1VTVE9NX1JFUE9SVF9ST1dTKSxcblx0KTtcblxuXHRnZXRBbGxUYWJsZUhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyOiBIVE1MRWxlbWVudCwgaSkgPT4ge1xuXHRcdGNvbnN0IHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMgPSBoZWFkZXIucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSBUQUJMRV9UWVBFLlNUQU5EQVJEX1JFUE9SVElORyA/IFNUQU5EQVJEX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyA6IENVU1RPTV9SRVBPUlRfU1VNTUFSWV9UT1RBTFMpO1xuXHRcdGNvbnN0IHsgaW5kZXg6IGNvbHVtbkluZGV4LCB0b3RhbDogY29sdW1uVG90YWwgfSA9IGdldFRhYmxlSGVhZGVycyh0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzLCBpKTtcblxuXHRcdGlmIChjb2x1bW5JbmRleCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtblRvdGFsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyhnZXRBbGxUYWJsZVJvd3MsIGNvbHVtbkluZGV4LCBjb2x1bW5Ub3RhbCwgdHlwZSk7XG5cdFx0XHRjb25zb2xlLmxvZygnYWRkZWQgbmV3IHBlcmNlbnRhZ2VzIHRvIGNlbGxzJyk7XG5cdFx0fVxuXHR9KTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoc3RyOiBzdHJpbmcpID0+IHtcblx0cmV0dXJuIE51bWJlcihzdHIucmVwbGFjZSgvWyQsPD4hLV0vZywgJycpKTsgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIG90aGVyIGN1cnJlbmNpZXNcbn07XG4iLCIvLyBtYWluXG5cbmV4cG9ydCBjb25zdCBDTEFTU19OQU1FX0FMTF9FWFRFTlNJT05fQ0hBTkdFUyA9ICdvcHRpbWl6ZXJzLWV4dGVuc2lvbic7XG5leHBvcnQgY29uc3QgU1ZHX1VSTF9QQVRIX0NVU1RPTV9FWFBMT1JBVElPTlMgPSAnL3Zlcm8vYXJyb3dfZG93bndhcmQuc3ZnJ1xuXG4vLyBwZXJjZW50YWdlcyBmZWF0dXJlXG5cbmV4cG9ydCBjb25zdCBDT0xVTU5TX0ZPUl9QRVJDRU5UQUdFUyA9ICclIG9mIHRvdGFsJztcblxuLy8vIHN0YW5kYXJkIHJlcG9ydHNcbmV4cG9ydCBlbnVtIFRBQkxFX1RZUEUge1xuXHRTVEFOREFSRF9SRVBPUlRJTkcgPSAnc3RhbmRhcmQnLFxuXHRDVVNUT01fRVhQTE9SQVRJT04gPSAnY3VzdG9tJyxcbn1cblxuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSA9ICdnYS1yZXBvcnRpbmctdGFibGUnO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9ST1dTID0gJ3Rib2R5IHRyJztcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRfSEVBREVSUyA9ICd0aGVhZCB0cltjbGFzcyo9XCJzdW1tYXJ5LXRvdGFsc1wiXSB0aCc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ2RpdltjbGFzcyo9XCJzdW1tYXJ5LXRleHRcIl0nO1xuXG4vLy8gY3VzdG9tIHJlcG9ydHNcbmV4cG9ydCBjb25zdCBDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUgPSAnYW5hbHlzaXMtY2FudmFzJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1JPV1MgPSAnc3ZnIGcuY2VsbDpub3QoW3Jvdy1pbmRleD1cIjBcIl0pJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX0hFQURFUlMgPSAnc3ZnIGcuY2VsbFtyb3ctaW5kZXg9XCIwXCJdJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ3RleHRbY2xhc3MqPVwicGVyY2VudC1vZi10b3RhbFwiXSc7XG4iLCJpbXBvcnQgeyBDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUsIFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSwgVEFCTEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuXHRjb25zdCBzdGFuZGFyZFJlcG9ydGluZ1RhYmxlID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU1RBTkRBUkRfUkVQT1JUSU5HX1RBQkxFKTtcblx0Y29uc3QgY3VzdG9tUmVwb3J0aW5nVGFibGUgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUpO1xuXG5cdGlmIChzdGFuZGFyZFJlcG9ydGluZ1RhYmxlKSByZXR1cm4geyAndHlwZSc6IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HLCAnZWxlbWVudCc6IHN0YW5kYXJkUmVwb3J0aW5nVGFibGUgfTtcblx0aWYgKGN1c3RvbVJlcG9ydGluZ1RhYmxlKSByZXR1cm4geyAndHlwZSc6IFRBQkxFX1RZUEUuQ1VTVE9NX0VYUExPUkFUSU9OLCAnZWxlbWVudCc6IGN1c3RvbVJlcG9ydGluZ1RhYmxlIH07XG5cblx0cmV0dXJuO1xufTtcbiIsImltcG9ydCBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgZnJvbSAnLi9jbGVhbnVwU3RyaW5nVG9OdW1iZXInO1xuaW1wb3J0IHsgQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+LCBpOiBudW1iZXIpID0+IHtcblx0bGV0IGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cdGxldCB0b3RhbDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG5cdHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMuZm9yRWFjaCgoaGVhZGVyU3VtbWFyeTogSFRNTEVsZW1lbnQpID0+IHtcblx0XHRpZiAoaGVhZGVyU3VtbWFyeS5pbm5lckhUTUwuaW5jbHVkZXMoQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMpKSB7XG5cdFx0XHRjb25zdCByZXR1cm5QcmV2aW91c1NpYmxpbmcgPVxuXHRcdFx0XHRoZWFkZXJTdW1tYXJ5LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0XHRjb25zdCBwcmV2aW91c1NpYmxpbmdWYWx1ZSA9IHJldHVyblByZXZpb3VzU2libGluZy5pbm5lckhUTUw7XG5cdFx0XHRjb25zdCBjb2x1bW5TaW5nbGVTdW1tYXJ5TnVtYmVyID1cblx0XHRcdFx0Y2xlYW51cFN0cmluZ1RvTnVtYmVyKHByZXZpb3VzU2libGluZ1ZhbHVlKTtcblx0XHRcdGluZGV4ID0gaTtcblx0XHRcdHRvdGFsID0gY29sdW1uU2luZ2xlU3VtbWFyeU51bWJlcjtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiB7IGluZGV4LCB0b3RhbCB9O1xufVxuIiwiaW1wb3J0IGNsZWFudXBTdHJpbmdUb051bWJlciBmcm9tICcuL2NsZWFudXBTdHJpbmdUb051bWJlcic7XG5pbXBvcnQgaW5zZXJ0U3RyaW5nSW50b0NlbGwgZnJvbSAnLi9pbnNlcnRTdHJpbmdJbnRvQ2VsbCc7XG5pbXBvcnQgeyBUQUJMRV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZ2V0QWxsVGFibGVSb3dzOiBFbGVtZW50W10sIGNvbHVtbkluZGV4OiBudW1iZXIsIGNvbHVtblRvdGFsOiBudW1iZXIsIHR5cGU6IHN0cmluZykgPT4ge1xuXHRjb25zdCBnZXRUYXJnZXRlZENlbGxPclN2Z1RleHQgPSAocm93OiBIVE1MRWxlbWVudCwgY29sdW1uSW5kZXg6IG51bWJlciwgdHlwZTogc3RyaW5nKSA9PiB7XG5cdFx0aWYgKHR5cGUgPT09IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HKSB7XG5cdFx0XHRyZXR1cm4gcm93LmNoaWxkcmVuW2NvbHVtbkluZGV4XSBhcyBIVE1MRWxlbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHJvdy5tYXRjaGVzKGBbY29sdW1uLWluZGV4PVwiJHtjb2x1bW5JbmRleH1cIl1gKSkge1xuXHRcdFx0XHRyZXR1cm4gcm93LnF1ZXJ5U2VsZWN0b3IoJ3RleHQnKSBhcyBTVkdUZXh0RWxlbWVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG5cblx0Z2V0QWxsVGFibGVSb3dzLmZvckVhY2goKHJvdzogSFRNTEVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB0YXJnZXRlZENlbGxPclN2Z1RleHQgPSBnZXRUYXJnZXRlZENlbGxPclN2Z1RleHQocm93LCBjb2x1bW5JbmRleCwgdHlwZSk7XG5cblx0XHRpZiAoIXRhcmdldGVkQ2VsbE9yU3ZnVGV4dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJvd1NpbmdsZUNvbHVtbk51bWJlciA9IGNsZWFudXBTdHJpbmdUb051bWJlcihcblx0XHRcdHRhcmdldGVkQ2VsbE9yU3ZnVGV4dC5pbm5lckhUTUwsXG5cdFx0KTtcblx0XHRjb25zdCBjYWxjdWxhdGVQZXJjZW50YWdlT2ZUb3RhbCA9IChcblx0XHRcdChyb3dTaW5nbGVDb2x1bW5OdW1iZXIgLyBjb2x1bW5Ub3RhbCkgKlxuXHRcdFx0MTAwXG5cdFx0KS50b0ZpeGVkKDIpO1xuXG5cdFx0aW5zZXJ0U3RyaW5nSW50b0NlbGwodGFyZ2V0ZWRDZWxsT3JTdmdUZXh0LCBjYWxjdWxhdGVQZXJjZW50YWdlT2ZUb3RhbCwgdHlwZSk7XG5cdH0pO1xufVxuXG4iLCJpbXBvcnQgeyBDTEFTU19OQU1FX0FMTF9FWFRFTlNJT05fQ0hBTkdFUywgVEFCTEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgKGNlbGxPclRleHQ6IEhUTUxFbGVtZW50IHwgU1ZHVGV4dEVsZW1lbnQsIHZhbDogc3RyaW5nLCB0eXBlOiBzdHJpbmcpID0+IHtcblx0aWYgKHR5cGUgPT09IFRBQkxFX1RZUEUuU1RBTkRBUkRfUkVQT1JUSU5HKSB7XG5cdFx0Y29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVNwYW5FbGVtZW50KHZhbCk7XG5cdFx0Y2VsbE9yVGV4dC5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgY2VsbE9yVGV4dC5maXJzdENoaWxkKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlU1ZHRWxlbWVudChjZWxsT3JUZXh0IGFzIFNWR1RleHRFbGVtZW50LCB2YWwpO1xuXHRcdGNlbGxPclRleHQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG5ld0VsZW1lbnQpO1xuXHR9XG59O1xuXG5jb25zdCBjcmVhdGVTcGFuRWxlbWVudCA9ICh2YWw6IHN0cmluZykgPT4ge1xuXHRjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZm9udC1zaXplOjEwcHg7IGZvbnQtc3R5bGU6aXRhbGljJyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIENMQVNTX05BTUVfQUxMX0VYVEVOU0lPTl9DSEFOR0VTKTtcblx0bmV3RWxlbWVudC5pbm5lclRleHQgPSBgKCR7dmFsfSUpYDtcblx0cmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVTVkdFbGVtZW50ID0gKGNlbGxPclRleHQ6IFNWR1RleHRFbGVtZW50LCB2YWw6IHN0cmluZykgPT4ge1xuXHRjb25zdCBlbGVtWCA9IGNlbGxPclRleHQuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnKTtcblx0Y29uc3QgZWxlbVkgPSBjZWxsT3JUZXh0LmdldEF0dHJpYnV0ZU5TKG51bGwsICd5Jyk7XG5cdGNlbGxPclRleHQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2R4JywgJy0zMCcpO1xuXG5cdGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3RleHQnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsIGVsZW1YKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsIGVsZW1ZKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3R5bGUnLCAnZm9udDogMTBweCBSb2JvdG8sIHNhbnMtc2VyaWY7Jyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2R4JywgJzEzJyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2R5JywgJy01Jyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgYGFsaWduLXJpZ2h0ICR7Q0xBU1NfTkFNRV9BTExfRVhURU5TSU9OX0NIQU5HRVN9YCk7XG5cdG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSBgKCR7dmFsfSUpYDtcblx0cmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG5cbiIsImltcG9ydCBnZXRSZXBvcnRpbmdUYWJsZSBmcm9tICcuL2dldFJlcG9ydGluZ1RhYmxlJztcbmltcG9ydCB7IENMQVNTX05BTUVfQUxMX0VYVEVOU0lPTl9DSEFOR0VTLCBUQUJMRV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cdGNvbnN0IHsgdHlwZSwgZWxlbWVudCB9ID0gZ2V0UmVwb3J0aW5nVGFibGUoKTtcblx0Y29uc29sZS5sb2coJ2dvdCBpbiByZW1vdmFscycpO1xuXHQvL2lmICh0eXBlID09PSBUQUJMRV9UWVBFLkNVU1RPTV9FWFBMT1JBVElPTikge1xuXHRjb25zdCBnZXRBbGxFeHRlbnNpb25DaGFuZ2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU19OQU1FX0FMTF9FWFRFTlNJT05fQ0hBTkdFU31gKTtcblx0Y29uc29sZS5sb2coJ2dldEFsbEV4dGVuc2lvbkNoYW5nZXM6ICcsIGdldEFsbEV4dGVuc2lvbkNoYW5nZXMpO1xuXHRnZXRBbGxFeHRlbnNpb25DaGFuZ2VzLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXHRjb25zb2xlLmxvZygncmVtb3ZlZCBhbGwgZXh0ZW5zaW9uIGNoYW5nZXMnKTtcblx0Ly99XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
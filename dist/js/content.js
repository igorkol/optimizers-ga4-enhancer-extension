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
exports["default"] = () => {
    const { type, element } = getReportingTable();
    const getAllTableHeaders = Array.from(element.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_HEADERS : constants_1.CUSTOM_REPORT_HEADERS));
    const getAllTableRows = Array.from(element.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_ROWS : constants_1.CUSTOM_REPORT_ROWS));
    getAllTableHeaders.forEach((header, i) => {
        const tableHeaderWithSummaryTotals = header.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_SUMMARY_TOTALS : constants_1.CUSTOM_REPORT_SUMMARY_TOTALS);
        const { index: columnIndex, total: columnTotal } = (0, getTableHeaders_1.default)(tableHeaderWithSummaryTotals, i);
        if (columnIndex !== undefined && columnTotal !== undefined) {
            (0, getTableRowsAndInsertPercentagesToCells_1.default)(getAllTableRows, columnIndex, columnTotal);
        }
    });
};
const getReportingTable = () => {
    const standardReportingTable = window.document.querySelector(constants_1.STANDARD_REPORTING_TABLE);
    const customReportingTable = window.document.querySelector(constants_1.CUSTOM_EXPLORATION_TABLE);
    if (standardReportingTable)
        return { 'type': 'standard', 'element': standardReportingTable };
    if (customReportingTable)
        return { 'type': 'custom', 'element': customReportingTable };
    return;
};


/***/ }),

/***/ "./src/helpers/cleanupStringToNumber.ts":
/*!**********************************************!*\
  !*** ./src/helpers/cleanupStringToNumber.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (str) => {
    return Number(str.replace(/[$,]/g, '')); // TODO: add support for other currencies
};


/***/ }),

/***/ "./src/helpers/constants.ts":
/*!**********************************!*\
  !*** ./src/helpers/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// percentages feature
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUSTOM_REPORT_SUMMARY_TOTALS = exports.CUSTOM_REPORT_HEADERS = exports.CUSTOM_REPORT_ROWS = exports.CUSTOM_EXPLORATION_TABLE = exports.STANDARD_REPORT_SUMMARY_TOTALS = exports.STANDARD_REPORT_HEADERS = exports.STANDARD_REPORT_ROWS = exports.STANDARD_REPORTING_TABLE = exports.COLUMNS_FOR_PERCENTAGES = void 0;
exports.COLUMNS_FOR_PERCENTAGES = '% of total';
/// standard reports
exports.STANDARD_REPORTING_TABLE = 'ga-reporting-table';
exports.STANDARD_REPORT_ROWS = 'tbody tr';
exports.STANDARD_REPORT_HEADERS = 'thead tr[class*="summary-totals"] th';
exports.STANDARD_REPORT_SUMMARY_TOTALS = 'div[class*="summary-text"]';
/// custom reports
exports.CUSTOM_EXPLORATION_TABLE = 'analysis-canvas';
exports.CUSTOM_REPORT_ROWS = 'analysis-canvas tbody tr';
exports.CUSTOM_REPORT_HEADERS = 'svg g.cell[row-index="0"]';
exports.CUSTOM_REPORT_SUMMARY_TOTALS = 'text[class*="percent-of-total"]';


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
exports["default"] = (getAllTableRows, columnIndex, columnTotal) => {
    getAllTableRows.forEach((row) => {
        const targetedCell = row.children[columnIndex];
        const rowSingleColumnNumber = (0, cleanupStringToNumber_1.default)(targetedCell.innerText);
        const calculatePercentageOfTotal = ((rowSingleColumnNumber / columnTotal) *
            100).toFixed(2);
        (0, insertStringIntoCell_1.default)(targetedCell, calculatePercentageOfTotal);
    });
};


/***/ }),

/***/ "./src/helpers/insertStringIntoCell.ts":
/*!*********************************************!*\
  !*** ./src/helpers/insertStringIntoCell.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (cell, val) => {
    const span = document.createElement('span');
    span.setAttribute('style', 'font-size:10px; font-style:italic');
    span.innerText = `(${val}%)`;
    cell.insertBefore(span, cell.firstChild);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxJQUFpQixFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ2hELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7SUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQzs7Ozs7OztVQ0xGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvY29udGVudC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvZmVhdHVyZXMvYWRkQ2VsbFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2NsZWFudXBTdHJpbmdUb051bWJlci50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9pbnNlcnRTdHJpbmdJbnRvQ2VsbC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRDZWxsUGVyY2VudGFnZXMgZnJvbSAnLi9mZWF0dXJlcy9hZGRDZWxsUGVyY2VudGFnZXMnO1xuXG5hZGRDZWxsUGVyY2VudGFnZXMoKTtcbiIsImltcG9ydCBnZXRUYWJsZUhlYWRlcnMgZnJvbSBcIi4uL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzXCI7XG5pbXBvcnQgZ2V0VGFibGVSb3dzQW5kSW5zZXJ0UGVyY2VudGFnZXNUb0NlbGxzIGZyb20gXCIuLi9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFOREFSRF9SRVBPUlRfSEVBREVSUyxcbiAgICBTVEFOREFSRF9SRVBPUlRfUk9XUywgQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFLFxuICAgIFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSxcbiAgICBTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMsIENVU1RPTV9SRVBPUlRfUk9XUywgQ1VTVE9NX1JFUE9SVF9IRUFERVJTLCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTXG59IGZyb20gXCIuLi9oZWxwZXJzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgY29uc3Qge3R5cGUsIGVsZW1lbnR9ID0gZ2V0UmVwb3J0aW5nVGFibGUoKTtcbiAgICBjb25zdCBnZXRBbGxUYWJsZUhlYWRlcnMgPSBBcnJheS5mcm9tKFxuICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSA9PT0gJ3N0YW5kYXJkJyA/IFNUQU5EQVJEX1JFUE9SVF9IRUFERVJTIDogQ1VTVE9NX1JFUE9SVF9IRUFERVJTKSxcbiAgICApO1xuICAgIGNvbnN0IGdldEFsbFRhYmxlUm93cyA9IEFycmF5LmZyb20oXG4gICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3RhbmRhcmQnID8gU1RBTkRBUkRfUkVQT1JUX1JPV1MgOiBDVVNUT01fUkVQT1JUX1JPV1MpLFxuICAgICk7XG5cbiAgICBnZXRBbGxUYWJsZUhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyOiBIVE1MRWxlbWVudCwgaSkgPT4ge1xuICAgICAgICBjb25zdCB0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSA9PT0gJ3N0YW5kYXJkJyA/IFNUQU5EQVJEX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyA6IENVU1RPTV9SRVBPUlRfU1VNTUFSWV9UT1RBTFMpO1xuICAgICAgICBjb25zdCB7aW5kZXg6IGNvbHVtbkluZGV4LCB0b3RhbDogY29sdW1uVG90YWx9ID0gZ2V0VGFibGVIZWFkZXJzKHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMsIGkpO1xuXG4gICAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtblRvdGFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyhnZXRBbGxUYWJsZVJvd3MsIGNvbHVtbkluZGV4LCBjb2x1bW5Ub3RhbClcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgZ2V0UmVwb3J0aW5nVGFibGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhbmRhcmRSZXBvcnRpbmdUYWJsZSA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSk7XG4gICAgY29uc3QgY3VzdG9tUmVwb3J0aW5nVGFibGUgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUpO1xuXG4gICAgaWYgKHN0YW5kYXJkUmVwb3J0aW5nVGFibGUpIHJldHVybiB7J3R5cGUnOiAnc3RhbmRhcmQnLCAnZWxlbWVudCc6IHN0YW5kYXJkUmVwb3J0aW5nVGFibGV9O1xuICAgIGlmIChjdXN0b21SZXBvcnRpbmdUYWJsZSkgcmV0dXJuIHsndHlwZSc6ICdjdXN0b20nLCAnZWxlbWVudCc6IGN1c3RvbVJlcG9ydGluZ1RhYmxlfTtcblxuICAgIHJldHVybjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChzdHI6IHN0cmluZykgPT4ge1xuICByZXR1cm4gTnVtYmVyKHN0ci5yZXBsYWNlKC9bJCxdL2csICcnKSk7IC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBvdGhlciBjdXJyZW5jaWVzXG59O1xuIiwiLy8gcGVyY2VudGFnZXMgZmVhdHVyZVxuXG5leHBvcnQgY29uc3QgQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMgPSAnJSBvZiB0b3RhbCc7XG5cbi8vLyBzdGFuZGFyZCByZXBvcnRzXG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUSU5HX1RBQkxFID0gJ2dhLXJlcG9ydGluZy10YWJsZSc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1JPV1MgPSAndGJvZHkgdHInO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9IRUFERVJTID0gJ3RoZWFkIHRyW2NsYXNzKj1cInN1bW1hcnktdG90YWxzXCJdIHRoJztcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMgPSAnZGl2W2NsYXNzKj1cInN1bW1hcnktdGV4dFwiXSc7XG5cbi8vLyBjdXN0b20gcmVwb3J0c1xuZXhwb3J0IGNvbnN0IENVU1RPTV9FWFBMT1JBVElPTl9UQUJMRSA9ICdhbmFseXNpcy1jYW52YXMnO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfUk9XUyA9ICdhbmFseXNpcy1jYW52YXMgdGJvZHkgdHInO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfSEVBREVSUyA9ICdzdmcgZy5jZWxsW3Jvdy1pbmRleD1cIjBcIl0nO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfU1VNTUFSWV9UT1RBTFMgPSAndGV4dFtjbGFzcyo9XCJwZXJjZW50LW9mLXRvdGFsXCJdJztcbiIsImltcG9ydCBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgZnJvbSBcIi4vY2xlYW51cFN0cmluZ1RvTnVtYmVyXCI7XG5pbXBvcnQge0NPTFVNTlNfRk9SX1BFUkNFTlRBR0VTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4sIGk6IG51bWJlcikgPT4ge1xuICAgIGxldCBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIGxldCB0b3RhbDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgdGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFscy5mb3JFYWNoKChoZWFkZXJTdW1tYXJ5OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoaGVhZGVyU3VtbWFyeS5pbm5lckhUTUwuaW5jbHVkZXMoQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMpKSB7XG4gICAgICAgICAgICBjb25zdCByZXR1cm5QcmV2aW91c1NpYmxpbmcgPVxuICAgICAgICAgICAgICAgIGhlYWRlclN1bW1hcnkucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzU2libGluZ1ZhbHVlID0gcmV0dXJuUHJldmlvdXNTaWJsaW5nLmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtblNpbmdsZVN1bW1hcnlOdW1iZXIgPVxuICAgICAgICAgICAgICAgIGNsZWFudXBTdHJpbmdUb051bWJlcihwcmV2aW91c1NpYmxpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB0b3RhbCA9IGNvbHVtblNpbmdsZVN1bW1hcnlOdW1iZXI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7aW5kZXgsIHRvdGFsfTtcbn1cbiIsImltcG9ydCBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgZnJvbSBcIi4vY2xlYW51cFN0cmluZ1RvTnVtYmVyXCI7XG5pbXBvcnQgaW5zZXJ0U3RyaW5nSW50b0NlbGwgZnJvbSBcIi4vaW5zZXJ0U3RyaW5nSW50b0NlbGxcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGdldEFsbFRhYmxlUm93czogRWxlbWVudFtdLCBjb2x1bW5JbmRleDogbnVtYmVyLCBjb2x1bW5Ub3RhbDogbnVtYmVyKSA9PiB7XG4gICAgZ2V0QWxsVGFibGVSb3dzLmZvckVhY2goKHJvdzogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ZWRDZWxsID0gcm93LmNoaWxkcmVuW2NvbHVtbkluZGV4XSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3Qgcm93U2luZ2xlQ29sdW1uTnVtYmVyID0gY2xlYW51cFN0cmluZ1RvTnVtYmVyKFxuICAgICAgICAgICAgdGFyZ2V0ZWRDZWxsLmlubmVyVGV4dCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlUGVyY2VudGFnZU9mVG90YWwgPSAoXG4gICAgICAgICAgICAocm93U2luZ2xlQ29sdW1uTnVtYmVyIC8gY29sdW1uVG90YWwpICpcbiAgICAgICAgICAgIDEwMFxuICAgICAgICApLnRvRml4ZWQoMik7XG4gICAgICAgIGluc2VydFN0cmluZ0ludG9DZWxsKHRhcmdldGVkQ2VsbCwgY2FsY3VsYXRlUGVyY2VudGFnZU9mVG90YWwpO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKGNlbGw6IEhUTUxFbGVtZW50LCB2YWw6IHN0cmluZykgPT4ge1xuICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZm9udC1zaXplOjEwcHg7IGZvbnQtc3R5bGU6aXRhbGljJyk7XG4gIHNwYW4uaW5uZXJUZXh0ID0gYCgke3ZhbH0lKWA7XG4gIGNlbGwuaW5zZXJ0QmVmb3JlKHNwYW4sIGNlbGwuZmlyc3RDaGlsZCk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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
    console.log(type, element);
    const getAllTableHeaders = Array.from(element.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_HEADERS : constants_1.CUSTOM_REPORT_HEADERS));
    const getAllTableRows = Array.from(element.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_ROWS : constants_1.CUSTOM_REPORT_ROWS));
    console.log('getAllTableHeaders', getAllTableHeaders);
    getAllTableHeaders.forEach((header, i) => {
        const tableHeaderWithSummaryTotals = header.querySelectorAll(type === 'standard' ? constants_1.STANDARD_REPORT_SUMMARY_TOTALS : constants_1.CUSTOM_REPORT_SUMMARY_TOTALS);
        console.log('header', header);
        console.log('tableHeaderWithSummaryTotals', tableHeaderWithSummaryTotals);
        const { index: columnIndex, total: columnTotal } = (0, getTableHeaders_1.default)(tableHeaderWithSummaryTotals, i, type);
        console.log('columnIndex, columnTotal', columnIndex, columnTotal);
        if (columnIndex !== undefined && columnTotal !== undefined) {
            (0, getTableRowsAndInsertPercentagesToCells_1.default)(getAllTableRows, columnIndex, columnTotal);
        }
    });
};
const getReportingTable = () => {
    console.log('usao');
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
exports["default"] = (tableHeaderWithSummaryTotals, i, type) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxHQUFnQixFQUFFLEVBQUU7UUFDekMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWdCLENBQUM7UUFDOUQsTUFBTSxxQkFBcUIsR0FBRyxtQ0FBcUIsRUFDL0MsWUFBWSxDQUFDLFNBQVMsQ0FDekIsQ0FBQztRQUNGLE1BQU0sMEJBQTBCLEdBQUcsQ0FDL0IsQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLENBQUM7WUFDckMsR0FBRyxDQUNOLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2Isa0NBQW9CLEVBQUMsWUFBWSxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDZkQscUJBQWUsQ0FBQyxJQUFpQixFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ2hELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7SUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQzs7Ozs7OztVQ0xGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvY29udGVudC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvZmVhdHVyZXMvYWRkQ2VsbFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2NsZWFudXBTdHJpbmdUb051bWJlci50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9pbnNlcnRTdHJpbmdJbnRvQ2VsbC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRDZWxsUGVyY2VudGFnZXMgZnJvbSAnLi9mZWF0dXJlcy9hZGRDZWxsUGVyY2VudGFnZXMnO1xuXG5hZGRDZWxsUGVyY2VudGFnZXMoKTtcbiIsImltcG9ydCBnZXRUYWJsZUhlYWRlcnMgZnJvbSBcIi4uL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzXCI7XG5pbXBvcnQgZ2V0VGFibGVSb3dzQW5kSW5zZXJ0UGVyY2VudGFnZXNUb0NlbGxzIGZyb20gXCIuLi9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFOREFSRF9SRVBPUlRfSEVBREVSUyxcbiAgICBTVEFOREFSRF9SRVBPUlRfUk9XUywgQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFLFxuICAgIFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSxcbiAgICBTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMsIENVU1RPTV9SRVBPUlRfUk9XUywgQ1VTVE9NX1JFUE9SVF9IRUFERVJTLCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTXG59IGZyb20gXCIuLi9oZWxwZXJzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgY29uc3Qge3R5cGUsIGVsZW1lbnR9ID0gZ2V0UmVwb3J0aW5nVGFibGUoKTtcbiAgICBjb25zb2xlLmxvZyh0eXBlLCBlbGVtZW50KTtcbiAgICBjb25zdCBnZXRBbGxUYWJsZUhlYWRlcnMgPSBBcnJheS5mcm9tKFxuICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSA9PT0gJ3N0YW5kYXJkJyA/IFNUQU5EQVJEX1JFUE9SVF9IRUFERVJTIDogQ1VTVE9NX1JFUE9SVF9IRUFERVJTKSxcbiAgICApO1xuICAgIGNvbnN0IGdldEFsbFRhYmxlUm93cyA9IEFycmF5LmZyb20oXG4gICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3RhbmRhcmQnID8gU1RBTkRBUkRfUkVQT1JUX1JPV1MgOiBDVVNUT01fUkVQT1JUX1JPV1MpLFxuICAgICk7XG5cbiAgICBjb25zb2xlLmxvZygnZ2V0QWxsVGFibGVIZWFkZXJzJywgZ2V0QWxsVGFibGVIZWFkZXJzKTtcblxuICAgIGdldEFsbFRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXI6IEhUTUxFbGVtZW50LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMgPSBoZWFkZXIucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3RhbmRhcmQnID8gU1RBTkRBUkRfUkVQT1JUX1NVTU1BUllfVE9UQUxTIDogQ1VTVE9NX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWFkZXInLCBoZWFkZXIpO1xuICAgICAgICBjb25zb2xlLmxvZygndGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFscycsIHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMpO1xuICAgICAgICBjb25zdCB7aW5kZXg6IGNvbHVtbkluZGV4LCB0b3RhbDogY29sdW1uVG90YWx9ID0gZ2V0VGFibGVIZWFkZXJzKHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHMsIGksIHR5cGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnY29sdW1uSW5kZXgsIGNvbHVtblRvdGFsJywgY29sdW1uSW5kZXgsIGNvbHVtblRvdGFsKTtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgJiYgY29sdW1uVG90YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZ2V0VGFibGVSb3dzQW5kSW5zZXJ0UGVyY2VudGFnZXNUb0NlbGxzKGdldEFsbFRhYmxlUm93cywgY29sdW1uSW5kZXgsIGNvbHVtblRvdGFsKVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBnZXRSZXBvcnRpbmdUYWJsZSA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygndXNhbycpO1xuICAgIGNvbnN0IHN0YW5kYXJkUmVwb3J0aW5nVGFibGUgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTVEFOREFSRF9SRVBPUlRJTkdfVEFCTEUpO1xuICAgIGNvbnN0IGN1c3RvbVJlcG9ydGluZ1RhYmxlID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFKTtcbiAgICBpZiAoc3RhbmRhcmRSZXBvcnRpbmdUYWJsZSkgcmV0dXJuIHsndHlwZSc6ICdzdGFuZGFyZCcsICdlbGVtZW50Jzogc3RhbmRhcmRSZXBvcnRpbmdUYWJsZX07XG4gICAgaWYgKGN1c3RvbVJlcG9ydGluZ1RhYmxlKSByZXR1cm4geyd0eXBlJzogJ2N1c3RvbScsICdlbGVtZW50JzogY3VzdG9tUmVwb3J0aW5nVGFibGV9O1xuICAgIHJldHVybjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChzdHI6IHN0cmluZykgPT4ge1xuICByZXR1cm4gTnVtYmVyKHN0ci5yZXBsYWNlKC9bJCxdL2csICcnKSk7IC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBvdGhlciBjdXJyZW5jaWVzXG59O1xuIiwiLy8gcGVyY2VudGFnZXMgZmVhdHVyZVxuXG5leHBvcnQgY29uc3QgQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMgPSAnJSBvZiB0b3RhbCc7XG5cbi8vLyBzdGFuZGFyZCByZXBvcnRzXG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUSU5HX1RBQkxFID0gJ2dhLXJlcG9ydGluZy10YWJsZSc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1JPV1MgPSAndGJvZHkgdHInO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9IRUFERVJTID0gJ3RoZWFkIHRyW2NsYXNzKj1cInN1bW1hcnktdG90YWxzXCJdIHRoJztcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMgPSAnZGl2W2NsYXNzKj1cInN1bW1hcnktdGV4dFwiXSc7XG5cbi8vLyBjdXN0b20gcmVwb3J0c1xuZXhwb3J0IGNvbnN0IENVU1RPTV9FWFBMT1JBVElPTl9UQUJMRSA9ICdhbmFseXNpcy1jYW52YXMnO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfUk9XUyA9ICdhbmFseXNpcy1jYW52YXMgdGJvZHkgdHInO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfSEVBREVSUyA9ICdzdmcgZy5jZWxsW3Jvdy1pbmRleD1cIjBcIl0nO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9SRVBPUlRfU1VNTUFSWV9UT1RBTFMgPSAndGV4dFtjbGFzcyo9XCJwZXJjZW50LW9mLXRvdGFsXCJdJztcbiIsImltcG9ydCBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgZnJvbSBcIi4vY2xlYW51cFN0cmluZ1RvTnVtYmVyXCI7XG5pbXBvcnQge0NPTFVNTlNfRk9SX1BFUkNFTlRBR0VTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKHRhYmxlSGVhZGVyV2l0aFN1bW1hcnlUb3RhbHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4sIGk6IG51bWJlciwgdHlwZTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgbGV0IHRvdGFsOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICB0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzLmZvckVhY2goKGhlYWRlclN1bW1hcnk6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChoZWFkZXJTdW1tYXJ5LmlubmVySFRNTC5pbmNsdWRlcyhDT0xVTU5TX0ZPUl9QRVJDRU5UQUdFUykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldHVyblByZXZpb3VzU2libGluZyA9XG4gICAgICAgICAgICAgICAgaGVhZGVyU3VtbWFyeS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNTaWJsaW5nVmFsdWUgPSByZXR1cm5QcmV2aW91c1NpYmxpbmcuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uU2luZ2xlU3VtbWFyeU51bWJlciA9XG4gICAgICAgICAgICAgICAgY2xlYW51cFN0cmluZ1RvTnVtYmVyKHByZXZpb3VzU2libGluZ1ZhbHVlKTtcbiAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIHRvdGFsID0gY29sdW1uU2luZ2xlU3VtbWFyeU51bWJlcjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtpbmRleCwgdG90YWx9O1xufVxuIiwiaW1wb3J0IGNsZWFudXBTdHJpbmdUb051bWJlciBmcm9tIFwiLi9jbGVhbnVwU3RyaW5nVG9OdW1iZXJcIjtcbmltcG9ydCBpbnNlcnRTdHJpbmdJbnRvQ2VsbCBmcm9tIFwiLi9pbnNlcnRTdHJpbmdJbnRvQ2VsbFwiO1xuXG5leHBvcnQgZGVmYXVsdCAoZ2V0QWxsVGFibGVSb3dzOiBFbGVtZW50W10sIGNvbHVtbkluZGV4OiBudW1iZXIsIGNvbHVtblRvdGFsOiBudW1iZXIpID0+IHtcbiAgICBnZXRBbGxUYWJsZVJvd3MuZm9yRWFjaCgocm93OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRlZENlbGwgPSByb3cuY2hpbGRyZW5bY29sdW1uSW5kZXhdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCByb3dTaW5nbGVDb2x1bW5OdW1iZXIgPSBjbGVhbnVwU3RyaW5nVG9OdW1iZXIoXG4gICAgICAgICAgICB0YXJnZXRlZENlbGwuaW5uZXJUZXh0LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVQZXJjZW50YWdlT2ZUb3RhbCA9IChcbiAgICAgICAgICAgIChyb3dTaW5nbGVDb2x1bW5OdW1iZXIgLyBjb2x1bW5Ub3RhbCkgKlxuICAgICAgICAgICAgMTAwXG4gICAgICAgICkudG9GaXhlZCgyKTtcbiAgICAgICAgaW5zZXJ0U3RyaW5nSW50b0NlbGwodGFyZ2V0ZWRDZWxsLCBjYWxjdWxhdGVQZXJjZW50YWdlT2ZUb3RhbCk7XG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoY2VsbDogSFRNTEVsZW1lbnQsIHZhbDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsICdmb250LXNpemU6MTBweDsgZm9udC1zdHlsZTppdGFsaWMnKTtcbiAgc3Bhbi5pbm5lclRleHQgPSBgKCR7dmFsfSUpYDtcbiAgY2VsbC5pbnNlcnRCZWZvcmUoc3BhbiwgY2VsbC5maXJzdENoaWxkKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
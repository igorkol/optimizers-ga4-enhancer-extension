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
            (0, getTableRowsAndInsertPercentagesToCells_1.default)(getAllTableRows, columnIndex, columnTotal, type);
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
    return Number(str.replace(/[$,<>!-]/g, '')); // TODO: add support for other currencies
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
exports.CUSTOM_REPORT_ROWS = 'svg g.cell:not([row-index="0"])';
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
exports["default"] = (getAllTableRows, columnIndex, columnTotal, type) => {
    const getTargetedCellOrSvgText = (row, columnIndex, type) => {
        if (type === 'standard') {
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (cellOrText, val, type) => {
    if (type === 'standard') {
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
    newElement.setAttribute('class', 'optimizers-extension');
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
    newElement.setAttributeNS(null, 'class', 'align-right optimizers-extension');
    newElement.textContent = `(${val}%)`;
    return newElement;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvY29udGVudC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvZmVhdHVyZXMvYWRkQ2VsbFBlcmNlbnRhZ2VzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2NsZWFudXBTdHJpbmdUb051bWJlci50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2hlbHBlcnMvZ2V0VGFibGVIZWFkZXJzLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9pbnNlcnRTdHJpbmdJbnRvQ2VsbC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRDZWxsUGVyY2VudGFnZXMgZnJvbSAnLi9mZWF0dXJlcy9hZGRDZWxsUGVyY2VudGFnZXMnO1xuXG5hZGRDZWxsUGVyY2VudGFnZXMoKTtcbiIsImltcG9ydCBnZXRUYWJsZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9nZXRUYWJsZUhlYWRlcnMnO1xuaW1wb3J0IGdldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyBmcm9tICcuLi9oZWxwZXJzL2dldFRhYmxlUm93c0FuZEluc2VydFBlcmNlbnRhZ2VzVG9DZWxscyc7XG5pbXBvcnQge1xuXHRTVEFOREFSRF9SRVBPUlRfSEVBREVSUyxcblx0U1RBTkRBUkRfUkVQT1JUX1JPV1MsIENVU1RPTV9FWFBMT1JBVElPTl9UQUJMRSxcblx0U1RBTkRBUkRfUkVQT1JUSU5HX1RBQkxFLFxuXHRTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMsIENVU1RPTV9SRVBPUlRfUk9XUywgQ1VTVE9NX1JFUE9SVF9IRUFERVJTLCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTLFxufSBmcm9tICcuLi9oZWxwZXJzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblx0Y29uc3QgeyB0eXBlLCBlbGVtZW50IH0gPSBnZXRSZXBvcnRpbmdUYWJsZSgpO1xuXHRjb25zdCBnZXRBbGxUYWJsZUhlYWRlcnMgPSBBcnJheS5mcm9tKFxuXHRcdGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3RhbmRhcmQnID8gU1RBTkRBUkRfUkVQT1JUX0hFQURFUlMgOiBDVVNUT01fUkVQT1JUX0hFQURFUlMpLFxuXHQpO1xuXHRjb25zdCBnZXRBbGxUYWJsZVJvd3MgPSBBcnJheS5mcm9tKFxuXHRcdGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3RhbmRhcmQnID8gU1RBTkRBUkRfUkVQT1JUX1JPV1MgOiBDVVNUT01fUkVQT1JUX1JPV1MpLFxuXHQpO1xuXG5cdGdldEFsbFRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXI6IEhUTUxFbGVtZW50LCBpKSA9PiB7XG5cdFx0Y29uc3QgdGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFscyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKHR5cGUgPT09ICdzdGFuZGFyZCcgPyBTVEFOREFSRF9SRVBPUlRfU1VNTUFSWV9UT1RBTFMgOiBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTKTtcblx0XHRjb25zdCB7IGluZGV4OiBjb2x1bW5JbmRleCwgdG90YWw6IGNvbHVtblRvdGFsIH0gPSBnZXRUYWJsZUhlYWRlcnModGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFscywgaSk7XG5cblx0XHRpZiAoY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCAmJiBjb2x1bW5Ub3RhbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRnZXRUYWJsZVJvd3NBbmRJbnNlcnRQZXJjZW50YWdlc1RvQ2VsbHMoZ2V0QWxsVGFibGVSb3dzLCBjb2x1bW5JbmRleCwgY29sdW1uVG90YWwsIHR5cGUpO1xuXHRcdH1cblx0fSk7XG59O1xuXG5jb25zdCBnZXRSZXBvcnRpbmdUYWJsZSA9ICgpID0+IHtcblx0Y29uc3Qgc3RhbmRhcmRSZXBvcnRpbmdUYWJsZSA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSk7XG5cdGNvbnN0IGN1c3RvbVJlcG9ydGluZ1RhYmxlID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFKTtcblxuXHRpZiAoc3RhbmRhcmRSZXBvcnRpbmdUYWJsZSkgcmV0dXJuIHsgJ3R5cGUnOiAnc3RhbmRhcmQnLCAnZWxlbWVudCc6IHN0YW5kYXJkUmVwb3J0aW5nVGFibGUgfTtcblx0aWYgKGN1c3RvbVJlcG9ydGluZ1RhYmxlKSByZXR1cm4geyAndHlwZSc6ICdjdXN0b20nLCAnZWxlbWVudCc6IGN1c3RvbVJlcG9ydGluZ1RhYmxlIH07XG5cblx0cmV0dXJuO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IChzdHI6IHN0cmluZykgPT4ge1xuXHRyZXR1cm4gTnVtYmVyKHN0ci5yZXBsYWNlKC9bJCw8PiEtXS9nLCAnJykpOyAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3Igb3RoZXIgY3VycmVuY2llc1xufTtcbiIsIi8vIHBlcmNlbnRhZ2VzIGZlYXR1cmVcblxuZXhwb3J0IGNvbnN0IENPTFVNTlNfRk9SX1BFUkNFTlRBR0VTID0gJyUgb2YgdG90YWwnO1xuXG4vLy8gc3RhbmRhcmQgcmVwb3J0c1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVElOR19UQUJMRSA9ICdnYS1yZXBvcnRpbmctdGFibGUnO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9ST1dTID0gJ3Rib2R5IHRyJztcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRfSEVBREVSUyA9ICd0aGVhZCB0cltjbGFzcyo9XCJzdW1tYXJ5LXRvdGFsc1wiXSB0aCc7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ2RpdltjbGFzcyo9XCJzdW1tYXJ5LXRleHRcIl0nO1xuXG4vLy8gY3VzdG9tIHJlcG9ydHNcbmV4cG9ydCBjb25zdCBDVVNUT01fRVhQTE9SQVRJT05fVEFCTEUgPSAnYW5hbHlzaXMtY2FudmFzJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1JPV1MgPSAnc3ZnIGcuY2VsbDpub3QoW3Jvdy1pbmRleD1cIjBcIl0pJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX0hFQURFUlMgPSAnc3ZnIGcuY2VsbFtyb3ctaW5kZXg9XCIwXCJdJztcbmV4cG9ydCBjb25zdCBDVVNUT01fUkVQT1JUX1NVTU1BUllfVE9UQUxTID0gJ3RleHRbY2xhc3MqPVwicGVyY2VudC1vZi10b3RhbFwiXSc7XG4iLCJpbXBvcnQgY2xlYW51cFN0cmluZ1RvTnVtYmVyIGZyb20gJy4vY2xlYW51cFN0cmluZ1RvTnVtYmVyJztcbmltcG9ydCB7IENPTFVNTlNfRk9SX1BFUkNFTlRBR0VTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCAodGFibGVIZWFkZXJXaXRoU3VtbWFyeVRvdGFsczogTm9kZUxpc3RPZjxFbGVtZW50PiwgaTogbnVtYmVyKSA9PiB7XG5cdGxldCBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXHRsZXQgdG90YWw6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHR0YWJsZUhlYWRlcldpdGhTdW1tYXJ5VG90YWxzLmZvckVhY2goKGhlYWRlclN1bW1hcnk6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGhlYWRlclN1bW1hcnkuaW5uZXJIVE1MLmluY2x1ZGVzKENPTFVNTlNfRk9SX1BFUkNFTlRBR0VTKSkge1xuXHRcdFx0Y29uc3QgcmV0dXJuUHJldmlvdXNTaWJsaW5nID1cblx0XHRcdFx0aGVhZGVyU3VtbWFyeS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0Y29uc3QgcHJldmlvdXNTaWJsaW5nVmFsdWUgPSByZXR1cm5QcmV2aW91c1NpYmxpbmcuaW5uZXJIVE1MO1xuXHRcdFx0Y29uc3QgY29sdW1uU2luZ2xlU3VtbWFyeU51bWJlciA9XG5cdFx0XHRcdGNsZWFudXBTdHJpbmdUb051bWJlcihwcmV2aW91c1NpYmxpbmdWYWx1ZSk7XG5cdFx0XHRpbmRleCA9IGk7XG5cdFx0XHR0b3RhbCA9IGNvbHVtblNpbmdsZVN1bW1hcnlOdW1iZXI7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4geyBpbmRleCwgdG90YWwgfTtcbn1cbiIsImltcG9ydCBjbGVhbnVwU3RyaW5nVG9OdW1iZXIgZnJvbSAnLi9jbGVhbnVwU3RyaW5nVG9OdW1iZXInO1xuaW1wb3J0IGluc2VydFN0cmluZ0ludG9DZWxsIGZyb20gJy4vaW5zZXJ0U3RyaW5nSW50b0NlbGwnO1xuXG5leHBvcnQgZGVmYXVsdCAoZ2V0QWxsVGFibGVSb3dzOiBFbGVtZW50W10sIGNvbHVtbkluZGV4OiBudW1iZXIsIGNvbHVtblRvdGFsOiBudW1iZXIsIHR5cGU6IHN0cmluZykgPT4ge1xuXHRjb25zdCBnZXRUYXJnZXRlZENlbGxPclN2Z1RleHQgPSAocm93OiBIVE1MRWxlbWVudCwgY29sdW1uSW5kZXg6IG51bWJlciwgdHlwZTogc3RyaW5nKSA9PiB7XG5cdFx0aWYgKHR5cGUgPT09ICdzdGFuZGFyZCcpIHtcblx0XHRcdHJldHVybiByb3cuY2hpbGRyZW5bY29sdW1uSW5kZXhdIGFzIEhUTUxFbGVtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocm93Lm1hdGNoZXMoYFtjb2x1bW4taW5kZXg9XCIke2NvbHVtbkluZGV4fVwiXWApKSB7XG5cdFx0XHRcdHJldHVybiByb3cucXVlcnlTZWxlY3RvcigndGV4dCcpIGFzIFNWR1RleHRFbGVtZW50O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcblxuXHRnZXRBbGxUYWJsZVJvd3MuZm9yRWFjaCgocm93OiBIVE1MRWxlbWVudCkgPT4ge1xuXHRcdGNvbnN0IHRhcmdldGVkQ2VsbE9yU3ZnVGV4dCA9IGdldFRhcmdldGVkQ2VsbE9yU3ZnVGV4dChyb3csIGNvbHVtbkluZGV4LCB0eXBlKTtcblxuXHRcdGlmICghdGFyZ2V0ZWRDZWxsT3JTdmdUZXh0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qgcm93U2luZ2xlQ29sdW1uTnVtYmVyID0gY2xlYW51cFN0cmluZ1RvTnVtYmVyKFxuXHRcdFx0dGFyZ2V0ZWRDZWxsT3JTdmdUZXh0LmlubmVySFRNTCxcblx0XHQpO1xuXHRcdGNvbnN0IGNhbGN1bGF0ZVBlcmNlbnRhZ2VPZlRvdGFsID0gKFxuXHRcdFx0KHJvd1NpbmdsZUNvbHVtbk51bWJlciAvIGNvbHVtblRvdGFsKSAqXG5cdFx0XHQxMDBcblx0XHQpLnRvRml4ZWQoMik7XG5cblx0XHRpbnNlcnRTdHJpbmdJbnRvQ2VsbCh0YXJnZXRlZENlbGxPclN2Z1RleHQsIGNhbGN1bGF0ZVBlcmNlbnRhZ2VPZlRvdGFsLCB0eXBlKTtcblx0fSk7XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IChjZWxsT3JUZXh0OiBIVE1MRWxlbWVudCB8IFNWR1RleHRFbGVtZW50LCB2YWw6IHN0cmluZywgdHlwZTogc3RyaW5nKSA9PiB7XG5cdGlmICh0eXBlID09PSAnc3RhbmRhcmQnKSB7XG5cdFx0Y29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVNwYW5FbGVtZW50KHZhbCk7XG5cdFx0Y2VsbE9yVGV4dC5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgY2VsbE9yVGV4dC5maXJzdENoaWxkKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlU1ZHRWxlbWVudChjZWxsT3JUZXh0IGFzIFNWR1RleHRFbGVtZW50LCB2YWwpO1xuXHRcdGNlbGxPclRleHQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG5ld0VsZW1lbnQpO1xuXHR9XG59O1xuXG5jb25zdCBjcmVhdGVTcGFuRWxlbWVudCA9ICh2YWw6IHN0cmluZykgPT4ge1xuXHRjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZm9udC1zaXplOjEwcHg7IGZvbnQtc3R5bGU6aXRhbGljJyk7XG5cdG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcHRpbWl6ZXJzLWV4dGVuc2lvbicpO1xuXHRuZXdFbGVtZW50LmlubmVyVGV4dCA9IGAoJHt2YWx9JSlgO1xuXHRyZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZVNWR0VsZW1lbnQgPSAoY2VsbE9yVGV4dDogU1ZHVGV4dEVsZW1lbnQsIHZhbDogc3RyaW5nKSA9PiB7XG5cdGNvbnN0IGVsZW1YID0gY2VsbE9yVGV4dC5nZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcpO1xuXHRjb25zdCBlbGVtWSA9IGNlbGxPclRleHQuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ3knKTtcblx0Y2VsbE9yVGV4dC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHgnLCAnLTMwJyk7XG5cblx0Y29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAndGV4dCcpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgZWxlbVgpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgZWxlbVkpO1xuXHRuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdHlsZScsICdmb250OiAxMHB4IFJvYm90bywgc2Fucy1zZXJpZjsnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHgnLCAnMTMnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHknLCAnLTUnKTtcblx0bmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCAnYWxpZ24tcmlnaHQgb3B0aW1pemVycy1leHRlbnNpb24nKTtcblx0bmV3RWxlbWVudC50ZXh0Q29udGVudCA9IGAoJHt2YWx9JSlgO1xuXHRyZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
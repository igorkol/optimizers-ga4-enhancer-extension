/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/helpers/getTabId.ts":
/*!*********************************!*\
  !*** ./src/helpers/getTabId.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTabId = void 0;
const getTabId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('tabs', tabs);
    return tabs.length > 0 ? tabs[0].id : null;
};
exports.getTabId = getTabId;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const getTabId_1 = __webpack_require__(/*! ./helpers/getTabId */ "./src/helpers/getTabId.ts");
const constants_1 = __webpack_require__(/*! ./helpers/constants */ "./src/helpers/constants.ts");
chrome.runtime.onInstalled.addListener(async () => {
    const old = await chrome.scripting.getRegisteredContentScripts();
    if (old[0])
        await chrome.scripting.unregisterContentScripts({
            ids: old.map(s => s.id),
        });
    await chrome.scripting.registerContentScripts([
        {
            id: 'content',
            world: 'MAIN',
            js: ['js/content.js'],
            matches: ['<all_urls>'],
        },
    ]);
});
const execScript = async () => {
    const tabId = await (0, getTabId_1.getTabId)();
    await chrome.scripting.executeScript({
        target: { tabId },
        files: ['js/content.js'],
    });
};
// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(request => {
    // onMessage must return "true" if response is async.
    const isResponseAsync = false;
    if (request.popupMounted) {
        execScript();
    }
    return isResponseAsync;
});
// Listen to calls for SVG content in network requests.
chrome.webRequest.onBeforeRequest.addListener(details => {
    console.log('onBeforeRequest', details);
    if (details.method === 'GET' && details.url.endsWith(constants_1.SVG_URL_PATH_CUSTOM_EXPLORATIONS)) {
        // setting timer to wait for 2s before executing script
        setTimeout(execScript, 2000);
    }
}, { urls: ['<all_urls>'] }, ['requestBody']);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztJQUU5QixJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDekIsVUFBVSxFQUFFLENBQUM7S0FDYjtJQUVELE9BQU8sZUFBZSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsdURBQXVEO0FBQ3ZELE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsNENBQWdDLENBQUMsRUFBRTtRQUN2Rix1REFBdUQ7UUFDdkQsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3QjtBQUNGLENBQUMsRUFDRCxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQ3hCLENBQUMsYUFBYSxDQUFDLENBQ2YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9nZXRUYWJJZC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbWFpblxuXG5leHBvcnQgY29uc3QgQ0xBU1NfTkFNRV9BTExfRVhURU5TSU9OX0NIQU5HRVMgPSAnb3B0aW1pemVycy1leHRlbnNpb24nO1xuZXhwb3J0IGNvbnN0IFNWR19VUkxfUEFUSF9DVVNUT01fRVhQTE9SQVRJT05TID0gJy92ZXJvL2Fycm93X2Rvd253YXJkLnN2ZydcblxuLy8gcGVyY2VudGFnZXMgZmVhdHVyZVxuXG5leHBvcnQgY29uc3QgQ09MVU1OU19GT1JfUEVSQ0VOVEFHRVMgPSAnJSBvZiB0b3RhbCc7XG5cbi8vLyBzdGFuZGFyZCByZXBvcnRzXG5leHBvcnQgZW51bSBUQUJMRV9UWVBFIHtcblx0U1RBTkRBUkRfUkVQT1JUSU5HID0gJ3N0YW5kYXJkJyxcblx0Q1VTVE9NX0VYUExPUkFUSU9OID0gJ2N1c3RvbScsXG59XG5cbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRJTkdfVEFCTEUgPSAnZ2EtcmVwb3J0aW5nLXRhYmxlJztcbmV4cG9ydCBjb25zdCBTVEFOREFSRF9SRVBPUlRfUk9XUyA9ICd0Ym9keSB0cic7XG5leHBvcnQgY29uc3QgU1RBTkRBUkRfUkVQT1JUX0hFQURFUlMgPSAndGhlYWQgdHJbY2xhc3MqPVwic3VtbWFyeS10b3RhbHNcIl0gdGgnO1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyA9ICdkaXZbY2xhc3MqPVwic3VtbWFyeS10ZXh0XCJdJztcblxuLy8vIGN1c3RvbSByZXBvcnRzXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VYUExPUkFUSU9OX1RBQkxFID0gJ2FuYWx5c2lzLWNhbnZhcyc7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1JFUE9SVF9ST1dTID0gJ3N2ZyBnLmNlbGw6bm90KFtyb3ctaW5kZXg9XCIwXCJdKSc7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1JFUE9SVF9IRUFERVJTID0gJ3N2ZyBnLmNlbGxbcm93LWluZGV4PVwiMFwiXSc7XG5leHBvcnQgY29uc3QgQ1VTVE9NX1JFUE9SVF9TVU1NQVJZX1RPVEFMUyA9ICd0ZXh0W2NsYXNzKj1cInBlcmNlbnQtb2YtdG90YWxcIl0nO1xuIiwiZXhwb3J0IGNvbnN0IGdldFRhYklkID0gYXN5bmMgKCkgPT4ge1xuXHRjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7XG5cdGNvbnNvbGUubG9nKCd0YWJzJywgdGFicyk7XG5cdHJldHVybiB0YWJzLmxlbmd0aCA+IDAgPyB0YWJzWzBdLmlkIDogbnVsbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgZ2V0VGFiSWQgfSBmcm9tICcuL2hlbHBlcnMvZ2V0VGFiSWQnO1xuaW1wb3J0IHsgU1ZHX1VSTF9QQVRIX0NVU1RPTV9FWFBMT1JBVElPTlMgfSBmcm9tICcuL2hlbHBlcnMvY29uc3RhbnRzJztcblxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoYXN5bmMgKCkgPT4ge1xuXHRjb25zdCBvbGQgPSBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmdldFJlZ2lzdGVyZWRDb250ZW50U2NyaXB0cygpO1xuXHRpZiAob2xkWzBdKVxuXHRcdGF3YWl0IGNocm9tZS5zY3JpcHRpbmcudW5yZWdpc3RlckNvbnRlbnRTY3JpcHRzKHtcblx0XHRcdGlkczogb2xkLm1hcChzID0+IHMuaWQpLFxuXHRcdH0pO1xuXHRhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLnJlZ2lzdGVyQ29udGVudFNjcmlwdHMoW1xuXHRcdHtcblx0XHRcdGlkOiAnY29udGVudCcsXG5cdFx0XHR3b3JsZDogJ01BSU4nLFxuXHRcdFx0anM6IFsnanMvY29udGVudC5qcyddLFxuXHRcdFx0bWF0Y2hlczogWyc8YWxsX3VybHM+J10sXG5cdFx0fSxcblx0XSk7XG59KTtcblxuY29uc3QgZXhlY1NjcmlwdCA9IGFzeW5jICgpID0+IHtcblx0Y29uc3QgdGFiSWQgPSBhd2FpdCBnZXRUYWJJZCgpO1xuXHRhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuXHRcdHRhcmdldDogeyB0YWJJZCB9LFxuXHRcdGZpbGVzOiBbJ2pzL2NvbnRlbnQuanMnXSxcblx0fSk7XG59O1xuXG4vLyBMaXN0ZW4gdG8gbWVzc2FnZXMgc2VudCBmcm9tIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24uXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIocmVxdWVzdCA9PiB7XG5cdC8vIG9uTWVzc2FnZSBtdXN0IHJldHVybiBcInRydWVcIiBpZiByZXNwb25zZSBpcyBhc3luYy5cblx0Y29uc3QgaXNSZXNwb25zZUFzeW5jID0gZmFsc2U7XG5cblx0aWYgKHJlcXVlc3QucG9wdXBNb3VudGVkKSB7XG5cdFx0ZXhlY1NjcmlwdCgpO1xuXHR9XG5cblx0cmV0dXJuIGlzUmVzcG9uc2VBc3luYztcbn0pO1xuXG4vLyBMaXN0ZW4gdG8gY2FsbHMgZm9yIFNWRyBjb250ZW50IGluIG5ldHdvcmsgcmVxdWVzdHMuXG5jaHJvbWUud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIoZGV0YWlscyA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ29uQmVmb3JlUmVxdWVzdCcsIGRldGFpbHMpO1xuXHRcdGlmIChkZXRhaWxzLm1ldGhvZCA9PT0gJ0dFVCcgJiYgZGV0YWlscy51cmwuZW5kc1dpdGgoU1ZHX1VSTF9QQVRIX0NVU1RPTV9FWFBMT1JBVElPTlMpKSB7XG5cdFx0XHQvLyBzZXR0aW5nIHRpbWVyIHRvIHdhaXQgZm9yIDJzIGJlZm9yZSBleGVjdXRpbmcgc2NyaXB0XG5cdFx0XHRzZXRUaW1lb3V0KGV4ZWNTY3JpcHQsIDIwMDApO1xuXHRcdH1cblx0fSxcblx0eyB1cmxzOiBbJzxhbGxfdXJscz4nXSB9LFxuXHRbJ3JlcXVlc3RCb2R5J10sXG4pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
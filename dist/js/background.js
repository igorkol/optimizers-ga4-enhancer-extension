/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(request => {
    // onMessage must return "true" if response is async.
    const isResponseAsync = false;
    if (request.popupMounted) {
        execScript();
    }
    return isResponseAsync;
});
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
/*const execScript = async () => {
  const tabId = await getTabId();
  console.log(tabId);
  await chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['features/getDates.js']
  })
}

chrome.action.onClicked.addListener(execScript);*/

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDbEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUpXLGdCQUFRLFlBSW5COzs7Ozs7O1VDSkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLDhGQUE4QztBQUU5Qyw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzlDLHFEQUFxRDtJQUNyRCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFFOUIsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQ3pCLFVBQVUsRUFBRSxDQUFDO0tBQ2I7SUFFRCxPQUFPLGVBQWUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNqRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUNqRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7WUFDL0MsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztJQUNKLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQztRQUM3QztZQUNDLEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFLE1BQU07WUFDYixFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDckIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQ3ZCO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxLQUFLLElBQUksRUFBRTtJQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFRLEdBQUUsQ0FBQztJQUMvQixNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtRQUNqQixLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7OztrREFTa0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvaGVscGVycy9nZXRUYWJJZC50cyIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3B0aW1pemVycy1nYTQtZW5oYW5jZXItZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldFRhYklkID0gYXN5bmMgKCkgPT4ge1xuXHRjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7XG5cdGNvbnNvbGUubG9nKCd0YWJzJywgdGFicyk7XG5cdHJldHVybiB0YWJzLmxlbmd0aCA+IDAgPyB0YWJzWzBdLmlkIDogbnVsbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgZ2V0VGFiSWQgfSBmcm9tICcuL2hlbHBlcnMvZ2V0VGFiSWQnO1xuXG4vLyBMaXN0ZW4gdG8gbWVzc2FnZXMgc2VudCBmcm9tIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24uXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIocmVxdWVzdCA9PiB7XG5cdC8vIG9uTWVzc2FnZSBtdXN0IHJldHVybiBcInRydWVcIiBpZiByZXNwb25zZSBpcyBhc3luYy5cblx0Y29uc3QgaXNSZXNwb25zZUFzeW5jID0gZmFsc2U7XG5cblx0aWYgKHJlcXVlc3QucG9wdXBNb3VudGVkKSB7XG5cdFx0ZXhlY1NjcmlwdCgpO1xuXHR9XG5cblx0cmV0dXJuIGlzUmVzcG9uc2VBc3luYztcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG5cdGNvbnN0IG9sZCA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZ2V0UmVnaXN0ZXJlZENvbnRlbnRTY3JpcHRzKCk7XG5cdGlmIChvbGRbMF0pXG5cdFx0YXdhaXQgY2hyb21lLnNjcmlwdGluZy51bnJlZ2lzdGVyQ29udGVudFNjcmlwdHMoe1xuXHRcdFx0aWRzOiBvbGQubWFwKHMgPT4gcy5pZCksXG5cdFx0fSk7XG5cdGF3YWl0IGNocm9tZS5zY3JpcHRpbmcucmVnaXN0ZXJDb250ZW50U2NyaXB0cyhbXG5cdFx0e1xuXHRcdFx0aWQ6ICdjb250ZW50Jyxcblx0XHRcdHdvcmxkOiAnTUFJTicsXG5cdFx0XHRqczogWydqcy9jb250ZW50LmpzJ10sXG5cdFx0XHRtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcblx0XHR9LFxuXHRdKTtcbn0pO1xuXG5jb25zdCBleGVjU2NyaXB0ID0gYXN5bmMgKCkgPT4ge1xuXHRjb25zdCB0YWJJZCA9IGF3YWl0IGdldFRhYklkKCk7XG5cdGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG5cdFx0dGFyZ2V0OiB7IHRhYklkIH0sXG5cdFx0ZmlsZXM6IFsnanMvY29udGVudC5qcyddLFxuXHR9KTtcbn07XG5cbi8qY29uc3QgZXhlY1NjcmlwdCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgdGFiSWQgPSBhd2FpdCBnZXRUYWJJZCgpO1xuICBjb25zb2xlLmxvZyh0YWJJZCk7XG4gIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgdGFyZ2V0OiB7dGFiSWQ6IHRhYklkfSxcbiAgICBmaWxlczogWydmZWF0dXJlcy9nZXREYXRlcy5qcyddXG4gIH0pXG59XG5cbmNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGV4ZWNTY3JpcHQpOyovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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
    // const tabsall = chrome.tabs;
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('tabs', tabs);
    // console.log('tabs all', tabsall);
    return tabs.length > 0 ? tabs[0].id : null;
};
exports.getTabId = getTabId;
/*export const getTabId = async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    console.log('tab', tab);
    return tab?.id;
};*/


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
chrome.runtime.onInstalled.addListener(async () => {
    const old = await chrome.scripting.getRegisteredContentScripts();
    if (old[0])
        await chrome.scripting.unregisterContentScripts({
            ids: old.map((s) => s.id),
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
chrome.runtime.onMessage.addListener((request) => {
    // onMessage must return "true" if response is async.
    const isResponseAsync = false;
    if (request.popupMounted) {
        execScript();
    }
    return isResponseAsync;
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDbEMsK0JBQStCO0lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLG9DQUFvQztJQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDNUMsQ0FBQyxDQUFDO0FBTlcsZ0JBQVEsWUFNbkI7QUFFRjs7OztJQUlJOzs7Ozs7O1VDWko7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLDhGQUE4QztBQUU5QyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDakQsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDakUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDO1lBQy9DLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3pCLENBQUMsQ0FBQztJQUNKLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQztRQUM3QztZQUNDLEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFLE1BQU07WUFDYixFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDckIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQ3ZCO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxLQUFLLElBQUksRUFBRTtJQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFRLEdBQUUsQ0FBQztJQUMvQixNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtRQUNqQixLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsNkRBQTZEO0FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ2hELHFEQUFxRDtJQUNyRCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFFOUIsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQ3pCLFVBQVUsRUFBRSxDQUFDO0tBQ2I7SUFFRCxPQUFPLGVBQWUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi8uL3NyYy9oZWxwZXJzL2dldFRhYklkLnRzIiwid2VicGFjazovL29wdGltaXplcnMtZ2E0LWVuaGFuY2VyLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcHRpbWl6ZXJzLWdhNC1lbmhhbmNlci1leHRlbnNpb24vLi9zcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0VGFiSWQgPSBhc3luYyAoKSA9PiB7XG5cdC8vIGNvbnN0IHRhYnNhbGwgPSBjaHJvbWUudGFicztcblx0Y29uc3QgdGFicyA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0pO1xuXHRjb25zb2xlLmxvZygndGFicycsIHRhYnMpO1xuXHQvLyBjb25zb2xlLmxvZygndGFicyBhbGwnLCB0YWJzYWxsKTtcblx0cmV0dXJuIHRhYnMubGVuZ3RoID4gMCA/IHRhYnNbMF0uaWQgOiBudWxsO1xufTtcblxuLypleHBvcnQgY29uc3QgZ2V0VGFiSWQgPSBhc3luYyAoKSA9PiB7XG5cdGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGxhc3RGb2N1c2VkV2luZG93OiB0cnVlIH0pO1xuXHRjb25zb2xlLmxvZygndGFiJywgdGFiKTtcblx0cmV0dXJuIHRhYj8uaWQ7XG59OyovXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgZ2V0VGFiSWQgfSBmcm9tICcuL2hlbHBlcnMvZ2V0VGFiSWQnO1xuXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG5cdGNvbnN0IG9sZCA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZ2V0UmVnaXN0ZXJlZENvbnRlbnRTY3JpcHRzKCk7XG5cdGlmIChvbGRbMF0pXG5cdFx0YXdhaXQgY2hyb21lLnNjcmlwdGluZy51bnJlZ2lzdGVyQ29udGVudFNjcmlwdHMoe1xuXHRcdFx0aWRzOiBvbGQubWFwKChzKSA9PiBzLmlkKSxcblx0XHR9KTtcblx0YXdhaXQgY2hyb21lLnNjcmlwdGluZy5yZWdpc3RlckNvbnRlbnRTY3JpcHRzKFtcblx0XHR7XG5cdFx0XHRpZDogJ2NvbnRlbnQnLFxuXHRcdFx0d29ybGQ6ICdNQUlOJyxcblx0XHRcdGpzOiBbJ2pzL2NvbnRlbnQuanMnXSxcblx0XHRcdG1hdGNoZXM6IFsnPGFsbF91cmxzPiddLFxuXHRcdH0sXG5cdF0pO1xufSk7XG5cbmNvbnN0IGV4ZWNTY3JpcHQgPSBhc3luYyAoKSA9PiB7XG5cdGNvbnN0IHRhYklkID0gYXdhaXQgZ2V0VGFiSWQoKTtcblx0YXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcblx0XHR0YXJnZXQ6IHsgdGFiSWQgfSxcblx0XHRmaWxlczogWydqcy9jb250ZW50LmpzJ10sXG5cdH0pO1xufTtcblxuLy8gTGlzdGVuIHRvIG1lc3NhZ2VzIHNlbnQgZnJvbSBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uLlxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA9PiB7XG5cdC8vIG9uTWVzc2FnZSBtdXN0IHJldHVybiBcInRydWVcIiBpZiByZXNwb25zZSBpcyBhc3luYy5cblx0Y29uc3QgaXNSZXNwb25zZUFzeW5jID0gZmFsc2U7XG5cblx0aWYgKHJlcXVlc3QucG9wdXBNb3VudGVkKSB7XG5cdFx0ZXhlY1NjcmlwdCgpO1xuXHR9XG5cblx0cmV0dXJuIGlzUmVzcG9uc2VBc3luYztcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
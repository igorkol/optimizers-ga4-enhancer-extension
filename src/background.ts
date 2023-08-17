import { getTabId } from './helpers/getTabId';
import { PATH_TO_CONTENT_SCRIPT } from './helpers/constants';
import { addRemoveContentScripts } from './helpers/addRemoveContentScripts';

const execScript = async () => {
	const tabId = await getTabId();
	await chrome.scripting.executeScript({
		target: { tabId },
		files: [PATH_TO_CONTENT_SCRIPT],
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

chrome.runtime.onInstalled.addListener(addRemoveContentScripts);

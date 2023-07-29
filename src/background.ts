import { getTabId } from './helpers/getTabId';
import { SVG_URL_PATH_CUSTOM_EXPLORATIONS } from './helpers/constants';

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
	const tabId = await getTabId();
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
		if (details.method === 'GET' && details.url.endsWith(SVG_URL_PATH_CUSTOM_EXPLORATIONS)) {
			// setting timer to wait for 2s before executing script
			setTimeout(execScript, 2000);
		}
	},
	{ urls: ['<all_urls>'] },
	['requestBody'],
);

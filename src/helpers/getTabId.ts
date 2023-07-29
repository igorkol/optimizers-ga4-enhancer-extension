export const getTabId = async () => {
	const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	console.log('tabs', tabs);
	return tabs.length > 0 ? tabs[0].id : null;
};

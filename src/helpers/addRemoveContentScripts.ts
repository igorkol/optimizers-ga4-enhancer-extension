import { GOOGLE_ANALYTICS_URL, PATH_TO_CONTENT_SCRIPT } from './constants';

export const addRemoveContentScripts = async () => {
	const alreadyRegisteredScripts = await chrome.scripting.getRegisteredContentScripts();
	if (Array.isArray(alreadyRegisteredScripts) && alreadyRegisteredScripts.length > 0) {
		await unregisterContentScript(alreadyRegisteredScripts);
	}
	await registerContentScript();
};

const registerContentScript = async () => {
	await chrome.scripting.registerContentScripts([
		{
			id: 'content',
			world: 'MAIN',
			js: [PATH_TO_CONTENT_SCRIPT],
			matches: [GOOGLE_ANALYTICS_URL],
		},
	]);
};

const unregisterContentScript = async (alreadyRegisteredScripts: chrome.scripting.RegisteredContentScript[]) => {
	if (Array.isArray(alreadyRegisteredScripts) && alreadyRegisteredScripts.length > 0) {
		await chrome.scripting.unregisterContentScripts({
			ids: alreadyRegisteredScripts.map((s) => s.id),
		});
	}
};

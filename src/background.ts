import { getTabId } from './helpers/getTabId';

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
  const tabId = await getTabId();
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

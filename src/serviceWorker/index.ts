chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  if (message.type === "initVolume") {
    chrome.action.setBadgeText({
      text: message.payload === null ? "" : String(message.payload),
      tabId: sender.tab?.id,
    });
  }
});

// route url update
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, { type: "initNode", payload: tab });
  }
});

chrome.action.setBadgeBackgroundColor({ color: "#8b5cf6" });

export {};

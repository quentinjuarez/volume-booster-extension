chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  if (message.type === "initVolume") {
    chrome.action.setBadgeText({
      text: String(message.payload),
      tabId: sender.tab?.id,
    });
  }
});

chrome.action.setBadgeBackgroundColor({ color: "#8b5cf6" });

export {};

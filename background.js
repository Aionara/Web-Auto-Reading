let panelVisible = false;

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  panelVisible = !panelVisible;
  chrome.tabs.sendMessage(tab.id, { action: panelVisible ? "showPanel" : "hidePanel" });
});

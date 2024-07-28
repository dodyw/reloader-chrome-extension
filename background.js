let targetUrl = '';
let intervalId = null;

function reloadTab() {
  chrome.tabs.query({url: targetUrl}, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'startReloading') {
    targetUrl = request.url;
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(reloadTab, 30 * 1000); // 60000 ms = 1 minute
    sendResponse({status: 'started'});
  } else if (request.action === 'stopReloading') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    sendResponse({status: 'stopped'});
  }
});
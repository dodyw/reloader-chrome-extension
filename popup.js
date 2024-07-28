document.getElementById('startButton').addEventListener('click', function() {
  let url = document.getElementById('urlInput').value;
  if (url) {
    chrome.runtime.sendMessage({action: 'startReloading', url: url}, function(response) {
      console.log(response.status);
    });
  }
});

document.getElementById('stopButton').addEventListener('click', function() {
  chrome.runtime.sendMessage({action: 'stopReloading'}, function(response) {
    console.log(response.status);
  });
});
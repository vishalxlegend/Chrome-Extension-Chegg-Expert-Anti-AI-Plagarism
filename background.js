let blockplagar;

// Retrieve data from storage on extension startup
chrome.storage.local.get("blockplagar", function (data) {
  blockplagar = data.blockplagar || false;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    blockplagar = true;
    chrome.storage.local.set({ blockplagar: blockplagar });
    chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        chrome.storage.local.get("blockplagar", function (data) {
          check = data.blockplagar || false;
        });
        if (check) {
          if (details.requestBody && details.requestBody.raw) {
            // Convert raw bytes to text using UTF-8 encoding
            const requestBodyText = new TextDecoder("utf-8").decode(
              details.requestBody.raw[0].bytes
            );
            if (requestBodyText.includes("StartAnswerPlagiarismCheck")) {
              return { cancel: true };
            }

            if (requestBodyText.includes("CurrentPlagiarismAttempt")) {
              return { cancel: true };
            }
          }
        }
        return { cancel: false };
      },
      { urls: ["<all_urls>"] },
      ["blocking", "requestBody"]
    );
    setTimeout(function () {
      blockplagar = false;
      chrome.storage.local.set({ blockplagar: blockplagar });
    }, 180000);
  }
});

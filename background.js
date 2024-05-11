
// Listen for messages from the content script.

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  

  switch (request.message) {
    case "getBookmarks":
      chrome.bookmarks.getSubTree('1', function(bookmarks) {
        sendResponse({bookmarks: bookmarks[0].children});
      });
      break;

    case "openBookmark":
      chrome.bookmarks.getSubTree('1', function(bookmarks) {
        const index = parseInt(request.index);
        if (index >= 0 && index < bookmarks[0].children.length) {
          chrome.tabs.create({url: bookmarks[0].children[index].url});
          sendResponse({message: "Opening bookmark"});
        } else {
          sendResponse({message: "Invalid index"});
        }
      });
      break;
  }

  return true;  // Will respond asynchronously.

});
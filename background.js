
let bookmarks = [];

chrome.bookmarks.getSubTree('1', (bookmarkTreeNodes) => {
    bookmarks = bookmarkTreeNodes[0].children;
});

chrome.commands.onCommand.addListener((command) => {  
    switch (command) {
        case 'open-bookmark1-new-tab':
            chrome.tabs.create({ url: bookmarks[0].url });
            break;
        case 'open-bookmark2-new-tab':
            chrome.tabs.create({ url: bookmarks[1].url });
            break;
        case 'open-bookmark3-new-tab':
            chrome.tabs.create({ url: bookmarks[2].url });
            break;
        case 'open-bookmark4-new-tab':
            chrome.tabs.create({ url: bookmarks[3].url });
            break;
    }
});
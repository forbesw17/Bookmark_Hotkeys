

console.log('content-script.js');


chrome.runtime.sendMessage({message: "getBookmarks"}, function(response) {
    console.log(response.bookmarks);
});


let altPressed = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Alt') {
        event.preventDefault();
        altPressed = true;
        console.log('Alt key pressed');
    } 
    
    if (altPressed && event.key >= '1' && event.key <= '9') {
        console.log('Alt + number key pressed');
        chrome.runtime.sendMessage({message: "openBookmark", index: event.key - 1}, function(response) {
            console.log(response);
        });
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Alt') {
        event.preventDefault();
        altPressed = false;
        console.log('Alt key released');
    }
});
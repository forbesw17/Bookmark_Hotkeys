
// let overlayAdded = false;

// chrome.commands.onCommand.addListener(function (command) {
//   if (command === "open-bookmark") {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       // Get the current tab
//       const tab = tabs[0];

//       // Retrieve bookmarks
//       chrome.bookmarks.getTree(function (tree) {
//         const bookmarks = tree[0].children[0].children;

//         // Execute content script to toggle overlay
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: (bookmarks) => {
//             // If overlay is already added, remove it
//             if (document.getElementById("overlay")) {
//               document.getElementById("overlay").remove();
//               overlayAdded = false;
//             } else { // If overlay is not added, add it
//               const overlay = document.createElement("div");
//               overlay.id = "overlay";
//               overlay.style.position = "fixed";
//               overlay.style.gap = "10px";
//               overlay.style.top = "0";
//               overlay.style.left = "0";
//               overlay.style.width = "100%";
//               overlay.style.height = "100%";
//               overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background
//               overlay.style.zIndex = "9000"; // Ensure it's on top of other elements
//               document.body.appendChild(overlay);

//               // Iterate through the bookmarks array
//               bookmarks.forEach(bookmark => {
//                 // Create a link for each bookmark
//                 const link = document.createElement("a");
//                 link.textContent = bookmark.title;
//                 link.href = bookmark.url;
//                 link.style.color = '#fff'; // White color for the link text
//                 link.style.textDecoration = "none"; // Remove underline
//                 link.style.fontSize = "18px"; // Larger font size
//                 link.style.padding = "10px"; // Add padding for better visibility
//                 link.style.zIndex = "10000"; // Ensure it's on top of the overlay
//                 link.setAttribute("target", "_blank"); // Open link in a new tab
//                 overlay.appendChild(link);
//               });

//               overlayAdded = true;
//             }
//           },
//           args: [bookmarks], // Pass bookmarks as an argument to the function
//         });
//       });
//     });
//   }
// });



let overlayAdded = false;

chrome.commands.onCommand.addListener(function (command) {
  if (command === "open-bookmark") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Get the current tab
      const tab = tabs[0];

      // Retrieve bookmarks
      chrome.bookmarks.getTree(function (tree) {
        const bookmarks = tree[0].children[0].children;

        // Execute content script to toggle overlay
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (bookmarks) => {
            // If overlay is already added, remove it
            if (document.getElementById("overlay")) {
              document.getElementById("overlay").remove();
              overlayAdded = false;
            } else { // If overlay is not added, add it
              const overlay = document.createElement("div");
              overlay.id = "overlay";
              overlay.style.position = "fixed";
              overlay.style.gap = "10px";
              overlay.style.top = "0";
              overlay.style.left = "0";
              overlay.style.width = "100%";
              overlay.style.height = "100%";
              overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background
              overlay.style.zIndex = "9000"; // Ensure it's on top of other elements
              document.body.appendChild(overlay);

              let linkNumber = 1; // Counter for link numbering

              // Iterate through the bookmarks array
              bookmarks.forEach((bookmark, index) => {
                // Create a link for each bookmark
                const link = document.createElement("a");
                link.textContent = `${linkNumber}. ${bookmark.title}`; // Number each link
                link.href = bookmark.url;
                link.style.color = '#fff'; // White color for the link text
                link.style.textDecoration = "none"; // Remove underline
                link.style.fontSize = "18px"; // Larger font size
                link.style.padding = "10px"; // Add padding for better visibility
                link.style.zIndex = "10000"; // Ensure it's on top of the overlay
                link.setAttribute("target", "_blank"); // Open link in a new tab
                overlay.appendChild(link);

                // Increment link number
                linkNumber++;
              });

              overlayAdded = true;

              // Key press listener
              document.addEventListener('keydown', function (event) {
                // Check if overlay is added and if the pressed key is a number
                if (overlayAdded && event.key >= '0' && event.key <= '9') {
                    // Convert key to link index
                    let linkIndex;
                    switch (event.key) {
                        case '0':
                            linkIndex = 9;
                            break;
                        case '1':
                            linkIndex = 0;
                            break;
                        case '2':
                            linkIndex = 1;
                            break;
                        case '3':
                            linkIndex = 2;
                            break;
                        case '4':
                            linkIndex = 3;
                            break;
                        case '5':
                            linkIndex = 4;
                            break;
                        case '6':
                            linkIndex = 5;
                            break;
                        case '7':
                            linkIndex = 6;
                            break;
                        case '8':
                            linkIndex = 7;
                            break;
                        case '9':
                            linkIndex = 8;
                            break;
                        default:
                            break;
                    }
                    
                    // Open corresponding link based on the pressed number key
                    const link = document.querySelector(`#overlay a:nth-child(${linkIndex + 1})`);
                    if (link) {
                        link.click();
                        overlayAdded = false;
                    }
                }
            });
            }
          },
          args: [bookmarks], // Pass bookmarks as an argument to the function
        });
      });
    });
  }
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var hash = 0, i, chr;
        for (i = 0; i < request.payload.length; i++) {
          chr   = request.payload.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }

        chrome.downloads.download({
            url: "data:text/json," + request.payload,
            filename: hash + '.json',
            conflictAction: "uniquify", // or "overwrite" / "prompt"
            saveAs: false, // true gives save-as dialogue
        }, function(downloadId) {
            console.log("Downloaded item with ID", downloadId);
            sendResponse({farewell: downloadId});
        });
    
    });
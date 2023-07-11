function handleDownload(down){
    let downloadId;
    let downloadUrl;
    function directDownDrive(){
        console.log("download redirected");
        let downUrl = "https://downdrive.onrender.com/api/process/?url="+downloadUrl;

        console.log(downUrl);
        chrome.tabs.create({url:downUrl});

    }
    function cancelDownloads(downloadId) {
        let canceling = chrome.downloads.cancel(downloadId,directDownDrive)
    }

    // console.log("handle download started");
    downloadId = down.id;
    // console.log("Downloadid   "+ downloadId);
    downloadUrl = down.finalUrl;
    // console.log(downloadUrl);
    cancelDownloads(downloadId);

}

let extState = false
chrome.runtime.onMessage.addListener(messageReceived2);

async function messageReceived2(msg, sender, sendResponse ) {
    // console.log("message to back is" + msg.type)
    if (msg.type === "click") {
        if (msg.val) {
            extState = true
            console.log("listener started")
            chrome.downloads.onCreated.addListener(handleDownload)

        } else {
            extState = false
            console.log("listener stopped")
            chrome.downloads.onCreated.removeListener(handleDownload)

        }
    }
    else if (msg.type === "state"){
        sendResponse({value:extState})

    }
}



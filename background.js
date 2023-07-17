function handleDownload(down){
    let downloadId = down.id;
    let downloadUrl = down.finalUrl;
   
    function directDownDrive(){
        console.log("download redirected");
        let downUrl = "https://downdrive.onrender.com/api/process/?url="+downloadUrl;
        chrome.tabs.create({url:downUrl});

    }
    function cancelDownloads(downloadId) {
        let canceling = chrome.downloads.cancel(downloadId,directDownDrive)
    }

    cancelDownloads(downloadId);
}

async function messageReceived(msg, sender, sendResponse ) {
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


let extState = false
chrome.runtime.onMessage.addListener(messageReceived);


function run() {
    setTimeout(arguments.callee, 5000);
    console.log("running the callee")
}
run()


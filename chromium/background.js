let extState = false

function setState(val){
    chrome.storage.local.set({state:val}, () => {
        if (chrome.runtime.lastError){
            console.log("Error saving state",chrome.runtime.lastError)
        }

    })
}
function getState() {
    chrome.storage.local.get(["state"], (val) => {
        if (chrome.runtime.lastError){
            console.log(chrome.runtime.lastError)
            return
        }
        else if(val !== undefined) {
            extState = val
        }
    })
}




chrome.runtime.onMessage.addListener(messageReceived)
chrome.downloads.onCreated.addListener(handleDownload)





function handleDownload(down){
    if (!extState) {                //if extState is false (extension is off)
        return
    }
    let downloadId = down.id;
    let downloadUrl = down.finalUrl;
   
    function directDownDrive(){
        clearDownloads(downloadId)
        console.log("download redirected");
        let downUrl = "https://downdrive.onrender.com/api/process/?url="+downloadUrl;
        chrome.tabs.create({url:downUrl});

    }
    function cancelDownloads(downloadId) {
        let canceling = chrome.downloads.cancel(downloadId,directDownDrive)
    }
    function clearDownloads(downloadId) {
         chrome.downloads.erase({id:downloadId})
    }

    cancelDownloads(downloadId);
}

async function messageReceived(msg, sender, sendResponse ) {
    // console.log("message to back is" + msg.type)
    if (msg.type === "click") {
        if (msg.val) {
            extState = true
            setState(extState)


        } else {
            extState = false
            setState(extState)


        }
    }
    else if (msg.type === "state"){
        getState()
        console.log("value of extState is",extState)
        sendResponse({value:extState})

    }
}


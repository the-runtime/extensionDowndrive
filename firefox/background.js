browser.downloads.onCreated.addListener(handleDownload)

browser.runtime.onStartup.addListener(() => {
    browser.storage.local.set({state: false}, () => {
        if (browser.runtime.lastError) {
            console.log("Error saving state", browser.runtime.lastError)
        }

    })
})

function handleDownload(down){
    browser.storage.local.get("state").then((val => {
        console.log(val.state)
        if (val.state ){
            let downloadId = down.id;
            let downloadUrl = down.url;
            console.log(downloadUrl)

            function directDownDrive(){
                console.log("download redirected");
                let downUrl = "https://downdrive.onrender.com/api/process/?url="+downloadUrl;
                console.log(downUrl)
                browser.tabs.create({url:downUrl});
                clearDownloads(downloadId)

            }
            function cancelDownloads(downloadId) {
                let canceling = browser.downloads.cancel(downloadId,directDownDrive)
            }
            function clearDownloads(downloadId) {
                browser.downloads.erase({id:downloadId})
            }

            cancelDownloads(downloadId);

        }

    }))


}





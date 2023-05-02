let downloadId;
let downloadUrl;

console.log("process started");



chrome.downloads.onCreated.addListener(handleDownload);


function onError(error) {
    console.log('Error: ${error}');
}


function popOpt(){

}

function directDownDrive(){
    console.log("download redirected");
    let downUrl = "https://theruntime.software/process/?url="+downloadUrl;
    
    //let downUrl = "http://127.0.0.1:8000/?url="+downloadUrl;
    //downUrl = "https://theruntime.software/gdrive/down?url="+downloadUrl;
    console.log(downUrl);
    //fetch(downUrl)
    //.then(data=>{ return data})
    //.then(res=>{console.log(res)})
    //console.log("data is " + data);
    chrome.tabs.create({url:downUrl});
    //window.location.replace(downUrl);
    //var wind = window.open(downUrl,"_self");
}

function pauseDownload(downloadId){
    console.log("Download pause started");
    let pausing = chrome.downloads.pause(downloadId,directDownDrive);
    //pausing.then(()=> {console.log("paused")
    //    }, onError);
    //pausing.then(popOpt,onError);
    //pausing.then(directDownDrive,onError);
}


function handleDownload(down){
    console.log("handle download started");
    downloadId = down.id;
    //down[0].id = 12345;
    //downloadId = 12345;
    console.log("Downloadid   "+ downloadId);
    //console.log("hello world");
    downloadUrl = down.finalUrl;
    console.log(downloadUrl);
    pauseDownload(downloadId);
    //directDownDrive(downloadUrl);
    //console.log(down.id);
}




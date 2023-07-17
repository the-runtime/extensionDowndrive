const button = document.getElementById('extensionButton');

// let popState = false

let popState = false

chrome.runtime.sendMessage({type: "state",val: true}, callback = function (resp){
  console.log("value of response is " + typeof (resp.value) + resp.value)
  popState = resp.value
  if (popState) {
    button.textContent = "Turn Off"
  }else {
    button.textContent = "Turn On"
  }
})


button.addEventListener('click', async function() {
  // console.log("hello world" + await getextState())
  if (popState) {
    
    button.textContent = 'Turn On';
    chrome.runtime.sendMessage({type: "click", val: false})
    popState = false
    // chrome.downloads.onCreated.removeListener(handleDownload)
    
    // Call your function here when the button is turned on
    // Function logic goes here
  } else  {
    chrome.runtime.sendMessage({type: "click", val: true})
    popState = true
    button.textContent = "Turn Off"

    }

  }
);

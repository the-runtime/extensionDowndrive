const button = document.getElementById('extensionButton');
const htmlstate = document.getElementById("extensionState")
let popState = false

function setState(val) {
    browser.storage.local.set({state: val}, () => {
        if (browser.runtime.lastError) {
            console.log("Error saving state", browser.runtime.lastError)
        }

    })
}

browser.storage.local.get("state").then((val ) => {
    if (val.state){
        popState = true
        button.textContent = "Turn Off"
        htmlstate.textContent = "On"
    }else{
        popState = false
        button.textContent = "Turn On"
        htmlstate.textContent = "Off"
    }
})


button.addEventListener('click', async function() {
  if (popState) {
    
    button.textContent = 'Turn On';
      htmlstate.textContent = "Off"
    setState(false)
      popState = false

  } else  {
    popState = true
      setState(true)
    button.textContent = "Turn Off"
      htmlstate.textContent = "On"

    }

  }
);

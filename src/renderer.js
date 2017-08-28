// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer;
const path = require('path')
const remote = require('electron').remote; 
const selectDirBtn = document.getElementById('select-directory');
const nav = require('./assets/nav')
console.log(nav.getCurrentPage());

selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
});
ipc.on('selected-directory', function (event, path) {
  document.getElementById('selected-directory').innerHTML = `You selected: ${path}`;
  if(nav.getCurrentPage() == "setup"){
    document.getElementById('setup-continue').classList.remove('inactive');
  }
  
});
 
function init() { 
  document.getElementById("min-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    window.minimize(); 
  });
  
  document.getElementById("max-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }	 
  });
  
  document.getElementById("close-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    window.close();
  }); 
}; 

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    init(); 
  }
};

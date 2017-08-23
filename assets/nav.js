const settings = require('electron-settings')

hideAllModals();

console.log(settings.has('setup.isComplete'));

//if setup.isComplete is false go to setup modal
//also check directory is set  and registry settings are set 

function hideAllModals () {
    const modals = document.querySelectorAll('.modal.is-shown')
    Array.prototype.forEach.call(modals, function (modal) {
      modal.classList.remove('is-shown')
    })
  }
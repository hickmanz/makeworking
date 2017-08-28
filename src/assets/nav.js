const settings = require('electron-settings')
var currentPage = "";

hideAllModals();

console.log(settings.has('setup.isComplete'));

if(!settings.has('setup.isComplete')){
  showModal('setup');
}
//if setup.isComplete is false go to setup modal


function hideAllModals () {
    const modals = document.querySelectorAll('.modal.is-shown')
    Array.prototype.forEach.call(modals, function (modal) {
      modal.classList.remove('is-shown')
    })
}
function showModal (modalName) {
  const modal = document.getElementById(modalName + '-modal');
  modal.classList.add('is-shown');
  currentPage = modalName;
}
module.exports = {
  getCurrentPage: function() {
    return currentPage;
  }
}
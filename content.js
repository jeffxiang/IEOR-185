/*console.log("Chrome extension go");

var firstname = chrome.storage.local.get('firstname', function() {
  console.log('get firstname')
});
var lastname = chrome.storage.local.get('lastname', function() {
  console.log('get lastname')
});
var email = chrome.storage.local.get('email', function() {
  console.log('get email')
});
var mobile = chrome.storage.local.get('mobile', function() {
  console.log('get mobile')
});
var address = chrome.storage.local.get('address', function() {
  console.log('get address')
});
console.log();*/

function getInputs() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs.item(i).onkeyup = function() {
      var input = this.value;
      if (input == firstname || input == lastname ||
        input == email || input == mobile || input == address) {
          alert("Be careful! You're entering private information into your browser!");
        }
    };
  }
}
getInputs();

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            getInputs();
        }
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true
};

observer.observe(document.body, config);

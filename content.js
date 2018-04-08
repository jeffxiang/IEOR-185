console.log("Chrome extension go");

var address = /^\d+(\s)*[A-z]+(\s)*[A-z]+/;
var cardnum = /(\d(\s)*){14, 16}/;
var phonenum = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})/;

function getInputs() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs.item(i).onkeyup = function() {
      var input = this.value;
      var result = checkInputs(input);
      if (result != "false") {
        alert("We have detected that you are trying to enter sensitive information. Are you sure you want to enter " + result + " into your browser?");
      }
    };
  }
}

function checkInputs(input) {
  if (input.match(address)) {
    return "an address";
  }
  if (input.match(cardnum)) {
    return "a card number";
  }
  if (input.match(phonenum)) {
    return "this";
  }
  else {
    return "false";
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

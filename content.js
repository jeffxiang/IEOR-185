console.log("Spidy go!"); // Indicates that Spidy is running.

var address = /^\d+(\s)*[A-z]+(\s)*[A-z]+/;
var cardnum = /(\d(\s)*){14, 16}/;
var phonenum = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})/;

var matchstrings = [address, cardnum, phonenum]; // Can be expanded.

localStorage.setItem("lastinput", ""); // Enhances UX by making sure same inputs on separate keyup events aren't double-detected.

/* Function that runs at the start of DOM loading and whenever a mutation on DOM occurs.
  Checks all input fields on DOM and performs pattern matching to detect whenever sensitive
  information is being entered. */
function getInputs() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs.item(i).onkeyup = function() {
      var input = this.value;
      var lastinput = localStorage.getItem("lastinput");
      if (lastinput != input) {
        localStorage.setItem("lastinput", input);
        var result = checkInput(input);
        if (result) {
          alert("We have detected that you are trying to enter sensitive information. Are you sure you want to enter this into your browser?");
        }
      }
    }
  }
}

/* Function to update points. */
function updatePoints(currpoints, webpages, domains) {
  return currpoints + webpages/4 + domains;
}

/* Function that checks an input with patterns. */
function checkInput(input) {
  for (var i = 0; i < matchstrings.length; i++) {
    if (input.match(matchstrings[i])) {
      return true;
    }
  }
  return false;
}

getInputs(); // getInputs() executed at the start of DOM loading.


/* Detects mutations in DOM to ensure that all input fields in DOM are accounted for. */
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

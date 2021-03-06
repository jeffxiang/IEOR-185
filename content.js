console.log("Spidy go!"); // Indicates that Spidy is running.

var address = /^\d+(\s)*[A-z]+(\s)*[A-z]+/;
var cardnum = /(\d(\s)*){14, 16}/;
var phonenum = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})/;
var ssn = /^\d{3}-\d{2}-\d{4}$/;
var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

var matchstrings = [address, cardnum, phonenum, ssn, email]; // Can be expanded.

localStorage.setItem("lastinput", ""); // Enhances UX by making sure same inputs on separate keyup events aren't double-detected.

/* Function that returns a NodeList of all current input fields in the DOM. */
function getInputs() {
    var inputs = document.querySelectorAll('input, textarea');
    return inputs;
}

/* Function that takes a string as an input and gets rid of all whitespaces.
    Returns the resultant string. */
function ridWhitespace(string) {
  return string.replace(/ /g, "");
}

/* Function that runs at the start of DOM loading and whenever a mutation on DOM occurs.
    Checks all input fields on DOM and performs pattern matching to detect whenever sensitive
    information is being entered.
    Takes in a NodeList INPUTS as parameter.
    Alerts user whenever a match is detected. */
function evalInputs(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs.item(i).onkeyup = function() {
      var input = ridWhitespace(this.value);
      var lastinput = localStorage.getItem("lastinput");
      if (lastinput != input) {
        localStorage.setItem("lastinput", input);
        var result = checkInput(input);
        if (result) {
          alert("We have detected that you are trying to enter sensitive information. Are you sure you want to enter this into your browser?");
          // alertParents();
          // This has not been implemented because they require cloud storage services that we have not paid for.
        }
        // updatePoints(currpoints, # of webpages, # of domains);
        // Again, this requires cloud storage.
      }
    }
  }
}

/* Function to update points. Returns the updated number of points. */
function updatePoints(currpoints, webpages, domains) {
  return currpoints + webpages/4 + domains; // proportional to # of webpages and domains visited, but with heavier weight on domains.
}



/* Function that checks an input with patterns.
    Returns true iff any substring of INPUT matches one of the given patterns. */
function checkInput(input) {
  // We realize that runtime for this method is not ideal. For an n-length input
  // and k-length list of patterns, the worst-case runtime is O(kn^2). This is
  // the best we can do at the moment, as we cannot find a way to iterate through
  // all substrings of INPUT in less than O(n^2) time (it is mathematically impossible
  // to do so, since there are ~n^2 substirngs in an n-length string).
  for (var i = 0; i < input.length; i++) {
    for (var j = i; j < input.length; j++) {
      var substring = input.substring(i, j+1);
      for (var l = 0; l < matchstrings.length; l++) {
        if (substring.match(matchstrings[l])) {
          return true;
        }
      }
    }
  }
  return false;
}

evalInputs(getInputs()); // evalInputs(inputs) executed at the start of DOM loading.


/* Detects mutations in DOM to ensure that all input fields in DOM are accounted for.
    Calls evalInputs(inputs) again if a mutation is detected. */
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            evalInputs(getInputs()); // evalInputs(inputs) is called again if there is a mutation in DOM, accounting for any new input fields.
        }
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true
};

observer.observe(document.body, config);

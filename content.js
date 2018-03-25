console.log("Chrome extension go");
function getInputs() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs.item(i).onkeyup = function() {
      var input = this.value;
      var firstname = localStorage.getItem("firstname");
      var lastname = localStorage.getItem("lastname");
      var email = localStorage.getItem("email");
      var mobile = localStorage.getItem("mobile");
      var address = localStorage.getItem("address");
      if (input == firstname || input == lastname ||
        input == email || input == mobile || input == address || input == "Jeff") {
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

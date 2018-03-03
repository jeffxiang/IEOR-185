console.log("Chrome extension go");

var inputs = document.getElementsByTagName('input');
for (i = 0; i < inputs.length; i++) {
  inputs[i].onkeyup = function() {
    var input = this.value;
    if (input == "Jeff") { // change to a generalized form!
      alert("Be careful! You're entering private information.");
    }
  };
}

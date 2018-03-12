console.log("Chrome extension go");

var inputs = document.getElementsByTagName('input');
for (i = 0; i < inputs.length; i++) {
  inputs[i].onkeyup = function() {
    var input = this.value;
    var firstname = localStorage.getItem("firstname");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var mobile = localStorage.getItem("mobile");
    var address = localStorage.getItem("address");
    if (input == firstname || input == lastname ||
      input == email || input == mobile || input == address) {
        alert("Be careful! You're entering private information into your browser!");
      }
  };
}

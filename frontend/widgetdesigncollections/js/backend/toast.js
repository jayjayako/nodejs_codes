function toastmessage(content) {
  var x = document.getElementById("snackbar1");
  x.innerHTML = content;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

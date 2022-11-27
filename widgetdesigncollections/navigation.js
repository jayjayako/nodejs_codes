function openmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("modalnameid").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}

async function loadalldata() {
  await includeHTML();
}
loadalldata();

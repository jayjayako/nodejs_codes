///////////////////////// for opening modals /////////////////////
function openmodal(includeId, content) {
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).style.display =
    "block";
  includehtml(includeId, content);
}
//////////////////////////////////////////////////////////////////

///////////////////////// for closing modals /////////////////////
function closemodal(includeId) {
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).innerHTML = "";
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).style.display = "none";
}
//////////////////////////////////////////////////////////////////

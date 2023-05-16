var mydata = "Arturo";
var output = "";

var myarr = ["data1", "data2", "data3"];

function getcodeid(elementid) {
  console.log("it works");
  var value = document.getElementById(elementid).innerHTML;
  output = eval("`" + value.toString() + "`");
  document.getElementById(elementid).innerHTML = output;
}

function getcodeidloop(elementid) {
  let output2 = "";
  console.log("it works");
  var value2 = document.getElementById(elementid).innerHTML;
  for (let y in myarr) {
    output2 += eval("`" + value2.toString() + "`");
  }
  document.getElementById(elementid).innerHTML = "";
  document.getElementById(elementid).innerHTML = output2;
}

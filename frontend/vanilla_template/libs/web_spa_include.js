/////////////////////// include html //////////////////////
async function includehtml(includeId, url) {
  try {
    var html = document.querySelector(`[htmlinclude="${includeId}"]`);
    let res = await fetch(url, {
      method: "GET",
    });
    let data = await res.text();
    html.innerHTML = data;
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    eval(doc.querySelector("script").textContent);
  } catch (error) {}
}
///////////////////////////////////////////////////////////

//////////////////// import new css ///////////////////////
function loadallcss(filename, modulecon) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filename;
  if (modulecon == "module") {
    link.type = "module";
  } else if (modulecon == "nomodule") {
    link.type = "nomodule";
  } else if (modulecon == "default") {
  }
  document.getElementsByTagName("head")[0].appendChild(link);
}
///////////////////////////////////////////////////////////
/////////////////// import js defer ///////////////////////
function loadalljavascript(filename, type) {
  var script = document.createElement("script");
  script.src = filename;
  if (type == "default") {
  }
  if (type == "defer") {
    script.defer = "defer";
  }
  if (type == "module") {
    script.type = "module";
  }
  if (type == "nomodule") {
    script.setAttribute("nomodule", "");
  }

  document.getElementsByTagName("head")[0].appendChild(script);
}
//////////////////////////////////////////////////////////

function openNav() {
  document.getElementById("myNav").style.width = "80%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function loadhome() {
  document.getElementById("cursor").style.display = "none";
  let i = 0;
  let txt1 = "Hi Im";
  let txt2 = "Arturo";
  let txt3 = "Web developer";
  let speed1 = 200;
  let speed2 = 300;
  let speed3 = 200;
  document.getElementById("job").style.display = "none";
  document.getElementById("typingcursor").style.display = "none";
  function clearalltext() {
    document.getElementById("hiim").innerHTML = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("job").innerHTML = "";
    document.getElementById("cursor").style.display = "none";
    document.getElementById("job").style.display = "none";
  }

  function typeWriter() {
    if (i < txt1.length) {
      document.getElementById("hiim").innerHTML = document
        .getElementById("hiim")
        .innerHTML.replace("_", "");
      document.getElementById("hiim").innerHTML += txt1.charAt(i) + "_";
      i++;
      setTimeout(typeWriter, speed1);
    } else {
      i = 0;
      document.getElementById("hiim").innerHTML = document
        .getElementById("hiim")
        .innerHTML.replace("_", "");
      typeWriter2();
    }
  }
  function typeWriter2() {
    if (i < txt2.length) {
      document.getElementById("name").innerHTML = document
        .getElementById("name")
        .innerHTML.replace("_", "");
      document.getElementById("name").innerHTML += txt2.charAt(i) + "_";
      i++;
      setTimeout(typeWriter2, speed2);
    } else {
      i = 0;
      document.getElementById("name").innerHTML = document
        .getElementById("name")
        .innerHTML.replace("_", "");
      typeWriter3();
    }
  }
  function typeWriter3() {
    document.getElementById("job").style.display = "inline-block";
    document.getElementById("typingcursor").style.display = "inline-block";
    if (i < txt3.length) {
      document.getElementById("job").innerHTML += txt3.charAt(i);
      i++;
      setTimeout(typeWriter3, speed3);
    } else {
      i = 0;
      document.getElementById("typingcursor").style.display = "none";
      document.getElementById("cursor").style.display = "inline-block";
      setTimeout(clearalltext, 5000);
      setTimeout(typeWriter, 6000);
    }
  }
  typeWriter();
}

setTimeout(loadhome, 1000);

//////////////////// send message function //////////////////////
async function sendmessage() {
  let emailid = document.getElementById("emailid").value;
  let messageid = document.getElementById("messageid").value;
  try {
    let formData = new FormData();
    formData.append("email", emailid);
    formData.append("message", messageid);
    formData.append(
      "captcha",
      document.querySelector("#g-recaptcha-response").value
    );

    const response = await axios.post("/api/sendemail/sendmessage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.data == "success") {
      alert("Success");
    } else {
      alert("Invalid");
    }
  } catch (error) {
    alert("Error Occurred");
  }
}
///////////////////////////////////////////////////////////////////

// var rand = Math.floor(Math.random() * 1000000);
// var recaptchaScript = document.createElement("script");
// recaptchaScript.src = "https://www.google.com/recaptcha/api.js?rand=" + rand;
// recaptchaScript.async = true;
// recaptchaScript.defer = true;
// document.head.appendChild(recaptchaScript);

function loadrandomgeneratecaptcha() {
  var rand = Math.floor(Math.random() * 1000000);
  var recaptchaScript = document.createElement("script");
  recaptchaScript.src = "https://www.google.com/recaptcha/api.js?rand=" + rand;
  recaptchaScript.async = true;
  recaptchaScript.defer = true;
  document.head.appendChild(recaptchaScript);

  var recaptchaDiv = document.createElement("div");
  recaptchaDiv.classList.add("g-recaptcha");
  recaptchaDiv.dataset.sitekey = "6LerG1glAAAAAEJSGIZAThXPF5jTd2GJbehQq1qi";

  var container = document.getElementById("my-container-id");
  container.appendChild(recaptchaDiv);
}

setTimeout(loadrandomgeneratecaptcha, 3000);

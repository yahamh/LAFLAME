var script = document.createElement("script");
script.type = "text/javascript";


function verify(password) {
  document.getElementById("failed").innerHTML = "NOPE";
  console.log(password);
  //   || 'trinity knot' || ' three interlaced arcs ' || 'three overlapping vesicae piscis lens shapes'
  if (password === "trefoil knot") {
    document.getElementById("failed").innerHTML =
      "<p style='color:green'> ACCES GRANTED</p>";
    document.getElementById("acces").style.display = "none";
    document.getElementById("giveUp").style.display = "none";
    setTimeout(function () {
      script.src = "assets/scripts/app-d90c04102f.js";
      document.getElementById("passwordContainer").style.display = "none";
    }, 1500);
  } else if (password == "genius") {
    document.getElementById("failed").innerHTML = "thanks but no";
  } else if (password == "pretzel") {
    document.getElementById("failed").innerHTML = "wtf not a pretzel";
  } else {
    var randomWords = [
      "nope",
      "nyet",
      "try again",
      "bruh",
      "lol... but no",
      "almost...",
      "not even close",
      "booooring",
      "far from it",
      "ok boomer",
      "heeelll nah",
      "yeahh but no",
      "what? no.",
    ];

    var randomIndex = Math.floor(Math.random() * randomWords.length); //creates random No. from 1 - 3

    document.getElementById("failed").innerHTML = randomWords[randomIndex];
  }
}

function giveUp() {

    document.getElementById("failed").innerHTML =
    "<p style='color:red'> TOO BAD :(</p>";
  document.getElementById("acces").style.display = "none";
  document.getElementById("giveUp").style.display = "none";
  setTimeout(function () {
    script.src = "assets/scripts/app-d90c04102f.js";
    document.getElementById("passwordContainer").style.display = "none";
  }, 1500);

}

document.getElementsByTagName("head")[0].appendChild(script);

setTimeout(function () {
  document.getElementById("giveUp").style.display = "block";
}, 15000);

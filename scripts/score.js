function result(){
  let good = localStorage.getItem("score");
  let bad = localStorage.getItem("incorect");
/*   document.getElementById("a").textContent = good;
  document.getElementById("b").textContent = bad; */
  let percent = good/bad;
  if ((percent) < .8) {
    window.location.replace("./html/almost.html");
  } else {
    window.location.replace("./html/congratulations.html");
  }
}
result();
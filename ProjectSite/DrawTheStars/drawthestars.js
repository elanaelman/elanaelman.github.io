function roundOff(n, precision) {
  return Math.round(n*Math.pow(10, precision))/Math.pow(10, precision);
}

document.getElementById("header").innerHTML += "<span id='header-right'><b><a href='drawthestars-simple.html'>Draw a star?</a> || <a href='drawthestars-req.html'>Draw a bunch of stars?</a></b></span>";

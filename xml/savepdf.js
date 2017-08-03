// Uses JSPDF.js refer to documentation to make adjustments
// Button should

function make() {

  var pdfCR = new jsPDF({
    orientation: "p",
    format: "a4"
  });

  var source = window.document.getElementsByTagName("body")[0];

  pdfCR.fromHTML(source, 15, 15, {"width": 180});
  pdfCR.output("dataurlnewwindow");
}

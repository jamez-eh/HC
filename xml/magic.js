
$(document).ready(function() {

  var testXML = "<name><first>Bimal</first></name><block><first>jQuery</first></block>";

  console.log(testXML);

  $("#title-page").html($(testXML).find("first"));
});

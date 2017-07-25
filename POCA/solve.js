
function show1() {
  $("#page1").css("display", "block");
  $("#page2").css("display", "none");
  $("#page3").css("display", "none");
  $("#infoPage").css("display", "none");
  $("#b1").css("background-color", "#fff");
  $("#b1").css("color", "#000");
  $("#b2").css("background-color", "#3c6ec4");
  $("#b2").css("color", "#fff");
  $("#b3").css("background-color", "#3c6ec4");
  $("#b3").css("color", "#fff");
  $("#b4").css("background-color", "#3c6ec4");
  $("#b4").css("color", "#fff");
  $("#res1").css("display", "block");
  $("#res2").css("display", "none");
  $("#res3").css("display", "none");
}

function show2() {
  $("#page1").css("display", "none");
  $("#page2").css("display", "block");
  $("#page3").css("display", "none");
  $("#infoPage").css("display", "none");
  $("#b1").css("background-color", "#3c6ec4");
  $("#b1").css("color", "#fff");
  $("#b2").css("background-color", "#fff");
  $("#b2").css("color", "#000");
  $("#b3").css("background-color", "#3c6ec4");
  $("#b3").css("color", "#fff");
  $("#b4").css("background-color", "#3c6ec4");
  $("#b4").css("color", "#fff");
  $("#res1").css("display", "none");
  $("#res2").css("display", "block");
  $("#res3").css("display", "none");
}

function show3() {
  $("#page1").css("display", "none");
  $("#page2").css("display", "none");
  $("#page3").css("display", "block");
  $("#infoPage").css("display", "none");
  $("#b1").css("background-color", "#3c6ec4");
  $("#b1").css("color", "#fff");
  $("#b2").css("background-color", "#3c6ec4");
  $("#b2").css("color", "#fff");
  $("#b3").css("background-color", "#fff");
  $("#b3").css("color", "#000");
  $("#b4").css("background-color", "#3c6ec4");
  $("#b4").css("color", "#fff");
  $("#res1").css("display", "none");
  $("#res2").css("display", "none");
  $("#res3").css("display", "block");
}

function showInfo() {
  $("#page1").css("display", "none");
  $("#page2").css("display", "none");
  $("#page3").css("display", "none");
  $("#infoPage").css("display", "block");
  $("#b1").css("background-color", "#3c6ec4");
  $("#b1").css("color", "#fff");
  $("#b2").css("background-color", "#3c6ec4");
  $("#b2").css("color", "#fff");
  $("#b3").css("background-color", "#3c6ec4");
  $("#b3").css("color", "#fff");
  $("#b4").css("background-color", "#fff");
  $("#b4").css("color", "#000");
  $("#res1").css("display", "none");
  $("#res2").css("display", "none");
  $("#res3").css("display", "none");
}

function reload() {

  location.reload();
}

function compareNames() {

  if ($("#drugname1-1").val() != "" && $("#drugname1-2").val() != "") {
    show1();

    $("#drugname1-1").css("border", "none");
    $("#drugname1-1").css("border-bottom", "2px solid black");
    $("#drugname1-2").css("border", "none");
    $("#drugname1-2").css("border-bottom", "2px solid black");

    var name1 = $("#drugname1-1").val();
    var name2 = $("#drugname1-2").val();
    var algorithm = $("input[name='algorithms1']:checked").val();

    var urlquery = "https://nlp.hres.ca/compareNames.php?string1=" + name1 + "&string2=" + name2 + "&algorithm=" + algorithm + "&fmt=json";

    $.ajax({
      url: urlquery,
      method: "GET",
      success: function(data, success) {

        var score = data["nlp.hres.ca//compareNames/"]["http://www.w3.org/1999/02/22-rdf-syntax-ns#value"][0].value;

        if (algorithm == "avg") {
          alg = "Average";
        }
        else {
          alg = algorithm.toUpperCase();
        }

        $("#res1").css("display", "block");
        $("#res1").html("<table class='small'><tr><th></th><th>" + alg + "</th></tr><tr><td class='score'>Score</td><td>" + score + "</td></tr></table>");
      }
    });
  }
  else {
    if ($("#drugname1-1").val() == "") {
      $("#drugname1-1").css("border", "1px solid red");
    }

    if ($("#drugname1-2").val() == "") {
      $("#drugname1-2").css("border", "1px solid red");
    }
  }
}

function nearNames() {

  var t = getChecked("data2").length;

  if ($("#drugname2-1").val() != "" && t > 0) {
    show2();

    $("#drugname2-1").css("border", "none");
    $("#drugname2-1").css("border-bottom", "2px solid black");
    $("#err2").css("display", "none");

    var name = $("#drugname2-1").val();
    var threshold = $("#threshold2").val();

    if (threshold == "") {
      $("#threshold2").val('50');
      threshold = 50;
    }
    else if (threshold > 100) {
      $("#threshold2").val('100');
      threshold = 100;
    }
    else if (threshold < 0) {
      $("#threshold2").val('0');
      threshold = 0;
    }

    var format = $("#format2").val();
    var datasets = getChecked("data2");
    var dataquery = "&tables=";

    for (var i = 0; i < datasets.length; i++) {
      if (i == 0) {
        dataquery += datasets[i] + ":" + threshold;
      }
      else {
        dataquery += "," + datasets[i] + ":" + threshold;
      }
    }

    var urlquery = "https://nlp.hres.ca/match.php?q=" + name + dataquery + "&threshold=" + threshold + "&fmt=" + format;

    $.ajax({
      url: urlquery,
      method: "GET",
      success: function(data, success) {
        $("#res2").css("display", "block");
        $("#res2").html(data);
      }
    });
  }
  else {
    if ($("#drugname2-1").val() == "") {
      $("#drugname2-1").css("border", "1px solid red");
    }

    if (t < 1) {
      $("#err2").css("display", "inline");
    }
  }
}

function allTables() {

  show3();

  var format = $("#format3").val();

  if (format == "html") {
    var urlquery = "https://nlp.hres.ca/listTables.php?fmt=json";
  }
  else {
    var urlquery = "https://nlp.hres.ca/listTables.php?fmt=" + format;
  }

  $.ajax({
    url: urlquery,
    method: "GET",
    success: function(data, success) {

      if (format == "html") {
        var jstable = "<table><tr><th>ID</th><th>Name</th><th>Description</th><th>Size</th></tr>"

        for (var key in data) {
          if (data.hasOwnProperty(key)) {

            var idCol = "<td>" + data[key]["http://purl.org/dc/terms/identifier"][0].value + "</td>";
            var nameCol = "<td>" + data[key]["http://xmlns.com/foaf/0.1/name"][0].value + "</td>";
            var descrCol = "<td>" + data[key]["http://www.w3.org/2004/02/skos/core#description"][0].value + "</td>";
            var sizeCol = "<td>" + data[key]["http://purl.org/dc/terms/extent"][0].value + "</td>";

            jstable += "<tr>" + idCol + nameCol + descrCol + sizeCol + "</tr>";
          }
        }

        jstable += "</table>";
        $("#res3").html(jstable);
      }

      if (format == "json") {
        $("#res3").html(JSON.stringify(data));
      }

      $("#res3").css("display", "block");
    }
  });
}

function getChecked(group) {
  var boxes = document.getElementsByName(group);
  var checked = [];

  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      checked.push($(boxes[i]).val());
    }
  }

  return checked;
}

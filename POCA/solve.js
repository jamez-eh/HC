
$(function () {

  $.ajax({
    url: "https://nlp.hres.ca/listTables.php?fmt=json",
    method: "GET",
    success: function(data, success) {

      var datahtml = "";
      var i = 0;

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var name = data[key]["http://xmlns.com/foaf/0.1/name"][0].value;

          datahtml += "<input id='" + name + "2' type='checkbox' name='data2' value='" + name + "'><label for='" + name + "2'>" + name + "</label>";
          datahtml += "<input id='threshold2-" + i +"' class='threshold' type='text' placeholder='90.000'><br>";
        }

        i++;
      }

      if (datahtml == "") {
        $("#dynamicDataSets").html("<p>No data sets available</p>");
      }
      else {
        $("#dynamicDataSets").html(datahtml);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    }
  });
});

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
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
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
/*
    var threshold0 = $("#threshold2-0").val();
    var threshold1 = $("#threshold2-1").val();

    if (threshold0 == "") {
      $("#threshold2-0").val('90');
      threshold0 = 90;
    }
    else if (threshold0 > 100) {
      $("#threshold2-0").val('100');
      threshold1 = 100;
    }
    else if (threshold0 < 0) {
      $("#threshold2-0").val('0');
      threshold0 = 0;
    }

    if (threshold1 == "") {
      $("#threshold2-1").val('90');
      threshold1 = 90;
    }
    else if (threshold1 > 100) {
      $("#threshold2-1").val('100');
      threshold1 = 100;
    }
    else if (threshold1 < 0) {
      $("#threshold2-1").val('0');
      threshold1 = 0;
    }*/

    $(".threshold").each(function() {

      if ($(this).val() == "") {
        $(this).val('90');
      }
      else if ($(this).val() > 100) {
        $(this).val('100');
      }
      else if ($(this).val() < 0) {
        $(this).val('0');
      }
    });

    var format = $("#format2").val();
    var isHTML = false;

    if (format == "html") {
      format = "json";
      isHTML = true;
    }

    var datasets = getChecked("data2");
    var dataquery = "&tables=";

    for (var i = 0; i < datasets.length; i++) {
      if (i == 0) {
        dataquery += datasets[i].data + ":" + datasets[i].threshold;
      }
      else {
        dataquery += "," + datasets[i].data + ":" + datasets[i].threshold;
      }
    }

    var urlquery = "https://nlp.hres.ca/match.php?q=" + name + dataquery + "&fmt=" + format;
console.log(urlquery);
    $.ajax({
      url: urlquery,
      method: "GET",
      success: function(data, success) {

        if (isHTML) {
          var ds = [];

          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var row = [];
              row.push(data[key]["tableName"]);
              row.push(data[key]["drugName"]);
              row.push(data[key]["ID"]);
              row.push(data[key]["avg_score"]);
              row.push(data[key]["aline_score"]);
              row.push(data[key]["bisim_score"]);

              ds.push(row);
            }
          }

          $("#res2").css("display", "block");
          $("#res2").html("<table id='namesTable'></table>");
          $("#namesTable").DataTable({
            destroy: true,
            data: ds,
            columns: [
              {title: "Data Set"},
              {title: "Drug Name"},
              {title: "ID"},
              {title: "Average Score"},
              {title: "ALINE Score"},
              {title: "BISIM Score"}
            ]
          });
        }
        else if (format == "csv") {
          var csv = data;
          var a = document.createElement('a');

          a.textContent='Download CSV';
          a.download="poca2-results.csv";
          a.href='data:text/csv;charset=utf-8,'+escape(csv);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          $("#res2").html("<p id='dwnld'>Download Succesful</p>");
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
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
        var ds = [];

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var row = [];
            row.push(data[key]["http://purl.org/dc/terms/identifier"][0].value);
            row.push(data[key]["http://xmlns.com/foaf/0.1/name"][0].value);
            row.push(data[key]["http://www.w3.org/2004/02/skos/core#description"][0].value);
            row.push(data[key]["http://purl.org/dc/terms/extent"][0].value);

            ds.push(row);
          }
        }

        $("#allTables").DataTable({
          destroy: true,
          data: ds,
          columns: [
            {title: "ID"},
            {title: "Name"},
            {title: "Description"},
            {title: "Size"}
          ]
        });
      }

      if (format == "json") {
        $("#res3").html(JSON.stringify(data));
      }

      $("#res3").css("display", "block");
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    }
  });
}

function getChecked(group) {
  var boxes = document.getElementsByName(group);
  var checked = [];

  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      checked.push({data: $(boxes[i]).val(), threshold: $("#threshold2-" + i).val()});
    }
  }

  return checked;
}

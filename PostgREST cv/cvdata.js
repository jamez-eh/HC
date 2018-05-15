
// BIMAL BHAGRATH

let endpoint = "https://rest-dev.hres.ca/cv/reports_count?select=*&drugname=eq.";

var pieData = [], barData = [], ctxCharts = [];

var barOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

var pieOptions = {};

$(document).ready(() => {

  let qs = window.location.search.substr(1);
  let params = qs.split("=");

  if (params.length > 1 && params[0] == "dn") {
    let drug = params[1];

    $.get(endpoint + drug, (res) => {

      if (res.length == 1) {
        renderDatasetFrom(res[0]);
        renderCharts(pieData, "pie");

        $("#title-drugname").html(res[0].drugname);
      }
    })
      .fail((xhr) => {
        console.log(xhr);
      });
  }
});

function renderDatasetFrom(rawData) {

  let bw = 1.5;
  let bgc = ["rgba(0, 46, 255, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(15, 145, 59, 0.5)", "rgba(142, 13, 186, 0.5)", "rgba(3, 170, 175, 0.5)", "rgba(255, 56, 148, 0.5)"];
  let bc = ["rgb(0, 46, 255)", "rgb(255, 0, 0)", "rgb(15, 145, 59)", "rgb(142, 13, 186)", "rgb(3, 170, 175)", "rgb(255, 56, 148)"];

  let genderChartJS = {
    labels: ["Male", "Female", "Not Specified", "Unknown"],
    datasets: [{
      label: "Patient Gender",
      data: [rawData.male, rawData.female, rawData.not_specified_gender, rawData.unknown_gender],
      backgroundColor: bgc,
      borderColor: bc,
      borderWidth: bw
    }]
  };

  let seriousnessChartJS = {
    labels: ["Serious", "Not Serious"],
    datasets: [{
      label: "Reaction Seriousness",
      data: [rawData.serious, rawData.not_serious],
      backgroundColor: bgc,
      borderColor: bc,
      borderWidth: bw
    }]
  };

  let outcomesChartJS = {
    labels: ["Death", "Not Recovered/Not Resolved", "Recovered/Resolved", "Recovered/Resolved with Sequela", "Recovering/Resolving", "Unknown"],
    datasets: [{
      label: "Report Outcomes",
      data: [rawData.death, rawData.not_recovered_not_resolved, rawData.recovered_resolved, rawData.recovered_resolved_with_sequelae, rawData.recovering_resolving, rawData.unknown_outcome],
      backgroundColor: bgc,
      borderColor: bc,
      borderWidth: bw
    }]
  };

  let sourceChartJS = {
    labels: ["Clinical Study", "Community", "Hospital", "MAH", "Other"],
    datasets: [{
      label: "Report Sources",
      data: [rawData.clinical_study, rawData.community, rawData.Hospital, rawData.mah, rawData.other_source],
      backgroundColor: bgc,
      borderColor: bc,
      borderWidth: bw
    }]
  }

  let ageChartJS = {
    labels: ["Neonate", "Infant", "Child", "Adolescent", "Adult", "Elderly"],
    datasets: [{
      label: "Patient Ages",
      data: [rawData.neonate, rawData.infant, rawData.child, rawData.adolescent, rawData.adult, rawData.elderly],
      backgroundColor: bgc,
      borderColor: bc,
      borderWidth: bw
    }]
  }

  pieData.push(genderChartJS, seriousnessChartJS, outcomesChartJS, sourceChartJS, ageChartJS);
  barData.push(genderChartJS, seriousnessChartJS, outcomesChartJS, sourceChartJS, ageChartJS);
}

function renderCharts(graphData, chartType) {

    ctxCharts.forEach((ctx) => {
      ctx.destroy();
    });

    let genderCTX = document.getElementById("gender-chart").getContext("2d");
    let seriousnessCTX = document.getElementById("seriousness-chart").getContext("2d");
    let outcomesCTX = document.getElementById("outcomes-chart").getContext("2d");
    let sourceCTX = document.getElementById("source-chart").getContext("2d");
    let ageCTX = document.getElementById("age-chart").getContext("2d");

    let charts = [genderCTX, seriousnessCTX, outcomesCTX, sourceCTX, ageCTX];

    let options = chartType == "bar" ? barOptions : pieOptions;

    for (var i = 0; i < charts.length; i++) {

      let chart = new Chart(charts[i], {
        type: chartType,
        data: graphData[i],
        options: options
      });

      ctxCharts.push(chart);
    }
}

function useBar() {

  renderCharts(barData, "bar");
}

function usePie() {

  renderCharts(pieData, "pie");
}

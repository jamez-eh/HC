//js file for querying and displaying users selected drug

var drug_id = window.location.search.substring(9);
var base = "https://rest-dev.hres.ca/rest-dev/dpd_json?select=*";

$(document).ready(function() {
	
	query = base + "&drug_code=eq." + drug_id;
	
	$.get(query, function(data) {
	
		console.log(data[0]);
		var obj = data[0].drug_product;
		var market_date = "N/A";
		
		for(var x = 0; x < obj.status.length; x++) {
			if (obj.status[x].current_status_flag == "Y") {
				$("#status").html("<b>" + obj.status[x].status + "</b>");
				$("#statusDate").html(obj.status[x].history_date);
			}
			
			if (obj.status[x].status == "MARKETED") {
				if (obj.status[x].history_date < market_date) {
					market_date = obj.status[x].history_date;
				}
			}
		}
		
		$("#market").html(market_date);
		$("#product").html(obj.brand_name);
		$("#din").html(obj.drug_identification_number);
		
		$("#company").html("<b>" + obj.company.company_name + "</b>");
		
		if (obj.company.suite_number != "") {
			$("#company").append("<br>" + obj.company.suite_number);
		}
		
		$("#company").append("<br>" + obj.company.street_name + "<br>" + obj.company.city_name + ", " + obj.company.province + "<br>" + obj.company.country + " " + obj.company.postal_code);
		$("#drugClass").html(obj.class);
		
		if (obj.vet_species) {
			for (var i = 0; i < obj.vet_species.length; i++) {
				if (i == 0) {
					$("#species").html(obj.vet_species[i]);
				}
				else {
					$("#species").append(", " + obj.vet_species[i]);
				}
			}
			
			$("#speciesDiv").css("display", "block");
		}
		
		$("#dosage").html(obj.dosage_form[0]);
		$("#route").html(obj.route[0]);
		$("#active").html(obj.number_of_ais);
		
		if (obj.schedule) {
			$("#schedule").html(obj.schedule[0]);
		}
		
		if (obj.therapeutic_class) {
			$("#ahfs").html(obj.therapeutic_class[0].tc_ahfs_number + " " + obj.therapeutic_class[0].tc_ahfs);
			$("#atc").html(obj.therapeutic_class[0].tc_atc_number + " " + obj.therapeutic_class[0].tc_atc);
		}
		
		$("#aig").text(obj.ai_group_no);
		
		var table = document.getElementById("activeIngredientsTable");
		
		for (var i = 0; i < obj.active_ingredients.length; i++) {
			var ingredientRow = table.insertRow(i + 1);
			
			var activeIngredientCell = ingredientRow.insertCell(0);
			var strengthCell = ingredientRow.insertCell(1);
			
			activeIngredientCell.innerHTML = obj.active_ingredients[i].ingredient;
			strengthCell.innerHTML = obj.active_ingredients[i].strength + " " + obj.active_ingredients[i].strength_unit;
		}
		
		table.deleteRow(-1);
	});
});

function newSearch() {

	window.location = "./index.html";
}
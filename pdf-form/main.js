
var provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland & Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon"
];

var states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",

];

var P1CContacts = 0;
var P2BReferences = 0;
var P2CMasters = 0;
var P3Sites = 0;
var P4OtherBrands = 0;
var P4AMedIngredients = 0;
var P4BNonMedIngredients = 0;
var P4DUsePurposes = 0;
var P4DSubPopulations = 0;
var P4DDurationStatements = 0;
var P4DCautions = 0;
var P4DContradictions = 0;
var P4DAdverseReactions = 0;

$(document).ready(function () {

    $(".ui.dropdown").dropdown();
    $(".ui.checkbox").checkbox();
    $(".ui.radio.checkbox").checkbox()
});

function initDropdown(id, list) {

}

function addContact() {

    P1CContacts++;
}

function addReference() {

    P2BReferences++;
}

function addMaster() {

    P2CMasters++;
}

function addSite() {

    P3Sites++;
}

function addBrand() {

    P4OtherBrands++;
}

function addMedIngredient() {

    P4AMedIngredients++;
}

function addNonMedIngredient() {

    P4BNonMedIngredients++;
}

function addUsePurpose() {

    P4DUsePurposes++;
}

function addSubPopulation() {

    P4DSubPopulations++;
}

function addDurationStatement() {

    P4DDurationStatements++;
}

function addCaution() {

    P4DCautions++;
}

function addContradiction() {

    P4DContradictions++;
}

function addAdverseReaction() {

    P4DAdverseReactions++;
}
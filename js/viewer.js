$(document).ready(function() {

    // Getting element from the Jade
    "use strict";
    var d = document;
    var input = d.getElementById("input");
    var button = d.getElementById("random");
    var appendToResults = d.getElementById("results");

    // API endpoint
    var url = "https://en.wikipedia.org/w/api.php?action=query";

    // Enter key trigger as a button press
    $("#input").keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            generateURL(url, input.value);
            $("#input").val("");
        }
    });

    // Generates the url and passes it to the search function
    function generateURL(url, value) {
        value = value.replace(/ /g, "%20");
        var link = url + '&titles=' + value + '&prop=revisions&rvprop=content&format=json';
        search(link);
    }

    function search(url) {
        console.log(url);
    }

    // Creates the card elements
    function createCardElements() {
        var card = d.createElement("div");
        var cardTitle = d.createElement("p");
        var cardDescription = d.createElement("p");
        assignProperties(card, cardTitle, cardDescription);
    }

    function assignProperties(card, title, description) {
        // Assign class and id
        card.className = "row card";
        title.setAttribute("id", "card-title");
        description.setAttribute("id", "card-description");
        // Assign values of card title and description
    }

    function generateCard(card, title, description) {
        // Adds card title and description to the card
        card.appendChild(title);
        card.appendChild(description);

        // Adds card to the result div tag
        appendToResults.appendChild(card);
    }

    // Initiate Wow Animation
    new WOW().init();
});
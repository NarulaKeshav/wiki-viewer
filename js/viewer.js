$(document).ready(function() {

    // Getting element from the Jade
    "use strict";
    var d = document;
    var input = d.getElementById("input");
    var button = d.getElementById("random");
    var clearButton = d.getElementById("clear");
    var appendToResults = d.getElementById("results");
    var showMessage = d.getElementById("show-message");
    var searchTerm = d.getElementById("search-term");

    // Post title and descrption
    var postTitle = "";
    var postDescription = "";
    var postLink = "";

    // API endpoint
    var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var callback = "&callback=?";

    // Searches for content when enter is triggered
    $("#input").keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            generateURL(url);
            console.log(input.value);
            $(".showing-results").css("display", "block");
            showMessage.innerHTML = "Showing Results for ";
            searchTerm.innerHTML = input.value;
            input.value = "";
            $("#clear").prop("disabled", false);
        }
    });

    // Generates the url and passes it to the search function
    function generateURL(url) {
        var value = input.value.replace(/ /g, "%20");
        var link = url + value  + callback;
        search(link);
    }

    // Parses the JSON and retrives the post title, description, and link
    function search(url) {
        appendToResults.innerHTML = null;
        $.getJSON(url, function(data) {
            var numberOfResults = data[1].length;

            // If there are no search results
            if(numberOfResults < 1) {
                showMessage.innerHTML = "Uh oh! No results for ";
            }
            else {
                for(var i = 0; i < data[1].length; i++) {
                    postTitle = data[1][i];
                    postDescription = data[2][i];
                    postLink = data[3][i];

                    // Create the card elements
                    createCardElements();
                }
            }
        });
    }

    // Creates the card elements
    function createCardElements() {
        var wikiLink = d.createElement("a"); // creates link tag
        var card = d.createElement("div"); // creates div tag
        var cardTitle = d.createElement("p"); // creates title 
        var cardDescription = d.createElement("p"); // creates description
        setAttributes(card, cardTitle, cardDescription, wikiLink);
        generateCard(card, cardTitle, cardDescription, wikiLink);
    }

    // Sets necessary attributes
    function setAttributes(card, title, description, link) {
        // Assign class and id
        link.setAttribute("href", postLink);
        link.setAttribute("target", "_blank");

        card.className = "row card";

        title.setAttribute("id", "card-title");
        title.innerHTML = postTitle;

        description.setAttribute("id", "card-description");
        if(postDescription.length === 0) {
            description.innerHTML = "No description for this article. Click to find out about it 😎";
        }
        else description.innerHTML = postDescription;
    }

    // Generates the card and appends to the results
    function generateCard(card, title, description, link) {
        // Adds card title and description to the card
        card.appendChild(title);
        card.appendChild(description);

        // Add card to link
        link.appendChild(card);

        // Adds card to the result div tag
        appendToResults.appendChild(link);
    }

    // Clears the results
    clearButton.onclick = function() {
        appendToResults.innerHTML = null;
        $("#clear").prop("disabled", true);
        showMessage.innerHTML = "Oh look. everything is gone. ";
        searchTerm.innerHTML = "So much WOW!";
    };

    // Initiate Wow Animation
    new WOW().init();
});
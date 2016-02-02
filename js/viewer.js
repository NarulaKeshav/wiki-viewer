$(document).ready(function() {

    // Getting element from the Jade
    "use strict";
    var d = document;
    var input = d.getElementById("input");
    var button = d.getElementById("random");
    var appendToResults = d.getElementById("results");

    // Post title and descrption
    var postTitle = d.getElementById("card-title");
    var postDescription = d.getElementById("card-description");
    var postLink = "";

    // API endpoint
    var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var callback = "&callback=?";

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
        var link = url + value  + callback;
        search(link);
    }

    function search(url, value) {
        console.log(url);
        $.getJSON(url, function(data) {
            var numberOfResults = data[1].length;

            // If there are no search results
            if(numberOfResults < 1) {
                $(".showing-results").html("Uh oh! No results for ");
                $("#search-term").html(input.innerHTML);
            }
            else {
                for(var i = 0; i < data[1].length; i++) {
                    postTitle.innerHTML = data[1][i];
                    postDescription.innerHTML = data[2][i];
                    postLink = data[3][i];

                    // Create the card elements
                    createCardElements();

                    console.log(postTitle);
                    console.log(postDescription);
                    console.log(postLink);
                }
            }
        });
    }

    // Creates the card elements
    function createCardElements() {
        var wikiLink = d.createElement("a");
        var card = d.createElement("div");
        var cardTitle = d.createElement("p");
        var cardDescription = d.createElement("p");
        setAttributes(card, cardTitle, cardDescription, wikiLink);
        generateCard(card, cardTitle, cardDescription, wikiLink);
    }

    function setAttributes(card, title, description, link) {
        // Assign class and id
        link.setAttribute("id", "external-link");
        link.setAttribute("href", postLink);

        card.className = "row card";

        title.setAttribute("id", "card-title");
        title = postTitle.innerHTML;

        description.setAttribute("id", "card-description");
        description = postDescription.innerHTML;
    }

    function generateCard(card, title, description, link) {
        // Adds card title and description to the card
        card.appendChild(title);
        card.appendChild(description);

        // Add card to link
        link.appendChild(card);

        // Adds card to the result div tag
        appendToResults.appendChild(card);
    }

    // Initiate Wow Animation
    new WOW().init();
});
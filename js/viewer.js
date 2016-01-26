$(document).ready(function() {

    // Getting element from the Jade
    "use strict";
    var d = document;
    var input = d.getElementById("input");
    var button = d.getElementById("random");

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

    // Initiate Wow Animation
    new WOW().init();
});
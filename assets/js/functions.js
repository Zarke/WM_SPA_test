//get data form the JSON file
function getData(){
    $.getJSON('assets/data.json', function(json) {
        questions = json;
    })
}


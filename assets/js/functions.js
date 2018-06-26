//get data form the JSON file
function getData(item){
    $.getJSON('assets/data.json', function(json) {
        questions = json;
    })
    localStorage.setItem("tagTypes", JSON.stringify(item));
    
}
//checks if value is true and sets checked icon accordingly
function isTrue(table,colIndx){
    table.rows().every(function (rowIdx) {
    if(table.cell(rowIdx, colIndx).data()){
        table.cell(rowIdx, colIndx).data('<i class="fas fa-check"></i>')
    }
  }).draw();
}

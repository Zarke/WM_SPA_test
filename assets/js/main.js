var questions;
var tagTypes = ["Person","City","Car","Football Club","Object"]
getData(tagTypes)

$(function(){
    $("#entry").view(questions);
    $('#tagTypes').view(JSON.parse(localStorage.getItem("tagTypes")))
    var table = $("table").DataTable(
        {"dom": '<"top"f>rt<"bottom"lp><"clear">'}
    );
    //sets my Feed and my Favourites checked icons
    isTrue(table,3);
    isTrue(table,4);

    //deletes the row when the delete icon is clicked
    $('table tbody').on( 'click', 'i.fa-times', function () {
        table.row( $(this).parents('tr') ).remove().draw();
    } );

    $('table tbody').on( 'click', 'tr', function () {
        console.log( table.row( this ).data() );
    } );

    
    
})
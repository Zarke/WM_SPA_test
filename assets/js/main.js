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

    //fill out the modal with the information from the clicked row
    $('table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        var self = this;
        console.log()
        $('#tagName').val(data[1])
        if(!data[3]){
            $('#myFeed').prop( "checked", false );
        }
        if(!data[4]){
            $('#myFav').prop( "checked", false );
        }
        if(!data[2]){
            $('#tagTypes').val(0);
        } else { 
            $('#tagTypes').val(data[2]) 
        }
        $('#save').on('click',$.proxy(function(){
            data = alterRow(data)
            table.row(this).data(data);
        }, this ))
       
    } );
})



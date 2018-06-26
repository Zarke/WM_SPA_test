var questions;
getData()

$(function(){
    $("#entry").view(questions);
    var table = $("table").DataTable(
        {"dom": '<"top"f>rt<"bottom"lp><"clear">'}
    );
    //sets my Feed and my Favourites checked icons
    isTrue(table,3);
    isTrue(table,4);
})
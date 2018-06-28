var entries;//varaible that stores table entries
var tagTypes = ["Person","City","Car","Football Club","Object"];
var rowData = ["","","","","","<i class='fas fa-pen' data-toggle='modal' data-target='#inputModal'></i> <i class='fas fa-times'></i>"];//variable that holds data for the inserted row

$(function(){
    //loads tagTypes into the dropdown in the modal
    $('#tagTypes').view(JSON.parse(localStorage.getItem("tagTypes")))

    //loads data via ajax call and defines a statis actions column taht is the same for all entries
    var table = $("table").DataTable({
        'dom': '<"top"f>rt<"bottom"lp><"clear">',
        'ajax'       : {
            "type"   : "POST",
            "url"    : "assets/data.json",
            "dataSrc": function (json) {
              var return_data = new Array();
              for(var i=0;i< json.length; i++){
                return_data.push({
                  'tagID': json[i].tagID,
                  'tagName'  : json[i].tagName,
                  'tagType' : json[i].tagType,
                  'myFeed' : json[i].myFeed,
                  'myFavourites' : json[i].myFavourites,
                  'actions' : '<i class="fas fa-pen" data-toggle="modal" data-target="#inputModal"></i> <i class="fas fa-times"></i>'
                })
              }
              return return_data;
            }
          },
          "columns"    : [
            {'data': 'tagID'},
            {'data': 'tagName'},
            {'data': 'tagType'},
            {'data': 'myFeed'},
            {'data': 'myFavourites'},
            {'data': 'actions'},
          ],
          "fnInitComplete": function(oSettings, json) {
            setIcons(table,3);
            setIcons(table,4);
          }
      
    }
    );

    //deletes the row when the delete icon is clicked
    $('table tbody').on( 'click', 'i.fa-times', function () {
        table.row( $(this).parents('tr') ).remove().draw();
    } );

    // $('table tbody').on('click', 'tr', function () {
    //     console.log(table.row(this).data());
    // });
    //fill out the modal with the information from the clicked row
    $('table tbody').on('click', 'tr', function () {
        data = table.row(this).data();
        $('#tagName').val(data.tagName);
        if(!data.myFeed){
            $('#myFeed').prop( "checked", false );
        } else{$('#myFeed').prop( "checked", true );}
        if(!data.myFavourites){
            $('#myFav').prop( "checked", false );
        } else {$('#myFav').prop( "checked", true );}
        if(!data.tagType){
            $('#tagTypes').val(0);
        } else { 
            $('#tagTypes').val(data.tagType) ;
        }
        $('#save').one('click',$.proxy(function(){
            data = alterRow(data);
            table.row(this).data(data);
        }, this ))
    } );

    //adds a new row and goes to the last page of the pagination
    // $('#save').on('click',function(){
    //     rowData = alterRow(rowData)
    //     rowData[0] = TagId(table) + 1; 
    //     console.log(rowData[0])
    //     console.log(table.rows().nodes())
    //     table.row.add(rowData).draw()
    //     table.page('last').draw()
    //     $('#inputModal').modal('hide');
    // })
})



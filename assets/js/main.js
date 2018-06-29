var tagIDs = new Array();//used for determening id of a new entry
var tagTypes = ['Person','City','Car','Football Club','Object'];//all available tags
var rowData =   {'tagID':'','tagName':'','tagType':'','myFeed':'','myFavourites':'','actions':'<i class="fas fa-pen" data-toggle="modal" data-target="#inputModal"></i> <i class="fas fa-times"></i>'};//template for a new row

$(function(){
    //loads tagTypes into the dropdown in the modal
    $('#tagTypes').view(JSON.parse(localStorage.getItem("tagTypes")))
    
    //loads data via ajax call and defines a static actions column that is same for all entries
    var table = $("table").DataTable({
        'dom': '<"top"f>rt<"bottom"lp><"clear">',
        "pagingType": "full_numbers",
        "searching": true, 
        'ajax'       : {
            "type"   : "POST",
            "url"    : "assets/data.json",
            "dataSrc": function (json) {
              var return_data = new Array();
              for(var i=0;i< json.length; i++){
                return_data.push({
                  'tagID': parseInt(json[i].tagID),
                  'tagName'  : json[i].tagName,
                  'tagType' : json[i].tagType,
                  'myFeed' : json[i].myFeed,
                  'myFavourites' : json[i].myFavourites,
                  'actions' : '<i class="fas fa-pen" data-toggle="modal" data-target="#inputModal"></i> <i class="fas fa-times"></i>'
                })
                tagIDs.push(return_data[i].tagID);//loads initial tagID values fron the json file
              }
              return return_data;
            }
          },
          "columns"    : [
            {"searchable": true,'data': 'tagID'},
            {"searchable": true,'data': 'tagName'},
            {"searchable": true,'data': 'tagType'},
            {'data': 'myFeed'},
            {'data': 'myFavourites'},
            {'data': 'actions'},
          ],
          "fnInitComplete": function() {
            setIcons(table,3);
            setIcons(table,4);
            $('#newEntry').click(function(){
                addEntry(table);
            });
          }
    }
    );

    //search options for the first three columns
    $('#searchTagID').on('keyup', function(){
        table.column(0).search(this.value).draw();
    });
    $('#searchTagName').on('keyup', function(){
        table.column(1).search(this.value).draw();
    });
    $('#searchTagType').on('keyup', function(){
        table.column(2).search(this.value).draw();
    });

    //deletes the row when the delete icon is clicked
    $('table tbody').on( 'click', 'i.fa-times', function () {
        table.row( $(this).parents('tr') ).remove().draw();
    } );

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
            data = getRowData(data);
            table.row(this).data(data);
        }, this ))
    } );
    
    
})



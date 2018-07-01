var tagIDs = new Array();//used for determening id of a new entry
var tagTypes = ['Person','City','Car','Football Club','Object'];//all available tags
var rowData =   {'tagID':'','tagName':'','tagType':'','myFeed':'','hiddenFeed':'','myFavourites':'','hiddenFav':'','actions':'<i class="fas fa-pen" data-toggle="modal" data-target="#inputModal"></i> <i class="fas fa-times"></i>'};//template for a new row

$(function(){
    //loads tagTypes into the dropdown in the modal
    $('#tagTypes').view(JSON.parse(localStorage.getItem("tagTypes")))
    
    //loads data via ajax call and defines a static actions column that is same for all entries
    var table = $("table").DataTable({
        'dom': '<"top"f>rt<"bottom"lp><"clear">',
        "pagingType": "full_numbers",
        "searching": true, 
        'ajax'       : {
            "type"   : "GET",
            "url"    : "assets/data.json",
            "dataSrc": function (json) {
              var return_data = new Array();
              for(var i=0;i< json.length; i++){
                return_data.push({
                  'tagID': parseInt(json[i].tagID),
                  'tagName'  : json[i].tagName,
                  'tagType' : json[i].tagType,
                  'myFeed' : json[i].myFeed,
                  'hiddenFeed':json[i].myFeed,
                  'myFavourites' : json[i].myFavourites,
                  'hiddenFav':json[i].myFavourites,
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
            {'data':'hiddenFeed'},
            {'data': 'myFavourites'},
            {'data':'hiddenFav'},
            {'data': 'actions'},
          ],
          "columnDefs":[
            {
                "width": "10%",
                "targets":[0]
            },
            {
              "width": "12%",
              "targets":[3]
            },
            {
              "targets":[4],
              "visible":false
            },
            {
              "width": "12%",
              "targets":[5]
            },
            {
              "targets":[6],
              "visible":false
            }
          ],
          "language": {
            "paginate": {
              "first": "<i class='fas fa-step-backward'></i>",
              "previous": "<i class='fas fa-caret-left'></i>",
              "next": "<i class='fas fa-caret-right'></i>",
              "last": "<i class='fas fa-step-forward'></i>",
            }
          },
          "fnInitComplete": function() {
            setIcons(table,3);
            setIcons(table,5);
            $('#newEntry').click(function(){
                addEntry(table);
            });
          }
    });


    //custom filter for My Feed and My Favourites
    $.fn.dataTable.ext.search.push(
        function( settings, data, dataIndex ) {
            var myFeed = $('#filterFeed').val();
            var myFav = $('#filterFav').val();
            var checkedFeed = data[4]; // use data for the hiddenFeed column
            var checkedFav = data[6]; // use data for the hiddenFeed column
            if ( 
                 (!myFeed && !myFav) ||
                 (!myFeed && myFav == checkedFav) ||
                 (myFeed == checkedFeed && !myFav) ||
                 (myFeed == checkedFeed && myFav == checkedFav)
               )
            {
                return true;
            }
            return false;
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
    //filter trigers for My Feed and My Favourites 
    $('#filterFeed').change(function(){
        table.draw();
    })
    $('#filterFav').change(function(){
        table.draw();
    })

    //deletes the row when the delete icon is clicked
    $('table tbody').on( 'click', 'i.fa-times', function () {
        table.row( $(this).parents('tr') ).remove().draw();
    } );

    //fills out the modal with the information from the clicked row
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
            data = getRowData(data);//sets the data for the selected row into the data variable
            table.row(this).data(data).draw();//appends the new row 
        }, this ))
    } );
    
    
})



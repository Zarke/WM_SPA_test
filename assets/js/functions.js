
//checks if value is true and sets checked icon accordingly
function setIcons(table,colIndx){
    table.rows().every(function (rowIdx) {
    if(table.cell(rowIdx, colIndx).data() == 'true'){
        table.cell(rowIdx, colIndx).data('<i class="fas fa-check"></i>');
    } else{
        table.cell(rowIdx, colIndx).data('');
    }
  }).draw();
}

//displays the uploaded image after short progress bar 'load'
function getImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.progress').removeClass('d-none');
            $('#upload i,#upload span').addClass('d-none');
            $('.progress-bar').animate({width:'100%'},700,function(){
                $('.progress').addClass('d-none');
                $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0); 
                $('#upload').css('background','url(' + e.target.result + ') no-repeat').addClass('img-cover');
                $('#upload').removeClass('upload_border');
            })
        };  
        reader.readAsDataURL(input.files[0]);
    }
}

//returns the updated values for the selected row or sets value for the added row
function getRowData(data){
    //checks if tagName input is empty adn triggers the popover
    if(!$('#tagName').val()){
        $('#tagName').popover("show");
        setTimeout(function(){
            $('#tagName').popover("hide");  
        },700)
    } else {
        data.tagName = $('#tagName').val();//tagName value of the selected row
        data.tagType = $('#tagTypes').val();//tagType value of the selected row
        if(!$('#myFeed').is(':checked')){ //if myFeed is not checked this cell will be empty on render
            data.myFeed = '';
            data.hiddenFeed = 'false';
        } else {
            data.myFeed = '<i class="fas fa-check"></i>';
            data.hiddenFeed = 'true';
        }//if it is checked it will have the value of the checked icon 
        if(!$('#myFav').is(':checked')){
            data.myFavourites = '';
            data.hiddenFav = 'false';
        } else{
            data.myFavourites = '<i class="fas fa-check"></i>';
            data.hiddenFav = 'true';
        }
    }
    //keeps tagIDs variable up to date on changes
    for(var i=0;i< maxTagID.length; i++){
        if(data.tagID == tagIDs[i]){
            tagIDs[i] = data.tagID;
        }
    }
    return data;
}

//resets image upload
function removeImg(){
    $('#upload').css('background-image', 'url()');
    $('#upload i, #upload span').removeClass('d-none');
    $('#upload').addClass('upload_border');
}

//ensures that the generated tagID is unique by giving it value that is bigger than any that already exists
function getMaxTagId(tagIDs){
    maxTagID = maxTagID + 1;
    return maxTagID;
}

//adds the now filled rowata template to the table and updates it
function addEntry(table){
    $('#inputModal').modal('show');
    $('#save').one('click',function(){
        rowData = getRowData(rowData);
        rowData.tagID = getMaxTagId(maxTagID);
        table.row.add(rowData).draw();
        table.page( 'last' ).draw( 'page' );
    })
    
}

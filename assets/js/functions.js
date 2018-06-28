
//checks if value is true and sets checked icon accordingly
function setIcons(table,colIndx){
    table.rows().every(function (rowIdx) {
    if(table.cell(rowIdx, colIndx).data()){
        table.cell(rowIdx, colIndx).data('<i class="fas fa-check"></i>');
    }
  }).draw();
}

//displays the uploaded image after short progress bar load
function getImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.progress').removeClass('d-none');
            $('#upload i').addClass('d-none');
            $('.progress-bar').animate({width:'100%'},700,function(){
                $('.progress').addClass('d-none');
                $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0); 
                $('#upload').css('background-image','url(' + e.target.result + ')');  
            })
            
            
        };  
        reader.readAsDataURL(input.files[0]);
    }
}

//returns the new values for the invoked row
function alterRow(data){
    if(!$('#tagName').val()){
        $('#tagName').popover("show");
        setTimeout(function(){
            $('#tagName').popover("hide");  
        },700)
    } else {
        data.tagName = $('#tagName').val();//tagName
        data.tagType = $('#tagTypes').val();//chosen tagType
        if(!$('#myFeed').is(':checked')){ //if myFeed is not checked this cell will be empty on render
            data.myFeed = '';
        } else {data.myFeed = '<i class="fas fa-check"></i>';}//if it is checked it will have the value of the checked icon 
        if(!$('#myFav').is(':checked')){
            data.myFavourites = '';
        } else{data.myFavourites = '<i class="fas fa-check"></i>';}
    }
    return data;
}

//resets image upload
function removeImg(){
    $('#upload').css('background-image', 'url()');
    $('#upload i').removeClass('d-none');
}

//creates the TagId so taht the new entry will be in the last place in the default pagination
function TagId(table){
    var maxTagId = table.cell(0,0).data();
    $(table.rows().nodes()).each(function(rowIdx){
        if(table.cell(rowIdx, 0).data() > maxTagId){
            maxTagID = table.cell(rowIdx,0).data();
            console.log(maxTagId);
        }
    })

    return maxTagId;
}

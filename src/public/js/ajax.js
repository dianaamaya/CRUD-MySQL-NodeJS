/**
 * request to the server
 */

$(function(){
ajax = (url, type, data, callback) => {

    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify( data ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {    
            if(res.status){              
                $(".alert").fadeTo(2000, 500).slideUp(500, function(){
                    $(".alert").slideUp(500);
                    $(".alert").slideUp(0);
                });     
            }            
            callback(res);
        },
        error: function (request, status, errorThrown) {
            callback(status);
        }
    });
}
});

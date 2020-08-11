/**
  * get user name (to greet him/her)
  */

$(function(){

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var username = getUrlParameter('username');
    var fullname = getUrlParameter('fullname');

    if(!username || !fullname){
        $(location).attr('href', '/signin.html'); 
    }

    $('#fullname').text(`Welcome ${fullname} !`);
    $('#username').text(username);

});
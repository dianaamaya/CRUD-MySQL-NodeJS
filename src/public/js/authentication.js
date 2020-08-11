/**
 * functions to request to the server: regirter, log in or log out a user
 */
$(function(){
    //sign up user
    $('#signup').on('submit', function(e){     

        e.preventDefault();

        const user = {
            fullname: $('#fullname').val(),
            username: $('#username').val(),
            password: $('#password').val()
        }

        ajax('/user/signup', 'POST', user, function(res){
            if(res.id) $(location).attr('href', '/signin.html')     
            else {
                alert(res.status);
            }     
        });
        
    });
    //sign in user
    $('#signin').on('submit', function(e){     

        e.preventDefault();

        const user = {
            username: $('#username').val(),
            password: $('#password').val()
        }

        ajax('/user/signin', 'POST', user, function(res){
            if(!res.id) {
                alert(res.status); 
            } 
            else {
                $(location).attr('href', `/profile.html?username=${res.username}&fullname=${res.fullname}`);
            }      
        });  
        
    });
    // log out user
    $('#logout').on('click', function(){

        ajax('/user/logout', 'GET', {}, function(res){
            if(res.status) $(location).attr('href', '/signin.html');        
        });
        
    });
});
/**
 * request to the server links information
 */
$(function(){
  
    var allTypes = [];
    var selectedLink = "";
    $(".alert").slideUp(0);      

    //get and show all links
    getLinks = () => {
        //get links types
        ajax('/types', 'GET', {}, function(types){

            if(types.status == "no session") $(location).attr('href', '/signin.html');  
               
            let options = "";
            allTypes = [];
                
            for(let i in types){
                allTypes[types[i].id] = types[i].type;
                options += `<option ${ i ? "" : "selected" } value="${types[i].id}">${types[i].type}</option>`;
            }

            $('#type').children().remove();
            $('#type').append(options);

            //get user links
            ajax('/links/', 'GET', {}, function(links){

                let cards = "";

                if(links.length) {
                    let currentLink = {};                   

                    for(let i in links){

                        currentLink = links[i];
                    
                        cards +=`<div class="col-md-4">
                                    <div class="card text-center mb-4">
                                        <div class="card-body">
                                            <a href="${currentLink.url}" target="_blank">
                                                <h3 class="card-title text-uppercase">
                                                    ${currentLink.title}
                                                </h3>
                                            </a>
                                            <p class="m-2">
                                                ${currentLink.description}
                                            </p>
                                            <p clas="timeago">
                                                ${timeSince(currentLink.created_at)}
                                            </p>
                                            <p>
                                                ${(currentLink.type_id ? allTypes[currentLink.type_id] : "other type")}
                                            </p>
                                            <button onclick="deleteLink(${currentLink.id})" 
                                                class="btn btn-danger">
                                                Delete
                                            </button>
                                            <button onclick="editLink(${currentLink.id})" 
                                                class="btn btn-secondary">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
                        

                    }
                }     
                else {
                    cards += `<div class="card card-body text-center">
                                <p>There are not links saved yet.</p>
                                <h1 class="text-info">Create One!</h1>
                             </div> `;
                }           

                $('#linksList').children().remove();       
                $('#linksList').append(cards);       
            });
        });        
        
    }

    getLinks();
    
    //create/edit a link
    $('#createLink').on('submit', function(e){     

        e.preventDefault();
        //prepare values
        const newLink = {
            title: $('#title').val(),
            url: $('#url').val(),
            description: $('#description').val(),
            type_id: $('#type').val()
        }
        // if we are going to update a link
        if(selectedLink) {
            ajax(`/links/${selectedLink}`, 'PUT', newLink, function(res){
                if(res.status === true) {
                    cleanForm(); 
                }                
            });

        }
        else {
            // if we are going to create a new link
            ajax('/links', 'POST', newLink, function(res){
                if(res.status === true) {
                    cleanForm();
                }                
            });
        }   
    });

    //edit link
    editLink = ( id ) => {

       ajax(`/links/${id}`, 'GET', {}, function( link ){

           $('#title').val(link.title);
           $('#url').val(link.url);
           $('#description').val(link.description);
           $('#type').val((link.type_id ? link.type_id : 'other type'));
           selectedLink = id;

        });
       
    }

    // delete a link
    deleteLink = (id) => {
        ajax(`/links/${id}`, 'DELETE', {}, function( res ){    
            cleanForm();
        });
    }

    // clean data in form after some actions
    cleanForm = () => {
        $('#title').val("");
        $('#url').val("");
        $('#description').val("");
        $('#type').val("");
        selectedLink = "";
        getLinks();    
    }

    //format data        
    function timeSince(date) {

        date = new Date(date);

        var seconds = Math.floor((new Date() - date) / 1000);
    
        var interval = Math.floor(seconds / 31536000);
    
        if (interval >= 1) {
        return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
        return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
        return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
        return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
        return interval + " minutes ago";
        } 
        if(seconds > 5 && seconds < 60) {
            return Math.floor(seconds) + " seconds ago";
        }
        return "just now";
        
    }

    
});
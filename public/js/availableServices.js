// When the document is ready run the code inside this function
$(document).ready(function () {
    // this is a variable to hold all of the ajax methods in an object called API not sure why API is underlined in red... 
    let API = {
        // this function is an ajax request to get all the data from the given route
        getUsers: function () {
            return $.ajax({
                url: "api/users",
                type: "GET"
            });
        },

        postUserId: function (id) {
            return $.ajax({

                url: "api/userupdate/" + id,
                type: "GET",
                data: id
            });
        }
    };
    // This runs the getUsers function. Then after the user data has been retrieved we run a callback function in the form of a promise(.then()) that dynamically creates a new bootstrap "media-object" to display each user and the skill(s) they are offering in the time bank.
    API.getUsers().then(function (userData) {

        // creates a variable called allUsers and using the jquery .map() method (instead of a forloop) we are creating a new array with all of the user objects in it which we assign to the appropriate html elements using jquery.
        let allUsers = userData.map(function (currentUser) {

            console.log(currentUser);

            // fullName uses string interpolation to combine firstName and lastName columns of userdb for each user into a single variable.
            let fullName = `${currentUser.firstName} ${currentUser.lastName}`;

            // name renders the header html element of the bootstrap media-object and inserts the fullName variable for each user into the that element using .text(). 
            let name = $(`<h5 class="mt-0 mb-1 id="nameDisplay">`)
                .text(`Name: ${fullName}`);

            // variable that dynamically creates an html <p> tag and using .text() inserts the text found in the skill column of the userdb
            let skill = $(`<p id="skillText">`)
                .text(`Skill: ${currentUser.skill}`);

            // A solution I found for how to render multiple html elements with jquery to build the contact link: https://stackoverflow.com/questions/747178/how-to-create-multiple-html-elements-with-jquery
            let accountUpdate = $(`<h5 class="media accountUpdate" data-toggle="modal" data-target="#exampleModal" id=${currentUser.id}>`)
                .text(`Account Update`);

            // this follows the same pattern as the two lines of code above but the appends the two previous variables to it.
            let mediaBody = $(`<div class="media-body nameSkill" >`)
                .append(name, skill);

            // .attr allows us to set a dynamic src attribute to the <img> tage specific to each user in the database.
            let mediaImage = [
                `<a href="mailto:${currentUser.email}">
                    <img class="mr-3" id="userImage" src=${currentUser.image} alt="This is a photograph of: ${fullName}">
                </a>`
            ];

            // here we append the users image and the media body which contains their unique name and skill to create the complete media-object 
            let mediaObject = $(`<li class="media" id="mediaObject">`)
                .append(mediaImage, mediaBody, accountUpdate)


            // mediaContainer is the container for all of the media-objects so that we have a place to append them all after they are created
            let mediaContainer = $(`<ul class="list-unstyled" id="skillBank">`)
                .append(mediaObject);

            //This allows us to control the size and position of the media container on the DOM.
            $(`#centerBody`).append(mediaContainer);


            // return currentUser;

        });
        // FIXME: I need to be able to get at this variable to handle account update functionality
        // return allUsers;
    });

    // console.log(allUsers);

    // This is the event handler for the accountUpdate <h5> created on 
    $(document).on("click", ".accountUpdate", function (event) {
        event.preventDefault();

        let id = $(this).attr("id");

        API.postUserId(id).then(function (userToUpdate) {
            console.log(`the id: ${id} was posted`);
        });

        console.log(`you clicked: ${id}`);

        $("#exampleModal").modal("toggle");
        // });
    });

});


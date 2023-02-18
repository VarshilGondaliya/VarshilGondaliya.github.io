// Comment Header:
// Full Name: Varshil Gondaliya
// StudentID: 100854210
// Date Completed: 02/03/2023
"use strict";

(function () {


    function DisplayHomePage() {
        console.log("Home Page Called")
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
            location.href = "about.html"
        });

        let XHR = new XMLHttpRequest();
        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200)
            {
                console.log(XHR.responseText);
            }
        });

        XHR.addEventListener("readystatechange", () => {
           if(XHR.readyState === 4 && XHR.status === 200)
           {
               $("header").html(XHR.responseText);
               $("li>a:contains('Home')").addClass("active");
           }
        });

        if(XHR.readyState === 4 && XHR.status === 200)
        {
            $("header").html(XHR.responseText);
            $("li>a:contains(${document.title})").addClass("active");
        }

        XHR.open("GET", "header.html")
        XHR.send();


        $("#AboutUsBtn").on("click", () => {
            location.href = "index.html"
        });
        $("main").append('<p id="MainParagraph" class="mt-3" > This is the main paragraph</p> ');
        $("body").append('<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>');

        $("main").append('<p id="MainParagraph" class="mt-3"> This is my main Paragraph</p>');

    }
    function AjaxRequest(method, url, callback){
        let XHR  = new XMLHttpRequest();

    XHR.addEventListener("readyStatechange", () =>{
        if(XHR.readyState === 4 && XHR.status === 200) {
            if (typeof callback === "function") {
                callback(XHR.responseText);
            } else {
                console.error("ERROR: callback not a function");
            }
        }
    });
        XHR.open("GET", "header.html")
        XHR.send();
    }

    function Start()
    {
        console.log("App Started!");
        AjaxRequest("GET", "header.html", LoadHeader);
    }

    function DisplayProductsPage() {
        console.log("Products Page Called")

    }

    function DisplayServicePage() {
        console.log("Service Page Called")
    }


    function DisplayAboutUsPage() {

    }

    function DisplayLoginPage() {
        // Obtain a reference to the messageArea using jQuery and initially hide it
        const messageArea = $('#messageArea');
        messageArea.hide = function () {

        };
        messageArea.hide();

        // Add click event handler to the login button
        $('#loginButton').on('click', function() {
            // Set initial success flag to false
            let success = false;

            // Instantiate a new user
            const user = new Core.User();

            // Make an Ajax call to the users.json data
            $.get('/data/users.json', function(users) {
                // Check if the username and password match
                users.forEach(function(userData) {
                    if (userData.username === $('#username').val() && userData.password === $('#password').val()) {
                        success = true;
                        user.displayName = userData.displayName;
                        user.emailAddress = userData.emailAddress;
                        user.username = userData.username;
                    }
                });

                // If login was successful, store the user in sessionStorage and redirect to contact-list.html
                if (success) {
                    sessionStorage.setItem('user', user.serialize());
                    messageArea.removeAttr('class');
                    messageArea.hide();
                    window.location.replace('contact-list.html');
                } else {
                    // If login failed, show an error message in the messageArea and focus on the username field
                    $('#username').focus().select();
                    messageArea.attr('class', 'alert alert-danger');
                    messageArea.text('Login failed. Please check your username and password.');
                    messageArea.show();
                }
            });
        });

        // Add click event handler to the cancel button
        $('#cancelButton').on('click', function() {
            // Reset the login form and return to index.html
            $('#loginForm')[0].reset();
            window.location.replace('index.html');
        });
    }
    function CheckLogin() {
        const user = sessionStorage.getItem('user');
        const loginLink = $('#loginLink');

        if (user) {
            // A user is logged in
            loginLink.html('<a href="#">Logout</a>');
            loginLink.click(() => {
                sessionStorage.clear();
                location.href = 'login.html';
            });
        } else {
            // No user is logged in
            loginLink.html('<a href="login.html">Login</a>');
        }
    }
    function LoadHeader() {
        // ... existing code ...
        CheckLogin();
    }



    function DisplayContactPage() {
        console.log("Contact Page Called")

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (event) {
            event.preventDefault();
            if (subscribeCheckBox.checked) {

                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }

            }

        });

        sendButton.addEventListener("click", function (event) {

            if (subscribeCheckBox.checked) {

                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }

            }
        });


    }


    function DisplayContactListPage() {
        console.log("Contact List Page Called")
    }

    function Start() {
        console.log("App Started!")
        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case  "Our Products":
                DisplayProductsPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayServicePage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
        }

    }

    window.addEventListener("load", Start)



}) ();
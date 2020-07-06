"use strict";

// IIFE
(function(){

    function highlightActiveLink() 
    {
        let title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "home") && (anchorString === "index") || (title === anchorString)) 
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    //JUMBOTRON
    function addParagraphsToJumbotron() 
    {
        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        if (jumbotron) 
        {
            let newParagraph = document.createElement("p");

            newParagraph.textContent ="Welcome!";

            jumbotron.appendChild(newParagraph);

            let newDiv = document.createElement("div");

            newDiv.innerHTML ="My name is Aileen and this is my Mini Portfolio.";

            jumbotron.appendChild(newDiv);

            return true;
        }
        return false;
    }

    function addParagraphsToProject1() 
    {
        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        if (jumbotron) 
        {
            let newParagraph = document.createElement("p");

            newParagraph.textContent ="Welcome!";

            jumbotron.appendChild(newParagraph);

            let newDiv = document.createElement("div");

            newDiv.innerHTML ="This is my Mini Portfolio.";

            jumbotron.appendChild(newDiv);

            return true;
        }
        return false;
    }
    function validateForm()
    {
        let contactForm = document.forms[0];

        if(contactForm)
        {
            contactForm.noValidate = true;

            let errorMessage = document.getElementById("errorMessage");

            let firstName = document.getElementById("firstName");
            firstName.addEventListener("blur", (event) => 
            {
                if(firstName.value.length < 2)
                {
                    firstName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid First Name with a length of 2 or more characters"; 
                }
                else
                {
                    errorMessage.hidden = true;
                }
            });

            let lastName = document.getElementById("lastName");
            lastName.addEventListener("blur", (event) => 
            {
                if(lastName.value.length < 2)
                {
                    lastName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid Last Name with a length of 2 or more characters"; 
                }
                else
                {
                    errorMessage.hidden = true;
                }
            });

            let submitButton = document.getElementById("submitButton");

            submitButton.addEventListener("click", (event) =>
            {
                event.preventDefault();
                console.log("Submit Button Clicked");
            });
        }
        return false;
    }

    function Start()
    {
       console.log('%cApp Started...', "color:white; font-size: 24px;");   

       let title = highlightActiveLink();

       let success = addParagraphsToJumbotron();

       if(success) 
       {
        console.log("successfully added paragraphs to jumbotron");
       }
       else
       {
        console.warn("content not added to jumbotron - does not exist");
       }

       let formValidated = validateForm();
       if(formValidated)
       {
        console.log("successfully validated form");
       }
       else
       {
        console.warn("form not validated - does not exist");
       }

    } 



    window.addEventListener("load", Start);

})();
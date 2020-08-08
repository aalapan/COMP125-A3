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

            newParagraph.textContent ="Welcome to my Mini Portfolio!";

            jumbotron.appendChild(newParagraph);

            let newDiv = document.createElement("div");

            newDiv.innerHTML ="Stay Happy! Stay Safe!";

            jumbotron.appendChild(newDiv);

            return true;
        }
        return false;
    }

    //VALIDATE FORM
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
                window.location = './index.html'
                
            });
        }
        return false;
    }

    function setPageContent(id)
    {
        document.title = id;
        window.history.pushState("", id, "/"+id.toLowerCase());
        highlightActiveLink(id);

        switch(id)
        {
            case "Home":
                HomeContent();
                break;
            case "Contact":
                ContactContent();
                break;
            case "Projects":
                ProjectsContent();
                break;
        }

        loadFooter();
    }

    function InitializeSite()
    {
        console.info("Header Loading...");

        let XHR = new XMLHttpRequest();

         XHR.open("GET", "COMP125-A3/Views/partials/header.html");

        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let header = document.getElementsByTagName("header")[0];

                let headerData = XHR.responseText;

                header.innerHTML = headerData;

                setPageContent("Home");

                let navLinks = document.getElementsByTagName("a");

                for (const link of navLinks) 
                {
                    link.addEventListener("click", (event) =>{
                        event.preventDefault();

                        let id = link.getAttribute("id");

                        setPageContent(id);

                    });
                }
            }
        });
    }

    function loadParagraphsData()
    {
        console.info("Paragraphs Loading...");

        let XHR = new XMLHttpRequest();

        XHR.open("GET", "COMP125-A3/Scripts/paragraphs.json");

        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {

                let dataFile = JSON.parse(XHR.responseText);
                let paragraphs = dataFile.paragraphs;

                console.log(paragraphs);

                let paragraphsArray = [];

                for(const precord of paragraphs)
                {
                    let paragraphs = new pObjects.Paragraphs();
                    paragraphs.setParagraphs(precord);
                    paragraphsArray.push(paragraphs);
                }

                let jumbotron = document.getElementsByClassName("jumbotron")[0];
                for(const paragraphs of paragraphsArray)
                {
                    let newParagraph = document.createElement("p");
                    newParagraph.textContent = 
                    `
                    ${paragraphs.value}
                    `
                    jumbotron.appendChild(newParagraph);
                }
                
            }
        });
    }

    function loadAddressBookData()
    {
        console.info("AddressBook Loading...");
        let XHR = new XMLHttpRequest();
        XHR.open("GET", "COMP125-A3/Data/addressbook.json");
        XHR.send();
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {

                let dataFile = JSON.parse(XHR.responseText);
                let addressBook = dataFile.addressBook;

                console.log(addressBook);

                let contactList = [];

                for (const record of addressBook) 
                {
                    let contact = new objects.Contact();
                    contact.setContact(record);
                    contactList.push(contact);
                }

                console.log(contactList);

                let tableBody = document.getElementById("tableBody");
                for (const contact of contactList) 
                {
                    let row = document.createElement('tr');
                    row.innerHTML = 
                    `
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.contactNumber}</td>
                    <td>${contact.emailAddress}</td>
                    `
                    tableBody.appendChild(row);
                }

               
            }
        });
    }

    function loadFooter()
    {
        console.info("Footer Loading...");

        let XHR = new XMLHttpRequest();
        XHR.open("GET", "COMP125-A3/Views/partials/footer.html");
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let footer = document.getElementsByTagName("footer")[0];

                let footerData = XHR.responseText;

                footer.innerHTML = footerData;
            }
        });
    }

    function ContactContent()
    {
        console.info("Contact Content Loading...");

        let XHR = new XMLHttpRequest();

        XHR.open("GET", "COMP125-A3/Views/content/contact.html");
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                validateForm();
            }
        });
    }

    function HomeContent()
    {
        console.info("Home Content Loading...");

        let XHR = new XMLHttpRequest();

        XHR.open("GET", "COMP125-A3/Views/content/home.html");
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadParagraphsData();

            }
        });
    }

    function ProjectsContent()
    {
        console.info("Projects Content Loading...");

        let XHR = new XMLHttpRequest();
        XHR.open("GET", "COMP125-A3/Views/content/projects.html");
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadAddressBookData();
            }
        });
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
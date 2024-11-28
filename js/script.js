document.addEventListener("readystatechange", function(event){
    if(event.target.readyState == "interactive"){
        document.querySelector("body").classList.add("js");
        
        // Placeholder item, since I'm working with inner html later on
        localStorage.setItem("Added to your plan!", "Place holder - Please ignore");

        // The words "era" and "century" used below mean the same thing - "time period"

        // INTERACTION 1 ----------------------------------------------------------------------------------------------------------------------------------------------
        // Era.html - Each Century html page to appear as a pop up on click in the Era page
        let the_centuries = [10, 12, 15];
        for(let century of the_centuries){
            
            let century_link = document.querySelector(`#century-${century}-link`);
            let century_deets = document.querySelector(`#century-${century}-deets`);
            century_link.addEventListener("click", function(event) {
                century_deets.classList.add("show");

                // Enabling the back button to close the popped-up iframe, when the iframe is opened
                deetsClose(century_deets);

                // Below function enables the "add to plan" button in the iframe when it is popped up 
                // The below function includes adding the respective era to the localStorage (this is part of INTERACTION 2)
                addToPlan(century);

                event.preventDefault();
            });
            
            // Function to the back button in the popped up hmtl iframe, and using it to close the iframe
            // Accessing elements within an iframe was learnt from https://www.w3schools.com/howto/howto_js_element_iframe.asp
            function deetsClose(iframe){
                let x = document.getElementById(`century-${century}-deets`);
                let y = x.contentWindow.document;
                z = y.getElementById("go-back");
                z.addEventListener("click", function(event) {
                    iframe.classList.remove("show");
                    event.preventDefault();
                });
            }
        }
        
        // INTERACTION 2 - Part 1 ---------------------------------------------------------------------------------------------------------------------------------------------------
        // Adding different eras to the trip plan via localStorage

        // Checking if the count of eras in the localStorage is already 0
        let century_count = localStorage.getItem("Century count");
        let century_count_int = parseInt(century_count);
        if (century_count == null){
            century_count_int = 0;
        }

        // Function to add the respective eras selected to localStorage 
        // The eras are added using the "add to plan" button in the iframe (which is why this function is called in INTERACTION 1, when the iframe is popped up)
        function addToPlan(century){
            
            // Accessing elements within an iframe was learnt from https://www.w3schools.com/howto/howto_js_element_iframe.asp
            let x = document.getElementById(`century-${century}-deets`);
            let y = x.contentWindow.document;
            z = y.getElementById("add-button");

            z.addEventListener("click", function(event) {
                let era = `${century}th Century`;
                
                if (localStorage.getItem(`era - ${century}`) == null) {
                    // Adding the era selected to localStorage
                    localStorage.setItem(`era - ${century}`, era);
                    this.innerHTML = "Added to your plan!";
                    
                    // Keeping count of the no. of eras added(to use in INTERACTION 3)
                    century_count_int = century_count_int + 1;
                    localStorage.removeItem("Century count");
                    localStorage.setItem("Century count", century_count_int);
                }
                else{
                    this.innerHTML = "This is already added.";
                }
                event.preventDefault();
            });
        }
       
    }
});

// Adding the other selected items to the trip plan via localStorage
document.addEventListener("readystatechange", function(event){
    if(event.target.readyState == "interactive"){
        document.querySelector("body").classList.add("js");
        
        // INTERACTION 2 - Part 2 --------------------------------------------------------------------------------------------------------------------------------------------------
        // Adding characters to the trip plan via localStorage

        // Selecting all of the character links (or "cards" as they appear on the page)
        let characs = document.querySelectorAll("#all-characters a");

        // Checking if no characters are selected yet and if so, setting the count to 0
        let char_count = localStorage.getItem("Character count");
        let char_count_int = parseInt(char_count);
        if (char_count == null){
            char_count_int = 0;
        }
        
        for (let character of characs) {
            character.addEventListener("click", function(event) {
                char_html = character.innerHTML;
                
                if (localStorage.getItem(char_html) == null) {
                    // Adding the character selected to localStorage
                    localStorage.setItem(char_html, char_html);
                    character.innerHTML = "Added to your plan!";
                    
                    // Keeping count of the no. of characters added(the count is used in INTERACTION 3)
                    char_count_int = char_count_int + 1;
                    localStorage.removeItem("Character count");
                    localStorage.setItem("Character count", char_count_int);
                }
                else{
                    alert("This Character is already added to your plan.");
                }
                event.preventDefault();
            });
        }

        // INTERACTION 2 - Part 3 -----------------------------------------------------------------------------------------------------------------------------------------------
        // Adding activities to the trip plan via localStorage

        // Selecting all of the activities links (or "cards" as they appear on the page)
        let activities = document.querySelectorAll("#all-activities a");
        
        // Checking if no activities are selected yet and if so, setting the count to 0
        let act_count = localStorage.getItem("Activity count");
        let act_count_int = parseInt(act_count);
        if (act_count == null){
            act_count_int = 0;
        }

        for (let activity of activities) {
            activity.addEventListener("click", function(event) {
                act_html = activity.innerHTML;
                
                if (localStorage.getItem(act_html) == null) {
                    // Adding the character selected to localStorage
                    localStorage.setItem(act_html, act_html);
                    activity.innerHTML = "Added to your plan!";

                    // Keeping count of the no. of characters added(the count is used in INTERACTION 3)
                    act_count_int = act_count_int + 1;
                    localStorage.removeItem("Activity count");
                    localStorage.setItem("Activity count", act_count_int);
                }
                else{
                    alert("This Activity is already added to your plan.");
                }
                event.preventDefault();
            });
        }

        // INTERACTION 2 - Part 4 ------------------------------------------------------------------------------------------------------------------------------------------------
        // Displaying the selected items in the localStorage on the "My Trip Plan" page
        
        // Showing all eras selected
        let eras_list = [10, 12, 15];

        for (let era of eras_list) {
            let era_key = `era - ${era}`;
            let era_box = document.querySelector(`#century-${era}-box`);
            if (localStorage.getItem(era_key) != null) {
                era_box.classList.add("show");
            }
        }
        
        // Showing all the characters selected
        let all_characters = ["king-or-queen", "assassin", "knight", "priest", "stable-boy-or-girl"];
        
        for (let character of all_characters) {
            let character_box = document.querySelector(`#${character}-box`);
            if (localStorage.getItem(character) != null) {
                character_box.classList.add("show");
            }
        }

        // Showing all the activities selected
        let all_activities = ["royal-relaxation", "treasure-hunting", "wildlife-hunting", "jousting", "chariot-racing", "exploration-assistance"];
        
        for (let activity of all_activities) {
            let activity_box = document.querySelector(`#${activity}-box`);
            if (localStorage.getItem(activity) != null) {
                activity_box.classList.add("show");
            }
        }
        
        // INTERACTION 2 - Part 5 -----------------------------------------------------------------------------------------------------------------------------------------------
        // Removing the selected items in the trip plan via localStorage
        
        // Removing the eras from localStorage when they are removed from the trip page by the user
        for (let era of eras_list){
            let era_remove = document.querySelector(`#century-${era}-box a`);
            era_remove.addEventListener("click", function(event) {
                localStorage.removeItem(`era - ${era}`);
                document.querySelector(`#century-${era}-box`).classList.remove("show");

                // Reducing the era count when an era is removed from the trip plan(the count is used in INTERACTION 3)
                let century_count = localStorage.getItem("Century count");
                century_count = century_count - 1;
                if (century_count < 0) {
                    century_count = 0;
                }
                localStorage.setItem("Century count", century_count);

                event.preventDefault();
            });
        }
        
        // Removing the characters from localStorage when they are removed from the trip page by the user
        for (let character of all_characters) {
            let character_remove = document.querySelector(`#${character}-box a`);
            character_remove.addEventListener("click", function(event) {
                localStorage.removeItem(character);
                document.querySelector(`#${character}-box`).classList.remove("show");

                // Reducing the character count when a character is removed from the trip plan(the count is used in INTERACTION 3)
                let charac_count = localStorage.getItem("Character count");
                charac_count = charac_count - 1;
                if (charac_count < 0) {
                    charac_count = 0;
                }
                localStorage.setItem("Character count", charac_count);

                event.preventDefault();
            });
        }

        // Removing the activities from localStorage when they are removed from the trip page by the user
        for (let activity of all_activities) {
            let activity_remove = document.querySelector(`#${activity}-box a`);
            activity_remove.addEventListener("click", function(event) {
                localStorage.removeItem(activity);
                document.querySelector(`#${activity}-box`).classList.remove("show");

                // Reducing the activity count when an activity is removed from the trip plan(the count is used in INTERACTION 3)
                let act_count = localStorage.getItem("Activity count");
                act_count = act_count - 1;
                if (act_count < 0) {
                    act_count = 0;
                }
                localStorage.setItem("Activity count", act_count);

                event.preventDefault();
            });
        }

        // Not allowing the user to proceed unless atleast one era is selected.
        let book_button = document.querySelector("#book");
        book_button.addEventListener("click", function(event) {
            let era_count_now = localStorage.getItem("Century count");
            if (era_count_now <= 0) {
                alert("Please include atleast one era in your plan!");
                event.preventDefault();
            }
            
        });
        
       
    }
});


document.addEventListener("readystatechange", function(event){
    if(event.target.readyState == "interactive"){
        document.querySelector("body").classList.add("js");
        
        // INTERACTION 3 - Part 1 ------------------------------------------------------------------------------------------------------------------------------------------------
        // Displaying the number of eras, characters and activities selected, in the booking page

        let cent_span = document.querySelector("#cent-count");
        let char_span = document.querySelector("#char-count");
        let act_span = document.querySelector("#act-count");

        let cent_selected_count = localStorage.getItem("Century count");
        let char_selected_count = localStorage.getItem("Character count");
        let act_selected_count = localStorage.getItem("Activity count");
        
        if (cent_selected_count != null) {
            cent_span.innerHTML = cent_selected_count;
        }
        
        if (char_selected_count != null) {
            char_span.innerHTML = char_selected_count;
        }
        
        if (act_selected_count != null) {
            act_span.innerHTML = act_selected_count;
        }

        // INTERACTION 3 - Part 2 -----------------------------------------------------------------------------------------------------------------------------------------------
        // Calculating and displaying the different costs of the trip based on the counts in INTERACTION 3 - Part 1

        // Total cost of the eras based on how many are selected
        let num_era_span = document.querySelector("#num-of-eras");
        let era_total = document.querySelector("#era-total");
        let era_total_price = 500 * cent_selected_count;

        num_era_span.innerHTML = cent_selected_count;
        era_total.innerHTML = `AUD$${era_total_price}`;

        // Total cost of the Characters based on how many are selected
        let num_char_span = document.querySelector("#num-of-chars");
        let char_total = document.querySelector("#char-total");
        let char_total_price = 200 * char_selected_count;

        num_char_span.innerHTML = char_selected_count;
        char_total.innerHTML = `AUD$${char_total_price}`;

        // Total cost of the Activities based on how many are selected
        let num_act_span = document.querySelector("#num-of-acts");
        let act_total = document.querySelector("#acts-total");
        let act_total_price = 100 * act_selected_count;

        num_act_span.innerHTML = act_selected_count;
        act_total.innerHTML = `AUD$${act_total_price}`;

        // Total cost of the "Experience" i.e., sum of all the three costs above
        let exp_price_span = document.querySelector("#experience-total");
        let exp_price = era_total_price + char_total_price + act_total_price
        exp_price_span.innerHTML = `AUD$${exp_price}`;

        // Overall cost of the trip includes the date range and no. of people(taken from user input after form validation in INTERACTION 4)
        // Displaying the overall cost of the trip is done after form validation and submission. Therefore, it is done in INTERACTION 4 below
        let total_span = document.querySelector("#total-price-span");
        total_span.innerHTML = "AUD$0";


        // INTERACTION 4 - Part 1 -------------------------------------------------------------------------------------------------------------------------------------------------
        // Taking form input, validating it, displaying it and using it to calculate the overall costs
        // Taking input, analyzing and using form data was learnt in Week 11 practicals, and refered to while coding below

        // Getting the date and no. of people info from the user input in the form
        let go_ahead_button = document.querySelector("#days-and-people form button");

        let date_and_people_form = document.querySelector("#days-and-people form");

        date_and_people_form.addEventListener("submit", function(event) {
            let from_date = document.querySelector("#from-date").value;
            let to_date = document.querySelector("#to-date").value;
            let no_of_people = document.querySelector("#no-of-people").value;
            let form_filled = false;

            // Calculating the "number of days" entered and the "no. of people" entered and storing them in variables, to use later in calculating the overall costs
            // Subtracting dates was learnt from https://www.delftstack.com/howto/javascript/javascript-subtract-dates/
            let from_date_new = new Date(from_date);
            let to_date_new = new Date(to_date);
            let diff = Math.abs(to_date_new - from_date_new);
            let dayz = diff/(1000 * 3600 * 24);

            if (no_of_people == "") {
                no_of_people = 0;
            }

            if (from_date == "" || to_date == "") {
                dayz = 0;
            }
            
            if (from_date != "" && to_date != "" && no_of_people != "") {
                form_filled = true;
            }

            // Error handling when no input is given
            if (from_date == "") {
                document.querySelector("#from-date").classList.add("error");
                document.querySelector("#please-enter-from").classList.add("error");
            }

            if (to_date == "") {
                document.querySelector("#to-date").classList.add("error");
                document.querySelector("#please-enter-to").classList.add("error");
            }

            if (no_of_people == ""){
                document.querySelector("#no-of-people").classList.add("error");
                document.querySelector("#please-enter-number").classList.add("error");
            }

            // Upon submitting a fully filled form
            if (form_filled) {
                let century_count_now = localStorage.getItem("Century count");

                // Handling when "no. of people" is given 0, and giving an error
                if (no_of_people <= 0){
                    alert("You must book for atleast 1 person");
                }
                // Handling when from date is after to date, and giving an error
                else if(to_date <= from_date) {
                    alert("From-date must be before To-date");
                }
                // Handling when no era is selected before proceeding
                else if(century_count_now <= 0) {
                    alert("Please include atleast one era in your plan before proceeding");
                }
                else{
                    // Disabling the submit button upon successful form submission
                    go_ahead_button.innerHTML = "Thank you, please proceed down.";
                    go_ahead_button.setAttribute("disabled", "true");

                    // Displaying the number of people entered
                    let people_span = document.querySelector("#people-count-span");
                    people_span.innerHTML = no_of_people;
                    
                    // Displaying the number of days, as a difference of the dates entered
                    let days_span = document.querySelector("#days-count-span");
                    days_span.innerHTML = dayz;

                    // Calculating the final overall cost and displaying it(the exp_price is obtained from INTERACTION 3 - Part 2)
                    let total_amount = (exp_price * no_of_people * dayz) + (0.1 * (exp_price * no_of_people * dayz));
                    total_span.innerHTML = `AUD$${total_amount}`;
                        
                }
                
            }

            event.preventDefault();

        });

        // Removing the error messages when the user starts to input data in the fields again
        // Also enabling the submit button and the final confirmation button when the user starts to change their data
        let form_inputs = document.querySelectorAll("#from-date, #to-date, #no-of-people");
        for (let input of form_inputs) {
            input.addEventListener("click", function() {
                // Removing the error messages
                this.classList.remove("error");
                this.closest("section").querySelector("p").classList.remove("error");

                // Enabling the submit button
                go_ahead_button.removeAttribute("disabled", "false");
                go_ahead_button.innerHTML = "Confirm these details";

                // Enabling the final confirmation button
                confirmation_button.removeAttribute("disabled", "false");
                confirmation_button.innerHTML = "Confirm Booking";

                // Hiding the final thank you message
                document.querySelector("#final-message").classList.remove("final");

            });
        }
        
        // INTERACTION 4 - Part 2----------------------------------------------------------------------------------------------------------------------------------------
        // Final confirmation form
        let confirmation_button = document.querySelector("#confirmation-form button");

        let confirmation_form = document.querySelector("#confirmation-form form");

        confirmation_form.addEventListener("submit", function(event) {
            let name = document.querySelector("#user-name").value;
            let email = document.querySelector("#user-email").value;

            // Only the email is a required field
            if (email == ""){
                document.querySelector("#user-email").classList.add("error");
                document.querySelector("#please-enter-email").classList.add("error");
            }
            else{
                let go_ahead_button_state = go_ahead_button.getAttribute("disabled");
                if (go_ahead_button_state == "true"){
                    // If no name is entered, refer the user as "Braveheart"
                    if (name == "") {
                        name = "Braveheart";
                    }
                    // Use the user's name and email id from the form, to display in the final message
                    let cust_name = document.querySelector("#cust-name");
                    let cust_email = document.querySelector("#cust-email");
                    cust_name.innerHTML = name;
                    cust_email.innerHTML = email;

                    // Display the final message to the customer
                    document.querySelector("#final-message").classList.add("final");
                    
                    // Disbale the final submit button after submission
                    confirmation_button.setAttribute("disabled", "true");
                    confirmation_button.innerHTML = "Thank You!";
                }
                else{
                    // When the user tries to submit the final form before submitting the details above to generate the final price
                    alert("Please fill and confirm the trip details above, before proceeding.");
                }
            }

            event.preventDefault();
        });

        // Removing the error messages when the user starts to input data in the fields again
        // Also enabling the final confirmation button when the user starts to change their data
        let final_input_fields = document.querySelectorAll("#user-email, #user-name");
        for (let field of final_input_fields) {
            field.addEventListener("click", function() {
                // Remove the error message
                this.classList.remove("error");
                document.querySelector("#please-enter-email").classList.remove("error");

                // Enable the final confirmation button again
                confirmation_button.removeAttribute("disabled", "false");
                confirmation_button.innerHTML = "Confirm Booking";
                
                // Remove the final message, in order to greet the user with the new details they enter
                document.querySelector("#final-message").classList.remove("final");
            });
        }
            
        
    }
});


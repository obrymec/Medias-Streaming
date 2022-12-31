// Shows sign in section.
function show_sign_in () {
   // Destroys sign up inputs focus and hides sign up section.
    $ ("div.field > input").blur (); $ ("div.sign-up").removeClass ("sign-show").addClass ("sign-up-hide");
    // Shows sign in section and clears input field value.
    $ ("div.sign-in").removeClass ("sign-in-hide").addClass ("sign-show"); $ ("div.field > input").val (''); 
}

// When this page is fulled loaded and ready to use.
$ (() => {
	// Fixing "click" event on sign in button.
	$ ("div.sign-up-options > button#sign-in-btn").click (() => show_sign_in ());
    // Fixing "click" event on sign up button.
    $ ("div.sign-up-options > button#sign-up-btn").click (() => {
        // Checks lock options.
        if (!window.LOCK_OPTIONS) {
            // Changes the button text and disables options.
            $ ("div.sign-up-options > button#sign-up-btn").text ("Vérification..."); window.LOCK_OPTIONS = true;
            // Generates server data.
            let server_data = new Object ({
                username: $ ("input#up-pseudo").val ().toLowerCase ().trimLeft ().trimRight (),
                email: $ ("input#up-email").val ().toLowerCase ().trimLeft ().trimRight (),
                password: $ ("input#up-password").val ().trimLeft ().trimRight (),
                confirm: $ ("input#up-confirm").val ().trimLeft ().trimRight ()
            });
            // Sends a request.
            ajax_request_nodejs ("/sign-up", "POST", server_data, response => {
                // Error detected.
                if (response.status === 500) show_message_box ("Message serveur", response.message, "red", () => {
                    // Changes the button text and disables options.
                    $ ("div.sign-up-options > button#sign-up-btn").text ("Inscription"); window.LOCK_OPTIONS = false;
                // Otherwise.
                }); else {
                    // Changes the button text.
                    $ ("div.sign-up-options > button#sign-up-btn").text ("Inscription"); window.LOCK_OPTIONS = false;
                    // Shows a message box.
                    show_message_box ("Message serveur", response.message, "green", () => show_sign_in ());
                }
            });
        }
    });
});

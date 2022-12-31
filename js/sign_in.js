// Shows sign up section.
function show_sign_up () {
    // Destroys sign up inputs focus and hides sign in section.
    $ ("div.field > input").blur (); $ ("div.sign-in").removeClass ("sign-show").addClass ("sign-in-hide");
    // Shows sign up section and clears input field value.
    $ ("div.sign-up").removeClass ("sign-up-hide").addClass ("sign-show"); $ ("div.field > input").val ('');
}

// When this page is fulled loaded and ready to use.
$ (() => {
	// Fixing "click" event on sign up button.
	$ ("div.sign-in-options > button#sign-up-btn").click (() => show_sign_up ());
    // Fixing "click" event on sign up button.
    $ ("div.sign-in-options > button#sign-in-btn").click (() => {
        // Checks lock options.
        if (!window.LOCK_OPTIONS) {
            // Changes the button text.
            $ ("div.sign-in-options > button#sign-in-btn").text ("Vérification..."); window.LOCK_OPTIONS = true;
            // Generates server data.
            let server_data = new Object ({
                id: $ ("input#in-user-id").val ().toLowerCase ().trimLeft ().trimRight (),
                password: $ ("input#in-user-pass").val ().trimLeft ().trimRight ()
            });
            // Sends a request.
            ajax_request_nodejs ("/sign-in", "POST", server_data, response => {
                // Error detected.
                if (response.status === 500) show_message_box ("Message serveur", response.message, "red", () => {
                    // Changes the button text and disables options.
                    $ ("div.sign-in-options > button#sign-in-btn").text ("Connexion"); window.LOCK_OPTIONS = false;
                // Otherwise.
                }); else {
                    // Changes the button text.
                    $ ("div.sign-in-options > button#sign-in-btn").text ("Connexion"); window.LOCK_OPTIONS = false;
                    // Shows a message box.
                    show_message_box ("Message serveur", response.message, "green", () => {
                        // Updates user cookies.
                        set_cookie ("st_user", (response.pseudo + ": " + response.mail), 1);
                        // Loads the main page.
                        load_view ("../html/main.html", "div.views", "Chargement de la page d'accueil...");
                    });
                }
            });
        }
    });
});

// Global attributes.
window.RESPONSIVE_ERROR = null;
window.LOCK_OPTIONS = false;
window.SIGN_IN = true;

// Manages views loading.
function load_view (path, container, title, ready = null) {
	// Creating an instance of a loader.
	let loader = new Loader (new Object ({icon_color: "red", title: title, parent_id: container}), true);
	// Disables any option.
	window.LOCK_OPTIONS = true;
	// Loads the target view.
	Resource.load_html (new Object ({path: path, target: container,
		// When the page loading is successfully.
		on_ready: () => {
			// Destroys the current loader instance, disables options and calls "ready" callback parameter.
			loader.destroy (); window.LOCK_OPTIONS = false; if (typeof ready === "function") ready ();
		// When the client request delay is out of range.
		}, on_timeout: () => {
			// Shows an error message about timeout request.
			let request_error = new MessageBox (new Object ({
				text: "La délai d'attente de réception de réponse du serveur est dépassé. Veuillez réessayer à nouveau.",
				title: "Erreur de demande", color: "red", zindex: 1, parent_id: "div.others-views",
				options: [
					new Object ({
						text: "Reéssayer", title: "Désirez-vous relancer la demande à nouveau ?", click: () => {
							// Destroys the active message box and retry the target request.
							request_error.visibility (false); load_view (path, container, title);
						}
					}), new Object ({
						text: "Annuler", title: "Abandonner la demande.", click: () => {
							// Destroys loader, disables options and destroys the active message box.
							loader.destroy (); window.LOCK_OPTIONS = false; request_error.visibility (false);
						}
					})
				]
			// Shows the message box.
			})); request_error.visibility (true);
		}
	}), 0);
}

// Shows message box.
function show_message_box (title, text, color = "white", action = null) {
    // Shows a message box about web page responsive.
    let message_box = new MessageBox (new Object ({
        title: title, parent_id: "div.others-views", text: text, zindex: 1, hideable: false, color: color,
        options: [new Object ({
            text: "OK", title: "OK.", click: () => {if (typeof action === "function") action (); message_box.visibility (false);}
        })]
    // Shows the message box.
    })); message_box.visibility (true);
}

// Checks the browser window size.
function check_responsive () {
	// Window width is less than 1140 pixel.
	if (window.outerWidth < 1280) {
		// This message box is already shown.
		if (window.RESPONSIVE_ERROR == null) {
			// Shows a message box about web page responsive.
			window.RESPONSIVE_ERROR = new MessageBox (new Object ({
				title: "Message de redimensionnement", parent_id: "div.others-views", on_destroy: () => window.RESPONSIVE_ERROR = null,
				text: "Cette application ne supporte pas les écrans de basse résolution. Veuillez redimensionner votre écran à\
				une résolution supérieur ou égale à (1280 x 768) pixels.", zindex: 1, hideable: false, id: "res-pg-err", color: "#fff"
			// Shows the message box.
			})); window.RESPONSIVE_ERROR.visibility (true); return false;
		}
	// Otherwise.
	} else if (window.RESPONSIVE_ERROR != null) window.RESPONSIVE_ERROR.visibility (false); return true;
}

// Checks whether is connected to internet.
function check_network () {
	// Checks network.
	if (check_responsive () && !window.navigator.onLine) {
		// Warns the user about browser disconnection.
		const network_msg = new MessageBox (new Object ({
			text: "Le navigateur est hors réseau. Veuillez vérifier votre wifi ou câble Ethernet, puis reéssayer.", color: "#fff",
			title: "Erreur de connexion", color: "red", zindex: 1, id: "nk-err", hideable: true, parent_id: "div.others-views",
		}));
		// Shows the message box and returns false.
		network_msg.visibility (true); return false;
	}
	// The browser is connected.
	return true;
}

// When this web page is fully loaded and ready to use.
$ (() => {
	// Listen browser window resize event.
	$ (window).resize (() => {$ ("div.views").css ("height", (window.innerHeight + "px")); check_responsive ();});
	// Checks the network.
	if (check_network ()) {
		// Loads login web page.
		load_view ("../html/main.html", "div.views", "Chargement de la page de connexion en cours...");
		// Resizes the views container height to browser window height.
		$ ("div.views").css ("height", (window.innerHeight + "px"));
		// Fixing "offline" event on the browser window.
		$ (window).on ("offline", () => {
			// Shows a message box about no connection detected.
			let network_error = new MessageBox (new Object ({
				title: "Message de connexion", parent_id: "div.others-views", zindex: 1, id: "ntk-err", hideable: false, color: "#fff",
				text: "Le navigateur viens d'être mis hors réseau. Veuillez vérifier votre wifi ou câble Ethernet, puis reéssayer.",
				options: [new Object ({text: "OK", title: "OK.", click: () => network_error.visibility (false)})]
			// Shows the message box.
			})); network_error.visibility (true);
		});
	// Fixing "online" event on the browser window.
	} $ (window).on ("online", () => window.location.reload ()); check_responsive (); $ ("script").remove ();
});

// Adjusts an image size to the given size.
function adjust_image (id, width, height) {
	// Adaptes image size.
	$ (id).attr ("width", (parseFloat (width) + "px")).attr ("height", (parseFloat (height) + "px"));
}

// When this web page is fully loaded and ready to use.
$ (() => {
	// Creates a loader to show page loading progress.
	let loader = new Loader (new Object ({icon_color: "grey", text_color: "grey", parent_id: "div.sign-container"}));
	// Fixing window resizing event on the sign image background.
	$ (window).on ("resize", () => adjust_image ("div.bg-sign > img", window.innerWidth, window.innerHeight));
	// Adjusts sign image background to browser window size.
	adjust_image ("div.bg-sign > img", window.innerWidth, window.innerHeight);
	// Waiting the sign image background fully loaded.
	$ ("div.bg-sign > img").on ("load", () => {
		// Loads the sign in page.
		Resource.load_html (new Object ({
			path: "../html/sign_in.html", target: "div.sign-in",
			// Loads the sign up page.
			on_ready: () => Resource.load_html (new Object ({
				path: "../html/sign_up.html", target: "div.sign-up",
				// Starts page animation.
				on_ready: () => {
					// Shows user sign in section.
					if (window.SIGN_IN) window.setTimeout (() => $ ("div.sign-in").addClass ("sign-show"), 300);
					// Otherwise.
					else window.setTimeout (() => $ ("div.sign-up").addClass ("sign-show"), 300);
					// Animates the sign image background and destroys the loader.
					$ ("div.bg-sign").addClass ("down-translate"); loader.destroy ();
				}
			}))
		}));
	});
});

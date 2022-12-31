// Loads any stream from the provided database.
function load_streams (id) {
	// Hides audio and video adder.
	$ ("div.video-adder, div.audio-adder").removeClass ("face-off").addClass ("face-off");
	// Clears tags container.
	$ ("div.tags-container").html ('').text ('').addClass ("face-off");
	// Shows all sections option.
	$ ("div.all-cnt-opt").removeClass ("face-off");
	// For home section.
	if (window.ACTIVE_SECTION.includes ("home")) {
		// For video selection.
		if (window.ACTIVE_TAB.includes ("video")) {
			// TODO something here...
		// For audio selection.
		} else if (window.ACTIVE_TAB.includes ("audio")) {
			// TODO something here...
		// For all selection.
		} else {
			// TODO something here...
		}
	// For board section.
	} else if (window.ACTIVE_SECTION.includes ("board")) {
		// Selects videos tab by default.
		if (typeof id === "string" && id === "div.board-cnt-opt") select_tab ("div.videos-cnt-opt");
		// Hides all sections tag.
		$ ("div.all-cnt-opt").addClass ("face-off");
		// For video selection.
		if (window.ACTIVE_TAB.includes ("video")) {
			// Shows video adder.
			$ ("div.video-adder").removeClass ("face-off");
		// For audio selection.
		} else if (window.ACTIVE_TAB.includes ("audio")) {
			// Shows audio adder.
			$ ("div.audio-adder").removeClass ("face-off");
		}
	// For play section.
	} else if (window.ACTIVE_SECTION.includes ("play")) {
		// For video selection.
		if (window.ACTIVE_TAB.includes ("video")) {
			// TODO something here...
		// For audio selection.
		} else if (window.ACTIVE_TAB.includes ("audio")) {
			// TODO something here...
		// For all selection.
		} else {
			// TODO something here...
		}
	}
}

// Called when search bar gets a textual request.
window.ON_SEARCH = textual_id => {
	console.log (textual_id);
}

// Called when an option has been selected.
window.ON_ACTIVE_OPTION_CHANGED = option_id => {
	console.log (option_id);
	// Loads the target streams.
	load_streams (option_id);
}

// Creating the associated stream with his component.
function draw_data () {
    // Gets keys list.
    let keys = Object.keys (window.BIG_DATA); $ ("div.tags-container").text ('').html ('').removeClass ("face-off");
    // Generating views.
    for (let pos = 0; pos < keys.length; pos++) {
        // Creating a category object.
        let category = new Category (new Object ({
            parent_id: "div.medias-categories", text: keys [pos], content: true, count: window.BIG_DATA [keys [pos]].length
        }));
        // Creating a tag for each category.
        let tag = new MediaTag (new Object ({
            parent_id: "div.tags-container", target_id: category.get_id ().replace ("div#", String ('')), title: keys [pos], text: keys [pos]
        }));
        // Creating a stream per category.
        for (let idx = 0; idx < window.BIG_DATA [keys [pos]].length; idx++) {
            // Fixing "click" event on the current stream reference.
            window.BIG_DATA [keys [pos]] [idx].on_click = () => {
                // The user is it connected ?
                if (is_empty (get_cookie ("st_user"))) {
                    // Sets active stream and loads the player view.
                    window.ACTIVE_STREAM = [keys [pos], idx]; load_view ("../html/player.html", "div.assets", "Chargement du flux média...");
                // Otherwise.
                } else show_message_box ("Message d'authentification", "Vous n'êtes pas encore connecté sur la plateforme. \
                    Merçi de bien vouloir vous identifiez.", "white", () => {
                        // Changes sign state and loads sign in page.
                        window.SIGN_IN = true; load_view ("../html/sign.html", "div.views", "Chargement de la page de connexion...");
                    });
            }
            // Sets the global container of each stream.
            window.BIG_DATA [keys [pos]] [idx].parent_id = category.get_content_id ();
            // Creates all availables streams.
            let stream = new Stream (window.BIG_DATA [keys [pos]] [idx]);
            // Fix a litle left margin.
            if ((idx % 2) !== 0) $ (stream.get_id ()).addClass ("left-margin");
        }
    }
}

// When this web page is fully loaded and ready to use.
$ (() => {
    // Enables overflow on assets container.
    $ ("div.assets").removeClass ("no-overflow");
    // Draws all availables data.
    draw_data ();
});

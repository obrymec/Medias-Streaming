// Global attributes.
window.ACTIVE_SECTION = "div.home-cnt-opt";
window.ON_ACTIVE_OPTION_CHANGED = null;
window.ACTIVE_TAB = "div.all-cnt-opt";
window.DISPLAYER_LOADED = false;
window.PLAYER_LOADED = false;
window.ACTIVE_STREAM = [];
window.ON_SEARCH = null;
window.BIG_DATA = new Object ({
    "Zaaz": [
        {
            content: "../assets/stream_1.mkv",
            viewtime: "125 k vues • Il y 3 ans",
            profil: "../assets/profil_1.jpg",
            cover: "../assets/cover_1.jpg",
            producer: "Africa Studio",
            text: "African Best song",
            author: "Emilie",
            duration: "03:27",
            dislike: 10,
            type: "video",
            like: 11
        }
    ],
    "Rap": [
        {
            content: "../assets/stream_2.mkv",
            viewtime: "1 k vues • Il y 10 ans",
            profil: "../assets/profil_2.jpg",
            cover: "../assets/cover_2.jpeg",
            producer: "Levandre Afrique",
            text: "More feeling",
            author: "Alexandre",
            duration: "05:13",
            dislike: 121,
            type: "video",
            like: 547
        },
        {
            content: "../assets/stream_3.mkv",
            viewtime: "1.6 M vues • Il y 1 mois",
            profil: "../assets/profil_3.jpg",
            cover: "../assets/cover_3.jpg",
            producer: "Music Lover",
            text: "Follow yours dreams",
            author: "Mk",
            duration: "03:23",
            dislike: 0,
            type: "video",
            like: 125890
        }
    ],
    "Classic": [
        {
            content: "../assets/stream_4.mkv",
            viewtime: "219 k vues • Il y 7 mois",
            profil: "../assets/profil_4.jpg",
            cover: "../assets/cover_4.jpg",
            producer: "Music Lover",
            text: "Don't look backward you",
            author: "Davido",
            duration: "04:15",
            dislike: 2,
            type: "video",
            like: 1294
        }
    ]
});

// Throwns "search" event for user searching.
function search () {
	// Gets input value.
	let textual_id = $ ("div.search-bar > input[type='text']").val ().trim ();
	// Throwns "search" event.
	if (typeof window.ON_SEARCH === "function" && textual_id.length) window.ON_SEARCH (textual_id);
}

// Selects a tab from the main page.
function select_tab (tab_id, force = false) {
	// The current tab id isn't equals to the old tab id.
	if (check_network () && !window.LOCK_OPTIONS && (tab_id != window.ACTIVE_TAB || force)) {
		// Deselects the active tab.
		$ (window.ACTIVE_TAB).removeClass ("active-slider-option").removeClass ("active-tab");
		// Selects the given tab id and updates the active tab.
		$ (tab_id).addClass ("active-slider-option").addClass ("active-tab"); window.ACTIVE_TAB = tab_id;
		// Throwns "active_option_changed" event.
		if (typeof window.ON_ACTIVE_OPTION_CHANGED === "function") window.ON_ACTIVE_OPTION_CHANGED (tab_id);
	}
}

// Selects an option from the main page.
function select_section (option_id, force = false) {
	// The current option id isn't equals to the old option id.
	if (check_network () && !window.LOCK_OPTIONS && (option_id != window.ACTIVE_SECTION || force)) {
		// Deselects the active option.
		$ (window.ACTIVE_SECTION).removeClass ("active-slider-option");
		// Selects the given option id and updates the active option.
		$ (option_id).addClass ("active-slider-option"); window.ACTIVE_SECTION = option_id;
		// Loads the target view.
		if (!window.DISPLAYER_LOADED) load_view ("../html/displayer.html", "div.assets", "Chargement...", () => window.DISPLAYER_LOADED = true);
		// Throwns "active_option_changed" event.
		if (typeof window.ON_ACTIVE_OPTION_CHANGED === "function") window.ON_ACTIVE_OPTION_CHANGED (option_id);
	}
}

// Checks whether the user is connected or not.
function check_user () {
	// Gets user data cookie value.
	let user = get_cookie ("st_user"); user = (!is_empty (user) ? user : null);
	// Checks user value.
	if (user != null) {
		// Updates the user profil id.
		$ ("div.user-id-cnt > label > strong").text (user.split (':') [0] [0].toUpperCase ());
		// Hides sign in and up buttons.
		$ ("div.sign-in-btn-cnt, div.sign-up-btn-cnt").addClass ("face-off");
		// Shows logout and artist dashboard options.
		$ ("div.logout-cnt-opt, div.board-cnt-opt").removeClass ("face-off");
		// Shows user profil.
		$ ("div.user-id-cnt").removeClass ("face-off").attr ("title", user);
	}
}

// Returns the parsed version of the given like or dislike value.
function parse_value (worth) {
    // Corrects the passed worth.
    worth = (typeof worth === "number" ? parseInt (worth) : null); let result = null;
    // For [0; 999].
    if (worth >= 0 && worth <= 999) result = worth;
    // For [1000; 999999].
    else if (worth >= 1000 && worth <= 999999) result = ((worth / 1000) + " K");
    // For [1000000; 999999999].
    else if (worth >= 1000000 && worth <= 999999999) result = ((worth / 1000000) + " M");
    // Otherwise.
    else result = ((worth / 1000000000) + " G");
    // Parses the result value.
    result = String (result).split (' '); let comma = result [0].includes ('.');
    // Gets the first number.
    let first = (comma ? (result [0].split ('.') [0] + '.' + result [0].split ('.') [1] [0]) : result [0]);
    // Returns the final result.
    return (first + ' ' + (result [1] != undefined ? result [1] : String ('')));
}

// Returns stream description.
function get_difference (old, today) {
    // Gets the old and today date parts.
    let old_parts = old.split ('-'), today_parts = today.split ('-');
    // Converts today parts into an integer.
    today_parts = [parseInt (today_parts [0]), parseInt (today_parts [1]), parseInt (today_parts [2])];
    // Converts old date parts into an integer.
    old_parts = [parseInt (old_parts [0]), parseInt (old_parts [1]), parseInt (old_parts [2])];
    // For the year.
    if (old_parts [2] < today_parts [2]) {
        // Calculates the difference between two years.
        let diff = (today_parts [2] - old_parts [2]); return (diff === 1 ? (diff + " an") : (diff + " ans"));
    // For the month.
    } else if (old_parts [2] === today_parts [2] && old_parts [1] < today_parts [1]) {
        // Calculates the difference between two months.
        return ((today_parts [1] - old_parts [1]) + " mois");
    // For the day.
    } else if (old_parts [1] === today_parts [1] && old_parts [0] < today_parts [0]) {
        // Calculates the difference between two days.
        let diff = (today_parts [0] - old_parts [0]); return (diff === 1 ? (diff + " jour") : (diff + " jours"));
    // otherwise.
    } else return null;
}

// When this web page is fully loaded and ready to use.
$ (() => {
	// Fixing "click" event on logout option.
	$ ("div.logout-cnt-opt").click (() => {
		// Reloads the main page and destroys the current user data from the browser cookies.
		load_view ("../html/main.html", "div.views", "Chargement de la page d'accueil..."); set_cookie ("st_user", undefined, 1);	
	});
	// Fixing "click" event on sign up button.
	$ ("div.sign-up-btn-cnt > button").click (() => {
		// Changes sign state and loads sign up page.
		window.SIGN_IN = false; load_view ("../html/sign.html", "div.views", "Chargement de la page d'inscription...");
	});
	// Fixing "click" event on sign in button.
	$ ("div.sign-in-btn-cnt > button").click (() => {
		// Changes sign state and loads sign in page.
		window.SIGN_IN = true; load_view ("../html/sign.html", "div.views", "Chargement de la page de connexion...");
	});
	// Fixing "keydown" event on search bar input.
	document.querySelector ("div.search-bar > input").addEventListener ("keydown", event => {
		// Throwns "search" event to warn listener about user search.
		if (event.key == "Enter") search ();
	});
	// Selects the default option and checks the current user data.
	select_tab (window.ACTIVE_TAB, true); select_section (window.ACTIVE_SECTION, true); check_user ();
	// Fixing "click" event on dashboard option.
	$ ("div.board-cnt-opt").click (() => select_section ("div.board-cnt-opt"));
	// Fixing "click" event on home option.
	$ ("div.home-cnt-opt").click (() => select_section ("div.home-cnt-opt"));
	// Fixing "click" event on videos option.
	$ ("div.videos-cnt-opt").click (() => select_tab ("div.videos-cnt-opt"));
	// Fixing "click" event on audios option.
	$ ("div.audios-cnt-opt").click (() => select_tab ("div.audios-cnt-opt"));
	// Fixing "click" audio adder button.
	$ ("div.audio-adder > svg").click (() => console.log ("Not yet !"));
	// Fixing "click" video adder button.
	$ ("div.video-adder > svg").click (() => console.log ("Not yet !"));
	// Fixing "click" event on all categories option.
	$ ("div.all-cnt-opt").click (() => select_tab ("div.all-cnt-opt"));
	// Fixing "click" event on search button.
	$ ("div.search-icon").click (() => search ());
});

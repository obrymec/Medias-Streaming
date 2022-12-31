// Attributes.
window.active_stream = -1;
window.is_paying = false;
window.streams = [
	{
		content: "../assets/stream_1.mkv",
		viewtime: "125 k vues • Il y 3 ans",
		profil: "../assets/profil_1.jpg",
		cover: "../assets/cover_1.jpg",
		parent_id: "div.streams-data",
		producer: "Africa Studio",
		text: "African Best song",
		author: "Emilie",
		duration: "03:27",
		dislike: 10,
		type: "video",
		like: 11
	},
	{
		content: "../assets/stream_2.mkv",
		viewtime: "1 k vues • Il y 10 ans",
		profil: "../assets/profil_2.jpg",
		cover: "../assets/cover_2.jpeg",
		parent_id: "div.streams-data",
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
		parent_id: "div.streams-data",
		producer: "Music Lover",
		text: "Follow yours dreams",
		author: "Mk",
		duration: "03:23",
		dislike: 0,
		type: "video",
		like: 125890
	},
	{
		content: "../assets/stream_4.mkv",
		viewtime: "219 k vues • Il y 7 mois",
		profil: "../assets/profil_4.jpg",
		cover: "../assets/cover_4.jpg",
		parent_id: "div.streams-data",
		producer: "Music Lover",
		text: "Don't look backward you",
		author: "Davido",
		duration: "04:15",
		dislike: 2,
		type: "video",
		like: 1294
	}
];

// Called when an option has been selected.
window.ON_ACTIVE_OPTION_CHANGED = option_id => {
    // For home page selection.
    if (window.ACTIVE_SECTION.includes ("home")) {
        // Selects the target option.
        select_section (option_id);
    }
}

// Plays a stream.
function play_stream () {
	// Gets the stream reference.
	let stream = document.querySelector ("div.stream-container > video");
	// Plays the stream.
	stream.play ();
}

// Pauses a stream.
function pause_stream () {
	// Gets the stream reference.
	let stream = document.querySelector ("div.stream-container > video");
	// Pauses the stream.
	stream.pause ();
}

// Checks whether can go to the preview stream.
function check_preview_action () {
	// Are there some loaded streams ?
	if (streams.length === 0 || active_stream <= 0) $ ("div.preview-btn > svg").addClass ("disabled-control");
	// Otherwise.
	else $ ("div.preview-btn > svg").removeClass ("disabled-control");
}

// Checks whether can go to the next stream.
function check_next_action () {
	// Are there some loaded streams ?
	if (streams.length === 0 || active_stream >= (streams.length - 1)) $ ("div.next-btn > svg").addClass ("disabled-control");
	// Otherwise.
	else $ ("div.next-btn > svg").removeClass ("disabled-control");
}

// Go to the next stream.
function next () {
	// Checks the current stream index.
	if (active_stream < (streams.length - 1)) {
		// Increases the current index and opens the next stream.
		active_stream++; open_stream (streams [active_stream]);
	}
}

// Go to the preview stream.
function preview () {
	// Checks the current stream index.
	if (active_stream > 0) {
		// Increases the current index and opens the next stream.
		active_stream--; open_stream (streams [active_stream]);
	}
}

// Draws stream view.
function draw_stream (data, index, count) {
	// Corrects the passed data.
	data.on_click = () => {if (active_stream !== index) {active_stream = index; open_stream (data);}};
	// Contains a reference of a stream.
	let stream_object = new Stream (data); if ((index % 2) !== 0) $ (stream_object.get_id ()).addClass ("left-margin");
	// Is the end of the given list ?
	if (index === (count - 1)) $ (stream_object.get_id ()).addClass ("bottom-margin"); stream_object.set_id ("st-ad-" + index);
}

// Changes the active stream to the given stream data.
function open_stream (data) {
	// Sets author profil image.
	$ ("div.stream-container > div.sleft > img").attr ("src", data.profil).attr ("title", (data.author + ": " + data.producer));
	// Sets dislikes count.
	$ ("div.stream-options > div.sdislike > div.sdtext > label").text (parse_value (data.dislike));
	// Sets stream poster and content.
	$ ("div.stream-container > video").attr ("src", data.content).attr ("poster", data.cover);
	// Sets likes count.
	$ ("div.stream-options > div.slike > div.sltext > label").text (parse_value (data.like));
	// Sets stream title.
	$ ("div.stream-title > label > strong").text (str_skrink (data.text, 64));
	// Sets stream origin.
	$ ("div.stream-origin > label").text (data.viewtime);
	// Checks preview and next actions.
	check_preview_action (); check_next_action ();
}

// Called when this page is fulled loaded and ready to use.
$ (() => {
	// Fixing "click" event on the big bottom play button.
	$ ("div.play-btn > svg").click (() => {
		// Starts and pause a stream.
		if (!is_paying) {play_stream (); is_paying = true;} else {pause_stream (); is_paying = false;}
	});
	// Fixing "click" event on like button.
	$ ("div.stream-options > div.slike").click (function () {
		// Disabled all reactions buttons.
		$ (this).addClass ("clicked"); $ ("div.stream-options > div.sdislike").addClass ("disabled");
		// Updates likes count.
		streams [active_stream].like = (streams [active_stream].like + 1);
		// Sets likes count graphically.
		$ ("div.stream-options > div.slike > div.sltext > label").text (parse_value (streams [active_stream].like));
	});
	// Fixing "click" event on dislike button.
	$ ("div.stream-options > div.sdislike").click (function () {
		// Disabled all reactions buttons.
		$ (this).addClass ("clicked"); $ ("div.stream-options > div.slike").addClass ("disabled");
		// Updates dislikes count.
		streams [active_stream].dislike = (streams [active_stream].dislike + 1);
		// Sets likes count graphically.
		$ ("div.stream-options > div.sdislike > div.sdtext > label").text (parse_value (streams [active_stream].dislike));
	});
	// Diselects the home option.
	select_section ("none"); $ ("div.tags-container").text ('').html ('').removeClass ("face-off").addClass ("face-off");
	// Fixing "click" event on preview and next buttons.
	$ ("div.preview-btn > svg").click (() => preview ()); $ ("div.next-btn > svg").click (() => next ());
    // Opens the selected stream.
    open_stream (window.BIG_DATA [window.ACTIVE_STREAM [0]] [window.ACTIVE_STREAM [1]]);
    // Disables overflow on assets container.
    $ ("div.assets").addClass ("no-overflow"); window.DISPLAYER_LOADED = false;
	// Loads all streams.
	for (let pos = 0; pos < streams.length; pos++) {
		// Draws the corresponding stream object view.
		draw_stream (streams [pos], pos, streams.length);
	}
});

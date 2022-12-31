/*
* 	@Author: Obrymec
* 	@Description: Manages a media stream (audio/video).
* 	@Type: GUI
* 	@Nature: Object
* 	@Category: Assets
*	@Version: 0.1.3
* 	@Created: 2022-06-15
* 	@Updated: 2022-06-19
*/
function Stream (data) {
	// Checks data value type.
	if (Array.isArray (data) || typeof data !== "object") {
		// Shows an error message about invalid data value type.
		console.error ("Invalid stream configurations value type !"); return;
	}
	// Attributes.
	data.id = String ((data.hasOwnProperty ("id") && typeof data.id === "string") ? data.id.replace (/g /, '') : parseInt (Math.random () * 100000000));
	data.description = ((data.hasOwnProperty ("description") && typeof data.description === "string") ? data.description.trim () : String (''));
	data.duration = ((data.hasOwnProperty ("duration") && typeof data.duration === "string") ? data.duration.replace (/g /, '') : String (''));
	data.parent_id = ((data.hasOwnProperty ("parent_id") && typeof data.parent_id === "string") ? data.parent_id.trim () : String (''));
	data.profil = ((data.hasOwnProperty ("profil") && typeof data.profil === "string") ? data.profil.replace (/g /, '') : String (''));
	data.producer = ((data.hasOwnProperty ("producer") && typeof data.producer === "string") ? data.producer.trim () : String (''));
	data.viewtime = ((data.hasOwnProperty ("viewtime") && typeof data.viewtime === "string") ? data.viewtime.trim () : String (''));
	data.cover = ((data.hasOwnProperty ("cover") && typeof data.cover === "string") ? data.cover.replace (/g /, '') : String (''));
	data.author = ((data.hasOwnProperty ("author") && typeof data.author === "string") ? data.author.trim () : String (''));
	data.removable = ((data.hasOwnProperty ("removable") && typeof data.removable === "boolean") ? data.removable : false);
	data.dislike = ((data.hasOwnProperty ("dislike") && typeof data.dislike === "number") ? parseInt (data.dislike) : 0);
	data.text = ((data.hasOwnProperty ("text") && typeof data.text === "string") ? data.text.trim () : String (''));
	data.type = ((data.hasOwnProperty ("type") && typeof data.type === "string") ? data.type.trim () : String (''));
	data.like = ((data.hasOwnProperty ("like") && typeof data.like === "number") ? parseInt (data.like) : 0);
	let sm_id = null, scv_id = null, stm_id = null, sv_id = null, sa_id = null, srm_id = null, spr_id = null;
	let stx_id = null, spc_id = null, svt_id = null, slk_id = null, sdk_id = null;
	const Type = new Object ({AUDIO: "audio", VIDEO: "video"});

	/*
	* 	@Description: Creates stream html structure.
	* 	@Return: void
	*/
	this._build = () => {
		// Checks the passed tag parent id.
		if (data.parent_id.length) {
			// Initializes the main ids.
			spc_id = ("label#spc-" + data.id); svt_id = ("label#svt-" + data.id); slk_id = ("label#slk-" + data.id); sdk_id = ("label#sdk-" + data.id);
			sa_id = ("div#sa-" + data.id); srm_id = ("div#srm-" + data.id); spr_id = ("img#spr-" + data.id); stx_id = ("strong#stx-" + data.id);
			sm_id = ("div#sm-" + data.id); scv_id = ("img#scv-" + data.id); stm = ("label#stm-" + data.id); sv_id = ("div#sv-" + data.id);
			// Generating stream html tags.
			$ (data.parent_id).append ("<div class = 'stream' title = \"" + data.description + "\" id = 'sm-" + data.id + "'>\
				<div class = 'sheader' align = 'center'>\
					<div class = 'scover'><img src = '" + data.cover + "' id = 'scv-" + data.id + "'></div>\
					<div class = 'splayer'>\
						<div class = 'player-icon' title = 'Ouvrir ce média.'>\
							<svg fill = '#FFF' width = '100px' height = '100px' viewBox = '-265 388.9 64 64'><g>\
								<path d = 'M-242.6,407l26.1,15.1c0.6,0.4,0.6,1.2,0,1.6l-26.1,15.1c-0.6,\
								0.4-1.4-0.1-1.4-0.8v-30.2C-244,407.1-243.2,406.7-242.6,407 z'/></g>\
							</svg>\
						</div>\
					</div><div class = 'stime'><label id = 'stm-" + data.id + "'>" + data.duration + "</label></div>\
					<div class = 'svideo' align = 'center' id = 'sv-" + data.id + "'>\
						<svg fill = '#FFF' enable-background = 'new 0 0 48 48' height = '24px' viewBox = '0 0 48 48' width = '24px'>\
							<path clip-rule = 'evenodd' d = 'M43,42H5c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,\
							4-4h38c2.209,0,4,1.791,4,4v28 C47,40.209,45.209,42,43,42z M12,8H5c-1.104,0-2,0.896-2,\
							2v2h9V8z M23,8h-9v4h9V8z M34,8h-9v4h9V8z M45,10c0-1.104-0.896-2-2-2h-7v4 h9l0,0V10z M45,\
							14L45,14H3v20h42l0,0V14z M45,36L45,36h-9v4h-2v-4h-9v4h-2v-4h-9v4h-2v-4H3v2c0,1.104,\
							0.896,2,2,2h38 c1.104,0,2-0.896,2-2V36z M21.621,29.765C21.449,29.904,21.238,30,21,\
							30c-0.553,0-1-0.447-1-1V19c0-0.552,0.447-1,1-1 c0.213,0,0.4,0.082,0.563,0.196l7.771,\
							4.872C29.72,23.205,30,23.566,30,24c0,0.325-0.165,0.601-0.405,0.783L21.621,29.765z'\
							fill-rule = 'evenodd'/>\
						</svg>\
					</div>\
					<div class = 'saudio' align = 'center' id = 'sa-" + data.id + "'>\
						<svg fill = '#FFF' enable-background = 'new 0 0 50 50' height = '24px' viewBox = '0 0 50 50' width = '24px'>\
							<rect fill = 'none' height = '24' width = '24'/><path d = 'M43,3v35.004c0,0-0.125,5.996-6.984,\
							5.996C28.506,44,28,39.127,28,38c0-2.41,0.942-5.037,8-5.037c3.249,0,4-0.835,4-2.963 c0,0,\
							0-15.463,0-16.78s-0.08-1.793-1.543-1.462c-2.517,0.569-18.957,4.133-19.613,4.29S18,16.594,\
							18,17.75c0,2.127,0,22.997,0,25.25 s-1.742,6-8,6s-7-3.998-7-6c0-2.973,2.25-4.891,\
							7.007-4.891C14.438,38.109,15,36.86,15,35c0-6.633,0-26.04,0-27 s0.391-1.609,\
							1.366-1.824c1.631-0.358,24.78-5.131,24.78-5.131S43,0.622,43,3z'/>\
						</svg>\
					</div>\
					<div class = 'svideo-remove' title = 'Supprimer ce média.' id = 'srm-" + data.id + "'>\
						<svg viewBox = '0 0 24 24' width = '32px' height = '32px' fill = 'rgb(222, 41, 22)'>\
							<path d = 'M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,14.293a1,\
							1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,\
							8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414L13.414,12Z'/>\
						</svg>\
					</div>\
				</div>\
				<div class = 'sbody hflex'>\
					<div class = 'sleft' title = \"" + data.author + "\"><img src = '" + data.profil + "' id = 'spr-" + data.id + "'></div>\
					<div class = 'sright vflex'>\
						<div class = 'slabel'><label><strong id = 'stx-" + data.id + "'>" + str_skrink (data.text, 16) + "</strong></label></div>\
						<div class = 'sproducer'><label id = 'spc-" + data.id + "'>" + data.producer + "</label></div>\
						<div class = 'sviews-time'><label id = 'svt-" + data.id + "'>" + data.viewtime + "</label></div>\
						<div class = 'sreactions hflex'>\
							<div class = 'slike hflex'>\
								<div class = 'sltext'><label id = 'slk-" + data.id + "'>" + parse_value (data.like) + "</label></div>\
								<div class = 'slicon'>\
									<svg width = '20px' height = '20px' fill = '#343434' viewBox = '0 0 32 32'>\
										<g><path d = 'M26.78998,8.46997h-3.48999c-0.35999,\
										0-0.64001-0.28998-0.64001-0.64001v-3c0-1.59998-0.97998-2.94995-2.5-3.44995 \
										c-1.51996-0.5-3.12,0-4.06995,1.28998l-4.10004,5.53998c-0.12,0.16003-0.31,\
										0.26001-0.51001,0.26001H4.14001 C2.13,8.46997,0.5,10.09998,0.5,\
										12.10999V24.13c0,2.01001,1.63,3.63995,3.64001,3.63995h5l13.95001,2.94 c0.32996,\
										0.07001,0.64996,0.10004,0.97998,0.10004c1.04999,0,2.07001-0.35004,\
										2.90997-1.01001l2.73004-2.15002 C30.84998,26.75,31.5,25.39996,31.5,\
										23.95001V13.17999C31.5,10.57996,29.39001,8.46997,26.78998,8.46997z M7.78998,\
										24.76996 H4.14001C3.78998,24.76996,3.5,24.48999,3.5,24.13V12.10999c0-0.35999,\
										0.28998-0.64001,0.64001-0.64001h3.64996V24.76996z'/></g>\
									</svg>\
								</div>\
							</div>\
							<div class = 'sdislike hflex'>\
								<div class = 'sdtext'><label id = 'sdk-" + data.id + "'>" + parse_value (data.dislike) + "</label></div>\
								<div class = 'sdicon'>\
									<svg width = '20px' height = '20px' fill = '#343434' viewBox = '0 0 32 32'>\
										<g><path d = 'M29.71002,4.34998l-2.73004-2.14996C25.88,1.32996,24.46002,1,23.09003,\
										1.28998l-13.95001,2.94h-5 C2.13,4.22998,0.5,5.85999,0.5,7.87v12.02002c0,2.00995,\
										1.63,3.63995,3.64001,3.63995h7.33997 c0.20001,0,0.39001,0.10004,0.51001,\
										0.26001l4.10004,5.53998C16.79999,30.28998,17.87,30.81,18.98999,30.81 c0.39001,0,\
										0.78003-0.06,1.16998-0.19c1.52002-0.5,2.5-1.85004,2.5-3.45001v-3c0-0.34998,\
										0.28003-0.64001,0.64001-0.64001h3.48999 c2.60004,0,4.71002-2.10999,4.71002-4.70996V8.04999C31.5,\
										6.59998,30.84998,5.25,29.71002,4.34998z M7.78998,20.52997H4.14001 C3.78998,\
										20.52997,3.5,20.25,3.5,19.89001V7.87c0-0.35999,0.28998-0.64001,\
										0.64001-0.64001h3.64996V20.52997z'/></g>\
									</svg>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>");
			// Fixing "destroy" event.
			if (typeof data.on_destroy === "function") $ (srm_id).click (e => {e.stopPropagation (); data.on_destroy (this); $ (sm_id).remove ();});
			// Fixing "click" event.
			if (typeof data.on_click === "function") $ (sm_id).click (e => {e.stopPropagation (); data.on_click (this);});
			// Apply main configurations.
			this.set_removeable (data.removeable); this.set_type (data.type);
		// Otherwise.
		} else console.error ("Undefined parent id !");
	}

	/*
	* 	@Description: Returns description.
	* 	@Return: String
	*/
	this.get_description = () => {return data.description;}

	/*
	* 	@Description: Returns parent id.
	* 	@Return: String
	*/
	this.get_parent_id = () => {return data.parent_id;}

	/*
	* 	@Description: Returns priority state.
	* 	@Return: Boolean
	*/
	this.is_removable = () => {return data.removable;}

	/*
	* 	@Description: Returns duration.
	* 	@Return: String
	*/
	this.get_producer = () => {return data.producer;}

	/*
	* 	@Description: Returns viewtime.
	* 	@Return: String
	*/
	this.get_viewtime = () => {return data.viewtime;}

	/*
	* 	@Description: Returns duration.
	* 	@Return: String
	*/
	this.get_duration = () => {return data.duration;}

	/*
	* 	@Description: Returns dislike count.
	* 	@Return: int
	*/
	this.get_dislike = () => {return data.dislike;}

	/*
	* 	@Description: Returns author.
	* 	@Return: String
	*/
	this.get_author = () => {return data.author;}

	/*
	* 	@Description: Returns profil path.
	* 	@Return: String
	*/
	this.get_profil = () => {return data.profil;}

	/*
	* 	@Description: Returns cover path.
	* 	@Return: String
	*/
	this.get_cover = () => {return data.cover;}

	/*
	* 	@Description: Returns like count.
	* 	@Return: int
	*/
	this.get_like = () => {return data.like;}

	/*
	* 	@Description: Returns type (audio or video).
	* 	@Return: String
	*/
	this.get_type = () => {return data.type;}

	/*
	* 	@Description: Returns text content.
	* 	@Return: String
	*/
	this.get_text = () => {return data.text;}

	/*
	* 	@Description: Returns id.
	* 	@Return: String
	*/
	this.get_id = () => {return sm_id;}

	/*
	* 	@Description: Changes like count.
	* 	@Parameters:
	* 		-> int like: What is the new value of the like ?
	* 	@Return: void
	*/
	this.set_like = like => {
		// Corrects the passed like value.
		like = String (typeof like === "number" ? parseInt (like) : (typeof like === "string" ? like : 0));
		// Updates "dislike" graphically.
		$ (slk_id).text (like); data.like = like;
	}

	/*
	* 	@Description: Changes dislike count.
	* 	@Parameters:
	* 		-> int dislike: What is the new value of the dislike ?
	* 	@Return: void
	*/
	this.set_dislike = dislike => {
		// Corrects the passed dislike value.
		dislike = String (typeof dislike === "number" ? parseInt (dislike) : (typeof dislike === "string" ? dislike : 0));
		// Updates "dislike" graphically.
		$ (sdk_id).text (dislike); data.dislike = dislike;
	}

	/*
	* 	@Description: Changes removeable button state.
	* 	@Parameters:
	* 		-> bool removable: Is it a removable stream ?
	* 	@Return: void
	*/
	this.set_removeable = removeable => {
		// Corrects the passed removeable value.
		removeable = (typeof removeable === "boolean" ? removeable : false); data.removeable = removeable;
		// Checks the passed removeable.
		if (removeable) $ (srm_id).removeClass ("shider"); else $ (srm_id).addClass ("shider");
	}

	/*
	* 	@Description: Changes id.
	* 	@Parameters:
	* 		-> String id: What is the new value of id ?
	* 	@Return: void
	*/
	this.set_id = id => {
		// Corrects the passed text value.
		id = (typeof id === "string" ? id.replace (/g /, String ('')) : parseInt (Math.random () * 100000000));
		// Checks the passed text.
		if (id.length) {
			// Updates tag text graphically.
			$ (sm_id).attr ("id", id); data.id = id; sm_id = ("div#sm-" + data.id);
		// Error message.
		} else console.error ("No specified id !");
	}

	/*
	* 	@Description: Changes text content.
	* 	@Parameters:
	* 		-> String text: What is the new value of the text ?
	* 	@Return: void
	*/
	this.set_text = text => {
		// Corrects the passed text value.
		text = (typeof text === "string" ? text.trim () : null);
		// Checks the passed text.
		if (text != null) {
			// Updates stream text graphically.
			$ (stx_id).text (text); data.text = text;
		// Error message.
		} else console.error ("No specified text !");
	}

	/*
	* 	@Description: Changes description.
	* 	@Parameters:
	* 		-> String description: What is the new value of the description ?
	* 	@Return: void
	*/
	this.set_description = description => {
		// Corrects the passed description value.
		description = (typeof description === "string" ? description.trim () : null);
		// Checks the passed description.
		if (description != null) {
			// Updates stream description graphically.
			$ (sm_id).attr ("title", description); data.description = description;
		// Error message.
		} else console.error ("No specified description !");
	}

	/*
	* 	@Description: Changes duration.
	* 	@Parameters:
	* 		-> String duration: What is the new value of the duration ?
	* 	@Return: void
	*/
	this.set_duration = duration => {
		// Corrects the passed duration value.
		duration = (typeof duration === "string" ? duration.trim () : null);
		// Checks the passed duration.
		if (duration != null) {
			// Updates stream duration graphically.
			$ (stm_id).text (duration); data.duration = duration;
		// Error message.
		} else console.error ("No specified duration !");
	}

	/*
	* 	@Description: Changes cover.
	* 	@Parameters:
	* 		-> String cover: What is the new value of the cover ?
	* 	@Return: void
	*/
	this.set_cover = cover => {
		// Corrects the passed cover value.
		cover = (typeof cover === "string" ? cover.trim () : null);
		// Checks the passed cover.
		if (cover != null) {
			// Updates stream cover graphically.
			$ (scv_id).attr ("src", cover); data.cover = cover;
		// Error message.
		} else console.error ("No specified cover !");
	}

	/*
	* 	@Description: Changes author.
	* 	@Parameters:
	* 		-> String author: What is the new value of the author ?
	* 	@Return: void
	*/
	this.set_author = author => {
		// Corrects the passed author value.
		author = (typeof author === "string" ? author.trim () : null);
		// Checks the passed author.
		if (author != null) {
			// Updates stream author graphically.
			$ ("div.sleft").attr ("title", author); data.author = author;
		// Error message.
		} else console.error ("No specified author !");
	}

	/*
	* 	@Description: Changes profil.
	* 	@Parameters:
	* 		-> String profil: What is the new value of the cover ?
	* 	@Return: void
	*/
	this.set_profil = profil => {
		// Corrects the passed profil value.
		profil = (typeof profil === "string" ? profil.trim () : null);
		// Checks the passed profil.
		if (profil != null) {
			// Updates stream profil graphically.
			$ (spr_id).attr ("src", profil); data.profil = profil;
		// Error message.
		} else console.error ("No specified profil !");
	}

	/*
	* 	@Description: Changes producer home.
	* 	@Parameters:
	* 		-> String producer: What is the new value of the producer ?
	* 	@Return: void
	*/
	this.set_producer = producer => {
		// Corrects the passed producer value.
		producer = (typeof producer === "string" ? producer.trim () : null);
		// Checks the passed producer.
		if (producer != null) {
			// Updates stream producer graphically.
			$ (spc_id).text (producer); data.producer = producer;
		// Error message.
		} else console.error ("No specified producer !");
	}

	/*
	* 	@Description: Changes viewtime.
	* 	@Parameters:
	* 		-> String viewtime: What is the new value of the viewtime ?
	* 	@Return: void
	*/
	this.set_viewtime = viewtime => {
		// Corrects the passed viewtime value.
		viewtime = (typeof viewtime === "string" ? viewtime.trim () : null);
		// Checks the passed viewtime.
		if (viewtime != null) {
			// Updates stream text graphically.
			$ (svt_id).text (viewtime); data.viewtime = viewtime;
		// Error message.
		} else console.error ("No specified viewtime !");
	}

	/*
	* 	@Description: Changes the current parent to the given parent.
	* 	@Parameters:
	* 		-> String parent_id: What is the new container of the current stream ?
	* 	@Return: void
	*/
	this.set_parent_id = parent_id => {
		// Corrects the passed parent id.
		parent_id = ((typeof parent_id === "string") ? parent_id.trim () : null);
		// Checks the given parent id.
		if (parent_id != null) {
			// Contains the stream html structure.
			const html_structure = $ (sm_id).html (); $ (sm_id).remove ();
			// Creates a new stream html structure.
			$ (parent_id).append ("<div class = 'stream' title = \"" + data.description + "\"></div>");
			// Imports stream preview html structure.
			$ (sm_id).html (html_structure); data.parent_id = parent_id;
		// Shows an error message about missing container id.
		} else console.error ("No container id is specified !");
	}

	/*
	* 	@Description: Changes type.
	* 	@Parameters:
	* 		-> String type: What is the new value of the type ? The possible values are:
	* 			-> Type.AUDIO: For audio stream.
	* 			-> Type.VIDEO: For video stream.
	* 	@Return: void
	*/
	this.set_type = type => {
		// Corrects the passed type value.
		type = (typeof type === "string" ? type.trim () : null);
		// Checks the passed type.
		if (type != null) {
			// For video stream.
			if (type.toLowerCase ().includes (Type.VIDEO)) {
				// Hides audio and shows video icon.
				$ (sa_id).addClass ("shider"); $ (sv_id).removeClass ("shider");
			// For audio stream.
			} else if (type.toLowerCase ().includes (Type.AUDIO)) {
				// Hides video and showa audio icon.
				$ (sv_id).addClass ("shider"); $ (sa_id).removeClass ("shider");
			// For unknown type.
			} else {
				// Hides both icons.
				$ (sv_id).addClass ("shider"); $ (sa_id).addClass ("shider");
			// Updates the data type tag.
			} data.type = type;
		// Error message.
		} else console.error ("No specified type !");
	}

	// Creating stream component.
	this._build ();
}

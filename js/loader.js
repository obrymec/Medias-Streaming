/*
* 	@Author: Obrymec
* 	@Description: Manages a basic loader between screen loading.
* 	@Organization: CodiTheck
* 	@Type: Loader
* 	@Framework: Alpha Frontend
* 	@Nature: Object
* 	@Category: GUI
*	@Version: 0.0.1
* 	@Created: 2022-05-28
* 	@Updated: 2022-06-17
*/
function Loader (data = new Object ({}), clear_parent_content = false) {
	// Checks data value type.
	if (Array.isArray (data) || typeof data !== "object") {
		// Shows an error message about invalid data value type.
		console.error ("Invalid loader configurations value type !"); return;
	}
	// Attributes.
	data.icon_height = ((data.hasOwnProperty ("icon_height") && typeof data.icon_height === "number" && data.icon_height >= 0.0) ? parseFloat (data.icon_height) : (35.0 + "px"));
	data.icon_width = ((data.hasOwnProperty ("icon_width") && typeof data.icon_width === "number" && data.icon_width >= 0.0) ? parseFloat (data.icon_width) : (35.0 + "px"));
	data.text_size = ((data.hasOwnProperty ("text_size") && typeof data.text_size === "number" && data.text_size >= 0.0) ? parseFloat (data.text_size) : (16.0 + "px"));
	data.icon_color = ((data.hasOwnProperty ("icon_color") && typeof data.icon_color === "string") ? data.icon_color.replace (/g /, String ('')) : "#000");
	data.text_color = ((data.hasOwnProperty ("text_color") && typeof data.text_color === "string") ? data.text_color.replace (/g /, String ('')) : "#000");
	data.id = String ((data.hasOwnProperty ("id") && typeof data.id === "string") ? data.id.replace (/g /, '') : parseInt (Math.random () * 100000000));
	data.parent_id = ((data.hasOwnProperty ("parent_id") && typeof data.parent_id === "string") ? data.parent_id.trim () : String (''));
	data.label = ((data.hasOwnProperty ("label") && typeof data.label === "string") ? data.label.trim () : String (''));
	data.title = ((data.hasOwnProperty ("title") && typeof data.title === "string") ? data.title.trim () : String (''));
	let ld_id = null, tl_id = null, lb_id = null, cl_id = null;

	/*
	* 	@Description: Creates loader html structure.
	* 	@Return: void
	*/
	this._build = () => {
		// Checks the passed loader parent id.
		if (data.parent_id.length) {
			// Should us to clear the parent content before create the loader.
			if (clear_parent_content) $ (data.parent_id).text (String ('')).html (String (''));
			// Initializes the main ids.
			ld_id = ("div#ld-" + data.id); tl_id = ("div#tl-" + data.id); lb_id = ("div#ld-tt-" + data.id + ">label"); cl_id = ("div#ld-in-" + data.id + ">svg");
			// Generating loader html tags.
			$ (data.parent_id).append ("<div class = 'gen-loader' id = 'ld-" + data.id + "'>\
				<div class = 'ld-ctr' title = \"" + data.title + "\"><div class = 'loader-icon' id = 'ld-in-" + data.id + "'>\
					<svg fill = 'none' height = '" + data.icon_height + "' stroke = '" + data.icon_color + "' stroke-linecap = 'round'\
					stroke-linejoin = 'round' stroke-width = '2' viewBox = '0 0 24 24' width = '" + data.icon_width + "'>\
						<line x1 = '12' x2 = '12' y1 = '2' y2 = '6'/><line x1 = '12' x2 = '12' y1 = '18' y2 = '22'/>\
						<line x1 = '4.93' x2 = '7.76' y1 = '4.93' y2 = '7.76'/><line x1 = '16.24' x2 = '19.07' y1 = '16.24' y2 = '19.07'/>\
						<line x1 = '2' x2 = '6' y1 = '12' y2 = '12'/><line x1 = '18' x2 = '22' y1 = '12' y2 = '12'/>\
						<line x1 = '4.93' x2 = '7.76' y1 = '19.07' y2 = '16.24'/><line x1 = '16.24' x2 = '19.07' y1 = '7.76' y2 = '4.93'/>\
					</svg>\
				</div>\
				<div class = 'loader-text' id = 'ld-tt-" + data.id + "'>\
					<label style = 'color: " + data.text_color + "; font-size: " + data.text_size + ";'>" + data.label + "</label>\
				</div></div>\
			</div>");
			// Adjusts the loader layout from its parent.
			this.adjust ();
		// Otherwise.
		} else console.error ("Undefined parent id !");
	}

	/*
	* 	@Description: Destroys the current reference from the DOM.
	* 	@Return: void
	*/
	this.destroy = (delay = 0.0) => window.setTimeout (() => $ (ld_id).remove (), (typeof delay === "number" ? parseFloat (delay) : 0.0));

	/*
	* 	@Description: Returns icon height.
	* 	@Return: float
	*/
	this.get_icon_height = () => {return data.icon_height;}

	/*
	* 	@Description: Returns icon color.
	* 	@Return: String
	*/
	this.get_icon_color = () => {return data.icon_color;}

	/*
	* 	@Description: Returns text color.
	* 	@Return: String
	*/
	this.get_text_color = () => {return data.text_color;}

	/*
	* 	@Description: Returns icon width.
	* 	@Return: float
	*/
	this.get_icon_width = () => {return data.icon_width;}

	/*
	* 	@Description: Returns container id.
	* 	@Return: String
	*/
	this.get_parent_id = () => {return data.parent_id;}

	/*
	* 	@Description: Returns text size.
	* 	@Return: float
	*/
	this.get_text_size = () => {return data.text_size;}

	/*
	* 	@Description: Returns title.
	* 	@Return: String
	*/
	this.get_title = () => {return data.title;}

	/*
	* 	@Description: Returns label.
	* 	@Return: String
	*/
	this.get_label = () => {return data.label;}

	/*
	* 	@Description: Returns id.
	* 	@Return: String
	*/
	this.get_id = () => {return ld_id;}

	/*
	* 	@Description: Changes icon width.
	* 	@Parameters:
	* 		-> String width: What is the new width value ?
	* 	@Return: void
	*/
	this.set_icon_width = (width, delay = 0.0) => {
		// Corrects the passed width.
		width = (typeof width === "number" && width >= 0.0) ? (width + "px") : $ (cl_id).attr ("width");
		// Updates loader icon width.
		window.setTimeout (() => {$ (cl_id).attr ("width", width); data.icon_width = width;}, (typeof delay === "number" ? parseFloat (delay) : 0.0));
	}

	/*
	* 	@Description: Changes icon height.
	* 	@Parameters:
	* 		-> String height: What is the new height value ?
	* 	@Return: void
	*/
	this.set_icon_height = (height, delay = 0.0) => {
		// Corrects the passed height.
		height = (typeof height === "number" && height >= 0.0) ? (height + "px") : $ (cl_id).attr ("height");
		// Updates loader icon height.
		window.setTimeout (() => {$ (cl_id).attr ("height", height); data.icon_height = height;}, (typeof delay === "number" ? parseFloat (delay) : 0.0));
	}

	/*
	* 	@Description: Changes text size.
	* 	@Parameters:
	* 		-> String size: What is the new size value ?
	* 	@Return: void
	*/
	this.set_text_size = (size, delay = 0.0) => {
		// Corrects the passed size.
		size = (typeof size === "number" && size >= 0.0) ? (size + "px") : $ (lb_id).css ("font-size");
		// Updates loader text size.
		window.setTimeout (() => {$ (lb_id).css ("font-size", size); data.text_size = size;}, (typeof delay === "number" ? parseFloat (delay) : 0.0));
	}

	/*
	* 	@Description: Changes icon color.
	* 	@Parameters:
	* 		-> String color: What is the new color value ?
	* 	@Return: void
	*/
	this.set_icon_color = (color, delay = 0.0) => {
		// Corrects the passed color.
		color = (typeof color === "string") ? color.trim () : String ('');
		// Checks color value.
		if (color.length) window.setTimeout (() => {
			// Updates loader icon color.
			$ (cl_id).attr ("stroke", color); data.icon_color = color;
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0)); else console.error ("No specified color !");
	}

	/*
	* 	@Description: Changes text color.
	* 	@Parameters:
	* 		-> String color: What is the new color value ?
	* 	@Return: void
	*/
	this.set_text_color = (color, delay = 0.0) => {
		// Corrects the passed color.
		color = (typeof color === "string") ? color.trim () : String ('');
		// Checks color value.
		if (color.length) window.setTimeout (() => {
			// Updates loader text color.
			$ (lb_id).css ("color", color); data.text_color = color;
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0)); else console.error ("No specified color !");
	}

	/*
	* 	@Description: Changes title.
	* 	@Parameters:
	* 		-> String title: What is the new title value ?
	* 	@Return: void
	*/
	this.set_title = (title, delay = 0.0) => {
		// Corrects the passed title.
		title = (typeof title === "string") ? title.trim () : String ('');
		// Checks title value.
		if (title.length) window.setTimeout (() => {
			// Updates loader title.
			$ (tl_id).attr ("title", title); data.title = title;
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0)); else console.error ("No specified title !");
	}

	/*
	* 	@Description: Changes label.
	* 	@Parameters:
	* 		-> String label: What is the new label value ?
	* 	@Return: void
	*/
	this.set_label = (label, delay = 0.0) => {
		// Corrects the passed label.
		label = (typeof label === "string") ? label.trim () : String ('');
		// Checks label value.
		if (label.length) window.setTimeout (() => {
			// Updates loader label.
			$ (lb_id).text (label); data.label = label;
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0)); else console.error ("No specified label !");
	}

	/*
	* 	@Description: Changes id.
	* 	@Parameters:
	* 		-> String id: What is the new id value ? If no id has been specified, another id will be generated.
	* 	@Return: void
	*/
	this.set_id = (id, delay = 0.0) => {
		// Corrects the passed id.
		id = String ((typeof id === "string") ? id.replace (/g /, '') : parseInt (Math.random () * 100000000));
		// Checks id value.
		if (id.length) window.setTimeout (() => {
			// Updates loader id.
			$ (lb_id).attr ("id", ("ld-" + id)); data.id = id; ld_id = ("div#ld-" + data.id);
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0)); else console.error ("No specified id !");
	}

	/*
	* 	@Description: Adjusts the loader layout to center its container.
	* 	@Return: void
	*/
	this.adjust = (delay = 0.0) => {
		// Fixing action delay.
		window.setTimeout (() => {
			// Fixing the loader field size.
			$ (ld_id).css ("width", $ (data.parent_id).css ("width")).css ("height", $ (data.parent_id).css ("height"));
			// Listens container views width and height.
			const resize_observer = new ResizeObserver (entries => {
				// Getting parent width and height.
				let parent_width = (entries [0].contentRect.width + "px"), parent_height = (entries [0].contentRect.height + "px");
				// Updates loader container size.
				$ (ld_id).css ("width", parent_width).css ("height", parent_height);
			// Starts observer.
			}); resize_observer.observe (document.querySelector (data.parent_id));
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0));
	}

	/*
	* 	@Description: Changes the current loader parent to the given parent.
	* 	@Parameters:
	* 		-> String parent_id: What is the new container of the current loader ?
	* 	@Return: void
	*/
	this.set_parent_id = (parent_id, delay = 0.0) => {
		// Fixing action delay.
		window.setTimeout (() => {
			// Corrects the passed parent id.
			parent_id = (typeof parent_id === "string") ? parent_id.trim () : String ('');
			// Checks the given parent id.
			if (parent_id.length) {
				// Contains the loader html structure.
				const html_structure = $ (ld_id).html (); $ (ld_id).remove ();
				// Creates a new loader html structure.
				$ (parent_id).append ("<div class = 'gen-loader' id = 'ld-" + data.id + "'></div>");
				// Imports loader preview html structure.
				$ (ld_id).html (html_structure); data.parent_id = parent_id;
			// Shows an error message about missing container id.
			} else console.error ("No container id is specified !");
		// Waiting for the given delay.
		}, (typeof delay === "number" ? parseFloat (delay) : 0.0));
	}

	// Builds the loader.
	this._build ();
}

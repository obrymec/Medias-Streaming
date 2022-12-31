/*
* 	@Author: Obrymec
* 	@Description: Manages a simple message box.
* 	@Type: GUI
* 	@Nature: Object
* 	@Category: Assets
*	@Version: 0.0.1
* 	@Created: 2022-06-17
* 	@Updated: 2022-06-17
*/
function MessageBox (data) {
	// Checks data value type.
	if (Array.isArray (data) || typeof data !== "object") {
		// Shows an error message about invalid data value type.
		console.error ("Invalid message configurations value type !"); return;
	}
	// Attributes.
	data.id = String ((data.hasOwnProperty ("id") && typeof data.id === "string") ? data.id.replace (/g /, '') : parseInt (Math.random () * 100000000));
	data.parent_id = ((data.hasOwnProperty ("parent_id") && typeof data.parent_id === "string") ? data.parent_id.replace (/g /, '') : String (''));
	data.color = ((data.hasOwnProperty ("color") && typeof data.color === "string") ? data.color.replace (/g /, '') : String (''));
	data.zindex = ((data.hasOwnProperty ("zindex") && typeof data.zindex === "number") ? parseInt (data.zindex) : String (''));
	data.title = ((data.hasOwnProperty ("title") && typeof data.title === "string") ? data.title.trim () : String (''));
	data.hideable = ((data.hasOwnProperty ("hideable") && typeof data.hideable === "boolean") ? data.hideable : false);
	data.text = ((data.hasOwnProperty ("text") && typeof data.text === "string") ? data.text.trim () : String (''));
	data.options = ((data.hasOwnProperty ("options") && Array.isArray (data.options)) ? data.options : []);
	let msg_id = null, mtr_id = null, mtl_id = null, mtx_id = null, mic_id = null, mpt_id = null;

	/*
	* 	@Description: Creates message box html structure.
	* 	@Return: void
	*/
	this._build = () => {
		// A parent has been specified.
		if (data.parent_id.length) {
			// Configures sub ids.
			msg_id = ("div#msg-" + data.id); mtl_id = ("label#mtl-" + data.id); mtx_id = ("label#mtx-" + data.id);
			mtr_id = ("div#mtr-" + data.id); mpt_id = ("div#mpt-" + data.id); mic_id = ("div#mic-" + data.id);
			// Generating message box html code.
			$ (data.parent_id).append ("<div class = 'message-box fixed hflex' id = 'msg-" + data.id + "'>\
				<div class = 'msg-container' id = 'mtr-" + data.id + "'>\
					<div class = 'msg-header'><label id = 'mtl-" + data.id + "'>" + data.title + "</label></div>\
					<div class = 'msg-content' id = 'msg-cnt-" + data.id + "'>\
						<div class = 'msg-icon' id = 'mic-" + data.id + "'>\
							<svg style = 'enable-background:new 0 0 64 64;' viewBox = '0 0 64 64' width = '48px' height = '48px'>\
								<g transform = 'translate(228, 278)'><path fill = '" + data.color + "' d = 'M-196-222.1c-13.2,\
								0-23.9-10.7-23.9-23.9c0-13.2, 10.7-23.9, 23.9-23.9s23.9,10.7,23.9,\
								23.9 C-172.1-232.8-182.8-222.1-196-222.1L-196-222.1z M-196-267.3c-11.7,0-21.3,\
								9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3 S-184.3-267.3-196-267.3L-196-267.3z'/>\
								<polygon fill = '" + data.color + "' points = '-197.4,-236.1 -194.6,-236.1 -194.6,-233.3 -197.4,-233.3'/>\
								<polyline fill = '" + data.color + "' points = '-195.2,-238.9 -196.8,-238.9 -197.4,-250.2 \
								-197.4,-258.7 -194.6,-258.7 -194.6,-250.2 -195.2,-238.9'/></g>\
							</svg>\
						</div><div class = 'text-content' ><label id = 'mtx-" + data.id + "'>" + data.text + "</label></div>\
					</div><div class = 'msg-options hflex' id = 'mpt-" + data.id + "'></div>\
				</div>\
			</div>");
			// Fixing hideable feature.
			if (data.hideable) $ (msg_id).click (() => this.visibility (false)); this.set_options (data.options);
			// Sets z-index value and fixing no event propagation effect.
			this.set_zindex (data.zindex);
		// Error message for missing parent.
		} else console.error ("Missing message box parent id.");
	}

	/*
	* 	@Description: Returns parent id.
	* 	@Return: String
	*/
	this.get_parent_id = () => {return data.parent_id;}

	/*
	* 	@Description: Is the hideable option is actived ?
	* 	@Return: Boolean
	*/
	this.is_hideable = () => {return data.hideable;}

	/*
	* 	@Description: Returns icon color.
	* 	@Return: String
	*/
	this.get_icon_color = () => {return data.color;}

	/*
	* 	@Description: Returns option(s) list.
	* 	@Return: Array
	*/
	this.get_options = () => {return data.options;}

	/*
	* 	@Description: Returns title.
	* 	@Return: String
	*/
	this.get_title = () => {return data.title;}

	/*
	* 	@Description: Returns z-index.
	* 	@Return: int
	*/
	this.get_like = () => {return data.like;}

	/*
	* 	@Description: Returns text content.
	* 	@Return: String
	*/
	this.get_text = () => {return data.text;}

	/*
	* 	@Description: Returns the generated id.
	* 	@Return: String
	*/
	this.get_id = () => {return msg_id;}

	/*
	* 	@Description: Changes z-index value.
	* 	@Parameters:
	* 		-> int zindex: What is the new value of the z-index ?
	* 	@Return: void
	*/
	this.set_zindex = zindex => $ (msg_id).css ("z-index", ((typeof zindex === "number") ? parseInt (zindex) : 0));

	/*
	* 	@Description: Changes icon color.
	* 	@Parameters:
	* 		-> String color: What is the new value of the color ?
	* 	@Return: void
	*/
	this.set_icon_color = color => {
		// Getting icon color.
		color = (typeof color === "string" ? color.replace (/g /, String ('')) : "white");
		// Getting svg icon children and sets his path color.
		let children = $ (mic_id + " > svg > g").children (); $ (children [0]).attr ("fill", color);
		// Sets svg icon polygon and polyline color to the given color.
		$ (children [1]).attr ("fill", color); $ (children [2]).attr ("fill", color);
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
			// Updates text graphically.
			$ (mtx_id).text (text); data.text = text;
		// Error message.
		} else console.error ("No specified text !");
	}

	/*
	* 	@Description: Changes title.
	* 	@Parameters:
	* 		-> String title: What is the new value of the title ?
	* 	@Return: void
	*/
	this.set_title = title => {
		// Corrects the passed title value.
		title = (typeof title === "string" ? title.trim () : null);
		// Checks the passed title.
		if (title != null) {
			// Updates text graphically.
			$ (mtl_id).text (title); data.title = title;
		// Error message.
		} else console.error ("No specified title !");
	}

	/*
	* 	@Description: Shows/Hides the message box.
	* 	@Parameters:
	* 		-> bool visible: Should us show the message box ?
	* 	@Return: void
	*/
	this.visibility = visible => {
		// Checks the passed value of visible parameter.
		if (visible) {
			// Waiting for 300ms before throwns "on_ready" event.
			window.setTimeout (() => {if (typeof data.on_ready === "function") data.on_ready (this);}, 300);
			// Shows message box.
			window.setTimeout (() => $ (msg_id).removeClass ("msg-hide").addClass ("msg-show"), 100);
		// Otherwise.
		} else {
			// Waiting for 300ms before throwns "on_destroy" event.
			window.setTimeout (() => {
				// Thowns "on_destroy" event and removes this message box gui instance from the DOM.
				if (typeof data.on_destroy === "function") data.on_destroy (this); $ (msg_id).remove ();
			// Waiting for 300ms.
			}, 200); $ (msg_id).removeClass ("msg-hide").addClass ("msg-hide");
		}
	}

	/*
	* 	@Description: Changes provided options structure.
	* 	@Parameters:
	* 		-> Array options: Table of dictionary(ies) wich contains configurations of each buttons. Each dictionary supports the following keys:
	* 			-> String text = '': Contains option's text content.
	* 			-> String title = '': Contains option's title.
	* 			-> Function click (opt_id?: String, ref?: MessageBox): Called when you clicked on a option.
	* 	@Return: void
	*/
	this.set_options = options => {
		// Generating options.
		options.forEach ((option, index) => {
			// Gets option title.
			option.title = (typeof option.title === "string" ? option.title.trim () : String (''));
			// Gets option text.
			option.text = (typeof option.text === "string" ? option.text.trim () : String (''));
			// Generates option id.
			let opt_id = ("button#mgp-" + data.id + index);
			// A text has been specified.
			if (option.text.length) {
				// Generates the passed option as a button.
				$ (mpt_id).append ("<button title = \"" + option.title + "\" id = '" + opt_id.replace ("button#", '') + "'>\
					" + option.text + "\
				</button>");
				// Checks whether a callback for option click has been specified.
				if (typeof option.click === "function") $ (opt_id).click (e => {e.stopPropagation (); option.click (opt_id, this);});
			}
		});
	}

	// Creating message box component.
	this._build ();
}

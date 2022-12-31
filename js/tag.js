/*
* 	@Author: Obrymec
* 	@Description: Manages media tag.
* 	@Type: GUI
* 	@Nature: Object
* 	@Category: Assets
*	@Version: 0.0.1
* 	@Created: 2022-06-05
* 	@Updated: 2022-06-12
*/
function MediaTag (data) {
	// Checks data value type.
	if (Array.isArray (data) || typeof data !== "object") {
		// Shows an error message about invalid data value type.
		console.error ("Invalid loader configurations value type !"); return;
	}
	// Attributes.
	data.id = String ((data.hasOwnProperty ("id") && typeof data.id === "string") ? data.id.replace (/g /, '') : parseInt (Math.random () * 100000000));
	data.parent_id = ((data.hasOwnProperty ("parent_id") && typeof data.parent_id === "string") ? data.parent_id.replace (/g /, '') : String (''));
	data.target_id = ((data.hasOwnProperty ("target_id") && typeof data.target_id === "string") ? data.target_id.replace (/g /, '') : String (''));
	data.title = ((data.hasOwnProperty ("title") && typeof data.title === "string") ? data.title.trim () : String (''));
	data.text = ((data.hasOwnProperty ("text") && typeof data.text === "string") ? data.text.trim () : String (''));
	let tg_id = null;

	/*
	* 	@Description: Creates loader html structure.
	* 	@Return: void
	*/
	this._build = () => {
		// Checks the passed tag parent id.
		if (data.parent_id.length) {
			// Initializes the main ids.
			data.target_id = data.target_id.replace ('#', String ('')); tg_id = ("div#tg-" + data.id);
			// Generating loader html tags.
			$ (data.parent_id).append ("<div class = 'tag-row' id = 'tg-" + data.id + "' align = 'center' title = \"" + data.title + "\">\
				<a href = '#" + data.target_id + "'><label>" + data.text + "</label></a>\
			</div>");
			// Fixing click event on the current generated tag.
			$ (tg_id + " > a").click (() => {
                // The target id already exists.
                if (!$ ('#' + data.target_id).attr ("class").includes ("category-blink")) {
                    // Adds an effects to the target category.
                    $ ('#' + data.target_id).addClass ("category-blink");
                    // Removes the added effect from the target category after a few time.
                    window.setTimeout (() => $ ('#' + data.target_id).removeClass ("category-blink"), 2800);
                }
            });
		// Otherwise.
		} else console.error ("Undefined parent id !");
	}

	/*
	* 	@Description: Returns tag's target id.
	* 	@Return: String
	*/
	this.get_target_id = () => {return data.target_id;}

	/*
	* 	@Description: Returns tag's parent id.
	* 	@Return: String
	*/
	this.get_parent_id = () => {return data.parent_id;}

	/*
	* 	@Description: Returns tag's title.
	* 	@Return: String
	*/
	this.get_title = () => {return data.title;}

	/*
	* 	@Description: Returns tag's text content.
	* 	@Return: String
	*/
	this.get_text = () => {return data.text;}

	/*
	* 	@Description: Returns tag's id.
	* 	@Return: String
	*/
	this.get_id = () => {return data.id;}

	/*
	* 	@Description: Changes tag's text content.
	* 	@Parameters:
	* 		-> String text: What is the new value of the text ?
	* 	@Return: void
	*/
	this.set_text = text => {
		// Corrects the passed text value.
		text = (typeof text === "string" ? text.trim () : null);
		// Checks the passed text.
		if (text != null) {
			// Updates tag text graphically.
			$ (tg_id + " > a > label").text (text); data.text = text;
		// Error message.
		} else console.error ("No specified text !");
	}

	/*
	* 	@Description: Changes tag's title.
	* 	@Parameters:
	* 		-> String title: What is the new value of the title ?
	* 	@Return: void
	*/
	this.set_title = title => {
		// Corrects the passed text value.
		title = (typeof title === "string" ? title.trim () : null);
		// Checks the passed text.
		if (title != null) {
			// Updates tag text graphically.
			$ (tg_id).attr ("title", title); data.title = title;
		// Error message.
		} else console.error ("No specified title !");
	}

	/*
	* 	@Description: Changes tag's target id.
	* 	@Parameters:
	* 		-> String id: What is the new value of the target id ?
	* 	@Return: void
	*/
	this.set_target_id = id => {
		// Corrects the passed text value.
		id = (typeof id === "string" ? id.replace (/g /, String ('').replace ('#', String (''))) : String (''));
		// Checks the passed text.
		if (id.length) {
			// Updates tag text graphically.
			$ (tg_id + " > a").attr ("href", ('#' + id)); data.target_id = id;
		// Error message.
		} else console.error ("No specified id !");
	}

	/*
	* 	@Description: Changes tag's id.
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
			$ (tg_id).attr ("id", id); data.id = id; tg_id = ("div#tg-" + data.id);
		// Error message.
		} else console.error ("No specified id !");
	}

	// Builds the tag.
	this._build ();
}

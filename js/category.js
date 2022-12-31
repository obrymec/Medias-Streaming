/*
* 	@Author: Obrymec
* 	@Description: Manages media tag.
* 	@Type: GUI
* 	@Nature: Object
* 	@Category: Assets
*	@Version: 0.0.1
* 	@Created: 2022-06-06
* 	@Updated: 2022-06-18
*/
function Category (data) {
	// Checks data value type.
	if (Array.isArray (data) || typeof data !== "object") {
		// Shows an error message about invalid data value type.
		console.error ("Invalid category configurations value type !"); return;
	}
	// Attributes.
	data.id = String ((data.hasOwnProperty ("id") && typeof data.id === "string") ? data.id.replace (/g /, '') : parseInt (Math.random () * 100000000));
	data.parent_id = ((data.hasOwnProperty ("parent_id") && typeof data.parent_id === "string") ? data.parent_id.replace (/g /, '') : String (''));
	data.text = ((data.hasOwnProperty ("text") && typeof data.text === "string") ? data.text.trim () : String (''));
	data.content = ((data.hasOwnProperty ("content") && typeof data.content === "boolean") ? data.content : false);
	data.count = ((data.hasOwnProperty ("count") && typeof data.count === "number") ? parseInt (data.count) : 0);
	let ct_id = null, nm_id = null, cu_id = null, cnt_id = null;

	/*
	* 	@Description: Creates category html structure.
	* 	@Return: void
	*/
	this._build = () => {
		// Checks the passed parent id.
		if (data.parent_id.length) {
			// Initializes the main ids.
			ct_id = ("div#ct-" + data.id); nm_id = ("div#ct-nm-" + data.id); cu_id = ("div#cu-" + data.id); cnt_id = ("div#cnt-" + data.id);
			// Generating category html tags.
			$ (data.parent_id).append ("<div class = 'media-category' id = 'ct-" + data.id + "'>\
				<div class = 'category-header hflex'>\
					<div class = 'category-name' id = 'ct-nm-" + data.id + "'><label>" + data.text + "</label></div>\
					<div class = 'category-children-count' id = 'cu-" + data.id + "'><label>" + data.count + "</label></div>\
				</div><div class = 'category-content face-off' id = 'cnt-" + data.id + "'></div>\
			</div>");
			// Apply main configurations.
			this.content_visibility (data.content);
		// Otherwise.
		} else console.error ("Undefined parent id !");
	}

	/*
	* 	@Description: Returns parent id.
	* 	@Return: String
	*/
	this.get_parent_id = () => {return data.parent_id;}

	/*
	* 	@Description: Returns the content id.
	* 	@Return: String
	*/
	this.get_content_id = () => {return cnt_id;}

	/*
	* 	@Description: Returns element count.
	* 	@Return: int
	*/
	this.get_count = () => {return data.count;}

	/*
	* 	@Description: Returns text content.
	* 	@Return: String
	*/
	this.get_text = () => {return data.text;}

	/*
	* 	@Description: Returns id.
	* 	@Return: String
	*/
	this.get_id = () => {return ct_id;}

	/*
	* 	@Description: Changes content visibility.
	* 	@Parameters:
	* 		-> bool visible: Do you want to show the content tag ?
	* 	@Return: void
	*/
	this.content_visibility = visible => {
		// Checks value to be displayed.
		if (visible) $ (cnt_id).removeClass ("face-off"); else $ (cnt_id).addClass ("face-off");
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
			// Updates tag text graphically.
			$ (nm_id + " > label").text (text); data.text = text;
		// Error message.
		} else console.error ("No specified text !");
	}

	/*
	* 	@Description: Changes element count.
	* 	@Parameters:
	* 		-> String count: Contains the total element count ?
	* 	@Return: void
	*/
	this.set_count = count => {
		// Corrects the passed count value.
		count = (typeof count === "number" ? parseInt (count) : null);
		// Checks the passed count.
		if (count != null) {
			// Updates count graphically.
			$ (cu_id + " > label").text (count); data.count = count;
		// Error message.
		} else console.error ("No specified count !");
	}

	/*
	* 	@Description: Changes id.
	* 	@Parameters:
	* 		-> String id: What is the new value of id ?
	* 	@Return: void
	*/
	this.set_id = id => {
		// Corrects the passed id value.
		id = (typeof id === "string" ? id.replace (/g /, String ('')) : parseInt (Math.random () * 100000000));
		// Checks the passed id.
		if (id.length) {
			// Updates id graphically.
			$ (ct_id).attr ("id", id); data.id = id; ct_id = ("div#ct-" + data.id);
		// Error message.
		} else console.error ("No specified id !");
	}

	// Builds the category.
	this._build ();
}

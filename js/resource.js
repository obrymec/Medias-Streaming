/*
* 	@Author: Obrymec
* 	@Description: Manages some specific file loading.
* 	@Organization: CodiTheck
* 	@Type: Resource
* 	@Framework: Alpha Frontend
* 	@Nature: Object
* 	@Category: Assets
*	@Version: 0.0.1
* 	@Created: 2022-05-28
* 	@Updated: 2022-05-28
*/
const Resource = new Object ({
	/*
	* 	@Description: Loads any html file from its access path.
	* 	@Parameters:
	* 		-> Object configs: Contains animation configurations. This object support the following keys:
	* 			-> String path: Where found the file to be loaded ? (This key is required for process loading).
	* 			-> float limit = 180000.0: What is the timeout before remark that web server doesn't send the requested data ?
	* 			-> Function on_ready (pid: int): Called when the target html file is fully loaded and ready to use.
	* 			-> Function on_timeout (pid: int): Called when the server response hasn't been given after the given time from "limit" parameter.
	* 			-> String target: What is the container id ? Note that the container is an html tag to show the newly loaded html file.
	* 		-> float delay: What is the timeout before starting loading html file ?
	* 	@Return: void
	*/
	load_html: (configs, delay = 0.0) => {
		// Checks the passed data type.
		if (!Array.isArray (configs) && typeof configs === "object") {
			// Corrects the passed path.
			configs.path = typeof configs.path === "string" ? configs.path.trim () : String ('');
			// Checks path value.
			if (configs.path.length) {
				// Checks the file extension.
				if (configs.path.endsWith (".html")) {
					// Gets the container id.
					configs.target = ((configs.hasOwnProperty ("target") && typeof configs.target === "string") ? configs.target.trim () : String (''));
					// Checks the passed target.
					if (configs.target.length) {
						// Gets "limit" tag value.
						configs.limit = ((configs.hasOwnProperty ("limit") && typeof configs.limit === "number") ? parseFloat (configs.limit) : 180000.0);
						// Corrects the passed delay value.
						delay = ((typeof delay === "number" && delay > 0) ? parseFloat (delay) : 0.0);
						// Starts loading page time counter.
						const fid = window.setTimeout (() => {
                            // Kill the normal loading process id.
                            window.clearTimeout (lid);
							// Throwns an event about a slow loading.
							if (configs.hasOwnProperty ("on_timeout") && typeof configs.on_timeout === "function") configs.on_timeout (lid);
						// Waiting for the given load limit.
						}, configs.limit);
						// Loads the given resource after the given.
						const lid = window.setTimeout (() => $ (configs.target).load (configs.path, () => {
                            // Kill the fake loading process id.
                            window.clearTimeout (fid);
							// Throwns an event about file loaded successfully.
							if (configs.hasOwnProperty ("on_ready") && typeof configs.on_ready === "function") configs.on_ready (fid);
						// Waiting for the given delay and returns the current load process id.
						}), delay);
					// Shows an error message about an undefined id.
					} else console.error ("Undefined target id.");
				// Shows an error message about file extension.
				} else console.error ("The file's extension must be (.html).");
			// Shows an error message about an invalid path.
			} else console.error ("Invalid path value type !");
		// Invalid configurations data format.
		} else console.error ("Invalid configurations value type. An object class instance is required.");
	}
});

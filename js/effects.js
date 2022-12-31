/*
* 	@Author: Obrymec
* 	@Description: Manages some awesome effects on a web page tags.
* 	@Organization: CodiTheck
* 	@Type: AwesomeEffects
* 	@Framework: Alpha Frontend
* 	@Nature: Object
* 	@Category: Effect
*	@Version: 0.0.1
* 	@Created: 2022-05-28
* 	@Updated: 2022-05-28
*/
const AwesomeEffects = new Object ({
	/*
	* 	@Description: Runs css keyframes with some given configurations.
	* 	@Parameters:
	* 		-> Object data: Contains animation configurations.
	* 		-> Object css: Contains css properties that will be put on the target tag element after animation running.
	* 	@Return: void
	*/
	animation: (data, css = new Object ({})) => {
		// Checks the passed data type.
		if (!Array.isArray (data) && typeof data === "object") {
		    // Getting animation delay.
		    data.delay = ((data.hasOwnProperty ("delay") && typeof data.delay === "number" && data.delay > 0) ? parseFloat (data.delay) : 0.0);
		    // Waiting for the user delay.
		    window.setTimeout (() => {
		        // Getting animation iteration count.
		        data.iteration = ((data.hasOwnProperty ("iteration") && typeof data.iteration === "number") ? parseInt (data.iteration) : 1);
		        // Getting animation target reference.
		        data.ref = ((data.hasOwnProperty ("ref") && !Array.isArray (data.ref) && typeof data.ref === "object") ? data.ref : null);
		        // Getting animation name.
		        data.name = ((data.hasOwnProperty ("name") && typeof data.name === "string") ? data.name.trim () : String (''));
		        // Checks the tag element reference.
		        if (data.ref != null && data.name.length && data.iteration !== 0) {
    			    // Getting animation duration.
    			    data.duration = ((data.hasOwnProperty ("duration") && typeof data.duration === "number" && data.duration > 0) ? parseFloat (data.duration) : 0.0);
		        	// Getting animation direction.
    			    data.direction = ((data.hasOwnProperty ("direction") && typeof data.direction === "string") ? data.direction.trim () : "normal");
    			   	// Getting animation fill mode.
    			    data.fillmode = ((data.hasOwnProperty ("fillmode") && typeof data.fillmode === "string") ? data.fillmode.trim () : "forwards");
    			    // Getting animation timing function.
    		        data.easing = ((data.hasOwnProperty ("easing") && typeof data.easing === "string") ? data.easing.trim () : "ease-in-out");
    		        // Getting animation play state.
    		        data.state = ((data.hasOwnProperty ("state") && typeof data.state === "string") ? data.state.trim () : "running");
    		        // Getting animation time unit.
    		       	data.unit = ((data.hasOwnProperty ("unit") && typeof data.unit === "string") ? data.unit.trim () : "ms");
		            // Apply the configured css animation.
		            data.ref.style.animationName = data.name; data.ref.style.animationDuration = (data.duration + data.unit);
		            data.ref.style.animationFillMode = data.fillmode; data.ref.style.animationTimingFunction = data.easing;
		            data.ref.style.animationDirection = data.direction; data.ref.style.animationPlayState = data.state;
		            data.ref.style.animationIterationCount = ((data.iteration < 0) ? "infinite" : data.iteration);
		            // Waiting for animation running.
		            if (data.iteration > 0 && data.state === "running") {
		                // Waiting for animation duration.
		                const anim_pid = window.setTimeout (() => {
		                    // The current animation is it running ?
		                    if (data.state === "running") {
		                        // Resets and clears animation data.
		                        data.ref.style.animationPlayState = "none"; data.ref.style.animationIterationCount = "none";
		                        data.ref.style.animationFillMode = "none"; data.ref.style.animationDirection = "none";
		                        data.ref.style.animationTimingFunction = "none"; data.ref.style.animation = "none";
		                        data.ref.style.animationName = "none"; data.ref.style.animationDuration = "none";
		                        // Checks css parameter value.
		                        if (!Array.isArray (css) && typeof css === "object") {
		                        	// Updates element css property(ies) with the passed css data.
   			                        for (let property of Object.keys (css)) data.ref.style [property] = css [property];
		                        }
   			                    // Calls a callback when animation is over.
   			                    if (data.hasOwnProperty ("on_finished") && typeof data.on_finished === "function") data.on_finished (anim_pid);
		                    }
		                // Calculates total duration with iteration count.
		                }, (data.duration * data.iteration));
		            }
		        }
		    // Waiting for the given delay.
		    }, data.delay);
		// Invalid data format.
		} else console.error ("Invalid data value type. An object class instance is required.");
	}
});

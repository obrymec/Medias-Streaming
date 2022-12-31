// Dependencies.
const controller = require ("./js/controller.js");
const parser = require ("body-parser");
const port = process.env.PORT || 5000;
const express = require ("express");
const app = express ();

// App configurations.
app.use (express.static (__dirname));
app.use (parser.urlencoded (new Object ({extended: true})));
app.use (parser.json ());

// App routes.
app.get ('/', (req, res) => res.sendFile ("index.html", new Object ({root: __dirname})));
// Sign up operation.
app.post ("/sign-up", (req, res) => controller.sign_up (req.body, result => res.send (result)));
// Sign in operation.
app.post ("/sign-in", (req, res) => controller.sign_in (req.body, result => res.send (result)));

// Server port configuration.
app.listen (port, err => {
	// Checks whether some errors has been thrown.
	if (err) console.error ("Failed to start server error code: ", err);
	// Otherwise.
	else console.log ("Server start at port:", port);
});

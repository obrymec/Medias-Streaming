// Attributes.
const mysql = require ("mysql");
const pool = mysql.createPool (new Object ({
    host: "db4free.net", port: 3306, user: "streamer404", password: "root1234", multipleStatements: true, database: "medias_streaming"
}));
const email_validator = require ("email-validator");

// Sign up operation.
module.exports.sign_up = (data, result) => {
    // Checks inputs entry.
    if (data.username.length === 0 || data.email.length === 0 || data.password.length === 0 || data.confirm.length === 0) {
        // Sends an error message.
        result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // The passed email doesn't respect standard conventions.
    } else if (!email_validator.validate (data.email)) result (new Object ({status: 500, message: "Votre adresse email est invalide."}));
    // Checks password confirmation.
    else if (data.password.length !== data.confirm.length) result (new Object ({status: 500, message: "Vous n'avez pas correctement confirmer votre mot de passe."}));
    // Otherwise.
    else {
        // Contains a sql request for checking an existing administrator into the database.
        let check = "SELECT * FROM `Users` WHERE `pseudo` = ? OR `mail` = ? LIMIT 1;";
        // This given administrator is it already exists on the database ?
        pool.query (check, [data.username, data.email], (error, response) => {
            // Some error(s) have been detected.
            if (error) result (new Object ({status: 500, message: "L'application rencontre des difficultés à interagir avec la base de données."}));
            // Otherwise.
            else {
                // Contains a sql request for adding a new app administrator.
                let insert = "INSERT INTO `Users` (`pseudo`, `mail`, `password`) VALUES (?, ?, ?);";
                // The current administrator is already exists.
                if (response.length) result (new Object ({status: 500, message: "L'utilisateur renseigné est déjà inscrit sur la platforme."}));
                // Otherwise.
                else {
                    // Checks password length.
                    if (data.password.length <= 16) pool.query (insert, [data.username, data.email, data.password], (err, res) => {
                        // Some error(s) have been detected.
                        if (err) result (new Object ({status: 500, message: "L'application rencontre des difficultés à interagir avec la base de données."}));
                        // Otherwise.
                        else result (new Object ({status: 200, message: "Inscription réussi !"}));
                    // Otherwise.
                    }); else result (new Object ({status: 500, message: "La taille de votre mot de passe ne dois pas dépassé au maximum 16 caractères."}));
                }
            }
        });
    }
}

// Sign in operation.
module.exports.sign_in = (data, result) => {
    // Checks inputs entry.
    if (data.id.length === 0 || data.password.length === 0) result (new Object ({message: "De(s) champ(s) sont vide.", status: 500}));
    // Otherwise.
    else {
        // Contains a sql request for checking an existing administrator into the database.
        let check = "SELECT `mail`, `password` FROM `Users` WHERE `password` = ? AND (`pseudo` = ? OR `mail` = ?) LIMIT 1;";
        // This given administrator is it already exists on the database ?
        pool.query (check, [data.password, data.id, data.id], (error, response) => {
            // Some error(s) have been detected.
            if (error) result (new Object ({status: 500, message: "L'application rencontre des difficultés à interagir avec la base de données."}));
            // Otherwise.
            else {
                // The current administrator is already exists.
                if (response.length) result (new Object ({status: 200, message: "Connexion réussi !", server_data: response [0]}));
                // Otherwise.
                else result (new Object ({status: 500, message: "Les identifiants donnés sont invalide."}));
            }
        });
    }
}

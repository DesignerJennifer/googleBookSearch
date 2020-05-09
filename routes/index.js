var db = require("../models");
var axios = require("axios");

function apiRoutes(app) {
    app.get("/api/googlebooks/:title", function (req, res) {
        var title = req.params.title;
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title)
            .then(function (results) {
                res.json(results.data)
            });
    });

    app.post("/api/books", function (req, res) {
        db.Book.create(req.body).then(function (results) {
            res.json(results)
        });
    });

    // delete method here
    app.delete("/api/books/:id", function (req, res) {
        db.Book.findByIdAndDelete(req.params.id).then(function (results) {
            res.json(results)
        }
        ).catch(err); {
            res.json(error);
        };
    });

}

module.exports = apiRoutes;
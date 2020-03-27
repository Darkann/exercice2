const express = require("express");
const mysql = require("mysql");

const settings = require("./settings.json");

const sqlConfig = settings.sqlConfig;

const app = express();

app.listen(3000, () =>  {
    console.log("SERVER STARTED !");
});

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));

app.get("/api/articles", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);
    sqlConnection.query(
        "SELECT id, title, content, author, created_at FROM node_articles WHERE id = 1 LIMIT 1",
        (error, result) => {
            if (error) {
                console.log("ERROR :", error.code);
            } else {
                res.send(result[0]);
            }
            sqlConnection.end();
        });
});
app.route("/api/articles/create")
    .get((req, res) => res.status(503).send({ status: "ERROR" }))
    .post((req, res) => {
        console.log(req.body);
        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "INSERT INTO node_articles VALUES (NULL, ?, ?, ?, ?)",
            [req.body.title, req.body.content, req.body.author, req.body.date],
            (error, result) => {
                if (error) {
                    console.log("ERROR :", error.code);
                    res.status(503).send({ status: "ERROR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            });
    });
    app.route("/api/articles/delete")
    .get((req, res) => res.status(503).send({ status: "ERREUR" }))
    .post((req, res) => {
        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "DELETE FROM node_articles WHERE id = ?",
            [req.body.articleId],
            (error, result) => {
                if (error) {
                    console.log("ERREUR :", error.code);
                    res.status(503).send({ status: "ERREUR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            });
    });
app.route("/api/comments/create")
    .get((req, res) => res.status(503).send({ status: "ERREUR" }))
    .post((req, res) => {
        console.log(req.body);
        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "INSERT INTO node_comments VALUES (NULL, ?, ?, ?, ?)",
            [req.body.articleId, req.body.author, req.body.content, req.body.date],
            (error, result) => {
                if (error) {
                    console.log("ERREUR :", error.code);
                    res.status(503).send({ status: "ERREUR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            });
    });
app.route("/api/comments/delete")
    .get((req, res) => res.status(503).send({ status: "ERREUR" }))
    .post((req, res) => {
        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "DELETE FROM node_comments WHERE id = ?",
            [req.body.commentsId],
            (error, result) => {
                if (error) {
                    console.log("ERREUR :", error.code);
                    res.status(503).send({ status: "ERREUR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            });
    });
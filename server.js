const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { query } = require("express");
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/views/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: "oh no!",
        err: err,
      });
    } else {
      const dataArray = JSON.parse(data);
      res.json(dataArray);
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: "Issue with reading stored note file",
        err: err,
      });
    } else {
      const dataArray = JSON.parse(data);
      req.body.id = uuidv4();
      dataArray.push(req.body);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(dataArray, null, 4),
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              msg: "Issue with storing updated note file",
              err: err,
            });
          } else {
            res.json(dataArray);
          }
        }
      );
    }
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: "Issue with reading stored note file",
        err: err,
      });
    } else {
      const dataArray = JSON.parse(data);

      dataArray.forEach((note) => {
        if (req.params.id === note.id) {
          const indexToDelete = dataArray
            .map((note) => note.id)
            .indexOf(`${req.params.id}`);
          dataArray.splice(indexToDelete, 1);
        }
      });
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(dataArray, null, 4),
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              msg: "Issue with storing updated note file",
              err: err,
            });
          } else {
            res.json(dataArray);
          }
        }
      );
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/views/index.html"));
});

app.listen(PORT, () => {
  console.log(`listenin on port ${PORT}`);
});

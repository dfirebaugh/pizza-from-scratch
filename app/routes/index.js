"use strict";

const path = process.cwd();
const Toon = require("../models/cartoons");
const multer = require("multer");

module.exports = function(app, passport) {
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../../public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({
    storage: storage
  });

  app.route("/").get((req, res) => {
    res.sendFile(path + "/public/index.html");
  });

  app.route("/login").get(function(req, res) {
    res.sendFile(path + "/public/login.html");
  });

  app.route("/logout").get(function(req, res) {
    req.logout();
    res.redirect("/login");
  });

  app.route("/profile").get(isLoggedIn, function(req, res) {
    res.sendFile(path + "/public/profile.html");
  });

  app
    .route("/upload")
    .get(isLoggedIn, (req, res) => {
      res.sendFile(path + "/public/upload.html");
    })
    .post(isLoggedIn, upload.array("imgs", 12), (req, res) => {
      //Example image file name:
      //FileSchema: YYYY_MM_DD_position_title_index_extension
      //2009_08_24_r1p1_PfS-Vito1_1_.png
      console.log(req.files);
      let uploadedFiles = req.files.map(x => {
        let img = x.originalname.split("_");
        let panelObj = {
          id: img[3],
          index: img[5],
          pos: img[3],
          url: `/toon-images/${x.originalname}`,
          originalName: x.originalname
        };
        console.log("URL::  ", panelObj.url);
        return panelObj;
      });
      let toon = new Toon({
        id: req.body.id,
        toonId: req.body.toonId,
        title: req.body.title,
        publishingDate: req.body.publishingDate,
        storyArc: req.body.storyArc,
        artistComments: req.body.artistComments,
        panels: uploadedFiles
      });

      toon.save((err, result) => {
        if (err) {
          res.json({
            err: err.message,
            id: toon.id
          });
        } else {
          res.json({
            message: "success!",
            id: toon.id
          });
        }
      });
    });

  app.route("/api/user/:id").get(isLoggedIn, function(req, res) {
    res.json(req.user.github);
  });

  app.route("/auth/github").get(passport.authenticate("github"));

  app.route("/auth/github/callback").get(
    passport.authenticate("github", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  const stubToon = {
    id: "String",
    title: "String",
    publishingDate: "String",
    storyArc: "String",
    artistComments: "String",
    panels: [
      {
        id: "String",
        title: "String",
        publishingDate: "String",
        panels: "[PanelSchema]"
      }
    ]
  };

  app.route("/api/toons/latest").get((req, res) =>
    Toon.find({}, (err, doc) => {
      res.send(doc.filter((x, i) => i == doc.length - 1));
    })
  );

  app
    .route("/api/toons")
    .get((req, res) => Toon.find({}, (err, doc) => res.send(doc)))
    .post((req, res) => {
      let toon = new Toon({
        id: req.body.id,
        toonId: req.body.toonId,
        title: req.body.title,
        publishingDate: req.body.publishingDate,
        storyArc: req.body.storyArc,
        artistComments: req.body.artistComments,
        panels: [
          {
            id: "String",
            title: "String",
            publishingDate: "String",
            panels: "[PanelSchema]"
          }
        ]
      });

      toon.save((err, result) => {
        if (err) {
          res.json({
            err: err.message,
            id: toon.id
          });
        } else {
          res.json({
            message: "success!",
            id: toon.id
          });
        }
      });
    });
};

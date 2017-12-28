var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Save = mongoose.model("save");

router.post("/", (req,res) => {
  var newSave = new Save({
    name: req.body.name,
    time: req.body.time,
    year: req.body.year,
    starved: req.body.starved,
    starvedTotal: req.body.starvedTotal,
    immigrants: req.body.immigrants,
    population: req.body.population,
    land: req.body.land,
    bushelsPerAcre: req.body.bushelsPerAcre,
    rats: req.body.rats,
    harvest: req.body.harvest,
    points: req.body.points,
    store: req.body.store,
    landTrade: req.body.landTrade,
    starvedTotal: req.body.starvedTotal,
    landRate: req.body.landRate,
    classic: req.body.classic,
    gameDifficulty: req.body.gameDifficulty
    })
  })

router.get("/:id", (req, res) => {
  var saveid = new mongodb.ObjectID(req.params["id"]);
  save.findOne({"_id": saveid},
  function (err, saves) {
    if (err) {
     res.send(err);
    } else {
      res.send(saves);
      }
    })
  })

router.put("/:id", (req, res) => {
  var saveid = new mongodb.ObjectID(req.params["id"]);
  save.find({"_id": saveid},function (err, save) {
   if (err) {
     res.status(500).send(err);
    } else {
    var save = save[0];
    save.name = req.body.name || save.name;
    save.time = req.body.time || save.time;
    save.year = req.body.year || save.year;
    save.starved = req.body.starved || save.starved;
    save.immigrants = req.body.immigrants || save.immigrants;
    save.population = req.body.population || save.population;
    save.land = req.body.land || save.land;
    save.bushelsPerAcre = req.body.bushelsPerAcre || save.bushelsPerAcre;
    save.rats = req.body.rats || save.rats;
    save.harvest = req.body.harvest || save.harvest;
    save.points = req.body.points || save.points;
    save.store = req.body.store || save.store;
    save.landTrade = req.body.landTrade || save.landTrade;
    save.starvedTotal = req.body.starvedTotal || save.starvedTotal;
    save.landRate = req.body.landRate || save.landRate;
    save.classic = req.body.classic || save.classic;
    save.gameDifficulty = req.body.gameDifficulty || save.gameDifficulty;
    Save.save(function (err, save) {
     if (err) {
       res.status(500).send(err)
      } else {
        res.send(save);
      }
    }
        });
    });
  })

router.delete("/", (req, res) => {
  var saveid = req.body._id;
  Save.find({_id: saveid}).remove().then(() => {
    res.send("success");
        })
      })
module.exports = router;

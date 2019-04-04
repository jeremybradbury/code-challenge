var models = require("../models");
var express = require("express");
var router = express.Router();

router.post("/create", function(req, res) {
  models.MockData
    .create({
      email: req.body.email,
      foo: req.body.foo,
      bar: req.body.bar,
    })
    .then(function(result) {
      res.json(result);
    });
});

router.get("/:id", function(req, res) {
  models.MockData.findByPk(req.params.id).then(function(result) {
    res.json(result);
  });
});

router.post("/:id/update", function(req, res) {
  models.MockData
    .update({
      id: req.params.id,
      email: req.body.email,
      foo: req.body.foo,
      bar: req.body.bar,
    })
    .then(function(result) {
      res.json(result);
    });
});

router.get("/:id/destroy", function(req, res) {
  models.MockData
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function(result) {
      res.json(result);
    });
});

module.exports = router;

var models = require("../models");
var express = require("express");
var router = express.Router();

router.post("/create", function(req, res) {
  models.MockData
    .findAll({
      order: [["id", "DESC"]],
      limit: 1,
      plain: true,
    })
    .then(last => {
      return models.MockData.create({
        id: req.body.id || last.id + 1,
        email: req.body.email,
        message: req.body.message,
        foo: req.body.foo,
        bar: req.body.bar,
      });
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
  let user = {
    email: req.body.email || undefined,
    message: req.body.message || undefined,
    foo: req.body.foo || undefined,
    bar: req.body.bar || undefined,
  };
  models.MockData
    .update(user, {
      where: { id: req.params.id },
      returning: true,
    })
    .then(() => models.MockData.findByPk(req.params.id))
    .then(data => {
      res.json(data);
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

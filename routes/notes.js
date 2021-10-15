var express = require("express");
var router = express.Router();
var NotesService = require("../services/NotesService");
const service = new NotesService();


router.get("/", function (req, res, next) {
  const resp = service.tryGetAll();
  res.send(resp);
});

router.get("/stats", function (req, res, next) {
  const resp = service.tryGetSummary();
  res.send(resp);
});

router.post("/", function (req, res, nex) {
  const resp = service.tryCreate(req.body);
  res.send(resp);
});

router.get("/:id", function (req, res, next) {
  const resp = service.tryGetById(req.params);
  res.status(resp.status || 200).send(resp);
});

router.patch("/:id", function (req, res, next) {
  const resp = service.tryUpdate({ ...req.params, ...req.body });
  res.send(resp);
});

router.delete("/:id", function (req, res, next) {
  const resp = service.tryDelete(req.params);
  res.send(resp);
});

module.exports = router;

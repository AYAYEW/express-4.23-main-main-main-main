const express = require("express");
const router = express.Router();
const app = express();
const Joi = require("joi");
const { db } = require("../services/db.js");
const { authRequired } = require("../services/auth.js");

// GET /
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/snake", authRequired, function (req, res, next) {
  console.log(req.user);
  res.render("snake", { result: { id: req.user.sub } });
});
router.get("/score_game", authRequired, function (req, res, next) {
  console.log("score game");
  
  const stmt = db.prepare(`                    
  SELECT *
  FROM signed_up
  WHERE userid = ?
  `);
  const dbResult = stmt.all(req.user.sub);
  if (!dbResult) {
      throw new Error("AAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!");
  }

  console.log(dbResult);

  res.render("score_game", { score: dbResult[0].score_game });
});
module.exports = router;

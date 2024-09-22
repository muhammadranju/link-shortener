const router = require("express").Router();
const {
  createUrl,
  getUrl,
  getUrlHistory,
} = require("../controllers/url.controller");

router.route("/").post(createUrl);
router.route("/:id").get(getUrl);
router.route("/history/:id").get(getUrlHistory);

module.exports = router;

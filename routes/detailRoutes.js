const express = require("express");

const {
  getDetails,
  getDetail,
  createDetails,
  updateDetails,
  deleteDetails,
} = require("../controllers/detailControllers");

const router = express.Router();

router.route("/").get(getDetails).post(createDetails);

router.route("/:id").get(getDetail).put(updateDetails).delete(deleteDetails);

module.exports = router;

const express = require("express");

const {
  getDetails,
  getDetail,
  createDetails,
  updateDetails,
  deleteDetails,
} = require("../controllers/detailControllers");

const router = express.Router();

//Details routes to create and get details
router.route("/").get(getDetails).post(createDetails);

//Details routes to update delete and get details by ID
router.route("/:id").get(getDetail).put(updateDetails).delete(deleteDetails);

module.exports = router;

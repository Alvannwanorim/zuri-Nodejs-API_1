const Details = require("../models/detailsModel");

//@desc Get Details
//@route GET /api/vi/details
//@acess Public
exports.getDetails = async (req, res) => {
  try {
    const details = await Details.find({});
    if (details.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "the object is exmpty",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully obtained records",
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};

exports.getDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const detail = await Details.findById(id);

    if (!detail) {
      return res.status(404).json({
        status: "failed",
        message: "details not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};

exports.createDetails = async (req, res) => {
  const { name, country, email } = req.body;

  try {
    if (!name || email || country) {
      return res.status(400).json({
        status: "Create Failure",
        message:
          "name email and country are require fields, Please fill where appropriate",
      });
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const regResult = re.test(String(email).toLowerCase());

    if (regResult === false) {
      res.status(500).json({
        status: "Create Failure",
        message: "the email format is incorrect please the email and try aagin",
      });
    }
    const existDetails = await Details.findOne({ email });

    if (existDetails) {
      return res.status(400).json({
        status: "Create Failure",
        message: "email already exists",
      });
    }
    const newDetail = new Details({ name, email, country });
    await newDetail.save();

    res.status(201).json({
      status: "success",
      message: "new details creted successfully",
      data: newDetail,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};

exports.updateDetails = async (req, res) => {
  const id = req.params;
  try {
    const detail = await Details.findById(id);
    if (!detail) {
      return res.status(404).json({
        status: "request failed",
        message: "details not found ",
      });
    }
    detail.name = req.body.name || detail.name;
    detail.country = req.body.country || detail.country;
    detail.postalCode = req.body.postalCode || detail.postalCode;
    detail.city = req.body.city || detail.city;
    detail.country = req.body.country || detail.country;

    const updatedDetail = await detail.save();

    res.status(201).json({
      status: "success",
      message: "details updated successfully",
      data: updatedDetail,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};

exports.deleteDetails = async (req, res) => {
  const id = req.params;
  try {
    const detail = await Details.findById(id);

    if (!detail) {
      return res.status(404).json({
        status: "request failed",
        message: "details not found ",
      });
    }
    const deletedDetail = await detail.remove();
    res.status(201).json({
      status: "success",
      message: "details deleted successfully",
      data: deletedDetail,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};

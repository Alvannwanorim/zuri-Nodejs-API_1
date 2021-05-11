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
        message: "This collection is exmpty",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully obtained records",
      totalItems: details.length,
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      status: " server failure",
      message: error.message,
    });
  }
};
//@desc Delete  Details
//@route DELETE /api/v1/details
//@acess Public
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

//@desc Create  Details
//@route POST /api/v1/details
//@acess Public

exports.createDetails = async (req, res) => {
  const { name, country, email } = req.body;

  try {
    if (!name || !email || !country) {
      return res.status(400).json({
        status: "Create Failure",
        message:
          "name email and country are require fields, Please fill where appropriate",
      });
    }
    if (name.length < 3) {
      return res.status(400).json({
        status: "Create Failure",
        message: "name must be at least three letters long ",
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

//@desc Update   Details
//@route PUT /api/v1/details/:id
//@acess Publics
exports.updateDetails = async (req, res) => {
  const id = req.params.id;
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

//@desc Delete  Details
//@route DELETE /api/v1/details/:id
//@acess Public
exports.deleteDetails = async (req, res) => {
  const id = req.params.id;
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

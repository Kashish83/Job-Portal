const Company = require("../models/Company");

// ✅ Get Company Profile
exports.getCompanyProfile = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can access company profile",
      });
    }

    const company = await Company.findOne({ owner: req.user._id });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    res.json(company);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update / Create Company Profile
exports.updateCompanyProfile = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can update company profile",
      });
    }

    const { name, description, website, location, logo } = req.body;

    const updatedCompany = await Company.findOneAndUpdate(
      { owner: req.user._id },
      {
        name,
        description,
        website,
        location,
        logo,
        owner: req.user._id, // enforce owner
      },
      { new: true, upsert: true }
    );

    res.json(updatedCompany);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

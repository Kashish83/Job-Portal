// const mongoose = require("mongoose");
// const JobseekerProfile = require("../models/JobseekerProfile");

// exports.addCertification = async (req, res) => {
//   try {
//     if (req.user.role !== "jobseeker") {
//       return res.status(403).json({ message: "Only jobseekers allowed" });
//     }

//     const { title, organization, year } = req.body;

//     if (!title || !organization) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const profile = await JobseekerProfile.findOne({
//       user: req.user._id
//     });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     profile.certifications.push({
//       title,
//       organization,
//       year
//     });

//     await profile.save();

//     res.json({
//       message: "Certification added",
//       certifications: profile.certifications
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.deleteCertification = async (req, res) => {
//   try {
//     if (req.user.role !== "jobseeker") {
//       return res.status(403).json({ message: "Only jobseekers allowed" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid Certification ID" });
//     }

//     const profile = await JobseekerProfile.findOne({
//       user: req.user._id
//     });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     profile.certifications = profile.certifications.filter(
//       cert => cert._id.toString() !== req.params.id
//     );

//     await profile.save();

//     res.json({
//       message: "Certification removed",
//       certifications: profile.certifications
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

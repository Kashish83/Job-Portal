// const fs = require("fs");
// const extractText = require("../utils/extractText");
// const analyzeResume = require("../utils/resumeAnalyzer");

// exports.uploadAndAnalyzeResume = async (req, res) => {
//   try {
//     if (req.user.role !== "jobseeker") {
//       return res.status(403).json({ message: "Only jobseekers allowed" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Resume file is required" });
//     }

//     const allowedTypes = [
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ];

//     if (!allowedTypes.includes(req.file.mimetype)) {
//       return res.status(400).json({ message: "Only PDF or DOCX allowed" });
//     }

//     const text = await extractText(req.file.path, req.file.mimetype);
//     const analysis = await analyzeResume(text);

//     let parsedAnalysis;
//     try {
//       parsedAnalysis = JSON.parse(analysis);
//     } catch {
//       parsedAnalysis = analysis;
//     }

//     // optional: delete file after processing
//     fs.unlinkSync(req.file.path);

//     res.json({
//       success: true,
//       analysis: parsedAnalysis,
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

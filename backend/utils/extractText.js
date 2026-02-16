// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const mammoth = require("mammoth");

// const extractText = async (filePath, mimetype) => {
//   const buffer = fs.readFileSync(filePath);

//   if (mimetype === "application/pdf") {
//     const data = await pdfParse(buffer);
//     return data.text;
//   }

//   if (mimetype.includes("word")) {
//     const data = await mammoth.extractRawText({ buffer });
//     return data.value;
//   }

//   throw new Error("Unsupported file format");
// };

// module.exports = extractText;

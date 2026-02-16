// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const analyzeResume = async (resumeText) => {
//   const prompt = `
// You are an ATS resume analyzer.

// Analyze the resume and return JSON:

// {
//   "score": number (0-100),
//   "skillsFound": [],
//   "missingSkills": [],
//   "improvements": [],
//   "summary": ""
// }

// Resume:
// ${resumeText}
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.3,
//   });

//   return response.choices[0].message.content;
// };

// module.exports = analyzeResume;

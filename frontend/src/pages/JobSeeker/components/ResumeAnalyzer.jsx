// import { useState } from "react";
// import API from "../utils/api";

// export default function ResumeAnalyzer() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);

//   const uploadResume = async () => {
//     const formData = new FormData();
//     formData.append("resume", file);

//     const res = await API.post("/resume/analyze-resume", formData);
//     setResult(res.data.analysis);
//   };

//   return (
//     <div>
//       <h2>Resume Analyzer</h2>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={uploadResume}>Analyze Resume</button>

//       {result && (
//         <div>
//           <h3>Score: {result.score}</h3>
//           <h4>Skills Found:</h4>
//           <ul>{result.skillsFound.map(s => <li key={s}>{s}</li>)}</ul>
//         </div>
//       )}
//     </div>
//   );
// }

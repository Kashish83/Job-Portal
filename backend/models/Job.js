const mongoose= require("mongoose");
const JobSchema= new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
     postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User model reference
      required: true,
    },
    salary:{type:String},
    skillsRequired: [{ type: String }], // ✅ lowercase

    location:{type:String},
status: { type: String, enum: ["open", "closed"], default: "open" } // ✅ added
},
{timestamps:true}
);
const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
import React,{useEffect,useState} from "react";
import API from "../../utils/api"; 
const CompanyProfile=()=>{
    const [company,setcompany]=useState({
        name:"",
        logo:"",
        email:"",
        phone:"",
        website:"",
        about:"",
        location:""
    });
 const [loading, setLoading] = useState(false);
    //fetch company profile
    useEffect(()=>{
        const fetchProfile=async()=>{
            try{
const res= await API.get("/employer/company-profile");
setcompany(res.data);
            }catch(err){
alert("Failed to load company profile");
            }
        }
        fetchProfile();
    }, []);
    //handle input changes
    const handleChange=(e)=>{
        setcompany({
            ...company,
            [e.target.name]:e.target.value
        })
    }
//update profile
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await API.put("/employer/company-profile",company);
            alert("company profile updated successfully");
        }catch(err){
            alert("profile not found");
        }finally{
            setLoading(false);
        }
    };
    return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Company Profile</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={company.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Company Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={company.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={company.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={company.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={company.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">About Company</label>
              <textarea
                className="form-control"
                name="about"
                rows="4"
                value={company.about}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};
export default CompanyProfile;
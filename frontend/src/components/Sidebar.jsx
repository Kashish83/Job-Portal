function Sidebar({ role, setView }) {
  return (
    <div style={{ width: "220px", background: "#f4f4f4", padding: "15px" }}>
      <h4>Dashboard</h4>

      {role === "jobseeker" && (
        <>
          <button onClick={() => setView("jobs")}>All Jobs</button>
          <br />
          <button onClick={() => setView("applications")}>
            My Applications
          </button>
        </>
      )}

      {role === "employer" && (
        <>
          <button onClick={() => setView("create")}>Create Job</button>
          <br />
          <button onClick={() => setView("myjobs")}>My Jobs</button>
        </>
      )}
    </div>
  );
}

export default Sidebar;

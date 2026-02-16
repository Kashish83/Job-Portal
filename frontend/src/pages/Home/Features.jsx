export default function Features() {
  return (
    <section className="py-5 bg-white">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose JobPortal?</h2>
          <p className="text-muted">Everything you need in one platform</p>
        </div>

        <div className="row g-4">
          {[
            {
              icon: "bi-search",
              title: "Smart Job Search",
              text: "Find jobs faster with intelligent filters and matching.",
            },
            {
              icon: "bi-briefcase",
              title: "For Recruiters",
              text: "Post jobs, manage applicants, and hire efficiently.",
            },
            {
              icon: "bi-shield-check",
              title: "Secure Platform",
              text: "Your data is safe with enterprise-grade security.",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <i className={`bi ${item.icon} fs-1 text-primary mb-3`}></i>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

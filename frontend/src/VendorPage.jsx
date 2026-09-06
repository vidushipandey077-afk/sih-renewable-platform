import React, { useState } from "react";
import "./VendorPage.css";

function VendorPage({ onBack }) {
  const [formData, setFormData] = useState({
    location: "",
    capacity: "",
    systemType: "Solar Rooftop",
    projectType: "Residential",
    budget: "",
    timeline: "",
  });

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSearch(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSearched(false);
    setVendors([]);

    try {
      const response = await fetch(
        "http://localhost:5001/api/vendors/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: formData.location.trim(),
            capacity: Number(formData.capacity),
            systemType: formData.systemType,
            projectType: formData.projectType,
            budget: formData.budget
              ? Number(formData.budget)
              : null,
            timeline: formData.timeline,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to find vendors."
        );
      }

      setVendors(data.vendors || []);
      setSearched(true);
    } catch (error) {
      console.error("Vendor search error:", error);

      setError(
        "Could not connect to the backend. Please make sure the Node server is running on port 5001."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rea-vendors-page">

      {/* ================================
          TOP BAR
      ================================= */}

      <div className="rea-vendors-topbar">

        <button
          type="button"
          className="rea-vendors-back"
          onClick={onBack}
        >
          ← Back to Home
        </button>

        <div className="rea-vendors-brand">
          Renewable Energy Advisor
        </div>

      </div>


      {/* ================================
          HERO
      ================================= */}

      <section className="rea-vendors-hero">

        <div className="rea-vendors-hero-inner">

          <div className="rea-vendors-eyebrow">
            SOLAR VENDOR MATCHING
          </div>

          <h1>
            Find the right solar
            <span> vendor for your project.</span>
          </h1>

          <p>
            Tell us what you need and discover
            solar providers matched to your
            location, capacity and project
            requirements.
          </p>

        </div>

      </section>


      {/* ================================
          SEARCH FORM
      ================================= */}

      <section className="rea-vendors-form-section">

        <div className="rea-vendors-form-card">

          <div className="rea-vendors-form-heading">

            <span>
              PROJECT DETAILS
            </span>

            <h2>
              Tell us about your requirement
            </h2>

            <p>
              A few details help us find better
              matches for you.
            </p>

          </div>


          <form
            className="rea-vendors-form"
            onSubmit={handleSearch}
          >

            {/* Location */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-location">
                Project Location
              </label>

              <input
                id="vendor-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lucknow, Uttar Pradesh"
                required
              />

              <small>
                Enter your city or district.
              </small>

            </div>


            {/* Capacity */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-capacity">
                Required Capacity
              </label>

              <div className="rea-vendors-unit-input">

                <input
                  id="vendor-capacity"
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="0.1"
                  step="0.1"
                  required
                />

                <span>kW</span>

              </div>

              <small>
                Approximate system size required.
              </small>

            </div>


            {/* System type */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-system-type">
                System Type
              </label>

              <div className="rea-vendors-select-wrapper">

                <select
                  id="vendor-system-type"
                  name="systemType"
                  value={formData.systemType}
                  onChange={handleChange}
                >

                  <option value="Solar Rooftop">
                    Solar Rooftop
                  </option>

                  <option value="Ground Mounted">
                    Ground Mounted
                  </option>

                  <option value="Commercial Solar">
                    Commercial Solar
                  </option>

                  <option value="Industrial Solar">
                    Industrial Solar
                  </option>

                  <option value="Solar + Battery">
                    Solar + Battery
                  </option>

                </select>

              </div>

            </div>


            {/* Project type */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-project-type">
                Project Type
              </label>

              <div className="rea-vendors-select-wrapper">

                <select
                  id="vendor-project-type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >

                  <option value="Residential">
                    Residential
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>

                  <option value="Industrial">
                    Industrial
                  </option>

                  <option value="Agricultural">
                    Agricultural
                  </option>

                </select>

              </div>

            </div>


            {/* Budget */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-budget">
                Estimated Budget
              </label>

              <div className="rea-vendors-currency-input">

                <span>₹</span>

                <input
                  id="vendor-budget"
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 250000"
                  min="0"
                />

              </div>

              <small>
                Optional.
              </small>

            </div>


            {/* Timeline */}

            <div className="rea-vendors-field">

              <label htmlFor="vendor-timeline">
                Installation Timeline
              </label>

              <div className="rea-vendors-select-wrapper">

                <select
                  id="vendor-timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >

                  <option value="">
                    Select timeline
                  </option>

                  <option value="Immediately">
                    Immediately
                  </option>

                  <option value="Within 1-3 months">
                    Within 1–3 months
                  </option>

                  <option value="Within 3-6 months">
                    Within 3–6 months
                  </option>

                  <option value="6+ months">
                    6+ months
                  </option>

                </select>

              </div>

            </div>


            {/* Search button */}

            <button
              type="submit"
              className="rea-vendors-submit"
              disabled={loading}
            >

              {loading
                ? "Finding vendors..."
                : "Find Matching Vendors →"}

            </button>

          </form>

        </div>

      </section>


      {/* ================================
          ERROR
      ================================= */}

      {error && (

        <div className="rea-vendors-error">
          {error}
        </div>

      )}


      {/* ================================
          RESULTS
      ================================= */}

      {searched && !loading && (

        <section className="rea-vendors-results">

          <div className="rea-vendors-results-heading">

            <span>
              VENDOR MATCHES
            </span>

            <h2>
              {vendors.length > 0
                ? `${vendors.length} ${
                    vendors.length === 1
                      ? "vendor"
                      : "vendors"
                  } found`
                : "No matching vendors found"}
            </h2>

            <p>
              Vendors are ranked according to
              your project requirements.
            </p>

          </div>


          {vendors.length > 0 ? (

            <div className="rea-vendors-grid">

              {vendors.map((vendor) => (

                <article
                  className="rea-vendor-card"
                  key={vendor.id}
                >

                  {/* CARD HEADER */}

                  <div className="rea-vendor-header">

                    <div className="rea-vendor-logo">
                      {vendor.name.charAt(0)}
                    </div>

                    <div className="rea-vendor-title">

                      <h3>
                        {vendor.name}
                      </h3>

                      <p>
                        📍 {vendor.location}
                      </p>

                    </div>

                  </div>


                  {/* RATING */}

                  <div className="rea-vendor-rating-row">

                    <div className="rea-vendor-rating">

                      <span className="rea-vendor-star">
                        ★
                      </span>

                      <strong>
                        {vendor.rating}
                      </strong>

                      <span>
                        ({vendor.reviews} reviews)
                      </span>

                    </div>


                    {vendor.matchScore !== undefined && (

                      <span className="rea-vendor-match">
                        {vendor.matchScore}% Match
                      </span>

                    )}

                  </div>


                  {/* VERIFIED */}

                  {vendor.verified && (

                    <div className="rea-vendor-verified">
                      ✓ Verified Vendor
                    </div>

                  )}


                  {/* DESCRIPTION */}

                  <p className="rea-vendor-description">
                    {vendor.description}
                  </p>


                  {/* STATS */}

                  <div className="rea-vendor-stats">

                    <div>

                      <span>
                        EXPERIENCE
                      </span>

                      <strong>
                        {vendor.experience} years
                      </strong>

                    </div>

                    <div>

                      <span>
                        CAPACITY
                      </span>

                      <strong>
                        {vendor.minCapacity}–
                        {vendor.maxCapacity} kW
                      </strong>

                    </div>

                    <div>

                      <span>
                        PROJECTS
                      </span>

                      <strong>
                        {vendor.projectsCompleted}+
                      </strong>

                    </div>

                  </div>


                  {/* SERVICES */}

                  <div className="rea-vendor-services">

                    {vendor.services.map(
                      (service) => (

                        <span key={service}>
                          {service}
                        </span>

                      )
                    )}

                  </div>


                  {/* CONTACT */}

                  <div className="rea-vendor-contact">

                    <div className="rea-vendor-contact-info">

                      <a
                        href={`tel:${vendor.phone}`}
                      >
                        📞 {vendor.phone}
                      </a>

                      <a
                        href={`mailto:${vendor.email}`}
                      >
                        ✉ {vendor.email}
                      </a>

                    </div>


                    <div className="rea-vendor-contact-buttons">

                      <a
                        href={`tel:${vendor.phone}`}
                        className="rea-vendor-call"
                      >
                        Call
                      </a>

                      <a
                        href={`mailto:${vendor.email}?subject=Solar Project Enquiry`}
                        className="rea-vendor-contact-button"
                      >
                        Contact Vendor →
                      </a>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="rea-vendors-empty">

              <div className="rea-vendors-empty-icon">
                ☀
              </div>

              <h3>
                No matching vendors found
              </h3>

              <p>
                Try another location or adjust
                your project requirements.
              </p>

            </div>

          )}

        </section>

      )}

    </div>
  );
}

export default VendorPage;
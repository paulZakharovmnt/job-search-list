import React, { useState } from "react";
import "./AddNewJob.css";

const AddNewJob = ({ handleAddJobToList }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const submitAllInputs = (event) => {
    event.preventDefault();

    const fullJobInfo = {
      company: companyName,
      city: companyCity,
      source: sourceWhereApplied,
      result: result,
      comment: comment,
    };
    handleAddJobToList(fullJobInfo);

    setCompanyName("");
    setCompanyCity("");
    setResult("");
    setComment("");
  };

  return (
    <div className="add-job">
      <form onSubmit={(event) => submitAllInputs(event.target.value)}>
        <div className="company-cont">
          <div className="add-company-name">
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <p>Company Name</p>
          </div>
        </div>
        <div className="option-cont">
          <div className="left-cont">
            <div className="result">
              <input
                value={result}
                onChange={(event) => setResult(event.target.value)}
              />
              <p> Result </p>
            </div>

            <div className="comments">
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              ></textarea>
              <p>Comments</p>
            </div>
          </div>

          <div className="right-cont">
            <div className="add-city">
              <input
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
              />
              <p>City where you applied</p>
            </div>

            <div className="apply-date">
              <input
                className="date-input"
                value={applyDate}
                type="date"
                onChange={(event) => setApplyDate(event.target.value)}
              />
              <p>Apply date</p>
            </div>

            <div className="source">
              <select
                value={sourceWhereApplied}
                onChange={(event) => setSourceWhereApplied(event.target.value)}
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="GlassDoor">GlassDoor</option>
              </select>
              <p>Source where applied</p>
            </div>
          </div>
        </div>

        <div className="submit-bottno-container">
          <button className="submit-btn" onClick={submitAllInputs}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewJob;

import React, { useState } from "react";
import "./AddNewJob.css";
import useSettings from "../../core/customHooks/useSettings";

const AddNewJob = ({ handleAddJobToList, user }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const [
    {
      sourcesListWhereUserIsApplying,
      resultsListOfInterviews,
      citiesListWhereUserIsApplying,
    },
  ] = useSettings(user);

  const submitAllInputs = (event) => {
    event.preventDefault();

    let newComment = {};
    newComment[applyDate] = comment;

    console.log(newComment);

    const fullJobInfo = {
      company: companyName,
      city: companyCity,
      source: sourceWhereApplied,
      date: applyDate,
      result: result,
      comments: newComment,
    };
    handleAddJobToList(fullJobInfo);

    setCompanyName("");
    setCompanyCity("");
    setResult("");
    setComment("");
  };

  return (
    <div className="add-job">
      <form
        className="add-form"
        onSubmit={(event) => submitAllInputs(event.target.value)}
      >
        <div className="company-cont">
          <label className="result">
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <div className="text">Company Name</div>
          </label>
        </div>
        {companyName.length > 2 && (
          <div className="option-cont">
            <label className="result">
              <select
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
              >
                <option value="">--Please choose an option--</option>
                {citiesListWhereUserIsApplying.map((city) => {
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
              <div className="text">City where you applied</div>
            </label>
          </div>
        )}
        {companyCity && (
          <div className="option-cont">
            <input
              required
              className="date-input"
              value={applyDate}
              type="date"
              onChange={(event) => setApplyDate(event.target.value)}
            />
            <div className="text">Apply date</div>
          </div>
        )}

        {applyDate && (
          <div className="option-cont">
            <select
              value={sourceWhereApplied}
              onChange={(event) => setSourceWhereApplied(event.target.value)}
            >
              <option value="">--Please choose an option--</option>
              {sourcesListWhereUserIsApplying.map((source) => {
                return (
                  <option key={source} value={source}>
                    {source}
                  </option>
                );
              })}
            </select>
            <div className="text">Source where applied</div>
          </div>
        )}

        {sourceWhereApplied && (
          <div className="option-cont">
            {" "}
            <label className="result">
              <input
                value={result}
                onChange={(event) => setResult(event.target.value)}
              />
              <div className="text"> Result </div>
            </label>
          </div>
        )}

        {result && (
          <div className="comments">
            <textarea
              className="text-area-comments"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
            ></textarea>
            <div className="text">Comments</div>
          </div>
        )}

        {result && (
          <div className="submit-bottno-container">
            <div
              data-back="Add to List"
              data-front="Submit"
              className="submit-btn"
              onClick={submitAllInputs}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewJob;

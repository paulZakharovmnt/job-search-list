import React, { useEffect, useState, useContext } from "react";
import "./AddNewJob.css";
import settingsContext from "../../context/settings-context/settings-context";
import combineAllJobInputsInOneVariable from "../../core/combineAllJobInputsInOneVariable";

const AddNewJob = ({
  handleAddJobToListSubmit,
  applicationsAllIds,
  applicationsById,
  handleOpenEditJobModalClick,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comments, setComments] = useState("");

  const [applicationAlreadyExists, setApplicationAlreadyExists] = useState(
    false
  );

  const { listOfCities, listOfResults, listOfSources } = useContext(
    settingsContext
  );

  useEffect(() => {
    if (applicationsAllIds.includes(companyName)) {
      setApplicationAlreadyExists(true);
    }
  }, [companyName, applicationsAllIds]);

  const clearAllInputs = () => {
    setCompanyName("");
    setCompanyCity("");
    setApplyDate("");
    setSourceWhereApplied("");
    setResult("");
    setComments("");
  };

  const handleCombineAllInputsInApplicationSubmit = (event) => {
    event.preventDefault();

    const combinedAllJobInputs = combineAllJobInputsInOneVariable(
      companyName,
      companyCity,
      applyDate,
      sourceWhereApplied,
      result,
      comments
    );

    handleAddJobToListSubmit(combinedAllJobInputs);
    clearAllInputs();
  };

  return (
    <div className="add-job">
      <form
        className="add-form"
        onSubmit={(event) =>
          handleCombineAllInputsInApplicationSubmit(event.target.value)
        }
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
        {applicationAlreadyExists && (
          <div>
            <h2>
              Application with such company name already exists. What do you
              want to do?
            </h2>

            <button
              onClick={(event) =>
                handleOpenEditJobModalClick(
                  event,
                  applicationsById[companyName]
                )
              }
            >
              Open application
            </button>
            <button onClick={() => setApplicationAlreadyExists(false)}>
              Continue Adding
            </button>
          </div>
        )}
        {companyName.length > 2 && (
          <div className="option-cont">
            <label className="result">
              <select
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
              >
                <option value="">
                  --Please choose a City where you applied--
                </option>
                {listOfCities.map((city) => {
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
              <option value="">
                --Please choose a source where you applied--
              </option>
              {listOfSources.map((source) => {
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
            <select
              value={result}
              onChange={(event) => setResult(event.target.value)}
            >
              <option value="">
                -- Please choose a Result of Interview --
              </option>
              {listOfResults.map((result) => {
                return (
                  <option key={result} value={result}>
                    {result}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {result && (
          <div className="comments">
            <textarea
              className="text-area-comments"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
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
              onClick={handleCombineAllInputsInApplicationSubmit}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewJob;

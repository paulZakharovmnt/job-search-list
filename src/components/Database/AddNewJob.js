import React, { useState } from "react";
import "./AddNewJob.css";
import useSettings from "../../core/customHooks/useSettings";
import combineAllJobInputsInOneVariable from "../../core/combineAllJobInputsInOneVariable";

const AddNewJob = ({ handleAddJobToListSubmit, user }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  // const [listOfCities, setListOfCities] = useState([]);
  // const [listOfSources, setListOfSources] = useState([]);
  // const [listOfResults, setListOfResults] = useState([]);

  const [
    {
      listOfSourcesFromSelectorMenu,
      listOfResultsFromSelectorMenu,
      listOfCitiesFromSelectorMenu,
    },
  ] = useSettings(user);

  // useEffect(() => {
  //   getListOfSourcesFromFB(user).onSnapshot((doc) => {
  //     setListOfSources(doc.data().listOfSourcesFromSelectorMenu);
  //   });
  //   getListOfCitiesFromFB(user).onSnapshot((doc) => {
  //     setListOfCities(doc.data().listOfCitiesFromSelectorMenu);
  //   });
  //   getListOfResultsFromFB(user).onSnapshot((doc) => {
  //     setListOfResults(doc.data().listOfResultsFromSelectorMenu);
  //   });

  // }, []);

  const clearAllInputs = () => {
    setCompanyName("");
    setCompanyCity("");
    setApplyDate("");
    setSourceWhereApplied("");
    setResult("");
    setComment("");
  };

  const handleCombineAllInputsInJobInfoSubmit = (event) => {
    event.preventDefault();

    const combinedAllJobInputs = combineAllJobInputsInOneVariable(
      companyName,
      companyCity,
      applyDate,
      sourceWhereApplied,
      result,
      comment
    );

    handleAddJobToListSubmit(combinedAllJobInputs);
    clearAllInputs();
  };

  return (
    <div className="add-job">
      <form
        className="add-form"
        onSubmit={(event) =>
          handleCombineAllInputsInJobInfoSubmit(event.target.value)
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
                {listOfCitiesFromSelectorMenu.map((city) => {
                  {
                    /* {listOfCities.map((city) => { */
                  }
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
              {listOfSourcesFromSelectorMenu.map((source) => {
                {
                  /* {listOfSources.map((source) => { */
                }
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
              {listOfResultsFromSelectorMenu.map((result) => {
                // {listOfResults.map((result) => {
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
              onClick={handleCombineAllInputsInJobInfoSubmit}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewJob;

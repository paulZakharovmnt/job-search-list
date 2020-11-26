import React, { useEffect, useState, useContext } from "react";
import "./AddNewJob.css";
import settingsContext from "../../context/settings-context/settings-context";
import authContext from "../../context/auth-context/auth-context";
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
  const { showFrenchLanguage } = useContext(authContext);

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
            <div className="text">
              {!showFrenchLanguage ? (
                <span>Company Name</span>
              ) : (
                <span>Nom de la compagnie</span>
              )}
            </div>
          </label>
        </div>
        {applicationAlreadyExists && (
          <div>
            {!showFrenchLanguage ? (
              <h2>
                Application with such company name already exists. What do you
                want to do?
              </h2>
            ) : (
              <h2>
                L'application avec ce nom de société existe déjà. Que
                faites-vous vouloir faire?
              </h2>
            )}

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
                {!showFrenchLanguage ? (
                  <option value="">
                    --Please choose a City where you applied--
                  </option>
                ) : (
                  <option value="">
                    {" "}
                    --Veuillez choisir une ville où vous avez postulé--
                  </option>
                )}
                {listOfCities.map((city) => {
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
              <div className="text">
                {!showFrenchLanguage ? (
                  <span>City where you applied</span>
                ) : (
                  <span>Ville où vous avez postulé</span>
                )}
              </div>
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
            <div className="text">
              {!showFrenchLanguage ? (
                <span>Apply date</span>
              ) : (
                <span>Appliquer la date</span>
              )}
            </div>
          </div>
        )}

        {applyDate && (
          <div className="option-cont">
            <select
              value={sourceWhereApplied}
              onChange={(event) => setSourceWhereApplied(event.target.value)}
            >
              {!showFrenchLanguage ? (
                <option value="">
                  --Please choose a source where you applied--
                </option>
              ) : (
                <option value="">
                  --Veuillez choisir une source où vous avez postulé--
                </option>
              )}

              {listOfSources.map((source) => {
                return (
                  <option key={source} value={source}>
                    {source}
                  </option>
                );
              })}
            </select>
            <div className="text">
              {!showFrenchLanguage ? (
                <span>Source where applied</span>
              ) : (
                <span>Source où appliqué</span>
              )}
            </div>
          </div>
        )}

        {sourceWhereApplied && (
          <div className="option-cont">
            {" "}
            <select
              value={result}
              onChange={(event) => setResult(event.target.value)}
            >
              {!showFrenchLanguage ? (
                <option value="">
                  -- Please choose a Result of Interview --
                </option>
              ) : (
                <option value="">
                  -- Veuillez choisir un résultat de l'entrevue --
                </option>
              )}

              {listOfResults.map((result) => {
                return (
                  <option key={result} value={result}>
                    {result}
                  </option>
                );
              })}
            </select>
            <div className="text">
              {!showFrenchLanguage ? (
                <span>Result of this Application</span>
              ) : (
                <span>Résultat de cette application</span>
              )}
            </div>
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
              data-back={
                !showFrenchLanguage ? "Add to List" : "Ajouter à la liste"
              }
              data-front={!showFrenchLanguage ? "Submit" : "Soumettre"}
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

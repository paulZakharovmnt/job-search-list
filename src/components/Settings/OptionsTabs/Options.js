import React from "react";
import useSettings from "../../../core/customHooks/useSettings";
import AddInput from "./AddInput";

const Options = ({ showingOptionTab, user, setShowingOptionTab }) => {
  const [
    {
      sourcesListWhereUserIsApplying,
      resultsListOfInterviews,
      citiesListWhereUserIsApplying,
      handleAddNewCityToListSubmit,
      handleAddNewResultToListSubmit,
      handleAddNewSourceToListSubmit,
      handleDeleteCityFromList,
      handleDeleteResultFromList,
      handleDeleteSourceFromList,
    },
  ] = useSettings(user);

  return (
    <div className="list-container">
      {/* <div
        className="go-back-container"
        onClick={() => setShowingOptionTab(null)}
      >
        <i className="go-back-btn fas fa-arrow-left"></i>
        <p>Go Back</p>
      </div>

      {showingOptionTab === "Cities" && (
        <div>
          <ul className="list-of-items">
            {citiesListWhereUserIsApplying.map((city) => (
              <div key={city} className="list-contaniner">
                <li>{city}</li>
                <i
                  onClick={() => handleDeleteCityFromList(city)}
                  className="delete-item-btn fas fa-trash-alt"
                ></i>
              </div>
            ))}
          </ul>
          <AddInput
            addNewItemFunction={handleAddNewCityToListSubmit}
            user={user}
          />
        </div>
      )}

      {showingOptionTab === "Sources" && (
        <div>
          <ul className="list-of-items">
            {sourcesListWhereUserIsApplying.map((source) => (
              <div key={source} className="list-contaniner">
                <li>{source}</li>
                <i
                  onClick={() => handleDeleteSourceFromList(source)}
                  className="delete-item-btn fas fa-trash-alt"
                ></i>
              </div>
            ))}
          </ul>
          <AddInput
            addNewItemFunction={handleAddNewSourceToListSubmit}
            user={user}
          />
        </div>
      )}

      {showingOptionTab === "Results" && (
        <div>
          <ul className="list-of-items">
            {resultsListOfInterviews.map((result) => (
              <div key={result} className="list-contaniner">
                <li>{result}</li>
                <i
                  onClick={() => handleDeleteResultFromList(result)}
                  className="delete-item-btn fas fa-trash-alt"
                ></i>
              </div>
            ))}
          </ul>
          <AddInput
            addNewItemFunction={handleAddNewResultToListSubmit}
            user={user}
          />
        </div>
      )} */}
    </div>
  );
};

export default Options;

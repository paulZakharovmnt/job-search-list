import React, { useState } from "react";
import "./Settings.css";
import useSettings from "../../core/customHooks/useSettings";

const Settings = ({ user }) => {
  const [
    {
      sourcesListWhereUserIsApplying,
      resultsListOfInterviews,
      citiesListWhereUserIsApplying,
      handleAddNewItemToList,
    },
  ] = useSettings(user);

  const [userInputAddNewItem, setUserInputAddNewItem] = useState("");

  return (
    <div className="black-background">
      <div className="settings">
        <div className="settings-container">
          <div className="source-list">
            <ul>
              {sourcesListWhereUserIsApplying.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
            <button onClick={() => handleAddNewItemToList(userInputAddNewItem)}>
              {" "}
              Add new item to list
            </button>
            <input
              onChange={(event) => setUserInputAddNewItem(event.target.value)}
            />
          </div>
          <div className="result-list">
            {resultsListOfInterviews.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </div>
          <div className="city-list">
            {citiesListWhereUserIsApplying.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

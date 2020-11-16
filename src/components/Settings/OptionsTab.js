import React from "react";
import AddInput from "./AddInput";
import "./OptionsTab.css";

const OptionsTab = ({
  renderingOptionTab,
  user,
  listOfSourcesFromSelectorMenu,
  listOfResultsFromSelectorMenu,
  listOfCitiesFromSelectorMenu,
  handleAddNewCityToListSubmit,
  handleAddNewResultToListSubmit,
  handleAddNewSourceToListSubmit,
  handleDeleteCityFromList,
  handleDeleteResultFromList,
  handleDeleteSourceFromList,
}) => {
  if (renderingOptionTab === "Cities") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new city in the List:</h4>
        <ul className="list-of-items">
          {listOfCitiesFromSelectorMenu.map((city) => (
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
    );
  }

  if (renderingOptionTab === "Sources") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new source in the List:</h4>
        <ul className="list-of-items">
          {listOfSourcesFromSelectorMenu.map((source) => (
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
    );
  }

  if (renderingOptionTab === "Results") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new result in the List:</h4>
        <ul className="list-of-items">
          {listOfResultsFromSelectorMenu.map((result) => (
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
    );
  }
};

export default OptionsTab;

import React, { useEffect } from "react";
import AddInput from "./AddInput";
import "./OptionsTab.css";
import setUpdatedListOfCitiesToFB from "../../core/setToFBFunctions/setUpdatedListOfCitiesToFB";
import setUpdatedListOfSourcesToFB from "../../core/setToFBFunctions/setUpdatedListOfSourcesToFB";
import setUpdatedListOfResultsToFB from "../../core/setToFBFunctions/setUpdatedListOfResultsToFB";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCityFromSelector,
  deleteSourceFromSelector,
  deleteResultFromSelector,
  addCitySelector,
  addSourceSelector,
  addResultSelector,
} from "../../redux/actions/actions";

const OptionsTab = ({ optionTabToRender }) => {
  const listOfCities = useSelector((state) => state.listOfCities);
  const listOfSources = useSelector((state) => state.listOfSources);
  const listOfResults = useSelector((state) => state.listOfResults);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (listOfCities.length < 1) {
      return;
    }
    setUpdatedListOfCitiesToFB(user, listOfCities);
  }, [listOfCities, user]);

  useEffect(() => {
    if (listOfSources.length < 1) {
      return;
    }
    setUpdatedListOfSourcesToFB(user, listOfSources);
  }, [listOfSources, user]);

  useEffect(() => {
    if (listOfResults.length < 1) {
      return;
    }
    setUpdatedListOfResultsToFB(user, listOfResults);
  }, [listOfResults, user]);

  const dispatch = useDispatch();

  if (optionTabToRender === "Cities") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new city in the List:</h4>
        <ul className="list-of-items">
          {listOfCities.map((city) => (
            <div key={city} className="list-contaniner">
              <li>{city}</li>
              <i
                onClick={() => dispatch(deleteCityFromSelector(city))}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput
          addNewOptionToList={(cityName) => dispatch(addCitySelector(cityName))}
        />
      </div>
    );
  }

  if (optionTabToRender === "Sources") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new source in the List:</h4>
        <ul className="list-of-items">
          {listOfSources.map((source) => (
            <div key={source} className="list-contaniner">
              <li>{source}</li>
              <i
                onClick={() => dispatch(deleteSourceFromSelector(source))}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput
          addNewOptionToList={(sourceName) =>
            dispatch(addSourceSelector(sourceName))
          }
        />
      </div>
    );
  }

  if (optionTabToRender === "Results") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new result in the List:</h4>
        <ul className="list-of-items">
          {listOfResults.map((result) => (
            <div key={result} className="list-contaniner">
              <li>{result}</li>
              <i
                onClick={() => dispatch(deleteResultFromSelector(result))}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput
          addNewOptionToList={(resultName) =>
            dispatch(addResultSelector(resultName))
          }
        />
      </div>
    );
  }
};

export default OptionsTab;

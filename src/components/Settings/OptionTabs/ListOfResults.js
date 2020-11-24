import React from "react";
import AddInput from "./AddInput";

const ListOfResults = ({ listOfResults, addResultToList, deleteResult }) => {
  return (
    <div className="selector-contaner2">
      <h4>Delete or Add new result in the List:</h4>
      <ul className="list-of-items">
        {listOfResults.map((result) => (
          <div key={result} className="list-contaniner">
            <li>{result}</li>
            <i
              onClick={() => deleteResult(result)}
              className="delete-item-btn fas fa-trash-alt"
            ></i>
          </div>
        ))}
      </ul>
      <AddInput addNewOptionToList={addResultToList} />
    </div>
  );
};

export default ListOfResults;

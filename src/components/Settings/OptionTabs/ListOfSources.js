import React from "react";
import AddInput from "./AddInput";

const ListOfSources = ({ listOfSources, addSourceToList, deleteSource }) => {
  return (
    <div className="selector-contaner2">
      <h4>Delete or Add new source in the List:</h4>
      <ul className="list-of-items">
        {listOfSources.map((source) => (
          <div key={source} className="list-contaniner">
            <li>{source}</li>
            <i
              onClick={() => deleteSource(source)}
              className="delete-item-btn fas fa-trash-alt"
            ></i>
          </div>
        ))}
      </ul>
      <AddInput addNewOptionToList={addSourceToList} />
    </div>
  );
};

export default ListOfSources;

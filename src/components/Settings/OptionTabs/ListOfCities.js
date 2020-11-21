import React from "react";
import AddInput from "./AddInput";

const ListOfCities = ({ listOfCities, addCityToList, deleteCity }) => {
  return (
    <div className="selector-contaner2">
      <h4>Delete or Add new city in the List:</h4>
      <ul className="list-of-items">
        {listOfCities.map((city) => (
          <div key={city} className="list-contaniner">
            <li>{city}</li>
            <button onClick={() => deleteCity(city)}>Delete</button>
            <i
              onClick={() => deleteCity(city)}
              className="delete-item-btn fas fa-trash-alt"
            ></i>
          </div>
        ))}
      </ul>
      <AddInput addNewOptionToList={addCityToList} />
    </div>
  );
};

export default ListOfCities;

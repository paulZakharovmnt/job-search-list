import React, { useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

const AddInput = ({ addNewItemFunction }) => {
  const [userInputToAddNewItem, setUerInputToAddNewItem] = useState("");
  const [showAddNewItemInput, setShowAddNewItemInput] = useState(false);

  const addBtnClasses = classNames("add-item-btn", "fas fa-plus", {
    active: showAddNewItemInput,
  });
  const addingInputContainerClasses = classNames("add-new-item-container", {
    adding: showAddNewItemInput,
  });

  return (
    <div className={addingInputContainerClasses}>
      <i
        className={addBtnClasses}
        onClick={() => setShowAddNewItemInput(!showAddNewItemInput)}
      ></i>

      <CSSTransition
        in={showAddNewItemInput}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 1000, exit: 200 }}
        classNames="input-appear"
      >
        <div className="add-item-input">
          <input
            value={userInputToAddNewItem}
            onChange={(event) => setUerInputToAddNewItem(event.target.value)}
          />
          <button onClick={() => addNewItemFunction(userInputToAddNewItem)}>
            submit
          </button>
        </div>
      </CSSTransition>
      {!showAddNewItemInput && <h4>Add new</h4>}
    </div>
  );
};

export default AddInput;

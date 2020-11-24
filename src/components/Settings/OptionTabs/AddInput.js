import React, { useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import "./AddInput.css";

const AddInput = ({ addNewOptionToList }) => {
  const [addNewOptionInput, setAddNewOptionInput] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const addBtnClasses = classNames("add-item-btn", "fas fa-plus", {
    active: showAddInput,
  });
  const addingInputContainerClasses = classNames("add-new-item-container", {
    adding: showAddInput,
  });

  return (
    <div className={addingInputContainerClasses}>
      <button onClick={() => setShowAddInput(!showAddInput)}>Add new</button>
      <i
        className={addBtnClasses}
        onClick={() => setShowAddInput(!showAddInput)}
      ></i>

      <CSSTransition
        in={showAddInput}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 1000, exit: 200 }}
        classNames="input-appear"
      >
        <div className="add-item-input">
          <input
            value={addNewOptionInput}
            onChange={(event) => setAddNewOptionInput(event.target.value)}
          />
          <button onClick={() => addNewOptionToList(addNewOptionInput)}>
            submit
          </button>
        </div>
      </CSSTransition>
      {!showAddInput && <h4>Add new</h4>}
    </div>
  );
};

export default AddInput;

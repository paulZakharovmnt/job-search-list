import React from "react";

const Selector = ({ optionTabs, setShowingOptionTab }) => {
  return (
    <div className="selectors">
      {/* {optionTabs.map((tab) => (
        <div
          className="selector-btn"
          key={tab}
          onClick={() => setShowingOptionTab(tab)}
        >
          {tab}
        </div>
      ))} */}
    </div>
  );
};

export default Selector;

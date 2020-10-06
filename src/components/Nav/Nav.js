import React from "react";

const Nav = ({
  showJobAddScreen,
  showJobListPage,
  userInputSearch,
  setUserInputSearch,
}) => {
  return (
    <div>
      <input
        value={userInputSearch}
        onChange={(event) => setUserInputSearch(event.target.value)}
      />
      <button onClick={showJobAddScreen}>Add new Job!</button>
      <button onClick={showJobListPage}>Show List of Jobs</button>
    </div>
  );
};

export default Nav;

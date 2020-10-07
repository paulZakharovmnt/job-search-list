import React from "react";
import fire from "../../core/firebase";

const Nav = ({
  showJobAddScreen,
  showJobListPage,
  userInputSearch,
  setUserInputSearch,
}) => {
  const handleLogOut = () => {
    fire.auth().signOut();
  };
  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
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

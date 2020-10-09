import React from "react";
import { fire } from "../../core/firebase";
import "./Nav.css";

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
    <div className="nav">
      <h3> Welcome back, User</h3>
      {/* <div className="add-btn" onClick={showJobAddScreen}>
        Add new Job!
      </div> */}
      <div
        onClick={showJobAddScreen}
        className="btn-flip"
        data-back="New Job"
        data-front="Add"
      ></div>
      <input
        value={userInputSearch}
        onChange={(event) => setUserInputSearch(event.target.value)}
      />

      <button onClick={showJobListPage}>Show List of Jobs</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Nav;

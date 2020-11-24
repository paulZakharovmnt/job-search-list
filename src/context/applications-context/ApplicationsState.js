import React, { useReducer } from "react";
import {
  SET_APPLICATIONS_FROM_FB,
  ADD_NEW_APPLICATION,
  DELETE_APPLICATION,
} from "./applications-actions";
import ApplicationContext from "./application-context";
import applicationsByIdReducer from "./applicationsById-reducer";
import applicationsAllIdsReducer from "./applicationsAllId-reducer";

const ApplicationsState = (props) => {
  const initialApplicationsByIdState = null;
  const initialApplicationsAllIdsState = [];

  const [applicationsByIdState, dispatchApplicationsById] = useReducer(
    applicationsByIdReducer,
    initialApplicationsByIdState
  );

  const [applicationsAllIdsState, dispatchApplicationsAllIds] = useReducer(
    applicationsAllIdsReducer,
    initialApplicationsAllIdsState
  );

  const setApplicationAllIdsFromFB = (applicationsIds) => {
    dispatchApplicationsAllIds({
      type: SET_APPLICATIONS_FROM_FB,
      payload: applicationsIds,
    });
  };

  const setApplicationsByIdFromFB = (application) => {
    dispatchApplicationsById({
      type: SET_APPLICATIONS_FROM_FB,
      payload: application,
    });
  };

  const addApplicationToState = (application) => {
    dispatchApplicationsAllIds({
      type: ADD_NEW_APPLICATION,
      payload: application,
    });

    dispatchApplicationsById({
      type: ADD_NEW_APPLICATION,
      payload: application,
    });
  };

  const updateApplication = (updatedApplication) => {
    dispatchApplicationsById({
      type: ADD_NEW_APPLICATION,
      payload: updatedApplication,
    });
  };

  const deleteApplication = (application) => {
    dispatchApplicationsById({
      type: DELETE_APPLICATION,
      payload: application,
    });

    dispatchApplicationsAllIds({
      type: DELETE_APPLICATION,
      payload: application,
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationsAllIds: applicationsAllIdsState,
        applicationsById: applicationsByIdState,
        setApplicationsByIdFromFB,
        setApplicationAllIdsFromFB,
        addApplicationToState,
        updateApplication,
        deleteApplication,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationsState;

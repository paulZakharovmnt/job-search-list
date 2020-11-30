import React, { useContext } from "react";
import Job from "./Job";
import "./JobList.css";
import applicationContext from "../../context/applications-context/application-context";

const JobList = ({
  searchInputValue,
  handleDeleteApplicationClick,
  handleOpenEditJobModalClick,
  showFrenchLanguage,
}) => {
  const { applicationsAllIds, applicationsById } = useContext(
    applicationContext
  );

  const filteredApplications = applicationsAllIds.filter((company) => {
    return company.toLowerCase().includes(searchInputValue.toLowerCase());
  });
  return (
    <div className="job-list-container">
      <div className="job-list">
        {!showFrenchLanguage ? (
          <div className="job-header">
            <p className="job-header-company-name">Company Name</p>
            <p className="job-header-city">City</p>
            <p className="job-header-date">Date</p>
            <p className="job-header-source">Source</p>
            <p className="job-header-result">Result</p>
            <p className="job-header-edit">Edit/Delete</p>
          </div>
        ) : (
          <div className="job-header">
            <p>Nom de la compagnie</p>
            <p>Ville</p>
            <p>Date</p>
            <p>La source</p>
            <p>Résultat</p>
            <p>Modifier/Supprimer</p>
          </div>
        )}
        {filteredApplications.map((company) => {
          return (
            <Job
              company={company}
              applicationsById={applicationsById}
              key={company}
              handleDeleteApplicationClick={handleDeleteApplicationClick}
              handleOpenEditJobModalClick={handleOpenEditJobModalClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobList;

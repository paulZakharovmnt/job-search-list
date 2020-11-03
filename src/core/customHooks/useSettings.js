import React, { useState } from "react";

const useSettings = () => {
  const [sourcesListOfVacancy, setSourcesListOfVacancy] = useState([
    "LinkedIn",
    "Indeed",
    "GlassDoor",
    "Website of Company",
  ]);

  const [resultsListOfInterviews, setResultsListOfInterviews] = useState([
    "Offer",
    "Sent",
    "Reject",
  ]);

  const [cityOfCompanyWhereApplied, setCityOfCompanyWhereApplied] = useState([
    "Montreal",
    "Toronto",
    "Vancouver",
    "Ottawa",
  ]);
  return [
    {
      sourcesListOfVacancy,
      resultsListOfInterviews,
      cityOfCompanyWhereApplied,
    },
  ];
};

export default useSettings;

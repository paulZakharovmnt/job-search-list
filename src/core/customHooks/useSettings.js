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
  return [{ sourcesListOfVacancy, resultsListOfInterviews }];
};

export default useSettings;

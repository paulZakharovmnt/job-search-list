const combineAllJobInputsInOneVariable = (
  companyName,
  companyCity,
  applyDate,
  sourceWhereApplied,
  result,
  comment
) => {
  let firstUsersCommentInJobInfo = {};
  firstUsersCommentInJobInfo[applyDate] = comment;

  return {
    company: companyName,
    city: companyCity,
    source: sourceWhereApplied,
    date: applyDate,
    result: result,
    comments: firstUsersCommentInJobInfo,
  };
};

export default combineAllJobInputsInOneVariable;

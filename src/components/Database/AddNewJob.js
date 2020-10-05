import React, { useState } from "react";

const AddNewJob = ({ handleAddJobToList }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const submitAllInputs = (event) => {
    event.preventDefault();

    const fullJobInfo = {
      company: companyName,
      city: companyCity,
      result: result,
      comment: comment,
    };
    handleAddJobToList(fullJobInfo);

    setCompanyName("");
    setCompanyCity("");
    setResult("");
    setComment("");
  };

  return (
    <div className="job">
      <form onSubmit={(event) => submitAllInputs(event.target.value)}>
        <h2>Company Name</h2>
        <input
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />
        <hr />
        <h3>City where you applied</h3>
        <input
          value={companyCity}
          onChange={(event) => setCompanyCity(event.target.value)}
        />
        <hr />

        <h3>Apply date</h3>

        <hr />

        <h4>Source where applied</h4>
        <select>
          <option>LinkedIn</option>
          <option>Indeed</option>
          <option>GlassDoor</option>
        </select>

        <hr />
        <h4> Result </h4>
        <input
          value={result}
          onChange={(event) => setResult(event.target.value)}
        />

        <h4>Comments</h4>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
        <button onClick={submitAllInputs}>Submit</button>
      </form>
    </div>
  );
};

export default AddNewJob;

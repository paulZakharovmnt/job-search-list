import React, { useState } from "react";
import "./AddNewJob.css";
import useSettings from "../../core/customHooks/useSettings";

const AddNewJob = ({ handleAddJobToList }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [sourceWhereApplied, setSourceWhereApplied] = useState("");
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const [{ sourcesListOfVacancy, resultsListOfInterviews }] = useSettings();
  console.log(sourcesListOfVacancy);

  const submitAllInputs = (event) => {
    event.preventDefault();

    let newComment = {};
    newComment[applyDate] = comment;

    console.log(newComment);

    const fullJobInfo = {
      company: companyName,
      city: companyCity,
      source: sourceWhereApplied,
      date: applyDate,
      result: result,
      comments: newComment,
    };
    handleAddJobToList(fullJobInfo);

    setCompanyName("");
    setCompanyCity("");
    setResult("");
    setComment("");
  };

  return (
    <div className="add-job">
      <form
        className="add-form"
        onSubmit={(event) => submitAllInputs(event.target.value)}
      >
        <div className="company-cont">
          <label className="result">
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <div className="text">Company Name</div>
          </label>
        </div>
        {companyName.length > 2 && (
          // <div class="custom-select-wrapper">
          //   <div class="custom-select">
          //     <div class="custom-select__trigger">
          //       <span>Tesla</span>
          //       <div class="arrow"></div>
          //     </div>
          //     <div class="custom-options">
          //       <span class="custom-option selected" data-value="tesla">
          //         Tesla
          //       </span>
          //       <span class="custom-option" data-value="volvo">
          //         Volvo
          //       </span>
          //       <span class="custom-option" data-value="mercedes">
          //         Mercedes
          //       </span>
          //     </div>
          //   </div>
          // </div>
          <div className="option-cont">
            <label className="result">
              <input
                value={companyCity}
                onChange={(event) => setCompanyCity(event.target.value)}
              />
              <div className="text">City where you applied</div>
            </label>
          </div>
        )}
        {companyCity && (
          <div className="option-cont">
            <input
              required
              className="date-input"
              value={applyDate}
              type="date"
              onChange={(event) => setApplyDate(event.target.value)}
            />
            <div className="text">Apply date</div>
          </div>
        )}

        {applyDate && (
          <div className="option-cont">
            <select
              value={sourceWhereApplied}
              onChange={(event) => setSourceWhereApplied(event.target.value)}
            >
              {sourcesListOfVacancy.map((source) => {
                return (
                  <option key={source} value={source}>
                    {source}
                  </option>
                );
              })}
              {/* <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="GlassDoor">GlassDoor</option> */}
            </select>
            <div className="text">Source where applied</div>
          </div>
        )}

        {sourceWhereApplied && (
          <div className="option-cont">
            {" "}
            <label className="result">
              <input
                value={result}
                onChange={(event) => setResult(event.target.value)}
              />
              <div className="text"> Result </div>
            </label>
          </div>
        )}

        {result && (
          <div className="comments">
            <textarea
              className="text-area-comments"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
            ></textarea>
            <div className="text">Comments</div>
          </div>
        )}

        {result && (
          <div className="submit-bottno-container">
            <div
              data-back="Add to List"
              data-front="Submit"
              className="submit-btn"
              onClick={submitAllInputs}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewJob;

// <div className="add-job">
//       <form
//         className="add-form"
//         onSubmit={(event) => submitAllInputs(event.target.value)}
//       >
//         <div className="company-cont">
//           <label className="result">
//             <input
//               value={companyName}
//               onChange={(event) => setCompanyName(event.target.value)}
//             />
//             <div className="text">Company Name</div>
//           </label>
//         </div>
//         <div className="option-cont">
//           <div className="left-cont">
//             <label className="result">
//               <input
//                 value={result}
//                 onChange={(event) => setResult(event.target.value)}
//               />
//               <div className="text"> Result </div>
//             </label>

//             <div className="comments">
//               <textarea
//                 className="text-area-comments"
//                 value={comment}
//                 onChange={(event) => setComment(event.target.value)}
//                 required
//               ></textarea>
//               <p>Comments</p>
//             </div>
//           </div>

//           <div className="right-cont">
//             <label className="result">
//               <input
//                 value={companyCity}
//                 onChange={(event) => setCompanyCity(event.target.value)}
//               />
//               <div className="text">City where you applied</div>
//             </label>

//             <div className="apply-date">
//               <input
//                 required
//                 className="date-input"
//                 value={applyDate}
//                 type="date"
//                 onChange={(event) => setApplyDate(event.target.value)}
//               />
//               <p>Apply date</p>
//             </div>

//             <div className="source">
//               <select
//                 value={sourceWhereApplied}
//                 onChange={(event) => setSourceWhereApplied(event.target.value)}
//               >
//                 <option value="LinkedIn">LinkedIn</option>
//                 <option value="Indeed">Indeed</option>
//                 <option value="GlassDoor">GlassDoor</option>
//               </select>
//               <p>Source where applied</p>
//             </div>
//           </div>
//         </div>

//         <div className="submit-bottno-container">
//           <div
//             data-back="Add to List"
//             data-front="Submit"
//             className="submit-btn"
//             onClick={submitAllInputs}
//           ></div>
//         </div>
//       </form>
//     </div>

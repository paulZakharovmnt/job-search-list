import React, { useState } from "react";
import "./EditItem.css";

const EditItem = ({
  jobUserWantsToEdit,
  closeEditJobWindow,
  addCommentToTheJobInfo,
}) => {
  const [userWantsToAddComment, setUserWantsToAddComment] = useState(false);
  const [commentDate, setCommentDate] = useState("");
  const [newComment, setNewComment] = useState("");

  let showComments = Object.entries(jobUserWantsToEdit.comments).map((arr) => {
    return (
      <div className="comment-info" key={arr[0]}>
        <div className="comment-date">
          <h4>Date</h4>
          <p>{arr[0]}</p>
        </div>
        <div className="comment-text">
          <h4>Comment:</h4>
          <p>{arr[1]}</p>
        </div>
      </div>
    );
  });

  const handleAddNewComment = (event) => {
    event.preventDefault();
    let updatedJob = jobUserWantsToEdit;
    updatedJob.comments[commentDate] = newComment;

    addCommentToTheJobInfo(updatedJob);
    setUserWantsToAddComment(!userWantsToAddComment);
  };

  return (
    <div className="black-cover">
      <div className="edit-window">
        <div className="edit-header">
          <h1>Company info</h1>
          <button onClick={closeEditJobWindow}>Close</button>
        </div>
        <div className="company-data-container">
          <div className="detailed-company-information">
            <div className="info-cont">
              <h4>Company name:</h4>
              <p>{jobUserWantsToEdit.company}</p>
            </div>
            <div className="info-cont">
              <h4>City:</h4>
              <p>{jobUserWantsToEdit.city}</p>
            </div>
            <div className="info-cont">
              <h4>Date applied:</h4>
              <p>{jobUserWantsToEdit.date}</p>
            </div>
            <div className="info-cont">
              <h4>Source: </h4>
              <p>{jobUserWantsToEdit.source}</p>
            </div>
            <div className="info-cont">
              <h4>Result: </h4>
              <p>{jobUserWantsToEdit.result}</p>
            </div>
          </div>
          <div className="comments-header-container">
            <h4>Comments: </h4>
            {showComments}

            <button
              onClick={() => setUserWantsToAddComment(!userWantsToAddComment)}
            >
              Add Comment
            </button>
          </div>
        </div>

        {userWantsToAddComment && (
          <div className="add-comment">
            <form>
              <input
                onChange={(event) => setCommentDate(event.target.value)}
                value={commentDate}
                type="date"
              />
              <input
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
              />
              <button onClick={handleAddNewComment}>Add</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditItem;

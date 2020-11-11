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
  const [showAddingCommentError, setShowAddingCommentError] = useState(false);

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
    if (!commentDate) {
      setShowAddingCommentError(true);
      return;
    }
    setShowAddingCommentError(false);
    let updatedJob = jobUserWantsToEdit;
    updatedJob.comments[commentDate] = newComment;
    addCommentToTheJobInfo(updatedJob);

    setUserWantsToAddComment(!userWantsToAddComment);
    setCommentDate("");
    setNewComment("");
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
          <div className="comments-container">
            <h4>Comments: </h4>
            {showComments}

            <button
              className="add-comment-btn"
              onClick={() => setUserWantsToAddComment(!userWantsToAddComment)}
            >
              Add Comment
            </button>

            {userWantsToAddComment && (
              <div className="add-comment-input">
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
                  {showAddingCommentError && (
                    <p className="add-error-message">
                      Please Choose the Date of new comment
                    </p>
                  )}
                  <button onClick={handleAddNewComment}>Add</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

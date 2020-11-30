import React, { useState } from "react";
import "./EditItem.css";

const EditItem = ({
  currentlyUpdatedJob,
  closeEditJobModal,
  handleAddNewCommentToApplicationSubmit,
}) => {
  const [showAddNewCommentInput, setShowAddNewCommentInput] = useState(false);
  const [showAddCommentError, setShowAddCommentError] = useState(false);
  const [commentDate, setCommentDate] = useState("");
  const [newComment, setNewComment] = useState("");

  let showComments = Object.entries(currentlyUpdatedJob.comments).map((arr) => {
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

  const handleCombineNewCommentInputsSubmit = (event) => {
    event.preventDefault();
    if (!commentDate) {
      setShowAddCommentError(true);
      return;
    }
    setShowAddCommentError(false);
    let updatedJobCopy = currentlyUpdatedJob;
    updatedJobCopy.comments[commentDate] = newComment;

    handleAddNewCommentToApplicationSubmit(updatedJobCopy);

    setShowAddNewCommentInput(!showAddNewCommentInput);
    setCommentDate("");
    setNewComment("");
  };

  return (
    <div className="black-cover">
      <div className="edit-window">
        <div className="edit-header">
          <h1>Company info</h1>
          <i
            onClick={closeEditJobModal}
            className="close-settings-btn fas fa-times"
          />
        </div>
        <div className="company-data-container">
          <div className="detailed-company-information">
            <div className="info-cont">
              <h4>Company name:</h4>
              <p>{currentlyUpdatedJob.company}</p>
            </div>
            <div className="info-cont">
              <h4>City:</h4>
              <p>{currentlyUpdatedJob.city}</p>
            </div>
            <div className="info-cont">
              <h4>Date applied:</h4>
              <p>{currentlyUpdatedJob.date}</p>
            </div>
            <div className="info-cont">
              <h4>Source: </h4>
              <p>{currentlyUpdatedJob.source}</p>
            </div>
            <div className="info-cont">
              <h4>Result: </h4>
              <p>{currentlyUpdatedJob.result}</p>
            </div>
          </div>
          <div className="comments-container">
            <h4>Comments: </h4>
            {showComments}

            <button
              className="add-comment-btn"
              onClick={() => setShowAddNewCommentInput(!showAddNewCommentInput)}
            >
              Add Comment
            </button>

            {showAddNewCommentInput && (
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
                  {showAddCommentError && (
                    <p className="add-error-message">
                      Please Choose the Date of new comment
                    </p>
                  )}
                  <button onClick={handleCombineNewCommentInputsSubmit}>
                    Add
                  </button>
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

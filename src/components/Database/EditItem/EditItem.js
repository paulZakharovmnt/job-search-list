import React, { useState } from "react";
import "./EditItem.css";

const EditItem = ({
  editingJob,
  handleEditWindowToggler,
  addCommentToTheJobInfo,
}) => {
  const [userWantsToAddComment, setUserWantsToAddComment] = useState(false);
  const [commentDate, setCommentDate] = useState("");
  const [newComment, setNewComment] = useState("");

  let showComments = Object.entries(editingJob.comments).map((arr) => {
    return (
      <div key={arr[0]}>
        <h4>Date</h4>
        <p>{arr[0]}</p>
        <h4>Comment:</h4>
        <p>{arr[1]}</p>
      </div>
    );
  });

  const handleAddNewComment = (event) => {
    event.preventDefault();
    let updatedJob = editingJob;
    updatedJob.comments[commentDate] = newComment;

    addCommentToTheJobInfo(updatedJob);
    setUserWantsToAddComment(!userWantsToAddComment);
  };

  return (
    <div className="black-cover">
      <div className="edit-window">
        <p>{editingJob.company}</p>
        <p>{editingJob.city}</p>
        <p>{editingJob.result}</p>
        <p>{editingJob.source}</p>
        {showComments}
        <button
          onClick={() => setUserWantsToAddComment(!userWantsToAddComment)}
        >
          Add Comment
        </button>
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

        <button onClick={handleEditWindowToggler}>Close</button>
      </div>
    </div>
  );
};

export default EditItem;

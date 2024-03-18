function CommentForm({ name, comment, onSubmit, onSetName, onSetComment }) {
  return (
    <form className="commentForm" onSubmit={onSubmit}>
      <label htmlFor="name">
        <b>Name:</b>
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter Name.."
        value={name}
        onChange={onSetName}
        required
      />

      <label htmlFor="comment">
        <b>Comment:</b>
      </label>
      <textarea
        id="comment"
        cols="50"
        rows="5"
        value={comment}
        onChange={onSetComment}
        required
      ></textarea>

      <button className="btn post">Add Comment</button>
    </form>
  );
}

export default CommentForm;

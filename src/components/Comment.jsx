function Comment({ comment }) {
  return (
    <div className="comment">
      <h4>
        <span>{comment.name.charAt(0)}</span>
        {comment.name}
      </h4>
      <br />
      <p>{comment.comment}</p>
    </div>
  );
}

export default Comment;

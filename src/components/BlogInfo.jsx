import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function BlogInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    searchedPosts,
    isLoading,
    currentPost,
    getPost,
    updateLikes,
    addComment,
    deletePost,
  } = usePosts();
  const { user, updatePostLiked } = useAuth();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [addCommentOpen, setAddCommentOpen] = useState(false);

  // state varaibles for commentForm
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPost(id);
  }, [id, searchedPosts, getPost]);

  async function handleAddComment(e) {
    e.preventDefault();
    await addComment(Number(id), { name, comment });
    setName("");
    setComment("");
    setAddCommentOpen(false);
  }

  async function handleDelete() {
    await deletePost(Number(id));
    alert("Post Deleted Successfully..👍");
    navigate("/");
  }

  if (isLoading)
    return (
      <h3 style={{ textAlign: "center", marginTop: "90px" }}>
        Loading Data...
      </h3>
    );

  return (
    <section className="blogInfo">
      <img src={`/${currentPost.image}`} alt="blog_img" className="blog-img" />
      <h2 className="blog-title">{currentPost.title}</h2>
      <div className="writerInfo">
        <img src="https://i.pravatar.cc/100?u=zz" alt="writer_img" />
        <p>
          <strong>{currentPost.authorName}</strong>
          <br />
          <i>Published on {new Date(currentPost.date).toDateString()}</i>
        </p>
      </div>
      <p className="post-content">{currentPost.post}</p>

      <div className="likesCommentsAndOperations">
        <div>
          <span
            className={`${
              user.postsLiked.includes(currentPost.id) ? "disable" : ""
            }`}
            onClick={() => {
              updateLikes(currentPost.id);
              updatePostLiked(currentPost.id);
            }}
          >
            👍 ({currentPost.likes})
          </span>
          &nbsp;
          <span onClick={() => setCommentsOpen((prev) => !prev)}>
            💬 ({currentPost.comments?.length})
          </span>
        </div>
        <div>
          <Link to={`/editBlog/${id}`}>
            <span>📝</span>
          </Link>
          &nbsp;
          <span onClick={handleDelete}>🗑️</span>
        </div>
      </div>

      {commentsOpen && (
        <div className="comments">
          <div className="addcomment">
            <h4>Comments ({currentPost.comments.length})</h4>
            <button
              className="addCommentBtn"
              onClick={() => setAddCommentOpen((prev) => !prev)}
            >
              Add Comment
            </button>
          </div>

          {currentPost.comments.length > 0 ? (
            currentPost.comments.map((comment, index) => (
              <Comment key={index + 1} comment={comment} />
            ))
          ) : (
            <h4 style={{ margin: "15px" }}>No Comments Yet</h4>
          )}

          {addCommentOpen && (
            <CommentForm
              name={name}
              comment={comment}
              onSetName={(e) => setName(e.target.value)}
              onSetComment={(e) => setComment(e.target.value)}
              onSubmit={handleAddComment}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default BlogInfo;

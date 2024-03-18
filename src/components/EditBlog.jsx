import { usePosts } from "../contexts/PostsContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EditBlog() {
  const { currentPost, setCurrentPost, getPost, updatePost } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCurrentPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // const updatedPost = {
    //   authorName: currentPost.authorName,
    //   title: currentPost.title,
    //   date: currentPost.date,
    //   post: currentPost.post,
    //   image: currentPost.image,
    //   likes: currentPost.likes,
    //   comments: currentPost.comments,
    // };
    await updatePost(id, currentPost);
    navigate("/");
  }

  return (
    <div className="addNewPost">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <b>Name:</b>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter name.."
          name="authorName"
          value={currentPost.authorName}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">
          <b>Post Title:</b>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter name.."
          name="title"
          value={currentPost.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">
          <b>Date:</b>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={currentPost.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="post">
          <b>Post:</b>
        </label>
        <textarea
          id="post"
          cols="60"
          rows="15"
          name="post"
          value={currentPost.post}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="image">
          <b>Image:</b>
        </label>
        <select id="image" value={currentPost.image} onChange={handleChange}>
          <option>Please select post related image:</option>
          <option value="ai.jpg">AI</option>
          <option value="dataanalysis.jpg">Data Analysis</option>
          <option value="datascience.jpg">Data Science</option>
          <option value="js.jpg">JavaScript</option>
          <option value="react.jpg">React JS</option>
          <option value="typescript.png">TypeScript</option>
          <option value="web.jpg">Web Development</option>
        </select>

        <button className="btn post">Edit Post</button>
      </form>
    </div>
  );
}

export default EditBlog;

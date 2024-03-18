import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";

function NewPost() {
  const navigate = useNavigate();
  const { addNewPost } = usePosts();
  const [post, setPost] = useState({
    authorName: "",
    title: "",
    date: "",
    post: "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      authorName: post.authorName,
      title: post.title,
      date: post.date,
      post: post.post,
      image: post.image,
      likes: 0,
      comments: [],
    };
    await addNewPost(newPost);
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
          value={post.authorName}
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
          value={post.title}
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
          value={post.date}
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
          value={post.post}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="image">
          <b>Image:</b>
        </label>
        <select
          id="image"
          name="image"
          value={post.image}
          onChange={handleChange}
        >
          <option>Please select post related image:</option>
          <option value="ai.jpg">AI</option>
          <option value="dataanalysis.jpg">Data Analysis</option>
          <option value="datascience.jpg">Data Science</option>
          <option value="js.jpg">JavaScript</option>
          <option value="react.jpg">React JS</option>
          <option value="typescript.png">TypeScript</option>
          <option value="web.jpg">Web Development</option>
        </select>

        <button className="btn post">Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;

import { Link } from "react-router-dom";

function Blog({ post }) {
  return (
    <div>
      <div className="image">
        <img src={`/${post.image}`} alt="blog_img" />
      </div>
      <h3 className="title">{post.title}</h3>
      <p>{post.post.split(" ").slice(0, 16).join(" ") + "..."}</p>
      <div className="blogWriterInfoAndReadmore">
        <div className="writerInfo">
          <img src="https://i.pravatar.cc/100?u=zz" alt="writer_img" />
          <p>
            <strong>{post.authorName}</strong>
            <br />
            <i>Published on {new Date(post.date).toDateString()}</i>
          </p>
        </div>
        <Link to={`blogs/${post.id}`}>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default Blog;

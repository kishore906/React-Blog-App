import { usePosts } from "../contexts/PostsContext";
import Blog from "./Blog";

function Blogs() {
  const { searchedPosts, isLoading, filteredPosts } = usePosts();
  const posts = filteredPosts.length > 0 ? filteredPosts : searchedPosts;

  if (isLoading)
    return <h3 style={{ textAlign: "center" }}>Loading Data...</h3>;

  return (
    <section className="blogs">
      {posts.map((post) => (
        <Blog post={post} key={post.title} />
      ))}
    </section>
  );
}

export default Blogs;

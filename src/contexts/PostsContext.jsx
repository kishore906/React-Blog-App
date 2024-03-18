import { useMemo } from "react";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

// creating Posts Context
const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  // this useEffect() runs on initial render of the component
  useEffect(() => {
    async function fetchAllPosts() {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts`);

        if (!response.ok)
          throw new Error("There was an Error in fetching data 😔");

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllPosts();
  }, []);

  // Derived state, these are the posts that are actually displayed (either posts or posts related to searchQuery)
  const searchedPosts = useMemo(() => {
    return searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.post}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;
  }, [posts, searchQuery]);

  // handles clicked filter related posts
  function handleFilter(e) {
    if (e.target.textContent.toLowerCase() === "all") {
      setFilteredPosts([]);
      return;
    }

    setFilteredPosts(
      posts.filter((post) =>
        `${post.title} ${post.post}`
          .toLowerCase()
          .includes(e.target.textContent.toLowerCase())
      )
    );
  }

  const getPost = useCallback(async function getPost(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/posts/${id}`);
      const data = await res.json();
      setCurrentPost(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function addNewPost(newPost) {
    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPosts((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function addComment(id, newComment) {
    // setPosts((prevPosts) =>
    //   prevPosts.map((post) =>
    //     post.id === id
    //       ? { ...post, comments: [...post.comments, newComment] }
    //       : post
    //   )
    // );

    const postToComment = posts.find((post) => post.id === id);
    postToComment.comments = [...postToComment.comments, newComment];

    try {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(postToComment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? postToComment : post))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePost(id, updatedPost) {
    try {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === Number(id) ? updatedPost : post))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updateLikes(id) {
    const postToLike = posts.find((post) => post.id === id);
    postToLike.likes += 1;

    try {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(postToLike),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? postToLike : post))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePost(id) {
    try {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PostsContext.Provider
      value={{
        searchedPosts,
        isLoading,
        searchQuery,
        setSearchQuery,
        filteredPosts,
        handleFilter,
        currentPost,
        setCurrentPost,
        getPost,
        addNewPost,
        updatePost,
        updateLikes,
        addComment,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

// custom hook for using context value
function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined)
    throw new Error("PostsContext was used before PostsProvider..😉");
  return context;
}

export { PostsProvider, usePosts };

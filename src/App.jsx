import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
        );
        const data = await response.json();
        setPosts((prevPost) => [...prevPost, ...data]);
        if (data.length === 0) setHasMore(false);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScrole = () => {
      // viewport-ის სიდიდე პიხსელებში
      const windowHeight = window.innerHeight;
      // არსებული ელემენტებით საიტის მტლიანი ზომა (+რაც არ ჩანს ეკრანზე)
      const documentHeight = document.documentElement.offsetHeight;
      // სქროლის ზომა პიქსელებში რამდენით არის ჩამოსული
      const scroleTop = document.documentElement.scrollTop;

      if (windowHeight + scroleTop >= documentHeight / 2 && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScrole);

    return () => window.removeEventListener("scroll", handleScrole);
  }, [loading, hasMore]);

  return (
    <>
      <h1 className="text-red-600">Infinity scroll</h1>

      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-500 shadow-md bg-white my-3"
          >
            <h1>{post.id}</h1>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {loading && <h2>loading...</h2>}
      {!hasMore && <h2>ther is no more post</h2>}
    </>
  );
}

export default App;

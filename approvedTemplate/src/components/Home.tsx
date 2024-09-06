import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { FaSpinner } from "react-icons/fa";

interface Post {
  id: string;
  text: string;
  imageUrl: string;
  userId: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setError("Database is not available. Please try again later.");
      setLoading(false);
      return;
    }

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, 
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(newPosts);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl sm:text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 sm:p-6">
        <p className="text-lg sm:text-xl font-semibold mb-2">Error</p>
        <p className="text-sm sm:text-base">{error}</p>
      </div>
    );
  }

  return (
    <div className="home p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Home Feed</h1>
      {posts.length === 0 && (
        <p className="text-center text-gray-600 text-sm sm:text-base">No posts available. Be the first to post!</p>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post bg-white shadow-md rounded-lg overflow-hidden"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-48 sm:h-64 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-gray-800 text-sm sm:text-base">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

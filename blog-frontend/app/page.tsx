"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Link from "next/link";
import { Search } from "lucide-react"; // Icon for the search bar

// The type definition for a Post
type Post = {
  _id: string;
  title: string;
  description: string;
  image?: string;
};

export default function HomePage() {
  // ==================================================================
  // COMPONENT LOGIC
  // Your original logic is preserved and enhanced with search functionality.
  // ==================================================================

  // State to hold all posts fetched from the API
  const [posts, setPosts] = useState<Post[]>([]);
  // State for the loading indicator
  const [loading, setLoading] = useState(true);
  // NEW: State to hold the user's current search input
  const [searchQuery, setSearchQuery] = useState("");

  // Your original data-fetching logic remains unchanged.
  // It runs once when the component mounts to get all posts.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // NEW: Performant client-side filtering.
  // This creates a new array of posts to display based on the search query.
  // It filters by checking if the query appears in the post's title or description.
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // ==================================================================

  // Display a styled loading message while fetching data.
  if (loading) {
    return (
      <main className="page-container">
        <p className="status-message">Loading amazing posts...</p>
      </main>
    );
  }

  // The main component render.
  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">All Blog Posts</h1>
      </header>

      {/* The new, beautifully integrated search bar */}
      <div className="search-bar-container">
        <Search className="search-bar-icon" />
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* The responsive grid now maps over the `filteredPosts` array */}
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`} className="post-card">
            <div className="post-card-image-wrapper">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-card-image"
                />
              ) : (
                <div className="post-card-image-placeholder">
                  <span>{post.title.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="post-card-content">
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-description">
                {post.description.length > 100
                  ? post.description.slice(0, 100) + "..."
                  : post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Intelligent "Empty State" Messages */}

      {/* This message shows ONLY when a search is active but returns no results. */}
      {posts.length > 0 && filteredPosts.length === 0 && (
        <p className="status-message">
          No results found for "{searchQuery}". Try a different term.
        </p>
      )}

      {/* This message shows ONLY when the blog has no posts to begin with. */}
      {posts.length === 0 && (
        <p className="status-message">
          No posts have been published yet. Create one to get started!
        </p>
      )}
    </main>
  );
}

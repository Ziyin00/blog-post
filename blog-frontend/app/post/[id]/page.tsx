"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/utils/axios";
import CommentForm from "@/components/CommentForm";

// ==================================================================
// YOUR LOGIC - 100% UNCHANGED
// ==================================================================
type Comment = {
  _id: string;
  text: string;
  authorName: string;
  createdAt: string;
};

type Post = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
};

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error loading post", err);
    } finally {
      // We set loading to false only after the post is fetched
      // to avoid showing content before the main data is ready.
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/posts/${id}/comments`);
      const data = Array.isArray(res.data) ? res.data : [];

      // Normalize comments
      const normalized = data.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        authorName: comment.user?.name || "Unknown",
        createdAt: comment.createdAt,
      }));

      setComments(normalized);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);
  // ==================================================================
  // END OF YOUR LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // ==================================================================

  // Styled loading and not-found states
  if (loading) {
    return (
      <main className="page-container">
        <p className="status-message">Loading article...</p>
      </main>
    );
  }
  if (!post) {
    return (
      <main className="page-container">
        <p className="status-message">Sorry, this post could not be found.</p>
      </main>
    );
  }

  return (
    <main className="post-detail-page">
      {/* The main article content, with a semantic <article> tag */}
      <article className="post-article">
        {/* A grand header for the title and metadata */}
        <header className="post-header-container">
          {post.image && (
            <div className="post-featured-image-wrapper">
              <img
                src={post.image}
                alt={post.title}
                className="post-featured-image"
              />
              <div className="post-featured-image-overlay"></div>
            </div>
          )}
          <div className="post-header-content">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-meta">
              Published on{" "}
              <time dateTime={post.createdAt}>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "an unknown date"}
              </time>
            </p>
          </div>
        </header>

        {/* The main body of the post, optimized for reading */}
        <div className="post-body-content">
          {/* Your post.description is the primary content */}
          <p>{post.description}</p>

          {/* Example of how other rich text elements would look with our styling */}
        </div>
      </article>

      {/* The comments section, styled to be distinct from the article */}
      <section className="comments-section">
        <div className="comments-container">
          <h2 className="comments-title">Join the Conversation</h2>

          {/* Your CommentForm is now perfectly integrated */}
          <CommentForm postId={post._id} onSuccess={fetchComments} />

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments-message">
                Be the first to leave a comment.
              </p>
            ) : (
              // Your comments.map logic now renders our beautiful comment cards
              comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <p className="comment-text">{comment.text}</p>
                  <footer className="comment-footer">
                    <span className="comment-author">{comment.authorName}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </footer>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

//their also get trouble in any part

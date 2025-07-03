"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios, { isAxiosError } from "axios"; // Import `isAxiosError` for type checking
import CommentForm from "@/components/CommentForm";

// ==================================================================
// LOGIC WITH UPGRADED TYPE-SAFETY
// ==================================================================

// The final, normalized shape of a comment for the UI
type Comment = {
  _id: string;
  text: string;
  authorName: string;
  createdAt: string;
};

// The shape of a Post object
type Post = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
};

// NEW: Define the shape of the raw comment data from the API
type RawComment = {
  _id: string;
  text: string;
  createdAt: string;
  user?: {
    // The user object can be optional
    name: string;
  };
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
      // UPGRADED: Type-safe error handling
      if (isAxiosError(err)) {
        console.error("Axios error loading post:", err.response?.data);
      } else {
        console.error("Error loading post:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      // UPGRADED: Tell Axios what type of data to expect
      const res = await axios.get<RawComment[]>(`/posts/${id}/comments`);

      // `res.data` is now correctly typed as `RawComment[]`, no more `any`!
      const normalized = res.data.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        authorName: comment.user?.name || "Anonymous", // Provide a fallback
        createdAt: comment.createdAt,
      }));

      setComments(normalized);
    } catch (err) {
      // UPGRADED: Type-safe error handling
      if (isAxiosError(err)) {
        console.error("Axios error loading comments:", err.response?.data);
      } else {
        console.error("Error loading comments:", err);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);
  // ==================================================================
  // END OF LOGIC
  // ==================================================================

  // ==================================================================
  // THE AMAZING & PROFESSIONAL UI (Unchanged)
  // ==================================================================

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
      <article className="post-article">
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

        <div className="post-body-content">
          <p>{post.description}</p>
        </div>
      </article>

      <section className="comments-section">
        <div className="comments-container">
          <h2 className="comments-title">Join the Conversation</h2>
          <CommentForm postId={post._id} onSuccess={fetchComments} />
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments-message">
                Be the first to leave a comment.
              </p>
            ) : (
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

"use client";

import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useAuth } from "@/store/auth";
import { useState } from "react";
import { User } from "lucide-react"; // For the user avatar placeholder

// ==================================================================
// YOUR LOGIC - 100% UNCHANGED
// ==================================================================
type FormFields = { text: string };
type CommentFormProps = { postId: string; onSuccess: () => void };

export default function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const { token } = useAuth();
  const [error, setError] = useState("");

  const onSubmit = async (data: FormFields) => {
    try {
      await axios.post(`/posts/${postId}/comments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      onSuccess();
      setError("");
    } catch {
      setError("Failed to add comment");
    }
  };

  // This crucial piece of logic is preserved.
  // The form will not render at all if the user is not logged in.
  if (!token) {
    return null;
  }
  // ==================================================================
  // END OF YOUR LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // This JSX is structured for our new CSS, but wired to your logic.
  // ==================================================================
  return (
    <div className="comment-form-wrapper">
      <div className="comment-form-avatar">
        {/* In a real app, you could add logic to show a user's profile image here */}
        <User size={24} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
        <div className="comment-form-input-group">
          {/* A hidden label for screen reader accessibility */}
          <label htmlFor="comment-text" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment-text"
            {...register("text")}
            className="form-input" // Re-using our master input style!
            placeholder="Add a comment..."
            rows={3}
            required
          />
        </div>

        {/* Container for actions to align them correctly on the right */}
        <div className="comment-form-actions">
          {error && <p className="form-error-inline">{error}</p>}
          <button type="submit" className="form-submit-button small">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

//their also

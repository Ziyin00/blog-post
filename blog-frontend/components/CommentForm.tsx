"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import axios, { isAxiosError } from "axios"; // Import `isAxiosError` for type checking
import { useState } from "react";
import { User } from "lucide-react";

// ==================================================================
// LOGIC WITH UPGRADED, TYPE-SAFE ERROR HANDLING
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
    } catch (err) {
      // UPGRADED: Type-safe error handling
      if (isAxiosError(err)) {
        // This is a specific error from the backend via Axios
        setError(
          err.response?.data?.message ||
            "Failed to add comment. Please try again."
        );
      } else if (err instanceof Error) {
        // This is a generic JavaScript error
        setError(err.message);
      } else {
        // This is an unexpected error type
        setError("An unexpected error occurred while posting your comment.");
      }
    }
  };

  // This crucial logic is preserved. The form will not render if the user is not logged in.
  if (!token) {
    return null;
  }
  // ==================================================================
  // END OF LOGIC
  // ==================================================================

  // ==================================================================
  // THE AMAZING & PROFESSIONAL UI (Unchanged)
  // ==================================================================
  return (
    <div className="comment-form-wrapper">
      <div className="comment-form-avatar">
        <User size={24} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
        <div className="comment-form-input-group">
          <label htmlFor="comment-text" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment-text"
            {...register("text")}
            className="form-input"
            placeholder="Add a comment..."
            rows={3}
            required
          />
        </div>

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

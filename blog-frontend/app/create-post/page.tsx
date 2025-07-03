"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import axios, { isAxiosError } from "axios"; // Import `isAxiosError` for type checking
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadCloud } from "lucide-react";

// The FormFields type remains unchanged.
type FormFields = {
  title: string;
  description: string;
};

export default function CreatePostPage() {
  // ==================================================================
  // LOGIC WITH UPGRADED, TYPE-SAFE ERROR HANDLING
  // ==================================================================
  const { register, handleSubmit } = useForm<FormFields>();
  const { token } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: FormFields) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/");
    } catch (err) {
      // UPGRADED: Type-safe error handling
      if (isAxiosError(err)) {
        // This is a specific error from the backend via Axios
        setError(
          err.response?.data?.message ||
            "Post creation failed. Please check your input."
        );
      } else if (err instanceof Error) {
        // This is a generic JavaScript error (e.g., network issue)
        setError(err.message);
      } else {
        // This is an unexpected error type
        setError("An unexpected error occurred while creating the post.");
      }
    }
  };
  // ==================================================================
  // END OF LOGIC
  // ==================================================================

  // ==================================================================
  // THE AMAZING & PROFESSIONAL UI (Unchanged)
  // ==================================================================
  return (
    <main className="page-container">
      <div className="form-container">
        <header className="form-header">
          <h1 className="form-title">Create a New Post</h1>
          <p className="form-subtitle">
            Bring your ideas to life. Fill out the details below to publish your
            article.
          </p>
        </header>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Post Title
            </label>
            <input
              id="title"
              {...register("title")}
              className="form-input"
              placeholder="e.g., The Future of Web Design"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Content / Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="form-input"
              placeholder="Write your amazing post here..."
              rows={8}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <label htmlFor="file-upload" className="file-drop-zone">
              {preview ? (
                <img
                  src={preview}
                  alt="Image Preview"
                  className="file-preview-image"
                />
              ) : (
                <div className="file-drop-zone-prompt">
                  <UploadCloud className="file-drop-zone-icon" />
                  <span className="file-drop-zone-text">
                    <span className="font-bold text-accent">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </span>
                  <span className="file-drop-zone-subtext">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </span>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }
              }}
              required
            />
          </div>

          <button type="submit" className="form-submit-button">
            Publish Post
          </button>
        </form>
      </div>
    </main>
  );
}

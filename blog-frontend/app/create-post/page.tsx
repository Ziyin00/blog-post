"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadCloud } from "lucide-react"; // Icon for our custom file input

// The FormFields type remains unchanged.
type FormFields = {
  title: string;
  description: string;
};

export default function CreatePostPage() {
  // ==================================================================
  // YOUR LOGIC - 100% UNCHANGED
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
    } catch {
      setError("Post creation failed");
    }
  };
  // ==================================================================
  // END OF YOUR LOGIC
  // ==================================================================

  // ==================================================================
  // THE NEW, AMAZING & PROFESSIONAL UI
  // This JSX is structured for our new CSS, but wired to your logic.
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

        {/* The error message uses the themed 'form-error' class */}
        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          {/* Title Input */}
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

          {/* Description Textarea */}
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

          {/* Custom File Input */}
          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <label htmlFor="file-upload" className="file-drop-zone">
              {preview ? (
                // Your `preview` state logic now renders a beautiful preview image
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
            {/* The actual file input is hidden, but its logic is fully intact */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  // This is your original, working logic for handling file selection
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }
              }}
              required
            />
          </div>

          {/* The primary action button, styled to perfection */}
          <button type="submit" className="form-submit-button">
            Publish Post
          </button>
        </form>
      </div>
    </main>
  );
}

//their also!!

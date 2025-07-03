"use client";

import { useAuth } from "@/store/auth";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the hook to know the current page
import { ThemeToggle } from "./theme-toggle"; // This is our existing theme toggle

export default function Navbar() {
  // --- YOUR LOGIC (UNCHANGED) ---
  const { token, logout } = useAuth();
  // --- END OF YOUR LOGIC ---

  // Get the current URL path to highlight the active link
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path: string) => path === pathname;

  return (
    // Use a <header> for semantic correctness. It's fixed to the top of the viewport.
    <header className="main-header">
      <nav className="navbar-container">
        {/* The App's Brand/Logo - links to home */}
        <Link href="/" className="navbar-brand">
          BlogApp
        </Link>

        {/* Navigation links and actions */}
        <div className="navbar-links">
          <Link
            href="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          {token && (
            <Link
              href="/create-post"
              className={`nav-link ${isActive("/create-post") ? "active" : ""}`}
            >
              New Post
            </Link>
          )}
          {!token ? (
            <>
              <Link
                href="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`nav-link ${isActive("/register") ? "active" : ""}`}
              >
                Register
              </Link>
            </>
          ) : (
            // The logout button now has the same style as a link for consistency
            <button onClick={logout} className="nav-link">
              Logout
            </button>
          )}
        </div>

        {/* The theme toggle is kept separate for styling purposes */}
        <div className="navbar-actions">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

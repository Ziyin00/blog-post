import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react"; // Social media icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Column 1: Brand and Copyright */}
        <div className="footer-column footer-brand">
          <h3 className="footer-brand-name">BlogApp</h3>
          <p className="footer-copyright">
            © {currentYear} BlogApp. All rights reserved. <br />A project
            designed for a world-class portfolio.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-column footer-links">
          <h4 className="footer-heading">Navigate</h4>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/create-post">New Post</Link>
            </li>
            <li>
              <a href="#">About</a>
            </li>{" "}
            {/* Placeholder link */}
            <li>
              <a href="#">Contact</a>
            </li>{" "}
            {/* Placeholder link */}
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div className="footer-column footer-social">
          <h4 className="footer-heading">Connect</h4>
          <div className="social-icons-list">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

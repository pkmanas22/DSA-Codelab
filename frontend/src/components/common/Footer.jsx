import React from 'react';
import { Heart, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside className="text-sm flex  items-center gap-6">
        <p className="flex items-center gap-2">
          © {new Date().getFullYear()} DSA CodeLab. Made with
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          by Manas
        </p>
        <a
          href="https://x.com/pkmanas22"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-500 hover:underline"
        >
          <Twitter className="w-4 h-4" />
          @pkmanas22
        </a>
      </aside>
    </footer>
  );
};

export default Footer;

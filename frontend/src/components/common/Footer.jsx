import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p className="text-sm flex items-center gap-2">
          Copyright © {new Date().getFullYear()} DSA CodeLab. Made with
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          for developers
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

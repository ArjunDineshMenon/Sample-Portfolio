import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-primary">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-ink dark:border-outline-variant flex justify-between items-center px-margin-page py-6">
        <div className="font-label-caps text-label-caps tracking-widest text-primary">
          STUDIO_ARCHIVE
        </div>
        <div className="hidden md:flex gap-8">
          <a
            className="text-primary opacity-60 hover:opacity-100 hover:text-signal transition-opacity duration-300 font-label-caps text-label-caps"
            href="#works"
          >
            Works
          </a>
          <a
            className="text-primary opacity-60 hover:opacity-100 hover:text-signal transition-opacity duration-300 font-label-caps text-label-caps"
            href="#about"
          >
            About
          </a>
          <a
            className="text-primary opacity-60 hover:opacity-100 hover:text-signal transition-opacity duration-300 font-label-caps text-label-caps"
            href="#contact"
          >
            Contact
          </a>
        </div>
        <button className="border border-ink px-4 py-2 hover:bg-signal hover:text-canvas hover:border-signal transition-colors duration-300 text-primary font-label-caps text-label-caps">
          Inquiry
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="w-full bg-canvas border-t border-ink dark:border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center px-margin-page py-12 gap-8 relative z-10 reveal-up is-visible">
        <div className="font-headline-md text-headline-md text-primary">
          STUDIO_ARCHIVE
        </div>
        <div className="flex flex-wrap gap-6">
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-signal transition-colors duration-300"
            href="#"
          >
            Instagram
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-signal transition-colors duration-300"
            href="#"
          >
            LinkedIn
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-signal transition-colors duration-300"
            href="#"
          >
            Are.na
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-signal transition-colors duration-300"
            href="#"
          >
            Archive
          </a>
        </div>
        <div className="font-label-caps text-label-caps text-primary opacity-60">
          ©2024 SYSTEM ARCHIVE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

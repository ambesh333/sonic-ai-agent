'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          
          {/* Second Row */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <p className="text-gray-400 text-sm">© 2025 SonicChat. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://twitter.com/your_twitter" className="text-gray-400 hover:text-white text-sm transition-colors">
                Ambesh's Twitter
              </a>
              <a href="https://twitter.com/friend_twitter" className="text-gray-400 hover:text-white text-sm transition-colors">
                Deepak's Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">SonicChat</span>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate chatbot for Sonic Chain. Send tokens, get market insights, and access fund information with simple chat commands.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Token Transfer', 'Market Insights', 'Fund Information', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 SonicChat. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
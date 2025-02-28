import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Zap className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">SonicChat</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Market Insights', 'Token Transfer', 'Testimonials', 'FAQ'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        <motion.button
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-full font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-gray-900 absolute top-full left-0 right-0 border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {['Features', 'Market Insights', 'Token Transfer', 'Testimonials', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-full font-medium mt-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { ConnectWallet } from '../Header/connectWallet';


const HeroSection = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Typing animation text
  const phrases = [
    "Send tokens instantly.",
    "Get real-time market insights.",
    "Access detailed fund information."
  ];
  
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      // Current phrase being typed
      const currentText = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        setCurrentPhrase(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setTypingSpeed(50); // Faster when deleting
      } else {
        // Typing text
        setCurrentPhrase(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setTypingSpeed(100); // Normal typing speed
      }
      
      // Check if word is complete
      if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end of phrase
        setTypingSpeed(2000); // Pause before deleting
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(500); // Pause before typing next word
      }
      
      // Set typing complete after going through all phrases once
      if (phraseIndex === phrases.length - 1 && charIndex === currentText.length && !typingComplete) {
        setTypingComplete(true);
      }
    }, typingSpeed);
    
    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, typingComplete]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-20">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Powered by Sonic Chain</span>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={item} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          The Ultimate Chatbot for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Sonic Chain
          </span>
        </motion.h1>
        
        <motion.div 
          variants={item}
          className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
        >
          <span className="inline-block">
            {currentPhrase}
            <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-blink"></span>
          </span>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
       <ConnectWallet landing />
          
            <motion.button
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-2 rounded-lg font-medium text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Watch Demo
            </motion.button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10"
      >
        <motion.button
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
          whileHover={{ y: 5 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
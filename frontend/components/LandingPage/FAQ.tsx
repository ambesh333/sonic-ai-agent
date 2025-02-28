'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How do I get started with SonicChat?",
      answer: "Getting started is easy! Simply download the app from your app store, create an account, and connect your Sonic Chain wallet. Once connected, you can start sending tokens, checking market data, and more through simple chat commands."
    },
    {
      question: "Is SonicChat secure?",
      answer: "Absolutely. We use industry-leading encryption and security protocols to protect your data and assets. We never store your private keys, and all transactions require your explicit confirmation before being processed."
    },
    {
      question: "What tokens can I send using SonicChat?",
      answer: "SonicChat supports all tokens on the Sonic Chain ecosystem. This includes SONIC, USDC, and any other tokens built on the Sonic Chain network."
    },
    {
      question: "How accurate is the market data?",
      answer: "Our market data is sourced from multiple reliable exchanges and data providers, and is updated in real-time. We ensure high accuracy and low latency for all market information."
    },
    {
      question: "Are there any fees for using SonicChat?",
      answer: "The basic features of SonicChat are free to use. When sending tokens, you'll only pay the standard Sonic Chain network transaction fees, which are typically very low. Premium features may require a subscription."
    },
    {
      question: "Can I use SonicChat for trading?",
      answer: "While SonicChat provides market insights and allows you to send tokens, it's not a trading platform. However, you can use the insights gained from SonicChat to inform your trading decisions on your preferred exchange."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about SonicChat and how it works.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full p-6 flex items-center justify-between bg-gray-900/50 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-300">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 p-6 border border-white/10 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Our support team is ready to help you with any questions you may have.
          </p>
          <motion.button
            className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;